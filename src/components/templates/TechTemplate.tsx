/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { TemplateProps } from '@/types/card';
import { Mail, Phone, MapPin, Globe, Github, Linkedin, Twitter, Instagram, Terminal } from 'lucide-react';

const TechTemplate: React.FC<TemplateProps> = ({ data }) => {
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
        <div className="w-full min-h-[600px] bg-[#1a1b26] text-[#a9b1d6] p-8 font-mono flex flex-col relative overflow-hidden border-t-4 border-[#7aa2f7]">
            {/* Code Background */}
            <div className="absolute top-4 right-4 text-xs opacity-20 pointer-events-none text-[#9ece6a]">
                <pre>{`const profile = {
  name: "${personal.fullName.split(' ')[0]}",
  role: "Dev",
  status: "Online"
};`}</pre>
            </div>

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-start gap-6 mb-10">
                    <div className="w-20 h-20 rounded bg-[#24283b] border border-[#414868] flex items-center justify-center overflow-hidden">
                        {personal.avatarUrl ? (
                            <img src={personal.avatarUrl} alt={personal.fullName} className="w-full h-full object-cover" />
                        ) : (
                            <Terminal size={32} className="text-[#7aa2f7]" />
                        )}
                    </div>
                    <div className="pt-2">
                        <h1 className="text-xl font-bold text-[#c0caf5] mb-1">
                            <span className="text-[#bb9af7]">const</span> {personal.fullName}
                        </h1>
                        <p className="text-sm text-[#7aa2f7]">
                            <span className="text-[#565f89]">// </span>
                            {personal.jobTitle}
                        </p>
                    </div>
                </div>

                <div className="mb-8 p-4 rounded bg-[#24283b] border-l-2 border-[#e0af68]">
                    <p className="text-sm leading-relaxed">
                        <span className="text-[#f7768e]">&gt;</span> {personal.about}
                        <span className="animate-pulse">_</span>
                    </p>
                </div>

                <div className="space-y-4 mb-10">
                    {personal.email && (
                        <div className="flex items-center gap-3 text-sm hover:text-[#c0caf5] transition-colors cursor-pointer">
                            <span className="text-[#bb9af7]">mail:</span>
                            <span>{personal.email}</span>
                        </div>
                    )}
                    {personal.phone && (
                        <div className="flex items-center gap-3 text-sm hover:text-[#c0caf5] transition-colors cursor-pointer">
                            <span className="text-[#bb9af7]">tel:</span>
                            <span>{personal.phone}</span>
                        </div>
                    )}
                    {personal.location && (
                        <div className="flex items-center gap-3 text-sm hover:text-[#c0caf5] transition-colors cursor-pointer">
                            <span className="text-[#bb9af7]">loc:</span>
                            <span>{personal.location}</span>
                        </div>
                    )}
                </div>

                <div className="mt-auto">
                    <div className="text-xs text-[#565f89] mb-3">----- SOCIALS -----</div>
                    <div className="flex flex-wrap gap-3">
                        {socialLinks.map((link) => (
                            <a
                                key={link.id}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1.5 rounded bg-[#24283b] border border-[#414868] hover:border-[#7aa2f7] text-xs text-[#7aa2f7] transition-all"
                            >
                                {link.platform}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TechTemplate;
