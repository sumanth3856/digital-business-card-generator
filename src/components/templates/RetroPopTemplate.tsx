import React from 'react';
import { TemplateProps } from '@/types/card';
import { SocialLinks } from './shared/SocialLinks';
import { ContactDetails } from './shared/ContactDetails';
import { Avatar } from './shared/Avatar';
import { BioSection } from './shared/BioSection';

const RetroPopTemplate: React.FC<TemplateProps> = ({ data }) => {
    const { personal, socialLinks } = data;

    return (
        <div className="w-full aspect-[1.75/1] bg-[#FFFAF0] relative overflow-hidden font-mono rounded-xl shadow-2xl border-4 border-black p-6 flex flex-col">
            {/* Retro Shapes */}
            <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-[#FF6B6B] rounded-full border-4 border-black"></div>
            <div className="absolute bottom-[-20px] left-[-20px] w-32 h-32 bg-[#4ECDC4] rotate-12 border-4 border-black"></div>
            <div className="absolute top-[40%] left-[20%] w-4 h-4 bg-[#FFE66D] rounded-full border-2 border-black"></div>
            <div className="absolute top-[60%] right-[30%] w-6 h-6 bg-[#FF6B6B] rotate-45 border-2 border-black"></div>

            <div className="relative z-10 flex gap-6 h-full">
                <div className="w-1/3 flex flex-col items-center justify-center border-r-4 border-black pr-6 bg-white/50 backdrop-blur-sm rounded-l-lg">
                    <Avatar
                        url={personal.avatarUrl}
                        alt={personal.fullName}
                        className="w-24 h-24 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-4"
                        imageClassName="w-full h-full object-cover grayscale contrast-125"
                    />
                    <div className="w-full">
                        <SocialLinks
                            links={socialLinks}
                            className="flex flex-wrap justify-center gap-2"
                            renderItem={(link, url, icon) => (
                                <a
                                    key={link.id}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1.5 bg-white border-2 border-black hover:bg-black hover:text-white transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                                >
                                    {icon}
                                </a>
                            )}
                        />
                    </div>
                </div>

                <div className="w-2/3 flex flex-col justify-between py-2">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter bg-[#FFE66D] inline-block px-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-2 transform -rotate-1">
                            {personal.fullName}
                        </h1>
                        <p className="text-sm font-bold bg-black text-white inline-block px-2 py-0.5 transform rotate-1">
                            {personal.jobTitle}
                        </p>
                    </div>

                    <BioSection
                        text={personal.about || personal.tagline}
                        className="bg-white border-2 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] max-h-[100px] overflow-y-auto"
                        textClassName="text-xs font-bold text-black"
                        label=""
                    />

                    <ContactDetails
                        email={personal.email}
                        phone={personal.phone}
                        website={personal.website}
                        className="flex flex-wrap gap-x-4 gap-y-1 bg-white/80 p-2 border-2 border-black rounded-lg"
                        itemClassName="flex items-center gap-1 text-xs font-bold hover:underline"
                        iconWrapperClassName="hidden"
                    />
                </div>
            </div>
        </div>
    );
};

export default RetroPopTemplate;
