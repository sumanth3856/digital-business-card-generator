'use client';

import React, { Suspense, useState } from 'react';
import CardPreview from '@/components/preview/CardPreview';
import Editor from '@/components/editor/Editor';
import { Loader2, Edit3, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function CreatePage() {
    const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');

    return (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-73px)] overflow-hidden">
            {/* Mobile Tab Switcher */}
            <div className="lg:hidden flex border-b border-neutral-200 bg-white shrink-0">
                <button
                    onClick={() => setActiveTab('editor')}
                    className={cn(
                        "flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors",
                        activeTab === 'editor'
                            ? "text-red-600 border-b-2 border-red-600 bg-red-50/50"
                            : "text-neutral-600 hover:bg-neutral-50"
                    )}
                >
                    <Edit3 className="w-4 h-4" />
                    Editor
                </button>
                <button
                    onClick={() => setActiveTab('preview')}
                    className={cn(
                        "flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors",
                        activeTab === 'preview'
                            ? "text-red-600 border-b-2 border-red-600 bg-red-50/50"
                            : "text-neutral-600 hover:bg-neutral-50"
                    )}
                >
                    <Eye className="w-4 h-4" />
                    Preview
                </button>
            </div>

            {/* Editor Section */}
            <div className={cn(
                "w-full lg:w-1/3 lg:min-w-[400px] h-full border-b lg:border-b-0 lg:border-r border-neutral-200 bg-white transition-transform duration-300 ease-in-out",
                "lg:translate-x-0 lg:block", // Always show on desktop
                activeTab === 'editor' ? "block" : "hidden" // Toggle on mobile
            )}>
                <Suspense fallback={<div className="flex items-center justify-center h-full"><Loader2 className="w-8 h-8 animate-spin text-red-600" /></div>}>
                    <Editor />
                </Suspense>
            </div>

            {/* Preview Section */}
            <div className={cn(
                "w-full lg:flex-1 h-full bg-neutral-100 transition-transform duration-300 ease-in-out",
                "lg:translate-x-0 lg:block", // Always show on desktop
                activeTab === 'preview' ? "block" : "hidden" // Toggle on mobile
            )}>
                <CardPreview />
            </div>
        </div>
    );
}
