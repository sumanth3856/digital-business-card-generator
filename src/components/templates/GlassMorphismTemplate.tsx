import React from 'react';
import { TemplateProps } from '@/types/card';
import { SocialLinks } from './shared/SocialLinks';
import { ContactDetails } from './shared/ContactDetails';
import { Avatar } from './shared/Avatar';
import { BioSection } from './shared/BioSection';

const GlassMorphismTemplate: React.FC<TemplateProps> = ({ data }) => {
    const { personal, socialLinks, theme } = data;
    const primaryColor = theme.primaryColor || '#3b82f6';

    return (
        <div className="w-full aspect-[1.75/1] relative overflow-hidden font-sans rounded-xl shadow-2xl text-white">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>

            {/* Decorative Orbs */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[80%] rounded-full bg-purple-600/30 blur-[60px]"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[80%] rounded-full bg-blue-600/30 blur-[60px]"></div>

            {/* Glass Card */}
            <div className="absolute inset-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 flex flex-col md:flex-row gap-6 shadow-inner">

                {/* Left Column: Avatar & Contact */}
                <div className="flex flex-col items-center md:items-start gap-4 shrink-0 md:w-1/3 border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0 md:pr-4">
                    <Avatar
                        url={personal.avatarUrl}
                        alt={personal.fullName}
                        className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-white/30 shadow-lg"
                    />
                    <div className="text-center md:text-left w-full">
                        <ContactDetails
                            email={personal.email}
                            phone={personal.phone}
                            location={personal.location}
                            website={personal.website}
                            className="space-y-2 mt-2"
                            itemClassName="flex items-center gap-2 text-xs text-gray-200 hover:text-white transition-colors"
                            iconWrapperClassName="hidden"
                        />
                    </div>
                </div>

                {/* Right Column: Info & Bio */}
                <div className="flex flex-col flex-grow min-w-0">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                            {personal.fullName}
                        </h1>
                        <p className="text-sm font-medium text-blue-300 tracking-wide uppercase mt-1">
                            {personal.jobTitle}
                        </p>
                        {personal.company && (
                            <p className="text-xs text-gray-400 mt-0.5">{personal.company}</p>
                        )}
                    </div>

                    <BioSection
                        text={personal.about || personal.tagline}
                        className="mt-4 flex-grow"
                        textClassName="text-xs text-gray-300 leading-relaxed"
                        labelClassName="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1"
                    />

                    <div className="mt-auto pt-4">
                        <SocialLinks
                            links={socialLinks}
                            className="flex gap-3"
                            renderItem={(link, url, icon) => (
                                <a
                                    key={link.id}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-white/5 hover:bg-white/20 rounded-lg transition-all hover:scale-110 text-white border border-white/10"
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

export default GlassMorphismTemplate;
