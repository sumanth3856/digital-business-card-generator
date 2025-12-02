import React from 'react';
import { Github, Linkedin, Twitter, Instagram, Globe, Mail, Phone, MapPin, Briefcase, Terminal, Cpu, Code, Sparkles } from 'lucide-react';

interface SocialIconProps {
    platform: string;
    size?: number;
    className?: string;
}

export const SocialIcon: React.FC<SocialIconProps> = ({ platform, size = 18, className }) => {
    switch (platform.toLowerCase()) {
        case 'github': return <Github size={size} className={className} />;
        case 'linkedin': return <Linkedin size={size} className={className} />;
        case 'twitter': return <Twitter size={size} className={className} />;
        case 'instagram': return <Instagram size={size} className={className} />;
        case 'email': return <Mail size={size} className={className} />;
        case 'phone': return <Phone size={size} className={className} />;
        case 'website': return <Globe size={size} className={className} />;
        default: return <Globe size={size} className={className} />;
    }
};
