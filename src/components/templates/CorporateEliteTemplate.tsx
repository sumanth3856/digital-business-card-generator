/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { TemplateProps } from '@/types/card';
import { Mail, Phone, MapPin, Globe, Github, Linkedin, Twitter, Instagram, Briefcase } from 'lucide-react';
import { ensureProtocol } from '@/utils/url';

const CorporateEliteTemplate: React.FC<TemplateProps> = ({ data }) => {
    const { personal, socialLinks, theme } = data;

    // Professional Palette
    const accentColor = '#C5A059'; // Gold
    const darkColor = '#0F172A'; // Slate 900
    const lightBg = '#F8FAFC'; // Slate 50

    const getIcon = (platform: string) => {
        switch (platform) {
            case 'github': return <Github size={16} />;
            case 'linkedin': return <Linkedin size={16} />;
            case 'twitter': return <Twitter size={16} />;
            case 'instagram': return <Instagram size={16} />;
            default: return <Globe size={16} />;
        }
    };

    return (
        <div className="w-full aspect-[1.75/1] bg-white flex flex-row font-sans text-slate-800 shadow-2xl rounded-xl overflow-hidden">
            {/* Left Section (Dark) */}
            <div className="w-5/12 bg-slate-900 text-white p-3 md:p-5 relative overflow-hidden flex flex-col justify-center items-center text-center shrink-0">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none"></div>

                <div className="relative z-10 flex flex-col items-center w-full">
                    {/* Avatar */}
                    <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border-4 border-white/10 p-1 bg-white/5 shrink-0 mb-2 md:mb-3">
                        {personal.avatarUrl ? (
                            <img
                                src={personal.avatarUrl}
                                alt={personal.fullName}
                                className="w-full h-full object-cover rounded-full"
                            />
                        ) : (
                            <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center text-xl md:text-3xl font-bold text-slate-400">
                                {personal.fullName.charAt(0)}
                            </div>
                        )}
                    </div>

                    {/* Name & Title */}
                    <div className="w-full">
                        <h1 className="text-lg md:text-xl font-bold tracking-tight mb-1 font-serif break-words">
                            {personal.fullName}
                        </h1>
                        <div className="flex items-center justify-center gap-1.5 text-slate-300 mb-1.5 md:mb-2.5">
                            <Briefcase size={10} className="text-[#C5A059] md:w-3.5 md:h-3.5" />
                            <span className="uppercase tracking-wider text-[9px] md:text-[11px] font-medium truncate max-w-full">{personal.jobTitle}</span>
                        </div>
                        {personal.company && (
                            <div className="inline-block px-2 py-0.5 md:px-3 md:py-1 bg-white/10 rounded-full text-[9px] md:text-[11px] font-medium border border-white/10 max-w-full truncate">
                                {personal.company}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Right Section (Light) */}
            <div className="w-7/12 p-3 md:p-5 bg-slate-50 flex flex-col justify-between min-w-0">
                <div className="flex-grow overflow-y-auto pr-1 scrollbar-hide">
                    {/* About (Small) */}
                    <div className="mb-2 md:mb-3">
                        <h3 className="text-[9px] md:text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1 border-b border-slate-200 pb-0.5">
                            Profile
                        </h3>
                        <p className="text-slate-600 leading-relaxed text-[10px] md:text-xs line-clamp-3 md:line-clamp-4">
                            {personal.about || "Experienced professional dedicated to delivering excellence and driving strategic growth."}
                        </p>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-[9px] md:text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1.5 md:mb-2.5 border-b border-slate-200 pb-0.5">
                            Contact Details
                        </h3>
                        <div className="space-y-1.5 md:space-y-2.5">
                            {personal.email && (
                                <a href={`mailto:${personal.email}`} className="flex items-center gap-2 md:gap-2.5 group">
                                    <div className="w-5 h-5 md:w-7 md:h-7 rounded-lg bg-white shadow-sm flex items-center justify-center text-[#C5A059] group-hover:bg-[#C5A059] group-hover:text-white transition-colors shrink-0">
                                        <Mail size={10} className="md:w-[14px] md:h-[14px]" />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="text-[7px] md:text-[9px] text-slate-400">Email</div>
                                        <div className="font-medium text-[10px] md:text-xs text-slate-900 break-all">{personal.email}</div>
                                    </div>
                                </a>
                            )}
                            {personal.phone && (
                                <a href={`tel:${personal.phone}`} className="flex items-center gap-2 md:gap-2.5 group">
                                    <div className="w-5 h-5 md:w-7 md:h-7 rounded-lg bg-white shadow-sm flex items-center justify-center text-[#C5A059] group-hover:bg-[#C5A059] group-hover:text-white transition-colors shrink-0">
                                        <Phone size={10} className="md:w-[14px] md:h-[14px]" />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="text-[7px] md:text-[9px] text-slate-400">Phone</div>
                                        <div className="font-medium text-[10px] md:text-xs text-slate-900 break-all">{personal.phone}</div>
                                    </div>
                                </a>
                            )}
                            {personal.location && (
                                <div className="flex items-center gap-2 md:gap-2.5 group">
                                    <div className="w-5 h-5 md:w-7 md:h-7 rounded-lg bg-white shadow-sm flex items-center justify-center text-[#C5A059] group-hover:bg-[#C5A059] group-hover:text-white transition-colors shrink-0">
                                        <MapPin size={10} className="md:w-[14px] md:h-[14px]" />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="text-[7px] md:text-[9px] text-slate-400">Location</div>
                                        <div className="font-medium text-[10px] md:text-xs text-slate-900 break-words">{personal.location}</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer / Socials */}
                <div className="mt-1.5 md:mt-3 pt-1.5 md:pt-3 border-t border-slate-200 shrink-0">
                    <div className="flex justify-start gap-1.5 md:gap-2.5">
                        {socialLinks.map((link) => (
                            <a
                                key={link.id}
                                href={ensureProtocol(link.url)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-5 h-5 md:w-7 md:h-7 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:border-[#C5A059] hover:text-[#C5A059] hover:bg-[#C5A059]/5 transition-all duration-300"
                            >
                                {getIcon(link.platform)}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CorporateEliteTemplate;
