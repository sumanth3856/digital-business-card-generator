'use client';

import { User } from '@supabase/supabase-js';
import { User as UserIcon, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

interface UserNavProps {
    user: User;
}

export const UserNav = ({ user }: UserNavProps) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const supabase = createClient();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        toast.success('Logged out successfully');
        router.push('/');
        router.refresh();
    };

    const getInitials = () => {
        const name = user.user_metadata?.full_name || user.email || 'U';
        return name.charAt(0).toUpperCase();
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border border-neutral-200 hover:border-red-200 hover:bg-neutral-50 transition-all group"
            >
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-rose-600 text-white rounded-full flex items-center justify-center shadow-md shadow-red-500/20">
                    <span className="text-sm font-bold">{getInitials()}</span>
                </div>
                <span className="text-sm font-medium text-neutral-700 group-hover:text-neutral-900 hidden md:block max-w-[100px] truncate">
                    {user.user_metadata?.full_name?.split(' ')[0] || 'User'}
                </span>
                <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.1 }}
                        className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-neutral-100 overflow-hidden z-50"
                    >
                        <div className="p-4 border-b border-neutral-100 bg-neutral-50/50">
                            <p className="text-sm font-semibold text-neutral-900 truncate">
                                {user.user_metadata?.full_name || 'User'}
                            </p>
                            <p className="text-xs text-neutral-500 truncate">
                                {user.email}
                            </p>
                        </div>
                        <div className="p-1">
                            <button
                                onClick={() => {
                                    router.push('/profile');
                                    setIsOpen(false);
                                }}
                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition-colors"
                            >
                                <LayoutDashboard className="w-4 h-4" />
                                My Dashboard
                            </button>
                            <button
                                onClick={handleSignOut}
                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                                Sign Out
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
