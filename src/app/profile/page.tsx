'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { Loader2, LogOut, Edit, Trash2, Plus, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

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
                // If storage access is denied, we might want to redirect
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

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background p-6 md:p-12">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border pb-6">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/"
                            className="p-2 hover:bg-muted rounded-full transition-colors"
                            title="Back to Home"
                        >
                            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
                            <p className="text-muted-foreground mt-1">{user?.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>

                {/* Cards Section */}
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-foreground">My Cards</h2>
                        <Link
                            href="/create"
                            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Create New
                        </Link>
                    </div>

                    {cards.length === 0 ? (
                        <div className="text-center py-12 bg-muted/50 rounded-xl border border-border border-dashed">
                            <p className="text-muted-foreground mb-4">You haven't created any cards yet.</p>
                            <Link
                                href="/create"
                                className="inline-flex items-center gap-2 text-primary hover:underline"
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
                                        className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        <div className="p-6 space-y-4">
                                            <div>
                                                <h3 className="font-semibold text-lg text-card-foreground truncate">
                                                    {card.data.personal.fullName || 'Untitled Card'}
                                                </h3>
                                                <p className="text-sm text-muted-foreground truncate">
                                                    {card.data.personal.jobTitle || 'No Title'}
                                                </p>
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                Last updated: {new Date(card.updated_at).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <div className="bg-muted/50 px-6 py-4 flex justify-between items-center border-t border-border">
                                            <Link
                                                href={`/create?id=${card.id}`}
                                                className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80"
                                            >
                                                <Edit className="w-4 h-4" />
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDeleteCard(card.id)}
                                                className="text-muted-foreground hover:text-red-500 transition-colors"
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
        </div>
    );
}
