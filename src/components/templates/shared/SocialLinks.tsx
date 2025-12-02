import React from 'react';
import { SocialLink } from '@/types/card';
import { ensureProtocol } from '@/utils/url';
import { SocialIcon } from './SocialIcon';

interface SocialLinksProps {
    links: SocialLink[];
    className?: string;
    renderItem?: (link: SocialLink, url: string, icon: React.ReactNode) => React.ReactNode;
}

export const SocialLinks: React.FC<SocialLinksProps> = ({ links, className, renderItem }) => {
    if (!links || links.length === 0) return null;

    return (
        <div className={className}>
            {links.map((link) => {
                const url = ensureProtocol(link.url);
                const icon = <SocialIcon platform={link.platform} />;

                if (renderItem) {
                    return renderItem(link, url, icon);
                }

                // Default rendering if no renderItem provided (fallback)
                return (
                    <a
                        key={link.id}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm hover:underline"
                    >
                        {icon}
                        <span>{link.platform}</span>
                    </a>
                );
            })}
        </div>
    );
};
