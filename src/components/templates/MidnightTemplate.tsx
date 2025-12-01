/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { TemplateProps } from '@/types/card';
import { Mail, Phone, MapPin, Globe, Github, Linkedin, Twitter, Instagram, ExternalLink } from 'lucide-react';

const MidnightTemplate: React.FC<TemplateProps> = ({ data }) => {
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
        <div className="w-full min-h-[600px] bg-[#050505] text-white p-8 flex flex-col relative overflow-hidden">
            {/* Glow Effects */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-900/20 rounded-full blur-[80px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-900/20 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-5 mb-12">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-white/10 shadow-2xl shadow-blue-500/10">
                        {personal.avatarUrl ? (
                            <img src={personal.avatarUrl} alt={personal.fullName} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-white/5 text-white/50 font-bold text-xl">
                                {personal.fullName.charAt(0)}
                            </div>
                        )}
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                            {personal.fullName}
                        </h1>
                        <div className="flex flex-col gap-0.5">
                            <p className="text-sm text-blue-400 font-medium">{personal.jobTitle}</p>
                            {personal.company && (
                                <p className="text-xs text-blue-400/60">@ {personal.company}</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-8 flex-grow">
                    <div className="p-6 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-sm">
                        <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">About</h3>
                        <p className="text-white/80 leading-relaxed font-light text-sm">
                            {personal.tagline || personal.about}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                        {personal.email && (
                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/5 transition-colors group">
                                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 group-hover:text-blue-300 transition-colors">
                                    <Mail size={16} />
                                </div>
                                <span className="text-sm text-white/90">{personal.email}</span>
                            </div>
                        )}
                        {personal.phone && (
                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/5 transition-colors group">
                                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 group-hover:text-purple-300 transition-colors">
                                    <Phone size={16} />
                                </div>
                                <span className="text-sm text-white/90">{personal.phone}</span>
                            </div>
                        )}
                        {personal.location && (
                            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/5 transition-colors group">
                                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:text-emerald-300 transition-colors">
                                    <MapPin size={16} />
                                </div>
                                <span className="text-sm text-white/90">{personal.location}</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5">
                    <div className="flex flex-wrap gap-3">
                        {socialLinks.map((link) => (
                            <a
                                key={link.id}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-xs font-medium text-white/80 hover:text-white"
                            >
                                {getIcon(link.platform)}
                                <span className="capitalize">{link.platform}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MidnightTemplate;
