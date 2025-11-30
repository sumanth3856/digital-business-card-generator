import { create } from 'zustand';
import { CardData, SocialLink } from '@/types/card';
import { createClient } from '@/lib/supabase/client';

interface CardState {
    data: CardData;
    updatePersonal: (field: keyof CardData['personal'], value: string) => void;
    addSocialLink: (link: SocialLink) => void;
    removeSocialLink: (id: string) => void;
    updateSocialLink: (id: string, field: keyof SocialLink, value: string) => void;
    updateTheme: (field: keyof CardData['theme'], value: string) => void;
    setTemplate: (templateId: string) => void;
    saveCard: () => Promise<void>;
    loadCard: (id: string) => Promise<void>;
    isSaving: boolean;
    lastSaved: number;
}

const initialData: CardData = {
    personal: {
        fullName: '',
        jobTitle: '',
        tagline: '',
        about: '',
        email: '',
        phone: '',
        location: '',
        company: '',
        website: '',
    },
    socialLinks: [],
    theme: {
        primaryColor: '#2563eb', // blue-600
        secondaryColor: '#4f46e5', // indigo-600
        backgroundColor: '#ffffff',
        textColor: '#0f172a', // slate-900
        fontPair: 'sans',
    },
    templateId: 'modern',
};

export const useCardStore = create<CardState>((set, get) => ({
    data: initialData,
    isSaving: false,
    lastSaved: 0,
    updatePersonal: (field, value) =>
        set((state) => ({
            data: {
                ...state.data,
                personal: { ...state.data.personal, [field]: value },
            },
        })),
    addSocialLink: (link) =>
        set((state) => ({
            data: {
                ...state.data,
                socialLinks: [...state.data.socialLinks, link],
            },
        })),
    removeSocialLink: (id) =>
        set((state) => ({
            data: {
                ...state.data,
                socialLinks: state.data.socialLinks.filter((l) => l.id !== id),
            },
        })),
    updateSocialLink: (id, field, value) =>
        set((state) => ({
            data: {
                ...state.data,
                socialLinks: state.data.socialLinks.map((l) =>
                    l.id === id ? { ...l, [field]: value } : l
                ),
            },
        })),
    updateTheme: (field, value) =>
        set((state) => ({
            data: {
                ...state.data,
                theme: { ...state.data.theme, [field]: value },
            },
        })),
    setTemplate: (templateId) =>
        set((state) => ({
            data: { ...state.data, templateId },
        })),

    saveCard: async () => {
        const now = Date.now();
        const lastSaved = get().lastSaved;

        if (now - lastSaved < 2000) {
            throw new Error('Please wait a moment before saving again.');
        }

        const supabase = createClient();
        set({ isSaving: true });

        try {
            console.log('Attempting to save card...');

            // Debug: Check session first
            const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
            console.log('Current Session:', sessionData.session ? 'Exists' : 'Null', 'Error:', sessionError);

            const { data: { user }, error: authError } = await supabase.auth.getUser();

            if (authError) {
                console.error('Auth error in saveCard:', authError);
                throw new Error(`Auth Error: ${authError.message}`);
            }

            if (!user) {
                console.error('No user found in saveCard');
                throw new Error('User not authenticated');
            }

            console.log('User authenticated:', user.id);

            const currentData = get().data;

            // Check if card exists for user
            const { data: existingCard, error: selectError } = await supabase
                .from('cards')
                .select('id')
                .eq('user_id', user.id)
                .single();

            if (selectError && selectError.code !== 'PGRST116') {
                throw selectError;
            }

            if (existingCard) {
                await supabase
                    .from('cards')
                    .update({
                        data: currentData,
                        updated_at: new Date().toISOString(),
                    })
                    .eq('id', existingCard.id);
            } else {
                await supabase
                    .from('cards')
                    .insert({
                        user_id: user.id,
                        data: currentData,
                        slug: user.id.slice(0, 8),
                    });
            }

            set({ lastSaved: now });
        } catch (error) {
            console.error('Error saving card (full):', error);
            const err = error as { message: string; details?: string; hint?: string };
            console.error('Error message:', err.message);
            console.error('Error details:', err.details);
            console.error('Error hint:', err.hint);
            throw error;
        } finally {
            set({ isSaving: false });
        }
    },
    loadCard: async (id) => {
        const supabase = createClient();
        try {
            const { data: card, error } = await supabase
                .from('cards')
                .select('data')
                .eq('id', id)
                .single();

            if (error) throw error;

            if (card) {
                set({ data: card.data as CardData });
            }
        } catch (error) {
            console.error('Error loading card:', error);
        }
    },
}));
