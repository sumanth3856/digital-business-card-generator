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
            <div className="lg:hidden flex border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shrink-0">
                <button
                    onClick={() => setActiveTab('editor')}
                    className={cn(
                        "flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors",
                        activeTab === 'editor'
                            ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/50 dark:bg-blue-900/10"
                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900"
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
                            ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/50 dark:bg-blue-900/10"
                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900"
                    )}
                >
                    <Eye className="w-4 h-4" />
                    Preview
                </button>
            </div>

            {/* Editor Section */}
            <div className={cn(
                "w-full lg:w-1/3 lg:min-w-[400px] h-full border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 transition-transform duration-300 ease-in-out",
                "lg:translate-x-0 lg:block", // Always show on desktop
                activeTab === 'editor' ? "block" : "hidden" // Toggle on mobile
            )}>
                <Suspense fallback={<div className="flex items-center justify-center h-full"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>}>
                    <Editor />
                </Suspense>
            </div>

            {/* Preview Section */}
            <div className={cn(
                "w-full lg:flex-1 h-full bg-slate-100 dark:bg-slate-900 transition-transform duration-300 ease-in-out",
                "lg:translate-x-0 lg:block", // Always show on desktop
                activeTab === 'preview' ? "block" : "hidden" // Toggle on mobile
            )}>
                <CardPreview />
            </div>
        </div>
    );
}
