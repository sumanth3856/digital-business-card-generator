'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { Loader2, LogOut, Edit, Trash2, Plus, ArrowLeft, Download, Eye, X } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { downloadCard } from '@/utils/export';
import { CardRenderer } from '@/components/preview/CardRenderer';

interface SavedCard {
    id: string;
    slug: string;
    updated_at: string;
    data: any;
}

import { AnimatePresence, motion } from 'framer-motion';

export default function ProfilePage() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [cards, setCards] = useState<SavedCard[]>([]);
    const [previewCard, setPreviewCard] = useState<SavedCard | null>(null);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const getUserAndCards = async () => {
            try {
                const { data: { user }, error: authError } = await supabase.auth.getUser();
                if (authError || !user) {
                    console.error('Auth error:', authError);
                    router.push('/');
                    return;
                }
                setUser(user);

                const { data: cards, error } = await supabase
                    .from('cards')
                    .select('*')
                    .eq('user_id', user.id)
                    .order('updated_at', { ascending: false });

                if (error) {
                    console.error('Error fetching cards:', error);
                    toast.error('Failed to load cards');
                } else {
                    setCards(cards || []);
                }
            } catch (error) {
                console.error('Unexpected error loading profile:', error);
                toast.error('Error loading profile. Please try again.');
                if (error instanceof Error && error.message.includes('Access to storage')) {
                    router.push('/');
                }
            } finally {
                setLoading(false);
            }
        };

        getUserAndCards();
    }, [router, supabase]);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        toast.success('Logged out successfully');
        router.push('/');
        router.refresh();
    };

    const handleDeleteCard = async (id: string) => {
        if (!confirm('Are you sure you want to delete this card?')) return;

        const { error } = await supabase
            .from('cards')
            .delete()
            .eq('id', id);

        if (error) {
            toast.error('Failed to delete card');
        } else {
            setCards(cards.filter(c => c.id !== id));
            toast.success('Card deleted successfully');
        }
    };

    const handleDownload = async (card: SavedCard, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        // We need to render the card temporarily to download it
        // For now, we'll just open the editor which has the download function, 
        // OR we can try to render it hidden. 
        // Since `downloadCard` takes an element ID, we need that element in the DOM.
        // A simple workaround is to open the preview modal and then download from there.
        setPreviewCard(card);
        toast.info('Opening preview to download...');
    };

    const downloadFromPreview = async (format: 'png' | 'jpg' | 'pdf') => {
        if (!previewCard) return;
        try {
            await downloadCard('preview-modal-card', format, previewCard.data.personal.fullName || 'card');
            toast.success('Download started');
        } catch (error) {
            console.error('Download failed', error);
            toast.error('Download failed');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <Loader2 className="w-8 h-8 animate-spin text-red-600" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white p-6 md:p-12">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-neutral-100 pb-6">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/"
                            className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                            title="Back to Home"
                        >
                            <ArrowLeft className="w-5 h-5 text-neutral-600" />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold text-neutral-900">My Profile</h1>
                            <p className="text-neutral-500 mt-1">{user?.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>

                {/* Cards Section */}
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-neutral-900">My Cards</h2>
                        <Link
                            href="/create"
                            className="flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors shadow-lg shadow-neutral-900/20"
                        >
                            <Plus className="w-4 h-4" />
                            Create New
                        </Link>
                    </div>

                    {cards.length === 0 ? (
                        <div className="text-center py-12 bg-neutral-50 rounded-xl border border-neutral-200 border-dashed">
                            <p className="text-neutral-500 mb-4">You haven't created any cards yet.</p>
                            <Link
                                href="/create"
                                className="inline-flex items-center gap-2 text-red-600 hover:underline font-medium"
                            >
                                Create your first card
                            </Link>
                        </div>
                    ) : (
                        <motion.div
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ staggerChildren: 0.1 }}
                        >
                            <AnimatePresence mode="popLayout">
                                {cards.map((card) => (
                                    <motion.div
                                        key={card.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.2 }}
                                        className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-red-500/5 transition-all group"
                                    >
                                        <div className="p-6 space-y-4">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-bold text-lg text-neutral-900 truncate">
                                                        {card.data.personal.fullName || 'Untitled Card'}
                                                    </h3>
                                                    <p className="text-sm text-neutral-500 truncate">
                                                        {card.data.personal.jobTitle || 'No Title'}
                                                    </p>
                                                </div>
                                                <div className="p-2 bg-neutral-50 rounded-lg text-neutral-400">
                                                    <Eye className="w-4 h-4" />
                                                </div>
                                            </div>
                                            <div className="text-xs text-neutral-400">
                                                Last updated: {new Date(card.updated_at).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <div className="bg-neutral-50 px-6 py-4 flex justify-between items-center border-t border-neutral-100">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => setPreviewCard(card)}
                                                    className="p-2 text-neutral-600 hover:text-red-600 hover:bg-white rounded-lg transition-colors"
                                                    title="Preview"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <Link
                                                    href={`/create?id=${card.id}`}
                                                    className="p-2 text-neutral-600 hover:text-red-600 hover:bg-white rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => setPreviewCard(card)}
                                                    className="p-2 text-neutral-600 hover:text-red-600 hover:bg-white rounded-lg transition-colors"
                                                    title="Download"
                                                >
                                                    <Download className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => handleDeleteCard(card.id)}
                                                className="text-neutral-400 hover:text-red-500 transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Preview Modal */}
            <AnimatePresence>
                {previewCard && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                        onClick={() => setPreviewCard(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Preview Area */}
                            <div className="flex-1 bg-neutral-100 p-8 flex items-center justify-center overflow-y-auto">
                                <div id="preview-modal-card" className="shadow-2xl rounded-2xl overflow-hidden transform scale-90 md:scale-100 origin-center">
                                    <CardRenderer
                                        data={previewCard.data}
                                        templateId={previewCard.data.templateId || 'modern'}
                                    />
                                </div>
                            </div>

                            {/* Sidebar / Actions */}
                            <div className="w-full md:w-80 bg-white p-8 border-l border-neutral-100 flex flex-col">
                                <div className="flex justify-between items-center mb-8">
                                    <h3 className="text-xl font-bold text-neutral-900">Preview</h3>
                                    <button
                                        onClick={() => setPreviewCard(null)}
                                        className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                                    >
                                        <X className="w-5 h-5 text-neutral-500" />
                                    </button>
                                </div>

                                <div className="space-y-6 flex-1">
                                    <div>
                                        <h4 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-3">Download</h4>
                                        <div className="space-y-2">
                                            <button
                                                onClick={() => downloadFromPreview('png')}
                                                className="w-full py-3 px-4 bg-neutral-900 text-white rounded-xl font-medium hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
                                            >
                                                <Download className="w-4 h-4" /> PNG Image
                                            </button>
                                            <button
                                                onClick={() => downloadFromPreview('pdf')}
                                                className="w-full py-3 px-4 bg-neutral-100 text-neutral-900 rounded-xl font-medium hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
                                            >
                                                <Download className="w-4 h-4" /> PDF Document
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-3">Actions</h4>
                                        <Link
                                            href={`/create?id=${previewCard.id}`}
                                            className="w-full py-3 px-4 border border-neutral-200 text-neutral-700 rounded-xl font-medium hover:bg-neutral-50 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <Edit className="w-4 h-4" /> Edit Card
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
