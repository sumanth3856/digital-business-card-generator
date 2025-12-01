'use client';

import Link from "next/link";
import { ArrowRight, Zap, Palette, Share2 } from "lucide-react";
import { useState, useEffect } from "react";
import { AuthModal } from "@/components/auth/AuthModal";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { TemplateGallery } from "@/components/home/TemplateGallery";
import { motion, Variants } from "framer-motion";

export default function Home() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const supabase = createClient();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 overflow-hidden">
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] bg-blue-50 dark:bg-blue-950/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 1
            }}
            className="absolute -bottom-1/2 -left-1/2 w-[1000px] h-[1000px] bg-indigo-50 dark:bg-indigo-950/20 rounded-full blur-3xl"
          />
          {/* Minimalistic Pattern Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.03] dark:opacity-[0.05]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="mb-6 flex justify-center">
                <span className="px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium border border-blue-100 dark:border-blue-800 backdrop-blur-sm">
                  ✨ Create your digital identity in seconds
                </span>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-5xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight"
              >
                Share your professional <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Digital Business Card
                </span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed"
              >
                Create, customize, and share your digital business card with a simple link.
                No app required. Professional, eco-friendly, and always up-to-date.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link
                  href="/create"
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-semibold text-lg transition-all shadow-xl shadow-blue-600/20 hover:scale-105 hover:shadow-2xl hover:shadow-blue-600/30 flex items-center justify-center gap-2"
                >
                  Create Free Card <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="#features"
                  className="px-8 py-4 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-800 rounded-2xl font-semibold text-lg transition-all hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  View Features
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Template Gallery Section */}
      <TemplateGallery />

      {/* Features Section */}
      <section id="features" className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Everything you need
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Powerful features to help you grow your network
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <Zap className="w-6 h-6 text-amber-500" />,
                title: "Instant Sharing",
                description: "Share your card via QR code, link, or email instantly with anyone, anywhere."
              },
              {
                icon: <Palette className="w-6 h-6 text-purple-500" />,
                title: "Custom Design",
                description: "Choose from professional templates and customize colors to match your brand."
              },
              {
                icon: <Share2 className="w-6 h-6 text-blue-500" />,
                title: "Easy Updates",
                description: "Update your information anytime and it reflects instantly on your shared card."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white dark:bg-slate-950 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-blue-100 dark:hover:border-blue-900 transition-colors shadow-sm hover:shadow-xl hover:shadow-blue-500/5 group"
              >
                <div className="w-12 h-12 bg-slate-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
