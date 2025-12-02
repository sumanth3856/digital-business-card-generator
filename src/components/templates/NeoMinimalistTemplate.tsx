/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { TemplateProps } from '@/types/card';
import { Mail, Phone, MapPin, Globe, Github, Linkedin, Twitter, Instagram, ArrowUpRight } from 'lucide-react';

const NeoMinimalistTemplate: React.FC<TemplateProps> = ({ data }) => {
    const { personal, socialLinks, theme } = data;
    const primaryColor = theme.primaryColor || '#000000';

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
        <div className="w-full min-h-[600px] bg-white text-black p-8 md:p-12 flex flex-col relative overflow-hidden font-sans">
            {/* Decorative Grid Lines */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-12 bottom-0 w-px bg-neutral-100"></div>
                <div className="absolute top-0 right-12 bottom-0 w-px bg-neutral-100"></div>
                <div className="absolute top-12 left-0 right-0 h-px bg-neutral-100"></div>
                <div className="absolute bottom-12 left-0 right-0 h-px bg-neutral-100"></div>
            </div>

            {/* Header / Name */}
            <div className="relative z-10 mb-12">
                <h1 className="text-6xl md:text-7xl font-bold tracking-tighter leading-none mb-4" style={{ color: primaryColor }}>
                    {personal.fullName.split(' ').map((name, i) => (
                        <span key={i} className="block">{name}</span>
                    ))}
                </h1>
                <div className="flex items-center gap-4">
                    <div className="h-px w-12 bg-black"></div>
                    <p className="text-xl font-medium tracking-wide uppercase text-neutral-500">
                        {personal.jobTitle}
                    </p>
                </div>
            </div>

            {/* Content Grid */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 flex-grow">
                {/* Left Column: Contact */}
                <div className="md:col-span-5 space-y-6">
                    <div className="space-y-4">
                        {personal.email && (
                            <a href={`mailto:${personal.email}`} className="flex items-center gap-3 group">
                                <div className="w-8 h-8 flex items-center justify-center border border-neutral-200 rounded-full group-hover:bg-black group-hover:text-white transition-colors">
                                    <Mail size={14} />
                                </div>
                                <span className="text-sm font-medium">{personal.email}</span>
                            </a>
                        )}
                        {personal.phone && (
                            <a href={`tel:${personal.phone}`} className="flex items-center gap-3 group">
                                <div className="w-8 h-8 flex items-center justify-center border border-neutral-200 rounded-full group-hover:bg-black group-hover:text-white transition-colors">
                                    <Phone size={14} />
                                </div>
                                <span className="text-sm font-medium">{personal.phone}</span>
                            </a>
                        )}
                        {personal.location && (
                            <div className="flex items-center gap-3 group">
                                <div className="w-8 h-8 flex items-center justify-center border border-neutral-200 rounded-full group-hover:bg-black group-hover:text-white transition-colors">
                                    <MapPin size={14} />
                                </div>
                                <span className="text-sm font-medium">{personal.location}</span>
                            </div>
                        )}
                        {personal.website && (
                            <a href={personal.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                                <div className="w-8 h-8 flex items-center justify-center border border-neutral-200 rounded-full group-hover:bg-black group-hover:text-white transition-colors">
                                    <Globe size={14} />
                                </div>
                                <span className="text-sm font-medium">{personal.website.replace(/^https?:\/\//, '')}</span>
                            </a>
                        )}
                    </div>
                </div>

                {/* Middle Column: About */}
                <div className="md:col-span-7 flex flex-col justify-between">
                    <div className="mb-8">
                        <p className="text-lg leading-relaxed text-neutral-800 font-light">
                            {personal.about || "Passionate about creating meaningful digital experiences through minimalist design and clean code."}
                        </p>
                    </div>

                    {/* Social Links */}
                    <div className="flex flex-wrap gap-3">
                        {socialLinks.map((link) => (
                            <a
                                key={link.id}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-neutral-50 hover:bg-black hover:text-white transition-colors rounded-full text-sm font-medium group"
                            >
                                {getIcon(link.platform)}
                                <span className="capitalize">{link.platform}</span>
                                <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer / Avatar */}
            <div className="relative z-10 mt-12 pt-8 border-t border-neutral-100 flex justify-between items-end">
                <div className="text-xs text-neutral-400 uppercase tracking-widest">
                    © {new Date().getFullYear()} {personal.company || 'Portfolio'}
                </div>
                {personal.avatarUrl && (
                    <div className="w-24 h-24 grayscale hover:grayscale-0 transition-all duration-500">
                        <img
                            src={personal.avatarUrl}
                            alt={personal.fullName}
                            className="w-full h-full object-cover rounded-full"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default NeoMinimalistTemplate;
