/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { TemplateProps } from '@/types/card';
import { Mail, Phone, MapPin, Globe, Github, Linkedin, Twitter, Instagram, Terminal, Cpu, Code } from 'lucide-react';
import { ensureProtocol } from '@/utils/url';

const CyberFutureTemplate: React.FC<TemplateProps> = ({ data }) => {
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
        <div className="w-full aspect-[1.75/1] bg-neutral-950 text-cyan-400 p-3 md:p-5 flex flex-col font-mono relative overflow-hidden shadow-2xl rounded-xl">
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0ea5e91a_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e91a_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            {/* Glowing Orbs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>

            {/* Main Container */}
            <div className="relative z-10 flex flex-col h-full border border-cyan-500/30 bg-neutral-900/80 backdrop-blur-xl rounded-lg overflow-hidden shadow-[0_0_30px_-10px_rgba(6,182,212,0.25)]">

                {/* Top Bar */}
                <div className="h-5 md:h-7 bg-neutral-900 border-b border-cyan-500/30 flex items-center px-2 md:px-3 gap-1.5 shrink-0">
                    <div className="w-1.5 h-1.5 md:w-2.5 md:h-2.5 rounded-full bg-red-500"></div>
                    <div className="w-1.5 h-1.5 md:w-2.5 md:h-2.5 rounded-full bg-yellow-500"></div>
                    <div className="w-1.5 h-1.5 md:w-2.5 md:h-2.5 rounded-full bg-green-500"></div>
                    <div className="ml-auto text-[8px] md:text-[10px] text-cyan-700">user@system:~</div>
                </div>

                <div className="flex-grow p-3 md:p-5 flex flex-row gap-3 md:gap-5 min-h-0">
                    {/* Left Column: Identity */}
                    <div className="w-4/12 flex flex-col items-center text-center border-r border-cyan-500/30 pr-3 md:pr-5 shrink-0">
                        <div className="relative w-16 h-16 md:w-24 md:h-24 mb-2 md:mb-3 group shrink-0">
                            <div className="absolute inset-0 border-2 border-dashed border-cyan-500 rounded-full animate-[spin_10s_linear_infinite]"></div>
                            <div className="absolute inset-1.5 border border-cyan-500/50 rounded-full"></div>
                            <div className="absolute inset-0 rounded-full overflow-hidden m-2.5 bg-neutral-800">
                                {personal.avatarUrl ? (
                                    <img
                                        src={personal.avatarUrl}
                                        alt={personal.fullName}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-xl md:text-3xl font-bold text-cyan-500">
                                        <Terminal size={20} className="md:w-8 md:h-8" />
                                    </div>
                                )}
                            </div>
                        </div>

                        <h1 className="text-xs md:text-lg font-bold text-white mb-1 tracking-tighter break-words w-full">
                            <span className="text-cyan-500">&lt;</span>
                            {personal.fullName}
                            <span className="text-cyan-500">/&gt;</span>
                        </h1>
                        <div className="px-1.5 py-0.5 bg-cyan-950/50 border border-cyan-500/30 rounded text-[9px] md:text-[11px] text-cyan-300 mb-2 truncate max-w-full">
                            {personal.jobTitle}
                        </div>

                        <div className="flex gap-1.5 mt-auto flex-wrap justify-center">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.id}
                                    href={ensureProtocol(link.url)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1 text-cyan-500 hover:text-white hover:bg-cyan-500/20 rounded transition-colors"
                                >
                                    {getIcon(link.platform)}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Data */}
                    <div className="w-8/12 flex flex-col min-w-0">
                        <div className="mb-2 overflow-y-auto pr-1 scrollbar-hide max-h-[50px] md:max-h-[70px]">
                            <div className="flex items-center gap-1.5 text-cyan-700 mb-0.5 text-[9px] uppercase tracking-widest">
                                <Cpu size={10} className="md:w-3 md:h-3" />
                                <span>About Me</span>
                            </div>
                            <p className="text-neutral-300 leading-relaxed border-l-2 border-cyan-500/30 pl-2 text-[9px] md:text-[11px]">
                                <span className="text-cyan-500 opacity-50">{'/*'} </span>
                                {personal.about || "Executing creative solutions in a digital environment."}
                                <span className="text-cyan-500 opacity-50">{' */'}</span>
                            </p>
                        </div>

                        <div className="space-y-1.5 flex-grow overflow-y-auto pr-1 scrollbar-hide">
                            <div className="flex items-center gap-1.5 text-cyan-700 mb-0.5 text-[9px] uppercase tracking-widest">
                                <Code size={10} className="md:w-3 md:h-3" />
                                <span>Connect.Execute()</span>
                            </div>

                            <div className="grid gap-1 md:gap-1.5">
                                {personal.email && (
                                    <a href={`mailto:${personal.email}`} className="flex items-center gap-2 md:gap-2.5 p-1 md:p-1.5 bg-cyan-950/10 border border-cyan-500/20 rounded hover:border-cyan-500/50 transition-colors group">
                                        <Mail size={10} className="text-cyan-500 md:w-3.5 md:h-3.5 shrink-0" />
                                        <span className="text-neutral-300 group-hover:text-cyan-300 transition-colors text-[9px] md:text-[11px] break-all">{personal.email}</span>
                                    </a>
                                )}
                                {personal.phone && (
                                    <a href={`tel:${personal.phone}`} className="flex items-center gap-2 md:gap-2.5 p-1 md:p-1.5 bg-cyan-950/10 border border-cyan-500/20 rounded hover:border-cyan-500/50 transition-colors group">
                                        <Phone size={10} className="text-cyan-500 md:w-3.5 md:h-3.5 shrink-0" />
                                        <span className="text-neutral-300 group-hover:text-cyan-300 transition-colors text-[9px] md:text-[11px] break-all">{personal.phone}</span>
                                    </a>
                                )}
                                {personal.location && (
                                    <div className="flex items-center gap-2 md:gap-2.5 p-1 md:p-1.5 bg-cyan-950/10 border border-cyan-500/20 rounded hover:border-cyan-500/50 transition-colors">
                                        <MapPin size={10} className="text-cyan-500 md:w-3.5 md:h-3.5 shrink-0" />
                                        <span className="text-neutral-300 text-[9px] md:text-[11px] break-words">{personal.location}</span>
                                    </div>
                                )}
                                {personal.website && (
                                    <a href={ensureProtocol(personal.website)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 md:gap-2.5 p-1 md:p-1.5 bg-cyan-950/10 border border-cyan-500/20 rounded hover:border-cyan-500/50 transition-colors group">
                                        <Globe size={10} className="text-cyan-500 md:w-3.5 md:h-3.5 shrink-0" />
                                        <span className="text-neutral-300 group-hover:text-cyan-300 transition-colors text-[9px] md:text-[11px] break-all">{personal.website.replace(/^https?:\/\//, '')}</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Status Bar */}
                <div className="bg-neutral-900 border-t border-cyan-500/30 p-1 px-2 md:px-3 flex justify-between text-[7px] md:text-[9px] text-cyan-700 uppercase tracking-widest shrink-0">
                    <div>Status: Online</div>
                    <div>v2.0.45</div>
                </div>
            </div>
        </div>
    );
};

export default CyberFutureTemplate;
