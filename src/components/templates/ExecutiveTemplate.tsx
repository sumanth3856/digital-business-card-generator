/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { TemplateProps } from '@/types/card';
import { Mail, Phone, MapPin, Globe, Github, Linkedin, Twitter, Instagram } from 'lucide-react';

const ExecutiveTemplate: React.FC<TemplateProps> = ({ data }) => {
    const { personal, socialLinks, theme } = data;

    const getIcon = (platform: string) => {
        switch (platform) {
            case 'github': return <Github size={18} />;
            case 'linkedin': return <Linkedin size={18} />;
            case 'twitter': return <Twitter size={18} />;
            case 'instagram': return <Instagram size={18} />;
            default: return <Globe size={18} />;
        }
    };

    return (
        <div
            className="w-full min-h-[600px] flex flex-col relative bg-slate-50"
            style={{ color: theme.textColor }}
        >
            {/* Header Strip */}
            <div className="h-4 w-full" style={{ backgroundColor: theme.primaryColor }}></div>

            <div className="p-12 flex-grow flex flex-col items-center text-center">
                {/* Avatar */}
                <div className="w-32 h-32 mb-8 relative">
                    <div className="absolute inset-0 border-2 rotate-45" style={{ borderColor: theme.secondaryColor }}></div>
                    <div className="absolute inset-0 border-2 -rotate-12" style={{ borderColor: theme.primaryColor }}></div>
                    <div className="absolute inset-2 overflow-hidden bg-gray-200 shadow-lg">
                        {personal.avatarUrl ? (
                            <img src={personal.avatarUrl} alt={personal.fullName} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-4xl font-serif text-gray-400">
                                {personal.fullName.charAt(0)}
                            </div>
                        )}
                    </div>
                </div>

                {/* Name & Title */}
                <h1 className="text-4xl font-serif font-bold mb-2 tracking-wide text-slate-900">
                    {personal.fullName}
                </h1>
                <p className="text-sm font-bold uppercase tracking-[0.2em] mb-8" style={{ color: theme.primaryColor }}>
                    {personal.jobTitle}
                </p>

                {/* Divider */}
                <div className="w-16 h-[1px] bg-slate-300 mb-8"></div>

                {/* About */}
                <p className="text-slate-600 leading-loose max-w-md mb-10 font-light italic">
                    &ldquo;{personal.about}&rdquo;
                </p>

                {/* Contact Grid */}
                <div className="grid grid-cols-1 gap-4 w-full max-w-xs mb-10">
                    {personal.email && (
                        <div className="flex items-center justify-center gap-3 text-sm text-slate-600">
                            <Mail size={14} style={{ color: theme.secondaryColor }} />
                            <span>{personal.email}</span>
                        </div>
                    )}
                    {personal.phone && (
                        <div className="flex items-center justify-center gap-3 text-sm text-slate-600">
                            <Phone size={14} style={{ color: theme.secondaryColor }} />
                            <span>{personal.phone}</span>
                        </div>
                    )}
                    {personal.location && (
                        <div className="flex items-center justify-center gap-3 text-sm text-slate-600">
                            <MapPin size={14} style={{ color: theme.secondaryColor }} />
                            <span>{personal.location}</span>
                        </div>
                    )}
                </div>

                {/* Socials */}
                <div className="flex gap-4 mt-auto">
                    {socialLinks.map((link) => (
                        <a
                            key={link.id}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 border border-slate-200 hover:border-slate-400 hover:bg-slate-100 transition-all text-slate-600"
                        >
                            {getIcon(link.platform)}
                        </a>
                    ))}
                </div>
            </div>

            {/* Footer Strip */}
            <div className="h-2 w-full" style={{ backgroundColor: theme.secondaryColor }}></div>
        </div>
    );
};

export default ExecutiveTemplate;
