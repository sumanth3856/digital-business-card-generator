'use client';

import { User } from '@supabase/supabase-js';
import { User as UserIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';


interface UserNavProps {
    user: User;
}

export const UserNav = ({ user }: UserNavProps) => {
    const router = useRouter();

    return (
        <button
            onClick={() => router.push('/profile')}
            className="flex items-center gap-3 pl-1 pr-4 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all group"
            title="Go to Profile"
        >
            <div className="w-8 h-8 bg-white dark:bg-slate-950 text-blue-600 rounded-full flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                <UserIcon className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200 hidden md:block group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {user.user_metadata?.full_name || user.email?.split('@')[0]}
            </span>
        </button>
    );
};
