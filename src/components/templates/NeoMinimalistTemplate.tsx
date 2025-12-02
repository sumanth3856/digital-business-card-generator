/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { TemplateProps } from '@/types/card';
import { Mail, Phone, MapPin, Globe, ArrowUpRight } from 'lucide-react';
import { ensureProtocol } from '@/utils/url';
import { SocialLinks } from './shared/SocialLinks';

const NeoMinimalistTemplate: React.FC<TemplateProps> = ({ data }) => {
    const { personal, socialLinks, theme } = data;
    const primaryColor = theme.primaryColor || '#000000';



    return (
        <div className="w-full aspect-[1.75/1] bg-white text-black p-5 md:p-6 flex flex-col relative overflow-hidden font-sans shadow-2xl rounded-xl">
            {/* Decorative Grid Lines */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-6 bottom-0 w-px bg-neutral-100"></div>
                <div className="absolute top-0 right-6 bottom-0 w-px bg-neutral-100"></div>
                <div className="absolute top-6 left-0 right-0 h-px bg-neutral-100"></div>
                <div className="absolute bottom-6 left-0 right-0 h-px bg-neutral-100"></div>
            </div>

            {/* Header / Name */}
            <div className="relative z-10 mb-4 md:mb-5 shrink-0">
                <h1 className="text-2xl md:text-4xl font-bold tracking-tighter leading-none mb-1.5 break-words" style={{ color: primaryColor }}>
                    {personal.fullName}
                </h1>
                <div className="flex items-center gap-3">
                    <div className="h-px w-6 bg-black"></div>
                    <p className="text-xs md:text-sm font-medium tracking-wide uppercase text-neutral-500 truncate">
                        {personal.jobTitle}
                    </p>
                </div>
            </div>

            {/* Content Grid */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 flex-grow min-h-0">
                {/* Left Column: Contact */}
                <div className="md:col-span-5 space-y-1.5 md:space-y-2.5 overflow-y-auto pr-1 scrollbar-hide">
                    <div className="space-y-1.5 md:space-y-2">
                        {personal.email && (
                            <a href={`mailto:${personal.email}`} className="flex items-center gap-2 group">
                                <div className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 flex items-center justify-center border border-neutral-200 rounded-full group-hover:bg-black group-hover:text-white transition-colors">
                                    <Mail size={10} className="md:w-[12px] md:h-[12px]" />
                                </div>
                                <span className="text-[10px] md:text-xs font-medium break-all">{personal.email}</span>
                            </a>
                        )}
                        {personal.phone && (
                            <a href={`tel:${personal.phone}`} className="flex items-center gap-2 group">
                                <div className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 flex items-center justify-center border border-neutral-200 rounded-full group-hover:bg-black group-hover:text-white transition-colors">
                                    <Phone size={10} className="md:w-[12px] md:h-[12px]" />
                                </div>
                                <span className="text-[10px] md:text-xs font-medium break-all">{personal.phone}</span>
                            </a>
                        )}
                        {personal.location && (
                            <div className="flex items-center gap-2 group">
                                <div className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 flex items-center justify-center border border-neutral-200 rounded-full group-hover:bg-black group-hover:text-white transition-colors">
                                    <MapPin size={10} className="md:w-[12px] md:h-[12px]" />
                                </div>
                                <span className="text-[10px] md:text-xs font-medium break-words">{personal.location}</span>
                            </div>
                        )}
                        {personal.website && (
                            <a href={ensureProtocol(personal.website)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group">
                                <div className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 flex items-center justify-center border border-neutral-200 rounded-full group-hover:bg-black group-hover:text-white transition-colors">
                                    <Globe size={10} className="md:w-[12px] md:h-[12px]" />
                                </div>
                                <span className="text-[10px] md:text-xs font-medium break-all">{personal.website.replace(/^https?:\/\//, '')}</span>
                            </a>
                        )}
                    </div>
                </div>

                {/* Middle Column: About */}
                <div className="md:col-span-7 flex flex-col justify-between min-h-0">
                    <div className="mb-2 overflow-y-auto pr-1 scrollbar-hide max-h-[80px] md:max-h-[100px]">
                        <p className="text-[10px] md:text-xs leading-relaxed text-neutral-800 font-light">
                            {personal.about || "Passionate about creating meaningful digital experiences through minimalist design and clean code."}
                        </p>
                    </div>

                    {/* Social Links */}
                    {/* Social Links */}
                    <SocialLinks
                        links={socialLinks}
                        className="flex flex-wrap gap-1.5 mt-auto"
                        renderItem={(link, url, icon) => (
                            <a
                                key={link.id}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 px-2 py-1 bg-neutral-50 hover:bg-black hover:text-white transition-colors rounded-full text-[10px] font-medium group"
                            >
                                {icon}
                                <span className="capitalize hidden sm:inline">{link.platform}</span>
                                <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                        )}
                    />
                </div>
            </div>

            {/* Footer / Avatar */}
            <div className="relative z-10 mt-3 pt-3 border-t border-neutral-100 flex justify-between items-end shrink-0">
                <div className="text-[8px] text-neutral-400 uppercase tracking-widest">
                    © {new Date().getFullYear()} {personal.company || 'Portfolio'}
                </div>
                {personal.avatarUrl && (
                    <div className="w-12 h-12 md:w-16 md:h-16 grayscale hover:grayscale-0 transition-all duration-500 shrink-0">
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
