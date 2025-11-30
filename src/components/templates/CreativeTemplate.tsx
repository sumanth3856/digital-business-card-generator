/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { TemplateProps } from '@/types/card';
import { Mail, Phone, MapPin, Globe, Github, Linkedin, Twitter, Instagram, ArrowUpRight } from 'lucide-react';

const CreativeTemplate: React.FC<TemplateProps> = ({ data }) => {
    const { personal, socialLinks, theme } = data;

    const getIcon = (platform: string) => {
        switch (platform) {
            case 'github': return <Github size={20} />;
            case 'linkedin': return <Linkedin size={20} />;
            case 'twitter': return <Twitter size={20} />;
            case 'instagram': return <Instagram size={20} />;
            default: return <Globe size={20} />;
        }
    };

    return (
        <div
            className="w-full min-h-[600px] flex flex-col relative overflow-hidden"
            style={{ backgroundColor: theme.backgroundColor, color: theme.textColor }}
        >
            {/* Geometric Shapes */}
            <div
                className="absolute top-0 right-0 w-[80%] h-[60%] rounded-bl-[100px] z-0 opacity-10"
                style={{ backgroundColor: theme.primaryColor }}
            />
            <div
                className="absolute bottom-0 left-0 w-[60%] h-[40%] rounded-tr-[100px] z-0 opacity-10"
                style={{ backgroundColor: theme.secondaryColor }}
            />

            {/* Header / Avatar */}
            <div className="relative z-10 p-10 pb-0 flex flex-col items-start">
                <div className="w-32 h-32 mb-6 relative">
                    <div className="absolute inset-0 rounded-2xl rotate-6 opacity-50" style={{ backgroundColor: theme.secondaryColor }}></div>
                    <div className="absolute inset-0 rounded-2xl -rotate-3 opacity-50" style={{ backgroundColor: theme.primaryColor }}></div>
                    <div className="absolute inset-0 rounded-2xl overflow-hidden bg-gray-200 shadow-xl rotate-0">
                        {personal.avatarUrl ? (
                            <img src={personal.avatarUrl} alt={personal.fullName} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-gray-400">
                                {personal.fullName.charAt(0)}
                            </div>
                        )}
                    </div>
                </div>

                <h1 className="text-5xl font-black tracking-tighter mb-2 leading-[0.9]">
                    {personal.fullName.split(' ').map((word, i) => (
                        <span key={i} className="block">{word}</span>
                    ))}
                </h1>
                <div className="h-1 w-20 mt-4 mb-6" style={{ backgroundColor: theme.primaryColor }}></div>
                <p className="text-xl font-bold uppercase tracking-widest opacity-60">{personal.jobTitle}</p>
            </div>

            {/* Content */}
            <div className="relative z-10 p-10 pt-6 flex-grow flex flex-col justify-between">
                <p className="text-lg font-medium leading-relaxed max-w-sm mb-10">
                    {personal.about}
                </p>

                <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-4">
                        {personal.email && (
                            <div className="flex items-center gap-4 group">
                                <div className="p-2 rounded-lg bg-black/5 group-hover:bg-black/10 transition-colors">
                                    <Mail size={18} />
                                </div>
                                <span className="font-medium">{personal.email}</span>
                            </div>
                        )}
                        {personal.phone && (
                            <div className="flex items-center gap-4 group">
                                <div className="p-2 rounded-lg bg-black/5 group-hover:bg-black/10 transition-colors">
                                    <Phone size={18} />
                                </div>
                                <span className="font-medium">{personal.phone}</span>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-4 mt-4">
                        {socialLinks.map((link) => (
                            <a
                                key={link.id}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 rounded-full border-2 font-bold text-sm hover:bg-black/5 transition-colors"
                                style={{ borderColor: theme.textColor }}
                            >
                                {getIcon(link.platform)}
                                <span className="uppercase">{link.platform}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreativeTemplate;
