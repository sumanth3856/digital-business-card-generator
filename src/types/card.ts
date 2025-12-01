export interface SocialLink {
    id: string;
    platform: 'linkedin' | 'twitter' | 'github' | 'instagram' | 'website' | 'email' | 'other';
    url: string;
    label?: string;
}

export interface CardData {
    personal: {
        fullName: string;
        jobTitle: string;
        tagline: string;
        about: string;
        email: string;
        phone: string;
        location: string;
        company?: string;
        website?: string;
        avatarUrl?: string;
    };
    socialLinks: SocialLink[];
    theme: {
        primaryColor: string;
        secondaryColor: string;
        backgroundColor: string;
        textColor: string;
        fontPair: string;
    };
    templateId: string;
}

export interface TemplateProps {
    data: CardData;
}

export interface TemplateDefinition {
    id: string;
    name: string;
    description: string;
    thumbnail: string;
    category: 'simple' | 'professional' | 'creative' | 'tech';
    component: React.FC<TemplateProps>;
}
