import React from 'react';
import { TemplateProps } from '@/types/card';
import { SocialLinks } from './shared/SocialLinks';
import { ContactDetails } from './shared/ContactDetails';
import { Avatar } from './shared/Avatar';
import { BioSection } from './shared/BioSection';

const DarkElegantTemplate: React.FC<TemplateProps> = ({ data }) => {
    const { personal, socialLinks, theme } = data;
    const accentColor = theme.primaryColor || '#d4af37'; // Gold default

    return (
        <div className="w-full aspect-[1.75/1] bg-[#0a0a0a] text-white relative overflow-hidden font-serif rounded-xl shadow-2xl flex flex-col items-center justify-center p-6 md:p-8 text-center border border-neutral-800">
            {/* Border Frame */}
            <div className="absolute inset-3 border border-neutral-800 rounded-lg pointer-events-none"></div>
            <div className="absolute inset-4 border border-neutral-800/50 rounded-md pointer-events-none"></div>

            <div className="relative z-10 flex flex-col items-center w-full max-w-lg">
                <Avatar
                    url={personal.avatarUrl}
                    alt={personal.fullName}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 mb-4 shadow-2xl"
                    imageClassName="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    fallback={personal.fullName.charAt(0)}
                />

                <h1 className="text-2xl md:text-4xl font-medium tracking-wide mb-1" style={{ color: accentColor }}>
                    {personal.fullName}
                </h1>
                <p className="text-xs md:text-sm text-neutral-400 uppercase tracking-[0.2em] mb-6 font-sans">
                    {personal.jobTitle} {personal.company && `| ${personal.company}`}
                </p>

                <div className="w-12 h-px bg-neutral-800 mb-6"></div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left font-sans">
                    <div className="hidden md:block text-right">
                        <ContactDetails
                            email={personal.email}
                            phone={personal.phone}
                            className="space-y-1"
                            itemClassName="text-[10px] text-neutral-500 hover:text-white transition-colors block"
                            iconWrapperClassName="hidden"
                        />
                    </div>

                    <div className="md:col-span-1 text-center">
                        <BioSection
                            text={personal.about || personal.tagline}
                            label=""
                            className="mt-0"
                            textClassName="text-[10px] md:text-xs text-neutral-300 italic leading-relaxed"
                        />
                        <SocialLinks
                            links={socialLinks}
                            className="flex justify-center gap-4 mt-4"
                            renderItem={(link, url, icon) => (
                                <a
                                    key={link.id}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-neutral-600 hover:text-[#d4af37] transition-colors"
                                >
                                    {icon}
                                </a>
                            )}
                        />
                    </div>

                    <div className="hidden md:block text-left">
                        <ContactDetails
                            location={personal.location}
                            website={personal.website}
                            className="space-y-1"
                            itemClassName="text-[10px] text-neutral-500 hover:text-white transition-colors block"
                            iconWrapperClassName="hidden"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DarkElegantTemplate;
