'use client';

import React from 'react';
import { getTemplate } from '@/components/templates/template-registry';
import { CardData } from '@/types/card';

interface CardRendererProps {
    data: CardData;
    templateId: string;
    scale?: number;
}

export const CardRenderer = ({ data, templateId, scale = 1 }: CardRendererProps) => {
    const TemplateComponent = getTemplate(templateId).component;

    return (
        <div
            className="origin-top-left bg-white shadow-2xl rounded-xl overflow-hidden"
            style={{
                transform: `scale(${scale})`,
                width: '100%',
                height: '100%',
            }}
        >
            <TemplateComponent data={data} />
        </div>
    );
};
