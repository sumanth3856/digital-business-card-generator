/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { TemplateProps } from '@/types/card';
import { Mail, Phone, MapPin, Globe, Github, Linkedin, Twitter, Instagram } from 'lucide-react';

const VogueTemplate: React.FC<TemplateProps> = ({ data }) => {
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
        <div className="w-full min-h-[600px] bg-[#EAEAEA] flex flex-col relative overflow-hidden">
            {/* Large Typography Background */}
            <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between pointer-events-none opacity-[0.03] overflow-hidden leading-none select-none">
                <span className="text-[150px] font-serif italic whitespace-nowrap -ml-20">PORTFOLIO</span>
                <span className="text-[150px] font-serif italic whitespace-nowrap self-end -mr-20">DESIGN</span>
                <span className="text-[150px] font-serif italic whitespace-nowrap -ml-20">CREATIVE</span>
            </div>

            <div className="relative z-10 flex-grow flex flex-col">
                {/* Image Section */}
                <div className="h-[300px] w-full relative bg-gray-300">
                    {personal.avatarUrl ? (
                        <img src={personal.avatarUrl} alt={personal.fullName} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-stone-300 text-stone-500 font-serif text-6xl">
                            {personal.fullName.charAt(0)}
                        </div>
                    )}
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#EAEAEA] to-transparent"></div>
                </div>

                {/* Content Section */}
                <div className="px-8 -mt-20 relative">
                    <h1 className="text-5xl font-serif italic text-black mb-2 mix-blend-multiply">
                        {personal.fullName}
                    </h1>
                    <div className="flex flex-col items-start gap-1 mb-8 border-b border-black pb-4">
                        <p className="text-xs font-bold tracking-[0.3em] uppercase text-black">
                            {personal.jobTitle}
                        </p>
                        {personal.company && (
                            <p className="text-[10px] font-bold tracking-widest uppercase text-gray-600">
                                @ {personal.company}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col gap-6">
                        <p className="text-sm font-serif leading-relaxed text-gray-800 max-w-xs">
                            {personal.tagline || personal.about}
                        </p>

                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs font-medium uppercase tracking-wider">
                            {personal.email && (
                                <div className="col-span-2 flex items-center gap-2 border-b border-gray-300 pb-1">
                                    <span>E:</span> {personal.email}
                                </div>
                            )}
                            {personal.phone && (
                                <div className="col-span-2 flex items-center gap-2 border-b border-gray-300 pb-1">
                                    <span>T:</span> {personal.phone}
                                </div>
                            )}
                            {personal.location && (
                                <div className="col-span-2 flex items-center gap-2 border-b border-gray-300 pb-1">
                                    <span>L:</span> {personal.location}
                                </div>
                            )}
                        </div>

                        <div className="flex gap-4 mt-2">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.id}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-black hover:text-gray-600 transition-colors"
                                >
                                    {getIcon(link.platform)}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VogueTemplate;
