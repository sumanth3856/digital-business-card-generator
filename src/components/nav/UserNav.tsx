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
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Go to Profile"
        >
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full flex items-center justify-center">
                <UserIcon className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200 hidden md:block">
                {user.user_metadata?.full_name || user.email}
            </span>
        </button>
    );
};
