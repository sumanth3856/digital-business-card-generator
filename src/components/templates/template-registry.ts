import { TemplateDefinition } from '@/types/card';
import NeoMinimalistTemplate from './NeoMinimalistTemplate';
import CorporateEliteTemplate from './CorporateEliteTemplate';
import ArtisticSoulTemplate from './ArtisticSoulTemplate';
import CyberFutureTemplate from './CyberFutureTemplate';
import GlassMorphismTemplate from './GlassMorphismTemplate';
import SwissDesignTemplate from './SwissDesignTemplate';
import DarkElegantTemplate from './DarkElegantTemplate';
import VibrantGradientTemplate from './VibrantGradientTemplate';
import RetroPopTemplate from './RetroPopTemplate';
import GeometricShapesTemplate from './GeometricShapesTemplate';
import NeonNightsTemplate from './NeonNightsTemplate';
import MinimalTypeTemplate from './MinimalTypeTemplate';
import AbstractArtTemplate from './AbstractArtTemplate';
import NatureZenTemplate from './NatureZenTemplate';

export const templates: Record<string, TemplateDefinition> = {
    // Original Templates
    neoMinimalist: {
        id: 'neoMinimalist',
        name: 'Neo Minimalist',
        description: 'Ultra-clean, Swiss-style design with bold typography.',
        thumbnail: '/templates/minimalist-pro.png',
        category: 'Minimalist',
        component: NeoMinimalistTemplate,
    },
    corporateElite: {
        id: 'corporateElite',
        name: 'Corporate Elite',
        description: 'Professional, trustworthy design with structured layout.',
        thumbnail: '/templates/executive.png',
        category: 'Professional',
        component: CorporateEliteTemplate,
    },
    artisticSoul: {
        id: 'artisticSoul',
        name: 'Artistic Soul',
        description: 'Creative, abstract design with fluid gradients.',
        thumbnail: '/templates/creative.png',
        category: 'Creative',
        component: ArtisticSoulTemplate,
    },
    cyberFuture: {
        id: 'cyberFuture',
        name: 'Cyber Future',
        description: 'Modern tech aesthetic with glassmorphism and neon.',
        thumbnail: '/templates/tech.png',
        category: 'Tech',
        component: CyberFutureTemplate,
    },

    // New Professional & Minimal
    glassMorphism: {
        id: 'glassMorphism',
        name: 'Glass Morphism',
        description: 'Modern frosted glass effect with soft blurs.',
        thumbnail: '/templates/minimalist-pro.png',
        category: 'Professional',
        component: GlassMorphismTemplate,
    },
    swissDesign: {
        id: 'swissDesign',
        name: 'Swiss Design',
        description: 'Bold typography and grid-based layout.',
        thumbnail: '/templates/minimalist-pro.png',
        category: 'Minimalist',
        component: SwissDesignTemplate,
    },
    darkElegant: {
        id: 'darkElegant',
        name: 'Dark Elegant',
        description: 'Luxury dark theme with gold accents.',
        thumbnail: '/templates/executive.png',
        category: 'Professional',
        component: DarkElegantTemplate,
    },

    // New Creative & Colorful
    vibrantGradient: {
        id: 'vibrantGradient',
        name: 'Vibrant Gradient',
        description: 'Energetic and colorful moving gradients.',
        thumbnail: '/templates/creative.png',
        category: 'Creative',
        component: VibrantGradientTemplate,
    },
    retroPop: {
        id: 'retroPop',
        name: 'Retro Pop',
        description: 'Playful 90s vibe with bold shapes.',
        thumbnail: '/templates/creative.png',
        category: 'Creative',
        component: RetroPopTemplate,
    },
    geometricShapes: {
        id: 'geometricShapes',
        name: 'Geometric Shapes',
        description: 'Clean lines and abstract geometric patterns.',
        thumbnail: '/templates/creative.png',
        category: 'Creative',
        component: GeometricShapesTemplate,
    },

    // New Modern & Tech
    neonNights: {
        id: 'neonNights',
        name: 'Neon Nights',
        description: 'Dark mode with glowing neon borders.',
        thumbnail: '/templates/tech.png',
        category: 'Tech',
        component: NeonNightsTemplate,
    },
    minimalType: {
        id: 'minimalType',
        name: 'Minimal Type',
        description: 'Focus purely on typography and whitespace.',
        thumbnail: '/templates/minimalist-pro.png',
        category: 'Minimalist',
        component: MinimalTypeTemplate,
    },
    abstractArt: {
        id: 'abstractArt',
        name: 'Abstract Art',
        description: 'Artistic blobs and creative layout.',
        thumbnail: '/templates/creative.png',
        category: 'Creative',
        component: AbstractArtTemplate,
    },
    natureZen: {
        id: 'natureZen',
        name: 'Nature Zen',
        description: 'Organic colors and soft curves.',
        thumbnail: '/templates/minimalist-pro.png',
        category: 'Minimalist',
        component: NatureZenTemplate,
    },
};

export const getTemplate = (id: string) => templates[id] || templates.neoMinimalist;
