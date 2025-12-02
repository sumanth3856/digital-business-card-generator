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
import { toast } from 'sonner';

import { AnimatePresence, motion } from 'framer-motion';

const Editor = () => {
    const { data, updatePersonal, setTemplate, updateTheme, saveCard, isSaving, addSocialLink, removeSocialLink, resetCard, loadCard } = useCardStore();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [newLinkPlatform, setNewLinkPlatform] = useState<SocialLink['platform']>('website');
    const [newLinkUrl, setNewLinkUrl] = useState('');

    const [isDownloadMenuOpen, setIsDownloadMenuOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<'all' | 'Minimalist' | 'Professional' | 'Creative' | 'Tech'>('all');

    // ...


    // Handle initialization (load existing or reset for new)
    useEffect(() => {
        const cardId = searchParams.get('id');
        const templateParam = searchParams.get('template');

        if (cardId) {
            loadCard(cardId);
        } else {
            // Only reset if we're not already editing a new card (check if data is empty? or just always reset on fresh visit without ID?)
            // Better to always reset if no ID is present to ensure "Create New" means new.
            resetCard();
            if (templateParam && templates[templateParam]) {
                setTemplate(templateParam);
            }
        }
    }, [searchParams, loadCard, resetCard, setTemplate]);

    // Autofill user details
    useEffect(() => {
        const autofill = async () => {
            try {
                const supabase = createClient();
                const { data: { user } } = await supabase.auth.getUser();

                if (user) {
                    if (!data.personal.email) updatePersonal('email', user.email || '');
                    // If we had a name in metadata, we could use it: user.user_metadata.full_name
                }
            } catch (error) {
                console.error('Autofill error (likely storage access):', error);
                // Silently fail for autofill, it's not critical
            }
        };
        autofill();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSave = async () => {
        try {
            await saveCard();
            toast.success('Card saved successfully!');
            router.push('/profile');
        } catch (error) {
            const err = error as Error;
            if (err.message === 'User not authenticated' || err.message?.includes('Auth session missing')) {
                // Expected error when not logged in, just show modal
                setIsAuthModalOpen(true);
            } else {
                console.error('Save failed:', error);
                toast.error(`Failed to save card: ${err.message || 'Unknown error'}`);
            }
        }
    };

    const checkAuthAndDownload = async () => {
        try {
            const supabase = createClient();
            const { data: { session } } = await supabase.auth.getSession();

            if (!session) {
                setIsAuthModalOpen(true);
                return;
            }

            setIsDownloadMenuOpen(!isDownloadMenuOpen);
        } catch (error) {
            console.error('Auth check failed:', error);
            // If storage access fails, assume not authenticated/show modal or just let them try
            setIsAuthModalOpen(true);
        }
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

    const sectionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
    };

    return (
        <div className="h-full overflow-y-auto p-6 space-y-8 bg-white border-r border-neutral-200">
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

            {/* Header */}
            <div className="flex justify-between items-center sticky top-0 bg-white z-10 py-2 border-b border-neutral-100 mb-6">
                <button
                    onClick={() => router.push('/#templates')}
                    className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                    title="Back to Home"
                >
                    <ArrowLeft className="w-5 h-5 text-neutral-600" />
                </button>
                <h2 className="text-xl font-bold">Editor</h2>
                <div className="flex items-center gap-2 relative">
                    <div className="relative">
                        <button
                            onClick={checkAuthAndDownload}
                            className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors flex items-center gap-2"
                            title="Download"
                        >
                            <Download className="w-5 h-5" />
                            <span className="text-sm font-medium hidden sm:inline">Download</span>
                        </button>

                        {isDownloadMenuOpen && (
                            <div className="absolute top-full right-0 mt-2 w-32 bg-white border border-neutral-200 rounded-lg shadow-xl z-50 overflow-hidden">
                                <button
                                    onClick={() => handleExport('png')}
                                    className="w-full px-4 py-2 text-left text-sm hover:bg-neutral-50 transition-colors"
                                >
                                    PNG Image
                                </button>
                                <button
                                    onClick={() => handleExport('jpg')}
                                    className="w-full px-4 py-2 text-left text-sm hover:bg-neutral-50 transition-colors"
                                >
                                    JPG Image
                                </button>
                                <button
                                    onClick={() => handleExport('pdf')}
                                    className="w-full px-4 py-2 text-left text-sm hover:bg-neutral-50 transition-colors"
                                >
                                    PDF Document
                                </button>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors text-sm font-medium"
                    >
                        {isSaving ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </div>

            <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                    visible: { transition: { staggerChildren: 0.1 } }
                }}
                className="space-y-8"
            >
                {/* Personal Information */}
                <motion.div variants={sectionVariants}>
                    <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-3">Personal Information</h3>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="fullName" className="block text-xs text-neutral-500 mb-1">Full Name</label>
                            <input
                                id="fullName"
                                name="fullName"
                                autoComplete="name"
                                type="text"
                                value={data.personal.fullName}
                                onChange={(e) => updatePersonal('fullName', e.target.value)}
                                className="w-full p-2 rounded-lg border border-neutral-200 bg-transparent text-sm"
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label htmlFor="jobTitle" className="block text-xs text-neutral-500 mb-1">Job Title</label>
                            <input
                                id="jobTitle"
                                name="jobTitle"
                                autoComplete="organization-title"
                                type="text"
                                value={data.personal.jobTitle}
                                onChange={(e) => updatePersonal('jobTitle', e.target.value)}
                                className="w-full p-2 rounded-lg border border-neutral-200 bg-transparent text-sm"
                                placeholder="Software Engineer"
                            />
                        </div>
                        <div>
                            <label htmlFor="company" className="block text-xs text-neutral-500 mb-1">Company</label>
                            <input
                                id="company"
                                name="company"
                                autoComplete="organization"
                                type="text"
                                value={data.personal.company}
                                onChange={(e) => updatePersonal('company', e.target.value)}
                                className="w-full p-2 rounded-lg border border-neutral-200 bg-transparent text-sm"
                                placeholder="Acme Corp"
                            />
                        </div>
                        <div>
                            <label htmlFor="tagline" className="block text-xs text-neutral-500 mb-1">Bio / Tagline</label>
                            <textarea
                                id="tagline"
                                name="tagline"
                                autoComplete="off"
                                value={data.personal.tagline}
                                onChange={(e) => updatePersonal('tagline', e.target.value)}
                                className="w-full p-2 rounded-lg border border-neutral-200 bg-transparent text-sm min-h-[80px]"
                                placeholder="Brief bio or tagline..."
                            />
                        </div>
                        <div>
                            <label htmlFor="location" className="block text-xs text-neutral-500 mb-1">Location</label>
                            <input
                                id="location"
                                name="location"
                                autoComplete="address-level2"
                                type="text"
                                value={data.personal.location}
                                onChange={(e) => updatePersonal('location', e.target.value)}
                                className="w-full p-2 rounded-lg border border-neutral-200 bg-transparent text-sm"
                                placeholder="San Francisco, CA"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="email" className="block text-xs text-neutral-500 mb-1">Email</label>
                                <input
                                    id="email"
                                    name="email"
                                    autoComplete="email"
                                    type="email"
                                    value={data.personal.email}
                                    onChange={(e) => updatePersonal('email', e.target.value)}
                                    className="w-full p-2 rounded-lg border border-neutral-200 bg-transparent text-sm"
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-xs text-neutral-500 mb-1">Phone (10 digits)</label>
                                <input
                                    id="phone"
                                    name="phone"
                                    autoComplete="tel"
                                    type="tel"
                                    value={data.personal.phone}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, '');
                                        if (value.length <= 10) {
                                            updatePersonal('phone', value);
                                        }
                                    }}
                                    className="w-full p-2 rounded-lg border border-neutral-200 bg-transparent text-sm"
                                    placeholder="1234567890"
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Templates */}
                <motion.div variants={sectionVariants}>
                    <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-3">Template</h3>

                    {/* Category Tabs */}
                    <div className="flex gap-2 overflow-x-auto pb-2 mb-3 no-scrollbar">
                        {(['all', 'Minimalist', 'Professional', 'Creative', 'Tech'] as const).map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${selectedCategory === category
                                    ? 'bg-red-600 text-white'
                                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                                    }`}
                            >
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {Object.values(templates)
                            .filter(t => selectedCategory === 'all' || t.category === selectedCategory)
                            .map((template) => (
                                <button
                                    key={template.id}
                                    onClick={() => setTemplate(template.id)}
                                    className={`p-3 rounded-xl border-2 text-left transition-all ${data.templateId === template.id
                                        ? 'border-red-600 bg-red-50'
                                        : 'border-neutral-200 hover:border-red-300'
                                        }`}
                                >
                                    <div className="font-semibold text-sm">{template.name}</div>
                                    <div className="text-xs text-neutral-500 mt-1 line-clamp-2">{template.description}</div>
                                </button>
                            ))}
                    </div>
                </motion.div>

                {/* Social Links */}
                <motion.div variants={sectionVariants}>
                    <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-3">Social Links</h3>

                    {/* Add New Link */}
                    <div className="flex gap-2 mb-4">
                        <label htmlFor="newLinkPlatform" className="sr-only">Platform</label>
                        <select
                            id="newLinkPlatform"
                            name="newLinkPlatform"
                            value={newLinkPlatform}
                            onChange={(e) => setNewLinkPlatform(e.target.value as SocialLink['platform'])}
                            className="p-2 rounded-lg border border-neutral-200 bg-transparent text-sm"
                        >
                            <option value="website">Website</option>
                            <option value="github">GitHub</option>
                            <option value="linkedin">LinkedIn</option>
                            <option value="twitter">Twitter</option>
                            <option value="instagram">Instagram</option>
                            <option value="email">Email</option>
                            <option value="other">Other</option>
                        </select>
                        <label htmlFor="newLinkUrl" className="sr-only">URL</label>
                        <input
                            id="newLinkUrl"
                            name="newLinkUrl"
                            type="url"
                            placeholder="URL"
                            value={newLinkUrl}
                            onChange={(e) => setNewLinkUrl(e.target.value)}
                            className="flex-1 p-2 rounded-lg border border-neutral-200 bg-transparent text-sm"
                        />
                        <button
                            onClick={handleAddLink}
                            className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                        >
                            <Plus className="w-5 h-5" />
                        </button>
                    </div>

                    {/* List Links */}
                    <div className="space-y-2">
                        <AnimatePresence mode="popLayout">
                            {data.socialLinks.map((link) => (
                                <motion.div
                                    key={link.id}
                                    layout
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="flex items-center gap-2 p-2 bg-neutral-50 rounded-lg group"
                                >
                                    <div className="p-1.5 bg-white rounded shadow-sm text-neutral-600">
                                        {link.platform === 'github' && <Github className="w-4 h-4" />}
                                        {link.platform === 'linkedin' && <Linkedin className="w-4 h-4" />}
                                        {link.platform === 'twitter' && <Twitter className="w-4 h-4" />}
                                        {link.platform === 'instagram' && <Instagram className="w-4 h-4" />}
                                        {link.platform === 'email' && <Mail className="w-4 h-4" />}
                                        {(link.platform === 'website' || link.platform === 'other') && <Globe className="w-4 h-4" />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-xs font-medium text-neutral-500 uppercase">{link.platform}</div>
                                        <div className="text-sm truncate">{link.url}</div>
                                    </div>
                                    <button
                                        onClick={() => removeSocialLink(link.id)}
                                        className="p-1.5 text-neutral-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* Theme */}
                <motion.div variants={sectionVariants}>
                    <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-3">Theme</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="primaryColor" className="block text-xs text-neutral-500 mb-1">Primary</label>
                            <div className="flex items-center gap-2">
                                <input
                                    id="primaryColor"
                                    name="primaryColor"
                                    type="color"
                                    value={data.theme.primaryColor}
                                    onChange={(e) => updateTheme('primaryColor', e.target.value)}
                                    className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                                />
                                <span className="text-xs font-mono text-neutral-500">{data.theme.primaryColor}</span>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="backgroundColor" className="block text-xs text-neutral-500 mb-1">Background</label>
                            <div className="flex items-center gap-2">
                                <input
                                    id="backgroundColor"
                                    name="backgroundColor"
                                    type="color"
                                    value={data.theme.backgroundColor}
                                    onChange={(e) => updateTheme('backgroundColor', e.target.value)}
                                    className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                                />
                                <span className="text-xs font-mono text-neutral-500">{data.theme.backgroundColor}</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Editor;
