import React from 'react';
import { TemplateProps } from '@/types/card';
import { SocialLinks } from './shared/SocialLinks';
import { ContactDetails } from './shared/ContactDetails';
import { BioSection } from './shared/BioSection';

const SwissDesignTemplate: React.FC<TemplateProps> = ({ data }) => {
    const { personal, socialLinks, theme } = data;
    const primaryColor = theme.primaryColor || '#ef4444';

    return (
        <div className="w-full aspect-[1.75/1] bg-[#f5f5f5] text-black relative overflow-hidden font-sans rounded-xl shadow-2xl flex">
            {/* Grid Background */}
            <div className="absolute inset-0" style={{
                backgroundImage: 'linear-gradient(#e5e5e5 1px, transparent 1px), linear-gradient(90deg, #e5e5e5 1px, transparent 1px)',
                backgroundSize: '20px 20px'
            }}></div>

            {/* Left Color Bar */}
            <div className="w-16 md:w-24 h-full shrink-0 flex flex-col items-center justify-between py-6 relative z-10" style={{ backgroundColor: primaryColor }}>
                <div className="text-white font-black text-4xl md:text-5xl -rotate-90 whitespace-nowrap origin-center translate-y-20 opacity-20">
                    SWISS
                </div>
                <div className="flex flex-col gap-3 items-center">
                    <SocialLinks
                        links={socialLinks}
                        className="flex flex-col gap-3"
                        renderItem={(link, url, icon) => (
                            <a
                                key={link.id}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white/80 hover:text-white transition-transform hover:scale-110"
                            >
                                {icon}
                            </a>
                        )}
                    />
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow p-6 md:p-8 flex flex-col relative z-10">
                <div className="border-b-4 border-black pb-4 mb-4">
                    <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none">
                        {personal.fullName.split(' ')[0]}
                        <br />
                        <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, black, ${primaryColor})` }}>
                            {personal.fullName.split(' ').slice(1).join(' ')}
                        </span>
                    </h1>
                </div>

                <div className="grid grid-cols-2 gap-6 flex-grow min-h-0">
                    <div className="flex flex-col justify-between">
                        <div>
                            <p className="text-sm md:text-base font-bold uppercase tracking-wide mb-1">{personal.jobTitle}</p>
                            <p className="text-xs text-neutral-500 font-medium">{personal.company}</p>
                        </div>
                        <ContactDetails
                            email={personal.email}
                            phone={personal.phone}
                            location={personal.location}
                            website={personal.website}
                            className="space-y-1.5 mt-auto"
                            itemClassName="flex items-center gap-2 text-xs font-medium hover:underline decoration-2"
                            iconWrapperClassName="hidden"
                        />
                    </div>

                    <div className="border-l-2 border-neutral-200 pl-6 flex flex-col">
                        <BioSection
                            text={personal.about || personal.tagline}
                            label="Manifesto"
                            className="h-full"
                            textClassName="text-xs font-medium leading-relaxed text-neutral-800 text-justify"
                            labelClassName="text-xs font-black uppercase tracking-widest mb-2 text-neutral-400"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SwissDesignTemplate;
