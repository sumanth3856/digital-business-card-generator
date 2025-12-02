import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ensureProtocol } from '@/utils/url';
import { SocialLinks } from './SocialLinks';
import { ContactDetails } from './ContactDetails';
import { SocialLink } from '@/types/card';

describe('Utility: ensureProtocol', () => {
    it('should prepend https:// to domain-only URLs', () => {
        expect(ensureProtocol('example.com')).toBe('https://example.com');
        expect(ensureProtocol('www.example.com')).toBe('https://www.example.com');
    });

    it('should not modify URLs with http:// or https://', () => {
        expect(ensureProtocol('http://example.com')).toBe('http://example.com');
        expect(ensureProtocol('https://example.com')).toBe('https://example.com');
    });

    it('should not modify mailto: or tel: links', () => {
        expect(ensureProtocol('mailto:test@example.com')).toBe('mailto:test@example.com');
        expect(ensureProtocol('tel:1234567890')).toBe('tel:1234567890');
    });
});

describe('Component: SocialLinks', () => {
    const mockLinks: SocialLink[] = [
        { id: '1', platform: 'github', url: 'github.com/user' },
        { id: '2', platform: 'twitter', url: 'https://twitter.com/user' },
    ];

    it('should render correct number of links', () => {
        render(<SocialLinks links={mockLinks} />);
        const links = screen.getAllByRole('link');
        expect(links).toHaveLength(2);
    });

    it('should ensure protocol on rendered links', () => {
        render(<SocialLinks links={mockLinks} />);
        const links = screen.getAllByRole('link');
        expect(links[0]).toHaveAttribute('href', 'https://github.com/user');
        expect(links[1]).toHaveAttribute('href', 'https://twitter.com/user');
    });
});

describe('Component: ContactDetails', () => {
    it('should render email with mailto:', () => {
        render(<ContactDetails email="test@example.com" />);
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', 'mailto:test@example.com');
        expect(link).toHaveTextContent('test@example.com');
    });

    it('should render phone with tel:', () => {
        render(<ContactDetails phone="1234567890" />);
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', 'tel:1234567890');
        expect(link).toHaveTextContent('1234567890');
    });

    it('should render website with https://', () => {
        render(<ContactDetails website="example.com" />);
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', 'https://example.com');
    });
});
