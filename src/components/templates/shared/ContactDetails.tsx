import React from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { ensureProtocol } from '@/utils/url';

interface ContactDetailsProps {
    email?: string;
    phone?: string;
    location?: string;
    website?: string;
    className?: string;
    itemClassName?: string;
    iconClassName?: string;
    textClassName?: string;
    iconWrapperClassName?: string;
}

export const ContactDetails: React.FC<ContactDetailsProps> = ({
    email,
    phone,
    location,
    website,
    className = "space-y-2",
    itemClassName = "flex items-center gap-2 group",
    iconClassName = "w-3 h-3",
    textClassName = "text-xs",
    iconWrapperClassName = "w-6 h-6 flex items-center justify-center rounded-full border border-current opacity-70"
}) => {
    return (
        <div className={className}>
            {email && (
                <a href={`mailto:${email}`} className={itemClassName}>
                    <div className={iconWrapperClassName}>
                        <Mail className={iconClassName} />
                    </div>
                    <span className={`${textClassName} break-all`}>{email}</span>
                </a>
            )}
            {phone && (
                <a href={`tel:${phone}`} className={itemClassName}>
                    <div className={iconWrapperClassName}>
                        <Phone className={iconClassName} />
                    </div>
                    <span className={`${textClassName} break-all`}>{phone}</span>
                </a>
            )}
            {location && (
                <div className={itemClassName}>
                    <div className={iconWrapperClassName}>
                        <MapPin className={iconClassName} />
                    </div>
                    <span className={`${textClassName} break-words`}>{location}</span>
                </div>
            )}
            {website && (
                <a href={ensureProtocol(website)} target="_blank" rel="noopener noreferrer" className={itemClassName}>
                    <div className={iconWrapperClassName}>
                        <Globe className={iconClassName} />
                    </div>
                    <span className={`${textClassName} break-all`}>{website.replace(/^https?:\/\//, '')}</span>
                </a>
            )}
        </div>
    );
};
