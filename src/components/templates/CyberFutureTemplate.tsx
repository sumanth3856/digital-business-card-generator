/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { TemplateProps } from '@/types/card';
import { Mail, Phone, MapPin, Globe, Github, Linkedin, Twitter, Instagram, Terminal, Cpu, Code } from 'lucide-react';

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
        <div className="w-full min-h-[600px] bg-neutral-950 text-cyan-400 p-6 md:p-10 flex flex-col font-mono relative overflow-hidden">
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0ea5e91a_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e91a_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            {/* Glowing Orbs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

            {/* Main Container */}
            <div className="relative z-10 flex flex-col h-full border border-cyan-500/30 bg-neutral-900/80 backdrop-blur-xl rounded-xl overflow-hidden shadow-[0_0_50px_-12px_rgba(6,182,212,0.25)]">

                {/* Top Bar */}
                <div className="h-8 bg-neutral-900 border-b border-cyan-500/30 flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div className="ml-auto text-xs text-cyan-700">user@system:~</div>
                </div>

                <div className="flex-grow p-8 flex flex-col md:flex-row gap-8">
                    {/* Left Column: Identity */}
                    <div className="w-full md:w-1/3 flex flex-col items-center text-center border-b md:border-b-0 md:border-r border-cyan-500/30 pb-8 md:pb-0 md:pr-8">
                        <div className="relative w-40 h-40 mb-6 group">
                            <div className="absolute inset-0 border-2 border-dashed border-cyan-500 rounded-full animate-[spin_10s_linear_infinite]"></div>
                            <div className="absolute inset-2 border border-cyan-500/50 rounded-full"></div>
                            <div className="absolute inset-0 rounded-full overflow-hidden m-4 bg-neutral-800">
                                {personal.avatarUrl ? (
                                    <img
                                        src={personal.avatarUrl}
                                        alt={personal.fullName}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-cyan-500">
                                        <Terminal size={40} />
                                    </div>
                                )}
                            </div>
                        </div>

                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tighter">
                            <span className="text-cyan-500">&lt;</span>
                            {personal.fullName}
                            <span className="text-cyan-500">/&gt;</span>
                        </h1>
                        <div className="px-3 py-1 bg-cyan-950/50 border border-cyan-500/30 rounded text-sm text-cyan-300 mb-6">
                            {personal.jobTitle}
                        </div>

                        <div className="flex gap-3 mt-auto">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.id}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 text-cyan-500 hover:text-white hover:bg-cyan-500/20 rounded transition-colors"
                                >
                                    {getIcon(link.platform)}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Data */}
                    <div className="w-full md:w-2/3 flex flex-col">
                        <div className="mb-8">
                            <div className="flex items-center gap-2 text-cyan-700 mb-2 text-sm uppercase tracking-widest">
                                <Cpu size={14} />
                                <span>System.Bio</span>
                            </div>
                            <p className="text-neutral-300 leading-relaxed border-l-2 border-cyan-500/30 pl-4">
                                <span className="text-cyan-500 opacity-50">/* </span>
                                {personal.about || "Executing creative solutions in a digital environment."}
                                <span className="text-cyan-500 opacity-50"> */</span>
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-cyan-700 mb-2 text-sm uppercase tracking-widest">
                                <Code size={14} />
                                <span>Connect.Execute()</span>
                            </div>

                            <div className="grid gap-3">
                                {personal.email && (
                                    <a href={`mailto:${personal.email}`} className="flex items-center gap-4 p-3 bg-cyan-950/10 border border-cyan-500/20 rounded hover:border-cyan-500/50 transition-colors group">
                                        <Mail size={16} className="text-cyan-500" />
                                        <span className="text-neutral-300 group-hover:text-cyan-300 transition-colors">{personal.email}</span>
                                    </a>
                                )}
                                {personal.phone && (
                                    <a href={`tel:${personal.phone}`} className="flex items-center gap-4 p-3 bg-cyan-950/10 border border-cyan-500/20 rounded hover:border-cyan-500/50 transition-colors group">
                                        <Phone size={16} className="text-cyan-500" />
                                        <span className="text-neutral-300 group-hover:text-cyan-300 transition-colors">{personal.phone}</span>
                                    </a>
                                )}
                                {personal.location && (
                                    <div className="flex items-center gap-4 p-3 bg-cyan-950/10 border border-cyan-500/20 rounded hover:border-cyan-500/50 transition-colors">
                                        <MapPin size={16} className="text-cyan-500" />
                                        <span className="text-neutral-300">{personal.location}</span>
                                    </div>
                                )}
                                {personal.website && (
                                    <a href={personal.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-3 bg-cyan-950/10 border border-cyan-500/20 rounded hover:border-cyan-500/50 transition-colors group">
                                        <Globe size={16} className="text-cyan-500" />
                                        <span className="text-neutral-300 group-hover:text-cyan-300 transition-colors">{personal.website.replace(/^https?:\/\//, '')}</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Status Bar */}
                <div className="bg-neutral-900 border-t border-cyan-500/30 p-2 px-4 flex justify-between text-[10px] text-cyan-700 uppercase tracking-widest">
                    <div>Status: Online</div>
                    <div>v2.0.45</div>
                </div>
            </div>
        </div>
    );
};

export default CyberFutureTemplate;
