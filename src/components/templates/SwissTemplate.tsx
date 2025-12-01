/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { TemplateProps } from '@/types/card';
import { Mail, Phone, MapPin, Globe, Github, Linkedin, Twitter, Instagram, ArrowUpRight } from 'lucide-react';

const SwissTemplate: React.FC<TemplateProps> = ({ data }) => {
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
        <div className="w-full min-h-[600px] bg-[#F0F0F0] p-8 font-sans flex flex-col">
            <div className="flex-grow grid grid-cols-12 grid-rows-6 gap-4 h-full">
                {/* Header Block */}
                <div className="col-span-12 row-span-2 bg-red-600 p-6 text-white flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <h1 className="text-4xl font-bold tracking-tighter leading-none">
                            {personal.fullName.split(' ').map((word, i) => (
                                <span key={i} className="block">{word}</span>
                            ))}
                        </h1>
                        <div className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center font-bold text-xs">
                            CH
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-lg font-medium opacity-90">{personal.jobTitle}</p>
                        {personal.company && (
                            <p className="text-sm font-medium opacity-75">@ {personal.company}</p>
                        )}
                    </div>
                </div>

                {/* Avatar Block */}
                <div className="col-span-5 row-span-2 bg-white overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-500">
                    {personal.avatarUrl ? (
                        <img src={personal.avatarUrl} alt={personal.fullName} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400 font-bold text-2xl">
                            IMG
                        </div>
                    )}
                </div>

                {/* Info Block */}
                <div className="col-span-7 row-span-2 bg-black text-white p-6 flex flex-col justify-center">
                    <p className="text-sm font-medium leading-relaxed opacity-80">
                        {personal.tagline || personal.about}
                    </p>
                </div>

                {/* Contact Block */}
                <div className="col-span-8 row-span-2 bg-white p-6 flex flex-col justify-between">
                    <div className="space-y-2">
                        {personal.email && (
                            <div className="flex items-center justify-between border-b border-black pb-1">
                                <span className="text-xs font-bold uppercase">Mail</span>
                                <span className="text-sm font-medium">{personal.email}</span>
                            </div>
                        )}
                        {personal.phone && (
                            <div className="flex items-center justify-between border-b border-black pb-1">
                                <span className="text-xs font-bold uppercase">Tel</span>
                                <span className="text-sm font-medium">{personal.phone}</span>
                            </div>
                        )}
                        {personal.location && (
                            <div className="flex items-center justify-between border-b border-black pb-1">
                                <span className="text-xs font-bold uppercase">Loc</span>
                                <span className="text-sm font-medium">{personal.location}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Social Block */}
                <div className="col-span-4 row-span-2 bg-gray-200 p-4 flex flex-col gap-2 justify-center items-center">
                    {socialLinks.slice(0, 4).map((link) => (
                        <a
                            key={link.id}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-white flex items-center justify-center rounded-full hover:bg-black hover:text-white transition-colors"
                        >
                            {getIcon(link.platform)}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SwissTemplate;
