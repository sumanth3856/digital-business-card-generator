'use client';

import Link from "next/link";
import { Menu, X, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { UserNav } from "@/components/nav/UserNav";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { AuthModal } from "@/components/auth/AuthModal";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";

export const Navbar = () => {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const { scrollY } = useScroll();

    const supabase = createClient();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 20);
    });

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        getUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    return (
        <>
            <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
            <motion.header
                className={cn(
                    "sticky top-0 z-40 w-full transition-all duration-300",
                    isScrolled
                        ? "border-b border-neutral-200/50 bg-white/80 backdrop-blur-xl shadow-sm"
                        : "bg-transparent border-transparent"
                )}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <nav className="container mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2 md:gap-3 group shrink-0">
                        <div className="relative w-8 h-8 md:w-10 md:h-10">
                            <div className="absolute inset-0 bg-red-600 rounded-xl rotate-6 group-hover:rotate-12 transition-transform opacity-20"></div>
                            <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-rose-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-red-600/20 group-hover:scale-105 transition-transform">
                                <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
                            </div>
                        </div>
                        <span className="text-lg md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-700 tracking-tight">
                            DigiCard
                        </span>
                    </Link>

                    {/* Menu - Always Visible */}
                    <div className="flex items-center gap-3 md:gap-6">
                        <Link
                            href="/create"
                            className="group relative px-4 py-2 md:px-6 md:py-2.5 bg-neutral-900 text-white rounded-full font-semibold transition-all hover:shadow-lg hover:shadow-red-500/20 active:scale-95 overflow-hidden"
                        >
                            <span className="relative z-10 text-xs md:text-sm">Create Card</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </Link>
                        {user ? (
                            <UserNav user={user} />
                        ) : (
                            <button
                                onClick={() => setIsAuthModalOpen(true)}
                                className="text-sm font-medium text-neutral-600 hover:text-red-600 transition-colors px-2"
                            >
                                Login
                            </button>
                        )}
                    </div>
                </nav>
            </motion.header>
        </>
    );
};
