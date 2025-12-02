'use client';

import React from 'react';
import { useCardStore } from '@/store/card-store';
import { CardRenderer } from './CardRenderer';

const CardPreview = () => {
    const { data } = useCardStore();

    return (
        <div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-900 p-8 overflow-auto">
            <div id="card-preview-element" className="w-full max-w-[650px] aspect-[1.75/1] relative shadow-2xl rounded-xl">
                <CardRenderer data={data} templateId={data.templateId} />
            </div>
        </div>
    );
};

export default CardPreview;
