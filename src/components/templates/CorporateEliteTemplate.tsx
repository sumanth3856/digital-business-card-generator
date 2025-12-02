/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { TemplateProps } from '@/types/card';
import { Mail, Phone, MapPin, Globe, Github, Linkedin, Twitter, Instagram, Briefcase } from 'lucide-react';

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
        <div className="w-full min-h-[600px] bg-white flex flex-col font-sans text-slate-800">
            {/* Header Section */}
            <div className="bg-slate-900 text-white p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
                    {/* Avatar */}
                    <div className="w-32 h-32 rounded-full border-4 border-white/10 p-1 bg-white/5 shrink-0">
                        {personal.avatarUrl ? (
                            <img
                                src={personal.avatarUrl}
                                alt={personal.fullName}
                                className="w-full h-full object-cover rounded-full"
                            />
                        ) : (
                            <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center text-3xl font-bold text-slate-400">
                                {personal.fullName.charAt(0)}
                            </div>
                        )}
                    </div>

                    {/* Name & Title */}
                    <div className="text-center md:text-left pt-2">
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 font-serif">
                            {personal.fullName}
                        </h1>
                        <div className="flex items-center justify-center md:justify-start gap-3 text-slate-300 mb-4">
                            <Briefcase size={16} className="text-[#C5A059]" />
                            <span className="uppercase tracking-wider text-sm font-medium">{personal.jobTitle}</span>
                        </div>
                        {personal.company && (
                            <div className="inline-block px-4 py-1 bg-white/10 rounded-full text-sm font-medium border border-white/10">
                                {personal.company}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Body Section */}
            <div className="flex-grow p-8 md:p-12 bg-slate-50">
                <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                    {/* About */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 border-b border-slate-200 pb-2">
                            Profile
                        </h3>
                        <p className="text-slate-600 leading-relaxed text-lg">
                            {personal.about || "Experienced professional dedicated to delivering excellence and driving strategic growth."}
                        </p>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 border-b border-slate-200 pb-2">
                            Contact Details
                        </h3>
                        <div className="space-y-5">
                            {personal.email && (
                                <a href={`mailto:${personal.email}`} className="flex items-center gap-4 group">
                                    <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-[#C5A059] group-hover:bg-[#C5A059] group-hover:text-white transition-colors">
                                        <Mail size={18} />
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-400">Email</div>
                                        <div className="font-medium text-slate-900">{personal.email}</div>
                                    </div>
                                </a>
                            )}
                            {personal.phone && (
                                <a href={`tel:${personal.phone}`} className="flex items-center gap-4 group">
                                    <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-[#C5A059] group-hover:bg-[#C5A059] group-hover:text-white transition-colors">
                                        <Phone size={18} />
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-400">Phone</div>
                                        <div className="font-medium text-slate-900">{personal.phone}</div>
                                    </div>
                                </a>
                            )}
                            {personal.location && (
                                <div className="flex items-center gap-4 group">
                                    <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-[#C5A059] group-hover:bg-[#C5A059] group-hover:text-white transition-colors">
                                        <MapPin size={18} />
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-400">Location</div>
                                        <div className="font-medium text-slate-900">{personal.location}</div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer / Socials */}
            <div className="bg-white p-8 border-t border-slate-100">
                <div className="flex justify-center gap-4">
                    {socialLinks.map((link) => (
                        <a
                            key={link.id}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:border-[#C5A059] hover:text-[#C5A059] hover:bg-[#C5A059]/5 transition-all duration-300"
                        >
                            {getIcon(link.platform)}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CorporateEliteTemplate;
