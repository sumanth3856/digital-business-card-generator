/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { TemplateProps } from '@/types/card';
import { Mail, Phone, MapPin, Globe, Github, Linkedin, Twitter, Instagram, Sparkles } from 'lucide-react';

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
        <div className="w-full min-h-[600px] bg-[#FAFAFA] text-slate-800 p-8 flex flex-col relative overflow-hidden font-sans">
            {/* Abstract Background Blobs */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-purple-300/40 to-pink-300/40 rounded-full blur-3xl mix-blend-multiply animate-pulse"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-tr from-yellow-200/40 to-orange-200/40 rounded-full blur-3xl mix-blend-multiply animate-pulse delay-1000"></div>
                <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] bg-blue-200/30 rounded-full blur-3xl mix-blend-multiply"></div>
            </div>

            {/* Main Card Container */}
            <div className="relative z-10 flex flex-col md:flex-row h-full gap-8 md:gap-12 items-center md:items-stretch">

                {/* Visual Side (Left) */}
                <div className="w-full md:w-5/12 flex flex-col items-center justify-center text-center">
                    <div className="relative w-48 h-48 mb-6 group">
                        {/* Blob Mask for Avatar */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] blur-md opacity-50 group-hover:opacity-80 transition-opacity duration-500 animate-[spin_10s_linear_infinite]"></div>
                        <div className="relative w-full h-full overflow-hidden rounded-[30%_70%_70%_30%/30%_30%_70%_70%] border-4 border-white shadow-xl transform group-hover:scale-105 transition-transform duration-500">
                            {personal.avatarUrl ? (
                                <img
                                    src={personal.avatarUrl}
                                    alt={personal.fullName}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-white flex items-center justify-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                                    {personal.fullName.charAt(0)}
                                </div>
                            )}
                        </div>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700 mb-2">
                        {personal.fullName}
                    </h1>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/50 backdrop-blur-sm rounded-full border border-white/50 shadow-sm">
                        <Sparkles size={14} className="text-purple-500" />
                        <span className="text-sm font-semibold tracking-wide text-slate-600 uppercase">
                            {personal.jobTitle}
                        </span>
                    </div>
                </div>

                {/* Content Side (Right) */}
                <div className="w-full md:w-7/12 flex flex-col justify-center bg-white/40 backdrop-blur-md rounded-3xl p-8 border border-white/60 shadow-lg">
                    <div className="mb-8">
                        <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                            <span className="w-8 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></span>
                            About Me
                        </h3>
                        <p className="text-slate-600 leading-relaxed">
                            {personal.about || "I turn complex problems into beautiful, intuitive designs. Let's create something amazing together."}
                        </p>
                    </div>

                    <div className="space-y-4 mb-8">
                        {personal.email && (
                            <a href={`mailto:${personal.email}`} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/60 transition-colors group">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                                    <Mail size={18} />
                                </div>
                                <span className="font-medium text-slate-700">{personal.email}</span>
                            </a>
                        )}
                        {personal.phone && (
                            <a href={`tel:${personal.phone}`} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/60 transition-colors group">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                                    <Phone size={18} />
                                </div>
                                <span className="font-medium text-slate-700">{personal.phone}</span>
                            </a>
                        )}
                        {personal.location && (
                            <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/60 transition-colors group">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform">
                                    <MapPin size={18} />
                                </div>
                                <span className="font-medium text-slate-700">{personal.location}</span>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-3 mt-auto">
                        {socialLinks.map((link) => (
                            <a
                                key={link.id}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-white flex items-center justify-center text-slate-600 hover:text-white hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
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
