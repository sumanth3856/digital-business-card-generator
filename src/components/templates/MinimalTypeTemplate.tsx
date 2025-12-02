import React from 'react';
import { TemplateProps } from '@/types/card';
import { SocialLinks } from './shared/SocialLinks';
import { ContactDetails } from './shared/ContactDetails';
import { BioSection } from './shared/BioSection';

const MinimalTypeTemplate: React.FC<TemplateProps> = ({ data }) => {
    const { personal, socialLinks } = data;

    return (
        <div className="w-full aspect-[1.75/1] bg-white text-black relative overflow-hidden font-sans rounded-xl shadow-2xl p-8 md:p-10 flex flex-col justify-between">
            <div>
                <h1 className="text-4xl md:text-6xl font-light tracking-tighter leading-none mb-2">
                    {personal.fullName}
                </h1>
                <p className="text-sm md:text-base font-normal text-neutral-500">
                    {personal.jobTitle} — {personal.company}
                </p>
            </div>

            <div className="grid grid-cols-2 gap-8">
                <div>
                    <BioSection
                        text={personal.about || personal.tagline}
                        label="About"
                        className="mt-0"
                        textClassName="text-xs text-neutral-600 leading-relaxed max-w-xs"
                        labelClassName="text-[10px] font-bold uppercase tracking-widest mb-2 text-neutral-400"
                    />
                </div>

                <div className="flex flex-col justify-end items-start gap-6">
                    <ContactDetails
                        email={personal.email}
                        phone={personal.phone}
                        website={personal.website}
                        className="space-y-1"
                        itemClassName="text-xs font-medium hover:underline decoration-neutral-300 underline-offset-4 block"
                        iconWrapperClassName="hidden"
                    />

                    <SocialLinks
                        links={socialLinks}
                        className="flex gap-4"
                        renderItem={(link, url, icon) => (
                            <a
                                key={link.id}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-neutral-400 hover:text-black transition-colors"
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

export default MinimalTypeTemplate;
