import React, { Suspense } from 'react';
import CardPreview from '@/components/preview/CardPreview';
import Editor from '@/components/editor/Editor';
import { Loader2 } from 'lucide-react';

export default function CreatePage() {
    return (
        <div className="flex h-screen overflow-hidden">
            <div className="w-1/3 min-w-[400px] h-full">
                <Suspense fallback={<div className="flex items-center justify-center h-full"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>}>
                    <Editor />
                </Suspense>
            </div>
            <div className="flex-1 h-full bg-slate-100 dark:bg-slate-900">
                <CardPreview />
            </div>
        </div>
    );
}
