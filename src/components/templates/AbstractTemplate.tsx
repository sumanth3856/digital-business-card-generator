/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { TemplateProps } from '@/types/card';
import { Mail, Phone, MapPin, Globe, Github, Linkedin, Twitter, Instagram } from 'lucide-react';

const AbstractTemplate: React.FC<TemplateProps> = ({ data }) => {
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
        <div className="w-full min-h-[600px] bg-white p-8 flex flex-col relative overflow-hidden">
            {/* Abstract Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-y-1/2 translate-x-1/4 animate-blob"></div>
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-y-1/2 -translate-x-1/4 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-0 left-20 w-[500px] h-[500px] bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-y-1/2 animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative z-10 bg-white/40 backdrop-blur-xl border border-white/50 rounded-[40px] p-8 shadow-xl flex-grow flex flex-col items-center text-center">
                <div className="w-32 h-32 mb-6 relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white">
                        {personal.avatarUrl ? (
                            <img src={personal.avatarUrl} alt={personal.fullName} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-white text-gray-400 font-bold text-3xl">
                                {personal.fullName.charAt(0)}
                            </div>
                        )}
                    </div>
                </div>

                <h1 className="text-4xl font-bold mb-2 text-gray-900">
                    {personal.fullName}
                </h1>
                <div className="flex flex-col items-center gap-1 mb-8">
                    <span className="px-4 py-1.5 rounded-full bg-black text-white text-xs font-bold uppercase tracking-wider">
                        {personal.jobTitle}
                    </span>
                    {personal.company && (
                        <span className="text-sm font-semibold text-gray-600">
                            @ {personal.company}
                        </span>
                    )}
                </div>

                <p className="text-gray-700 font-medium leading-relaxed max-w-xs mb-10">
                    {personal.tagline || personal.about}
                </p>

                <div className="w-full bg-white/60 rounded-2xl p-6 mb-8 shadow-sm">
                    <div className="space-y-4">
                        {personal.location && (
                            <div className="flex items-center gap-3 text-gray-800">
                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                                    <MapPin size={14} />
                                </div>
                                <span className="font-medium text-sm">{personal.location}</span>
                            </div>
                        )}
                        {personal.email && (
                            <div className="flex items-center gap-3 text-gray-800">
                                <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-700">
                                    <Mail size={14} />
                                </div>
                                <span className="font-medium text-sm">{personal.email}</span>
                            </div>
                        )}
                        {personal.phone && (
                            <div className="flex items-center gap-3 text-gray-800">
                                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700">
                                    <Phone size={14} />
                                </div>
                                <span className="font-medium text-sm">{personal.phone}</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex gap-4 mt-auto">
                    {socialLinks.map((link) => (
                        <a
                            key={link.id}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center text-gray-700 hover:scale-110 hover:shadow-lg transition-all duration-300"
                        >
                            {getIcon(link.platform)}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AbstractTemplate;
