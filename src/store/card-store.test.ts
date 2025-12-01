import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useCardStore } from './card-store';

// Mock Supabase client
const mockSupabase = {
    auth: {
        getUser: vi.fn(),
        getSession: vi.fn(),
    },
    from: vi.fn(() => ({
        select: vi.fn(() => ({
            eq: vi.fn(() => ({
                single: vi.fn(),
            })),
        })),
        insert: vi.fn(),
        update: vi.fn(() => ({
            eq: vi.fn(),
        })),
    })),
};

vi.mock('@/lib/supabase/client', () => ({
    createClient: () => mockSupabase,
}));

describe('Card Store', () => {
    beforeEach(() => {
        useCardStore.setState({
            data: {
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
                    primaryColor: '#2563eb',
                    secondaryColor: '#4f46e5',
                    backgroundColor: '#ffffff',
                    textColor: '#0f172a',
                    fontPair: 'sans',
                },
                templateId: 'modern',
            },
            isSaving: false,
            lastSaved: 0,
        });
        vi.clearAllMocks();
    });

    it('should update personal information', () => {
        const { updatePersonal } = useCardStore.getState();
        updatePersonal('fullName', 'John Doe');
        expect(useCardStore.getState().data.personal.fullName).toBe('John Doe');
    });

    it('should add a social link', () => {
        const { addSocialLink } = useCardStore.getState();
        const link = { id: '1', platform: 'twitter', url: 'https://twitter.com/johndoe' };
        addSocialLink(link);
        expect(useCardStore.getState().data.socialLinks).toHaveLength(1);
        expect(useCardStore.getState().data.socialLinks[0]).toEqual(link);
    });

    it('should remove a social link', () => {
        const { addSocialLink, removeSocialLink } = useCardStore.getState();
        const link = { id: '1', platform: 'twitter', url: 'https://twitter.com/johndoe' };
        addSocialLink(link);
        removeSocialLink('1');
        expect(useCardStore.getState().data.socialLinks).toHaveLength(0);
    });

    it('should update theme', () => {
        const { updateTheme } = useCardStore.getState();
        updateTheme('primaryColor', '#000000');
        expect(useCardStore.getState().data.theme.primaryColor).toBe('#000000');
    });

    it('should set template', () => {
        const { setTemplate } = useCardStore.getState();
        setTemplate('creative');
        expect(useCardStore.getState().data.templateId).toBe('creative');
    });
});
