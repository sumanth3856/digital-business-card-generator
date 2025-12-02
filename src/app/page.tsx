'use client';

import Link from "next/link";
import { ArrowRight, Zap, Palette, Share2 } from "lucide-react";
import { useState, useEffect } from "react";
import { AuthModal } from "@/components/auth/AuthModal";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { TemplateGallery } from "@/components/home/TemplateGallery";
import { motion, Variants } from "framer-motion";
import { SwiftBird } from "@/components/ui/SwiftBird";

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
    <div className="min-h-screen bg-white overflow-hidden selection:bg-red-100 selection:text-red-900">
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

      {/* Swift Bird Cursor Animation */}
      <SwiftBird />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Modern Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

          {/* Vignette Mask */}
          <div className="absolute inset-0 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

          {/* Static Blobs (Kept for ambiance, but removed the cursor follower) */}
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
            className="absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] bg-red-50 rounded-full blur-3xl"
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
            className="absolute -bottom-1/2 -left-1/2 w-[1000px] h-[1000px] bg-rose-50 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="mb-8 flex justify-center">
                <div className="relative group cursor-default">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-rose-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
                  <span className="relative px-6 py-2 rounded-full bg-white text-neutral-900 text-sm font-semibold border border-neutral-200 flex items-center gap-2 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    Create your digital identity in seconds
                  </span>
                </div>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-6xl lg:text-8xl font-bold text-neutral-900 mb-8 tracking-tighter leading-[1.1]"
              >
                Share your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-500 to-orange-500 animate-gradient-x">
                  Digital Persona
                </span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-xl md:text-2xl text-neutral-600 mb-12 max-w-2xl mx-auto leading-relaxed font-light"
              >
                The modern way to connect. Create a stunning digital business card that leaves a lasting impression.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-5 justify-center"
              >
                <Link
                  href="/create"
                  className="group relative px-8 py-4 bg-neutral-900 text-white rounded-2xl font-semibold text-lg transition-all hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative flex items-center gap-2">
                    Create Free Card <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <Link
                  href="#features"
                  className="px-8 py-4 bg-white text-neutral-700 border border-neutral-200 hover:border-neutral-300 rounded-2xl font-semibold text-lg transition-all hover:bg-neutral-50 shadow-sm hover:shadow-md"
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
      <section id="features" className="py-32 bg-neutral-50 relative overflow-hidden">
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]"></div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6 tracking-tight">
              Everything you need
            </h2>
            <p className="text-xl text-neutral-500 font-light">
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
                icon: <Zap className="w-8 h-8 text-amber-500" />,
                title: "Instant Sharing",
                description: "Share your card via QR code, link, or email instantly with anyone, anywhere."
              },
              {
                icon: <Palette className="w-8 h-8 text-rose-500" />,
                title: "Custom Design",
                description: "Choose from professional templates and customize colors to match your brand."
              },
              {
                icon: <Share2 className="w-8 h-8 text-red-500" />,
                title: "Easy Updates",
                description: "Update your information anytime and it reflects instantly on your shared card."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white p-10 rounded-[2rem] border border-neutral-100 hover:border-red-100 transition-all duration-300 shadow-sm hover:shadow-2xl hover:shadow-red-500/5 group"
              >
                <div className="w-16 h-16 bg-neutral-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 group-hover:bg-red-50">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-4">{feature.title}</h3>
                <p className="text-neutral-600 leading-relaxed text-lg">
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
