import { TemplateDefinition } from '@/types/card';
import NeoMinimalistTemplate from './NeoMinimalistTemplate';
import CorporateEliteTemplate from './CorporateEliteTemplate';
import ArtisticSoulTemplate from './ArtisticSoulTemplate';
import CyberFutureTemplate from './CyberFutureTemplate';

export const templates: Record<string, TemplateDefinition> = {
    neoMinimalist: {
        id: 'neoMinimalist',
        name: 'Neo Minimalist',
        description: 'Ultra-clean, Swiss-style design with bold typography.',
        thumbnail: '/templates/minimalist-pro.png', // Reusing placeholder for now
        category: 'Minimalist',
        component: NeoMinimalistTemplate,
    },
    corporateElite: {
        id: 'corporateElite',
        name: 'Corporate Elite',
        description: 'Professional, trustworthy design with structured layout.',
        thumbnail: '/templates/executive.png', // Reusing placeholder for now
        category: 'Professional',
        component: CorporateEliteTemplate,
    },
    artisticSoul: {
        id: 'artisticSoul',
        name: 'Artistic Soul',
        description: 'Creative, abstract design with fluid gradients.',
        thumbnail: '/templates/creative.png', // Reusing placeholder for now
        category: 'Creative',
        component: ArtisticSoulTemplate,
    },
    cyberFuture: {
        id: 'cyberFuture',
        name: 'Cyber Future',
        description: 'Modern tech aesthetic with glassmorphism and neon.',
        thumbnail: '/templates/tech.png', // Reusing placeholder for now
        category: 'Tech',
        component: CyberFutureTemplate,
    },
};

export const getTemplate = (id: string) => templates[id] || templates.neoMinimalist;
