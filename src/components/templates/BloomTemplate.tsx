/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { TemplateProps } from '@/types/card';
import { Mail, Phone, MapPin, Globe, Github, Linkedin, Twitter, Instagram } from 'lucide-react';

const BloomTemplate: React.FC<TemplateProps> = ({ data }) => {
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
        <div className="w-full min-h-[600px] bg-[#FFFBF7] p-8 flex flex-col items-center relative overflow-hidden">
            {/* Organic Shapes */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-[#F2E8DE] rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 opacity-70"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#E6D5C3] rounded-full blur-3xl translate-x-1/3 translate-y-1/3 opacity-60"></div>

            <div className="relative z-10 w-full max-w-sm flex flex-col items-center text-center">
                <div className="mb-8 p-2 rounded-full border border-[#D4C5B5] relative">
                    <div className="w-32 h-32 rounded-full overflow-hidden">
                        {personal.avatarUrl ? (
                            <img src={personal.avatarUrl} alt={personal.fullName} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-[#EAE0D5] text-[#8C7B6C] text-4xl font-serif">
                                {personal.fullName.charAt(0)}
                            </div>
                        )}
                    </div>
                </div>

                <h1 className="text-3xl font-serif text-[#4A4036] mb-2">{personal.fullName}</h1>
                <div className="flex flex-col items-center gap-1 mb-8">
                    <p className="text-sm uppercase tracking-widest text-[#8C7B6C] font-medium">{personal.jobTitle}</p>
                    {personal.company && (
                        <p className="text-xs font-serif italic text-[#8C7B6C]">@ {personal.company}</p>
                    )}
                </div>

                <div className="w-12 h-[2px] bg-[#D4C5B5] mb-8"></div>

                <p className="text-[#6B5D52] leading-relaxed mb-10 font-light">
                    {personal.tagline || personal.about}
                </p>

                <div className="w-full space-y-4 mb-10">
                    {personal.email && (
                        <div className="flex items-center justify-center gap-3 text-[#6B5D52] hover:text-[#4A4036] transition-colors">
                            <Mail size={16} />
                            <span className="text-sm">{personal.email}</span>
                        </div>
                    )}
                    {personal.phone && (
                        <div className="flex items-center justify-center gap-3 text-[#6B5D52] hover:text-[#4A4036] transition-colors">
                            <Phone size={16} />
                            <span className="text-sm">{personal.phone}</span>
                        </div>
                    )}
                    {personal.location && (
                        <div className="flex items-center justify-center gap-3 text-[#6B5D52] hover:text-[#4A4036] transition-colors">
                            <MapPin size={16} />
                            <span className="text-sm">{personal.location}</span>
                        </div>
                    )}
                </div>

                <div className="flex gap-6">
                    {socialLinks.map((link) => (
                        <a
                            key={link.id}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#8C7B6C] hover:text-[#4A4036] hover:scale-110 transition-all"
                        >
                            {getIcon(link.platform)}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BloomTemplate;
