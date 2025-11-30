/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { TemplateProps } from '@/types/card';
import { Mail, Phone, MapPin, Globe, Github, Linkedin, Twitter, Instagram } from 'lucide-react';

const ArchitectTemplate: React.FC<TemplateProps> = ({ data }) => {
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
        <div className="w-full min-h-[600px] bg-[#F5F5F0] p-8 flex flex-col relative overflow-hidden font-mono">
            {/* Grid Lines */}
            <div className="absolute inset-0 pointer-events-none opacity-10"
                style={{
                    backgroundImage: `linear-gradient(${theme.textColor} 1px, transparent 1px), linear-gradient(90deg, ${theme.textColor} 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}>
            </div>

            <div className="relative z-10 border-2 border-black h-full flex flex-col p-6 bg-white/50 backdrop-blur-sm">
                <div className="flex justify-between items-start mb-10 border-b-2 border-black pb-6">
                    <div>
                        <h1 className="text-3xl font-bold uppercase tracking-tighter mb-1">{personal.fullName}</h1>
                        <div className="inline-block px-2 py-1 bg-black text-white text-xs font-bold uppercase tracking-widest">
                            {personal.jobTitle}
                        </div>
                    </div>
                    {personal.avatarUrl && (
                        <div className="w-20 h-20 border-2 border-black p-1">
                            <img src={personal.avatarUrl} alt={personal.fullName} className="w-full h-full object-cover grayscale" />
                        </div>
                    )}
                </div>

                <div className="flex-grow grid grid-cols-1 gap-8 content-start">
                    <div className="space-y-2">
                        <h3 className="text-xs font-bold uppercase text-gray-500 tracking-widest">Profile</h3>
                        <p className="text-sm leading-relaxed border-l-2 border-black pl-4">
                            {personal.about}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-xs font-bold uppercase text-gray-500 tracking-widest">Contact</h3>
                        <div className="grid grid-cols-1 gap-2 text-sm">
                            {personal.email && (
                                <div className="flex items-center gap-3">
                                    <div className="w-4 h-4 bg-black text-white flex items-center justify-center text-[10px]">@</div>
                                    <span>{personal.email}</span>
                                </div>
                            )}
                            {personal.phone && (
                                <div className="flex items-center gap-3">
                                    <div className="w-4 h-4 bg-black text-white flex items-center justify-center text-[10px]">{`#`}</div>
                                    <span>{personal.phone}</span>
                                </div>
                            )}
                            {personal.location && (
                                <div className="flex items-center gap-3">
                                    <div className="w-4 h-4 bg-black text-white flex items-center justify-center text-[10px]">L</div>
                                    <span>{personal.location}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t-2 border-black flex justify-between items-center">
                    <div className="flex gap-4">
                        {socialLinks.map((link) => (
                            <a
                                key={link.id}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-gray-600 transition-colors"
                            >
                                {getIcon(link.platform)}
                            </a>
                        ))}
                    </div>
                    <div className="text-[10px] uppercase tracking-widest opacity-50">
                        REF: {new Date().getFullYear()}-001
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArchitectTemplate;
