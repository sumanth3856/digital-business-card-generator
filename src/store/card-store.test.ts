import { describe, it, expect, beforeEach } from 'vitest';
import { useCardStore } from './card-store';

describe('useCardStore', () => {
    beforeEach(() => {
        useCardStore.setState({
            data: {
                templateId: 'modern',
                personal: {
                    fullName: '',
                    jobTitle: '',
                    tagline: '',
                    email: '',
                    phone: '',
                    location: '',
                    about: '',
                    company: '',
                    website: '',
                },
                socialLinks: [],
                theme: {
                    primaryColor: '#000000',
                    secondaryColor: '#ffffff',
                    backgroundColor: '#ffffff',
                    textColor: '#000000',
                    fontPair: 'sans',
                },
            },
            isSaving: false,
            lastSaved: 0,
        });
    });

    it('should update personal info', () => {
        const { updatePersonal } = useCardStore.getState();

        updatePersonal('fullName', 'John Doe');

        expect(useCardStore.getState().data.personal.fullName).toBe('John Doe');
    });

    it('should update theme', () => {
        const { updateTheme } = useCardStore.getState();

        updateTheme('primaryColor', '#ff0000');

        expect(useCardStore.getState().data.theme.primaryColor).toBe('#ff0000');
    });

    it('should set template', () => {
        const { setTemplate } = useCardStore.getState();

        setTemplate('minimal');

        expect(useCardStore.getState().data.templateId).toBe('minimal');
    });

    it('should add social link', () => {
        const { addSocialLink } = useCardStore.getState();
        const newLink = { id: '1', platform: 'twitter' as const, url: 'https://twitter.com' };

        addSocialLink(newLink);

        expect(useCardStore.getState().data.socialLinks).toHaveLength(1);
        expect(useCardStore.getState().data.socialLinks[0]).toEqual(newLink);
    });

    it('should remove social link', () => {
        const { addSocialLink, removeSocialLink } = useCardStore.getState();
        const newLink = { id: '1', platform: 'twitter' as const, url: 'https://twitter.com' };

        addSocialLink(newLink);
        removeSocialLink('1');

        expect(useCardStore.getState().data.socialLinks).toHaveLength(0);
    });

    it('should respect rate limiting on save', async () => {
        const { saveCard } = useCardStore.getState();

        // Mock Date.now
        const realDateNow = Date.now;
        const mockNow = 10000;
        global.Date.now = () => mockNow;

        // Manually set lastSaved to simulate a recent save
        useCardStore.setState({ lastSaved: mockNow });

        // Advance time only by 1s (less than 2s cooldown)
        global.Date.now = () => mockNow + 1000;

        await expect(saveCard()).rejects.toThrow('Please wait a moment before saving again.');

        // Restore Date.now
        global.Date.now = realDateNow;
    });
});
