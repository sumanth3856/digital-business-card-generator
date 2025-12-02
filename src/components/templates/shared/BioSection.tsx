import React from 'react';

interface BioSectionProps {
    text?: string;
    label?: string;
    className?: string;
    textClassName?: string;
    labelClassName?: string;
    style?: React.CSSProperties;
}

export const BioSection: React.FC<BioSectionProps> = ({
    text,
    label = "About Me",
    className = "mt-4",
    textClassName = "text-xs leading-relaxed text-neutral-600",
    labelClassName = "text-xs font-semibold text-neutral-900 mb-1 uppercase tracking-wider",
    style
}) => {
    if (!text) return null;

    return (
        <div className={className} style={style}>
            {label && <h3 className={labelClassName}>{label}</h3>}
            <div className="overflow-y-auto max-h-[80px] pr-1 scrollbar-hide">
                <p className={textClassName}>{text}</p>
            </div>
        </div>
    );
};
