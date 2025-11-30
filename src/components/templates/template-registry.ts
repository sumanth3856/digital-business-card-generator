import { TemplateDefinition } from '@/types/card';
import CreativeTemplate from './CreativeTemplate';
import ExecutiveTemplate from './ExecutiveTemplate';
import MinimalistProTemplate from './MinimalistProTemplate';
import ArchitectTemplate from './ArchitectTemplate';
import VogueTemplate from './VogueTemplate';
import HorizonTemplate from './HorizonTemplate';
import BloomTemplate from './BloomTemplate';
import MidnightTemplate from './MidnightTemplate';
import SwissTemplate from './SwissTemplate';
import AbstractTemplate from './AbstractTemplate';
import TechTemplate from './TechTemplate';

export const templates: Record<string, TemplateDefinition> = {
    creative: {
        id: 'creative',
        name: 'Bold Creative',
        description: 'Artistic layout with bold typography and geometric shapes.',
        thumbnail: '/templates/creative.png', // Placeholder
        component: CreativeTemplate,
    },
    executive: {
        id: 'executive',
        name: 'Executive',
        description: 'High-end corporate design with serif typography.',
        thumbnail: '/templates/executive.png', // Placeholder
        component: ExecutiveTemplate,
    },
    minimalistPro: {
        id: 'minimalistPro',
        name: 'Minimalist Pro',
        description: 'Ultra-clean, whitespace-heavy design for professionals.',
        thumbnail: '/templates/minimalist-pro.png', // Placeholder
        component: MinimalistProTemplate,
    },
    architect: {
        id: 'architect',
        name: 'The Architect',
        description: 'Structured, grid-based layout with technical precision.',
        thumbnail: '/templates/architect.png', // Placeholder
        component: ArchitectTemplate,
    },
    vogue: {
        id: 'vogue',
        name: 'Vogue',
        description: 'Editorial fashion magazine style with large typography.',
        thumbnail: '/templates/vogue.png', // Placeholder
        component: VogueTemplate,
    },
    horizon: {
        id: 'horizon',
        name: 'Horizon',
        description: 'Modern split-screen layout with landscape focus.',
        thumbnail: '/templates/horizon.png', // Placeholder
        component: HorizonTemplate,
    },
    bloom: {
        id: 'bloom',
        name: 'Bloom',
        description: 'Soft, organic design with elegant curves and nature tones.',
        thumbnail: '/templates/bloom.png', // Placeholder
        component: BloomTemplate,
    },
    midnight: {
        id: 'midnight',
        name: 'Midnight',
        description: 'Premium dark mode with glowing accents.',
        thumbnail: '/templates/midnight.png', // Placeholder
        component: MidnightTemplate,
    },
    swiss: {
        id: 'swiss',
        name: 'Swiss Style',
        description: 'International typographic style with strong grids.',
        thumbnail: '/templates/swiss.png', // Placeholder
        component: SwissTemplate,
    },
    abstract: {
        id: 'abstract',
        name: 'Abstract',
        description: 'Artistic background patterns and creative layout.',
        thumbnail: '/templates/abstract.png', // Placeholder
        component: AbstractTemplate,
    },
    tech: {
        id: 'tech',
        name: 'Dev Terminal',
        description: 'Clean, modern tech aesthetic with monospaced details.',
        thumbnail: '/templates/tech.png', // Placeholder
        component: TechTemplate,
    },
};

export const getTemplate = (id: string) => templates[id] || templates.creative;
