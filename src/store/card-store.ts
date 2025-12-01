
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
    currentCardId: string | null;
    resetCard: () => void;
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
    currentCardId: null,
    isSaving: false,
    lastSaved: 0,
    resetCard: () => set({ data: initialData, currentCardId: null }),
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

            // Debug: Check session first
            const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

            const { data: { user }, error: authError } = await supabase.auth.getUser();

            if (authError) {
                // Suppress console.error for expected auth errors (like missing session)
                if (authError.message.includes('Auth session missing') || authError.message.includes('User not authenticated')) {
                    console.warn('User not authenticated, prompting login.');
                } else {
                    console.error('Auth error in saveCard:', authError);
                }
                throw new Error(`Auth Error: ${authError.message}`);
            }

            if (!user) {
                console.error('No user found in saveCard');
                throw new Error('User not authenticated');
            }

            const currentData = get().data;
            const currentCardId = get().currentCardId;

            // Ensure profile exists
            const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .select('id')
                .eq('id', user.id)
                .single();

            if (!profile) {
                const { error: createProfileError } = await supabase
                    .from('profiles')
                    .insert({
                        id: user.id,
                        full_name: currentData.personal.fullName || user.email?.split('@')[0] || 'User',
                        avatar_url: '',
                    });

                if (createProfileError) {
                    console.error('Error creating profile:', createProfileError);
                    throw new Error(`Failed to create profile: ${createProfileError.message}`);
                }
            }

            if (currentCardId) {
                const { error: updateError } = await supabase
                    .from('cards')
                    .update({
                        data: currentData,
                        updated_at: new Date().toISOString(),
                    })
                    .eq('id', currentCardId)
                    .eq('user_id', user.id); // Security check

                if (updateError) throw updateError;
            } else {
                const { data: newCard, error: insertError } = await supabase
                    .from('cards')
                    .insert({
                        user_id: user.id,
                        data: currentData,
                        slug: user.id.slice(0, 8) + '-' + Date.now().toString().slice(-4), // Ensure unique slug
                    })
                    .select('id')
                    .single();

                if (insertError) throw insertError;

                if (newCard) {
                    set({ currentCardId: newCard.id });
                }
            }

            set({ lastSaved: now });
        } catch (error) {
            const err = error as { message: string; details?: string; hint?: string };

            // Suppress console.error for expected auth errors
            if (err.message === 'User not authenticated' || err.message?.includes('Auth session missing') || err.message?.includes('Auth Error')) {
                console.warn('Save prevented: User not authenticated');
            } else {
                console.error('Error saving card (full):', error);
                console.error('Error message:', err.message);
                if (err.details) console.error('Error details:', err.details);
                if (err.hint) console.error('Error hint:', err.hint);
            }
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
                .select('data, id')
                .eq('id', id)
                .single();

            if (error) throw error;

            if (card) {
                set({ data: card.data as CardData, currentCardId: card.id });
            }
        } catch (error) {
            console.error('Error loading card:', error);
        }
    },
}));
