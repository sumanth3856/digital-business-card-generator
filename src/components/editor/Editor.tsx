'use client';

import React, { useState, useEffect } from 'react';
import { useCardStore } from '@/store/card-store';
import { templates } from '@/components/templates/template-registry';
import { useRouter, useSearchParams } from 'next/navigation';
import { AuthModal } from '@/components/auth/AuthModal';
import { ArrowLeft, Plus, Trash2, Github, Linkedin, Twitter, Globe, Mail, Instagram, Download, ChevronDown } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { SocialLink } from '@/types/card';
import { downloadCard } from '@/utils/export';

const Editor = () => {
    const { data, updatePersonal, setTemplate, updateTheme, saveCard, isSaving, addSocialLink, removeSocialLink } = useCardStore();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [newLinkPlatform, setNewLinkPlatform] = useState<SocialLink['platform']>('website');
    const [newLinkUrl, setNewLinkUrl] = useState('');

    const [isDownloadMenuOpen, setIsDownloadMenuOpen] = useState(false);

    // Handle template selection from URL
    useEffect(() => {
        const templateParam = searchParams.get('template');
        if (templateParam && templates[templateParam]) {
            setTemplate(templateParam);
        }
    }, [searchParams, setTemplate]);

    // Autofill user details
    useEffect(() => {
        const autofill = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (user) {
                if (!data.personal.email) updatePersonal('email', user.email || '');
                // If we had a name in metadata, we could use it: user.user_metadata.full_name
            }
        };
        autofill();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSave = async () => {
        try {
            await saveCard();
            alert('Card saved successfully!');
        } catch (error) {
            console.error('Save failed:', error);
            const err = error as Error;
            if (err.message === 'User not authenticated' || err.message?.includes('Auth session missing')) {
                setIsAuthModalOpen(true);
            } else {
                alert(`Failed to save card: ${err.message || 'Unknown error'}`);
            }
        }
    };

    const checkAuthAndDownload = async () => {
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
            setIsAuthModalOpen(true);
            return;
        }

        setIsDownloadMenuOpen(!isDownloadMenuOpen);
    };

    const handleExport = async (format: 'png' | 'jpg' | 'pdf') => {
        try {
            await downloadCard('card-preview-element', format, data.personal.fullName || 'my-business-card');
            setIsDownloadMenuOpen(false);
        } catch (error) {
            console.error('Download failed:', error);
            alert('Failed to download card. Please try again.');
        }
    };

    const handleAddLink = () => {
        if (!newLinkUrl) return;
        addSocialLink({
            id: crypto.randomUUID(),
            platform: newLinkPlatform,
            url: newLinkUrl,
        });
        setNewLinkUrl('');
    };

    return (
        <div className="h-full overflow-y-auto p-6 space-y-8 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800">
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

            {/* Header */}
            <div className="flex justify-between items-center sticky top-0 bg-white dark:bg-slate-950 z-10 py-2 border-b border-slate-100 dark:border-slate-800 mb-6">
                <button
                    onClick={() => router.push('/#templates')}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                    title="Back to Home"
                >
                    <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                </button>
                <h2 className="text-xl font-bold">Editor</h2>
                <div className="flex items-center gap-2 relative">
                    <div className="relative">
                        <button
                            onClick={checkAuthAndDownload}
                            className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-2"
                            title="Download"
                        >
                            <Download className="w-5 h-5" />
                            <span className="text-sm font-medium hidden sm:inline">Download</span>
                        </button>

                        {isDownloadMenuOpen && (
                            <div className="absolute top-full right-0 mt-2 w-32 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xl z-50 overflow-hidden">
                                <button
                                    onClick={() => handleExport('png')}
                                    className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                >
                                    PNG Image
                                </button>
                                <button
                                    onClick={() => handleExport('jpg')}
                                    className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                >
                                    JPG Image
                                </button>
                                <button
                                    onClick={() => handleExport('pdf')}
                                    className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                >
                                    PDF Document
                                </button>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors text-sm font-medium"
                    >
                        {isSaving ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </div>

            {/* Templates */}
            <div>
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Template</h3>
                <div className="grid grid-cols-2 gap-3">
                    {Object.values(templates).map((template) => (
                        <button
                            key={template.id}
                            onClick={() => setTemplate(template.id)}
                            className={`p-3 rounded-xl border-2 text-left transition-all ${data.templateId === template.id
                                ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                                : 'border-slate-200 dark:border-slate-800 hover:border-blue-300'
                                }`}
                        >
                            <div className="font-semibold text-sm">{template.name}</div>
                        </button>
                    ))}

                </div>
            </div>

            {/* Social Links */}
            <div>
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Social Links</h3>

                {/* Add New Link */}
                <div className="flex gap-2 mb-4">
                    <select
                        value={newLinkPlatform}
                        onChange={(e) => setNewLinkPlatform(e.target.value as SocialLink['platform'])}
                        className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent text-sm"
                    >
                        <option value="website">Website</option>
                        <option value="github">GitHub</option>
                        <option value="linkedin">LinkedIn</option>
                        <option value="twitter">Twitter</option>
                        <option value="instagram">Instagram</option>
                        <option value="email">Email</option>
                        <option value="other">Other</option>
                    </select>
                    <input
                        type="url"
                        placeholder="URL"
                        value={newLinkUrl}
                        onChange={(e) => setNewLinkUrl(e.target.value)}
                        className="flex-1 p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent text-sm"
                    />
                    <button
                        onClick={handleAddLink}
                        className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        <Plus className="w-5 h-5" />
                    </button>
                </div>

                {/* List Links */}
                <div className="space-y-2">
                    {data.socialLinks.map((link) => (
                        <div key={link.id} className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-900 rounded-lg group">
                            <div className="p-1.5 bg-white dark:bg-slate-800 rounded shadow-sm text-slate-600 dark:text-slate-400">
                                {link.platform === 'github' && <Github className="w-4 h-4" />}
                                {link.platform === 'linkedin' && <Linkedin className="w-4 h-4" />}
                                {link.platform === 'twitter' && <Twitter className="w-4 h-4" />}
                                {link.platform === 'instagram' && <Instagram className="w-4 h-4" />}
                                {link.platform === 'email' && <Mail className="w-4 h-4" />}
                                {(link.platform === 'website' || link.platform === 'other') && <Globe className="w-4 h-4" />}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-xs font-medium text-slate-500 uppercase">{link.platform}</div>
                                <div className="text-sm truncate">{link.url}</div>
                            </div>
                            <button
                                onClick={() => removeSocialLink(link.id)}
                                className="p-1.5 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Theme */}
            <div>
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Theme</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs text-slate-500 mb-1">Primary</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="color"
                                value={data.theme.primaryColor}
                                onChange={(e) => updateTheme('primaryColor', e.target.value)}
                                className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                            />
                            <span className="text-xs font-mono text-slate-500">{data.theme.primaryColor}</span>
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs text-slate-500 mb-1">Background</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="color"
                                value={data.theme.backgroundColor}
                                onChange={(e) => updateTheme('backgroundColor', e.target.value)}
                                className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                            />
                            <span className="text-xs font-mono text-slate-500">{data.theme.backgroundColor}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Editor;
