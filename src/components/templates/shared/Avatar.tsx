import React from 'react';
import { User } from 'lucide-react';

interface AvatarProps {
    url?: string;
    alt?: string;
    fallback?: string;
    className?: string;
    imageClassName?: string;
    style?: React.CSSProperties;
}

export const Avatar: React.FC<AvatarProps> = ({
    url,
    alt = "User",
    fallback,
    className = "w-20 h-20 rounded-full overflow-hidden bg-neutral-100 flex items-center justify-center shrink-0",
    imageClassName = "w-full h-full object-cover",
    style
}) => {
    if (url) {
        return (
            <div className={className} style={style}>
                <img src={url} alt={alt} className={imageClassName} />
            </div>
        );
    }

    return (
        <div className={className}>
            {fallback ? (
                <span className="text-xl font-bold text-neutral-400">{fallback}</span>
            ) : (
                <User className="w-1/2 h-1/2 text-neutral-300" />
            )}
        </div>
    );
};
