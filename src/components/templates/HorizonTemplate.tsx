/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { TemplateProps } from '@/types/card';
import { Mail, Phone, MapPin, Globe, Github, Linkedin, Twitter, Instagram, ArrowUpRight } from 'lucide-react';

const HorizonTemplate: React.FC<TemplateProps> = ({ data }) => {
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
        <div className="w-full min-h-[600px] flex flex-col bg-white overflow-hidden">
            {/* Top Half - Color/Image */}
            <div className="h-[280px] relative p-8 flex flex-col justify-between"
                style={{ backgroundColor: theme.primaryColor }}>

                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl -ml-10 -mb-10"></div>

                <div className="relative z-10 flex justify-between items-start">
                    <div className="bg-white/20 backdrop-blur-md p-2 rounded-lg border border-white/30">
                        <div className="w-16 h-16 rounded bg-white/90 overflow-hidden">
                            {personal.avatarUrl ? (
                                <img src={personal.avatarUrl} alt={personal.fullName} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-gray-400">
                                    {personal.fullName.charAt(0)}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-2">
                        {socialLinks.slice(0, 3).map((link) => (
                            <a
                                key={link.id}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors backdrop-blur-sm"
                            >
                                {getIcon(link.platform)}
                            </a>
                        ))}
                    </div>
                </div>

                <div className="relative z-10 text-white">
                    <h1 className="text-3xl font-bold tracking-tight">{personal.fullName}</h1>
                    <p className="text-white/80 font-medium">{personal.jobTitle}</p>
                </div>
            </div>

            {/* Bottom Half - Content */}
            <div className="flex-grow p-8 bg-white relative">
                <div className="grid grid-cols-1 gap-8">
                    <div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">About</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            {personal.about}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Connect</h3>
                        <div className="space-y-3">
                            {personal.email && (
                                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                                    <Mail size={16} className="text-gray-400" />
                                    <span className="text-sm font-medium text-gray-700">{personal.email}</span>
                                </div>
                            )}
                            {personal.phone && (
                                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                                    <Phone size={16} className="text-gray-400" />
                                    <span className="text-sm font-medium text-gray-700">{personal.phone}</span>
                                </div>
                            )}
                            {personal.location && (
                                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                                    <MapPin size={16} className="text-gray-400" />
                                    <span className="text-sm font-medium text-gray-700">{personal.location}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HorizonTemplate;
