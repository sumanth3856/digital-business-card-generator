/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { TemplateProps } from '@/types/card';
import { Mail, Phone, MapPin, Globe, Github, Linkedin, Twitter, Instagram, ArrowRight } from 'lucide-react';

const MinimalistProTemplate: React.FC<TemplateProps> = ({ data }) => {
    const { personal, socialLinks, theme } = data;

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
        <div className="w-full min-h-[600px] bg-white p-10 flex flex-col justify-between relative overflow-hidden">
            {/* Subtle Background Number */}
            <div className="absolute -top-20 -right-20 text-[300px] font-bold text-gray-50 pointer-events-none select-none">
                01
            </div>

            <div className="relative z-10">
                <div className="flex items-center gap-6 mb-12">
                    {personal.avatarUrl && (
                        <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100">
                            <img src={personal.avatarUrl} alt={personal.fullName} className="w-full h-full object-cover grayscale" />
                        </div>
                    )}
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{personal.fullName}</h1>
                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mt-1">
                            {personal.jobTitle} {personal.company ? `@ ${personal.company}` : ''}
                        </p>
                    </div>
                </div>

                <div className="space-y-8">
                    <p className="text-gray-600 leading-relaxed max-w-xs font-light text-lg">
                        {personal.tagline || personal.about}
                    </p>

                    <div className="space-y-4 pt-4 border-t border-gray-100 max-w-xs">
                        {personal.email && (
                            <div className="flex items-center justify-between group cursor-pointer">
                                <span className="text-sm text-gray-400 font-medium">Email</span>
                                <span className="text-sm text-gray-800 group-hover:text-black transition-colors">{personal.email}</span>
                            </div>
                        )}
                        {personal.phone && (
                            <div className="flex items-center justify-between group cursor-pointer">
                                <span className="text-sm text-gray-400 font-medium">Phone</span>
                                <span className="text-sm text-gray-800 group-hover:text-black transition-colors">{personal.phone}</span>
                            </div>
                        )}
                        {personal.location && (
                            <div className="flex items-center justify-between group cursor-pointer">
                                <span className="text-sm text-gray-400 font-medium">Studio</span>
                                <span className="text-sm text-gray-800 group-hover:text-black transition-colors">{personal.location}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="relative z-10 pt-10">
                <div className="flex flex-wrap gap-3">
                    {socialLinks.map((link) => (
                        <a
                            key={link.id}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-xs font-semibold text-gray-700 transition-colors"
                        >
                            {getIcon(link.platform)}
                            <span className="capitalize">{link.platform}</span>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MinimalistProTemplate;
