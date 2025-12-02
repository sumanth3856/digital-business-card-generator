import React from 'react';
import { TemplateProps } from '@/types/card';
import { SocialLinks } from './shared/SocialLinks';
import { ContactDetails } from './shared/ContactDetails';
import { Avatar } from './shared/Avatar';
import { BioSection } from './shared/BioSection';

const NatureZenTemplate: React.FC<TemplateProps> = ({ data }) => {
    const { personal, socialLinks } = data;

    return (
        <div className="w-full aspect-[1.75/1] bg-[#F0F4F1] text-[#2C3E30] relative overflow-hidden font-sans rounded-xl shadow-2xl flex">
            {/* Organic Curve */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-[#DCE7DD] rounded-l-[100px] -mr-10"></div>

            <div className="relative z-10 w-full p-6 md:p-8 flex gap-8 items-center">
                <div className="w-1/2 flex flex-col justify-center h-full">
                    <h1 className="text-3xl md:text-4xl font-serif font-medium tracking-wide mb-2 text-[#1A261D]">
                        {personal.fullName}
                    </h1>
                    <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#5D7A64] mb-6">
                        {personal.jobTitle}
                    </p>

                    <ContactDetails
                        email={personal.email}
                        phone={personal.phone}
                        location={personal.location}
                        className="space-y-2 mb-6"
                        itemClassName="flex items-center gap-3 text-xs text-[#4A5D50] hover:text-[#1A261D] transition-colors group"
                        iconWrapperClassName="w-6 h-6 rounded-full bg-[#E8EFE9] flex items-center justify-center text-[#5D7A64] group-hover:bg-[#5D7A64] group-hover:text-white transition-colors"
                        iconClassName="w-3 h-3"
                    />

                    <SocialLinks
                        links={socialLinks}
                        className="flex gap-3 mt-auto"
                        renderItem={(link, url, icon) => (
                            <a
                                key={link.id}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#5D7A64] hover:text-[#1A261D] transition-colors hover:-translate-y-0.5 transform duration-300"
                            >
                                {icon}
                            </a>
                        )}
                    />
                </div>

                <div className="w-1/2 h-full flex flex-col items-center justify-center text-center pl-4">
                    <Avatar
                        url={personal.avatarUrl}
                        alt={personal.fullName}
                        className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-lg mb-6 object-cover"
                        imageClassName="w-full h-full object-cover sepia-[.2]"
                    />

                    <BioSection
                        text={personal.about || personal.tagline}
                        label=""
                        className="bg-white/60 p-4 rounded-xl backdrop-blur-sm shadow-sm w-full"
                        textClassName="text-xs text-[#4A5D50] italic leading-relaxed"
                    />
                </div>
            </div>
        </div>
    );
};

export default NatureZenTemplate;
