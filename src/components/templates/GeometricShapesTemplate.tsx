import React from 'react';
import { TemplateProps } from '@/types/card';
import { SocialLinks } from './shared/SocialLinks';
import { ContactDetails } from './shared/ContactDetails';
import { BioSection } from './shared/BioSection';

const GeometricShapesTemplate: React.FC<TemplateProps> = ({ data }) => {
    const { personal, socialLinks, theme } = data;
    const primaryColor = theme.primaryColor || '#2563eb';

    return (
        <div className="w-full aspect-[1.75/1] bg-white text-neutral-800 relative overflow-hidden font-sans rounded-xl shadow-2xl flex">
            {/* Geometric Sidebar */}
            <div className="w-1/3 h-full relative overflow-hidden bg-neutral-100">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-neutral-900 clip-path-polygon-[0_0,100%_0,0_100%]"></div>
                <div className="absolute bottom-0 right-0 w-full h-1/2" style={{ backgroundColor: primaryColor, clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}></div>

                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-4 text-center">
                    <div className="w-24 h-24 bg-white rounded-full p-1 shadow-xl mb-4">
                        <img
                            src={personal.avatarUrl || `https://ui-avatars.com/api/?name=${personal.fullName}&background=random`}
                            alt={personal.fullName}
                            className="w-full h-full rounded-full object-cover"
                        />
                    </div>
                    <SocialLinks
                        links={socialLinks}
                        className="flex flex-wrap justify-center gap-2"
                        renderItem={(link, url, icon) => (
                            <a
                                key={link.id}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 bg-white rounded-full shadow-md text-neutral-800 hover:text-white hover:bg-neutral-900 transition-colors"
                            >
                                {icon}
                            </a>
                        )}
                    />
                </div>
            </div>

            {/* Content Area */}
            <div className="w-2/3 p-8 flex flex-col justify-center relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-neutral-50 rounded-bl-full -z-10"></div>

                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 mb-1">
                    {personal.fullName}
                </h1>
                <p className="text-sm font-semibold uppercase tracking-wider text-neutral-500 mb-6 flex items-center gap-2">
                    <span className="w-8 h-1" style={{ backgroundColor: primaryColor }}></span>
                    {personal.jobTitle}
                </p>

                <BioSection
                    text={personal.about || personal.tagline}
                    className="mb-6 border-l-4 pl-4 py-1"
                    textClassName="text-xs text-neutral-600 leading-relaxed"
                    label=""
                    style={{ borderColor: primaryColor }}
                />

                <ContactDetails
                    email={personal.email}
                    phone={personal.phone}
                    location={personal.location}
                    website={personal.website}
                    className="grid grid-cols-2 gap-2 mt-auto"
                    itemClassName="flex items-center gap-2 text-xs font-medium text-neutral-600 hover:text-neutral-900"
                    iconWrapperClassName="text-neutral-400"
                />
            </div>
        </div>
    );
};

export default GeometricShapesTemplate;
