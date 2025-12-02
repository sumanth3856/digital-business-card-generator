import React from 'react';
import { TemplateProps } from '@/types/card';
import { SocialLinks } from './shared/SocialLinks';
import { ContactDetails } from './shared/ContactDetails';
import { Avatar } from './shared/Avatar';
import { BioSection } from './shared/BioSection';

const NeonNightsTemplate: React.FC<TemplateProps> = ({ data }) => {
    const { personal, socialLinks, theme } = data;
    const neonColor = theme.primaryColor || '#00ff9d';

    return (
        <div className="w-full aspect-[1.75/1] bg-[#050505] text-white relative overflow-hidden font-mono rounded-xl shadow-2xl flex flex-col items-center justify-center p-6 border border-neutral-900">
            {/* Neon Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-white shadow-[0_0_20px_5px_rgba(255,255,255,0.5)] rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-full h-[1px]" style={{ backgroundColor: neonColor, boxShadow: `0 0 15px ${neonColor}` }}></div>

            <div className="relative z-10 w-full max-w-2xl flex flex-col md:flex-row items-center gap-6 md:gap-8">
                <div className="relative shrink-0 group">
                    <div className="absolute inset-0 rounded-full blur opacity-50 group-hover:opacity-100 transition-opacity duration-500" style={{ backgroundColor: neonColor }}></div>
                    <Avatar
                        url={personal.avatarUrl}
                        alt={personal.fullName}
                        className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 relative z-10 bg-black"
                        imageClassName="w-full h-full object-cover"
                        style={{ borderColor: neonColor }}
                    />
                </div>

                <div className="flex-grow text-center md:text-left w-full">
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tighter mb-1 uppercase" style={{ textShadow: `0 0 10px ${neonColor}80` }}>
                        {personal.fullName}
                    </h1>
                    <p className="text-xs md:text-sm font-medium tracking-widest text-neutral-400 mb-4">
                        &lt;{personal.jobTitle} /&gt;
                    </p>

                    <BioSection
                        text={personal.about || personal.tagline}
                        label=""
                        className="mb-4 border-l-2 pl-3 border-neutral-800"
                        textClassName="text-[10px] md:text-xs text-neutral-500 font-light"
                    />

                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-neutral-900 pt-4 mt-auto">
                        <ContactDetails
                            email={personal.email}
                            website={personal.website}
                            className="flex gap-4"
                            itemClassName="text-[10px] text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5"
                            iconWrapperClassName="hidden"
                        />

                        <SocialLinks
                            links={socialLinks}
                            className="flex gap-3"
                            renderItem={(link, url, icon) => (
                                <a
                                    key={link.id}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-neutral-500 hover:text-white transition-all hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]"
                                >
                                    {icon}
                                </a>
                            )}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NeonNightsTemplate;
