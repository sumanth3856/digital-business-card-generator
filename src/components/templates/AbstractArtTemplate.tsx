import React from 'react';
import { TemplateProps } from '@/types/card';
import { SocialLinks } from './shared/SocialLinks';
import { ContactDetails } from './shared/ContactDetails';
import { Avatar } from './shared/Avatar';
import { BioSection } from './shared/BioSection';

const AbstractArtTemplate: React.FC<TemplateProps> = ({ data }) => {
    const { personal, socialLinks, theme } = data;
    const primaryColor = theme.primaryColor || '#6366f1';

    return (
        <div className="w-full aspect-[1.75/1] bg-[#f8fafc] text-slate-800 relative overflow-hidden font-sans rounded-xl shadow-2xl">
            {/* Abstract Shapes */}
            <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[120%] bg-slate-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[120%] bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[120%] bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

            <div className="relative z-10 h-full p-6 md:p-8 flex flex-col md:flex-row items-center gap-8">
                <div className="flex flex-col items-center gap-4 shrink-0">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-pink-500 rounded-full blur-lg opacity-50"></div>
                        <Avatar
                            url={personal.avatarUrl}
                            alt={personal.fullName}
                            className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-xl relative z-10"
                            imageClassName="w-full h-full object-cover"
                        />
                    </div>
                    <SocialLinks
                        links={socialLinks}
                        className="flex gap-2"
                        renderItem={(link, url, icon) => (
                            <a
                                key={link.id}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-white/50 backdrop-blur-sm rounded-full hover:bg-white hover:text-indigo-600 transition-all shadow-sm"
                            >
                                {icon}
                            </a>
                        )}
                    />
                </div>

                <div className="flex-grow text-center md:text-left bg-white/30 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-lg h-full flex flex-col justify-center">
                    <h1 className="text-2xl md:text-4xl font-black tracking-tight text-slate-900 mb-1">
                        {personal.fullName}
                    </h1>
                    <p className="text-sm font-bold text-indigo-600 uppercase tracking-wide mb-4">
                        {personal.jobTitle}
                    </p>

                    <BioSection
                        text={personal.about || personal.tagline}
                        label=""
                        className="mb-4"
                        textClassName="text-xs md:text-sm text-slate-600 font-medium leading-relaxed"
                    />

                    <div className="mt-auto pt-4 border-t border-slate-200/50">
                        <ContactDetails
                            email={personal.email}
                            phone={personal.phone}
                            location={personal.location}
                            website={personal.website}
                            className="grid grid-cols-2 gap-2"
                            itemClassName="flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
                            iconWrapperClassName="hidden"
                            iconClassName="w-3.5 h-3.5"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AbstractArtTemplate;
