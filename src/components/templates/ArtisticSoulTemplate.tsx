/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { TemplateProps } from '@/types/card';
import { Mail, Phone, MapPin, Globe, Github, Linkedin, Twitter, Instagram, Sparkles } from 'lucide-react';
import { ensureProtocol } from '@/utils/url';

const ArtisticSoulTemplate: React.FC<TemplateProps> = ({ data }) => {
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
        <div className="w-full aspect-[1.75/1] bg-[#FAFAFA] text-slate-800 p-3 md:p-5 flex flex-col relative overflow-hidden font-sans shadow-2xl rounded-xl">
            {/* Abstract Background Blobs */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-purple-300/40 to-pink-300/40 rounded-full blur-3xl mix-blend-multiply animate-pulse"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-tr from-yellow-200/40 to-orange-200/40 rounded-full blur-3xl mix-blend-multiply animate-pulse delay-1000"></div>
                <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] bg-blue-200/30 rounded-full blur-3xl mix-blend-multiply"></div>
            </div>

            {/* Main Card Container */}
            <div className="relative z-10 flex flex-row h-full gap-3 md:gap-5 items-center">

                {/* Visual Side (Left) */}
                <div className="w-4/12 flex flex-col items-center justify-center text-center shrink-0">
                    <div className="relative w-20 h-20 md:w-28 md:h-28 mb-2 md:mb-3 group shrink-0">
                        {/* Blob Mask for Avatar */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] blur-md opacity-50 group-hover:opacity-80 transition-opacity duration-500 animate-[spin_10s_linear_infinite]"></div>
                        <div className="relative w-full h-full overflow-hidden rounded-[30%_70%_70%_30%/30%_30%_70%_70%] border-2 md:border-4 border-white shadow-xl transform group-hover:scale-105 transition-transform duration-500">
                            {personal.avatarUrl ? (
                                <img
                                    src={personal.avatarUrl}
                                    alt={personal.fullName}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-white flex items-center justify-center text-xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                                    {personal.fullName.charAt(0)}
                                </div>
                            )}
                        </div>
                    </div>

                    <h1 className="text-lg md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700 mb-1 break-words w-full leading-tight">
                        {personal.fullName}
                    </h1>
                    <div className="inline-flex items-center gap-1 md:gap-1.5 px-2 py-0.5 md:px-3 md:py-1 bg-white/50 backdrop-blur-sm rounded-full border border-white/50 shadow-sm max-w-full">
                        <Sparkles size={8} className="text-purple-500 md:w-3 md:h-3" />
                        <span className="text-[9px] md:text-[11px] font-semibold tracking-wide text-slate-600 uppercase truncate">
                            {personal.jobTitle}
                        </span>
                    </div>
                </div>

                {/* Content Side (Right) */}
                <div className="w-8/12 flex flex-col h-full bg-white/40 backdrop-blur-md rounded-xl md:rounded-2xl p-3 md:p-5 border border-white/60 shadow-lg min-w-0">
                    <div className="mb-2 overflow-y-auto pr-1 scrollbar-hide max-h-[60px] md:max-h-[80px]">
                        <h3 className="text-xs md:text-sm font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                            <span className="w-3 h-1 md:w-6 md:h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></span>
                            About Me
                        </h3>
                        <p className="text-[10px] md:text-xs text-slate-600 leading-relaxed">
                            {personal.about || "I turn complex problems into beautiful, intuitive designs. Let's create something amazing together."}
                        </p>
                    </div>

                    <div className="space-y-1 md:space-y-1.5 mb-2 overflow-y-auto pr-1 scrollbar-hide flex-grow">
                        {personal.email && (
                            <a href={`mailto:${personal.email}`} className="flex items-center gap-1.5 md:gap-2.5 p-1 md:p-1.5 rounded-lg hover:bg-white/60 transition-colors group">
                                <div className="w-5 h-5 md:w-7 md:h-7 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform shrink-0">
                                    <Mail size={10} className="md:w-[14px] md:h-[14px]" />
                                </div>
                                <span className="font-medium text-[10px] md:text-xs text-slate-700 break-all">{personal.email}</span>
                            </a>
                        )}
                        {personal.phone && (
                            <a href={`tel:${personal.phone}`} className="flex items-center gap-1.5 md:gap-2.5 p-1 md:p-1.5 rounded-lg hover:bg-white/60 transition-colors group">
                                <div className="w-5 h-5 md:w-7 md:h-7 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform shrink-0">
                                    <Phone size={10} className="md:w-[14px] md:h-[14px]" />
                                </div>
                                <span className="font-medium text-[10px] md:text-xs text-slate-700 break-all">{personal.phone}</span>
                            </a>
                        )}
                        {personal.location && (
                            <div className="flex items-center gap-1.5 md:gap-2.5 p-1 md:p-1.5 rounded-lg hover:bg-white/60 transition-colors group">
                                <div className="w-5 h-5 md:w-7 md:h-7 rounded-full bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform shrink-0">
                                    <MapPin size={10} className="md:w-[14px] md:h-[14px]" />
                                </div>
                                <span className="font-medium text-[10px] md:text-xs text-slate-700 break-words">{personal.location}</span>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-auto">
                        {socialLinks.map((link) => (
                            <a
                                key={link.id}
                                href={ensureProtocol(link.url)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-white shadow-sm border border-white flex items-center justify-center text-slate-600 hover:text-white hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
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

export default ArtisticSoulTemplate;
