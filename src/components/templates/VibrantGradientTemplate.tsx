import React from 'react';
import { TemplateProps } from '@/types/card';
import { SocialLinks } from './shared/SocialLinks';
import { ContactDetails } from './shared/ContactDetails';
import { Avatar } from './shared/Avatar';
import { BioSection } from './shared/BioSection';

const VibrantGradientTemplate: React.FC<TemplateProps> = ({ data }) => {
    const { personal, socialLinks } = data;

    return (
        <div className="w-full aspect-[1.75/1] relative overflow-hidden font-sans rounded-xl shadow-2xl text-white">
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 animate-gradient-xy"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>

            <div className="absolute inset-4 bg-white/10 backdrop-blur-sm rounded-xl p-6 flex flex-col justify-between border border-white/20 shadow-lg">
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-black tracking-tight drop-shadow-md">
                            {personal.fullName}
                        </h1>
                        <p className="text-sm md:text-base font-bold uppercase tracking-widest opacity-90 mt-1">
                            {personal.jobTitle}
                        </p>
                    </div>
                    <Avatar
                        url={personal.avatarUrl}
                        alt={personal.fullName}
                        className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-white/30 shadow-xl"
                    />
                </div>

                <div className="flex-grow flex items-center my-2">
                    <BioSection
                        text={personal.about || personal.tagline}
                        label=""
                        className="mt-0"
                        textClassName="text-xs md:text-sm font-medium text-white drop-shadow-sm leading-relaxed max-w-[80%]"
                    />
                </div>

                <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                    <ContactDetails
                        email={personal.email}
                        phone={personal.phone}
                        website={personal.website}
                        className="flex flex-col gap-1"
                        itemClassName="flex items-center gap-2 text-xs font-bold hover:text-yellow-200 transition-colors"
                        iconWrapperClassName="bg-white/20 p-1 rounded-full"
                        iconClassName="w-3 h-3"
                    />

                    <SocialLinks
                        links={socialLinks}
                        className="flex gap-2"
                        renderItem={(link, url, icon) => (
                            <a
                                key={link.id}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-white text-pink-600 rounded-full hover:scale-110 hover:rotate-6 transition-all shadow-md"
                            >
                                {icon}
                            </a>
                        )}
                    />
                </div>
            </div>
        </div>
    );
};

export default VibrantGradientTemplate;
