'use client';

import Link from "next/link";
import { ArrowRight, Menu, X, Palette, Globe, Download } from "lucide-react";
import { useState, useEffect } from "react";
import { AuthModal } from "@/components/auth/AuthModal";
import { UserNav } from "@/components/nav/UserNav";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { HeroCarousel } from "@/components/hero/HeroCarousel";
import { TemplateGallery } from "@/components/home/TemplateGallery";

export default function Home() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-slate-950">
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-primary/20">
              D
            </div>
            <span className="text-xl font-bold text-white tracking-tight">DigiCard</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#templates" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Templates</a>
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Features</a>
            <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Pricing</a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/create"
              className="px-6 py-2.5 bg-foreground text-background hover:bg-muted-foreground/90 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl text-sm"
            >
              Create Card
            </Link>
            {user ? (
              <UserNav user={user} />
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-300 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background pt-24 px-6 md:hidden animate-in slide-in-from-top-10 duration-200">
          <div className="flex flex-col gap-6 text-lg">
            <a href="#templates" onClick={() => setIsMobileMenuOpen(false)} className="text-muted-foreground hover:text-primary transition-colors">Templates</a>
            <a href="#features" onClick={() => setIsMobileMenuOpen(false)} className="text-muted-foreground hover:text-primary transition-colors">Features</a>
            <a href="#pricing" onClick={() => setIsMobileMenuOpen(false)} className="text-muted-foreground hover:text-primary transition-colors">Pricing</a>
            <hr className="border-white/10" />
            <Link
              href="/create"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-center px-5 py-3 bg-primary text-primary-foreground rounded-xl font-medium shadow-lg shadow-primary/20"
            >
              Create Card
            </Link>
            {user ? (
              <div className="flex justify-center">
                <UserNav user={user} />
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsAuthModalOpen(true);
                }}
                className="text-center px-5 py-3 bg-white/5 text-white rounded-xl font-medium"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <main className="relative overflow-hidden bg-background">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-primary/20 rounded-full blur-[120px] opacity-40 animate-pulse"></div>
          <div className="absolute top-[10%] -right-[10%] w-[50%] h-[50%] bg-accent/20 rounded-full blur-[120px] opacity-40 animate-pulse delay-100"></div>
          <div className="absolute -bottom-[10%] left-[20%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[100px] opacity-30 animate-pulse delay-200"></div>
        </div>

        <div className="container mx-auto px-6 pt-24 pb-32 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            <div className="lg:w-1/2 space-y-8 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-primary text-sm font-medium backdrop-blur-md shadow-lg shadow-primary/10 hover:bg-white/10 transition-colors cursor-default">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                The Future of Networking
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
                Craft Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary-foreground animate-gradient-x">Digital Identity</span>
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed max-w-xl font-light">
                Stand out with a stunning digital business card. Choose a template, customize it to your brand, and share it instantly with the world.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/create"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white rounded-full font-semibold text-lg transition-all shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1"
                >
                  Start Building <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <a
                  href="#templates"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/5 text-white border border-white/10 hover:bg-white/10 rounded-full font-semibold text-lg transition-all hover:-translate-y-1 backdrop-blur-sm hover:border-white/20"
                >
                  Explore Templates
                </a>
              </div>

              <div className="flex items-center gap-10 pt-8 border-t border-white/5">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-white">10k+</span>
                  <span className="text-sm text-slate-500 font-medium uppercase tracking-wide">Cards Created</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-white">100%</span>
                  <span className="text-sm text-slate-500 font-medium uppercase tracking-wide">Free to Use</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-white">4.9/5</span>
                  <span className="text-sm text-slate-500 font-medium uppercase tracking-wide">User Rating</span>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 relative animate-fade-in-up delay-200">
              <div className="relative w-full aspect-square max-w-[600px] mx-auto flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-accent/10 rounded-full blur-3xl animate-pulse"></div>
                <HeroCarousel />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Template Gallery Section */}
      <TemplateGallery />

      {/* Features Grid */}
      <section id="features" className="bg-background py-32 border-t border-white/5 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-20 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Everything you need to stand out</h2>
            <p className="text-muted-foreground text-lg font-light leading-relaxed">
              Powerful features to help you create, customize, and share your professional identity with the world.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Palette className="w-6 h-6 text-primary" />,
                title: "Custom Design",
                description: "Full control over colors, fonts, and layout to match your brand identity."
              },
              {
                icon: <Globe className="w-6 h-6 text-accent" />,
                title: "Instant Sharing",
                description: "Share your card via unique URL, QR code, or social media instantly."
              },
              {
                icon: <Download className="w-6 h-6 text-secondary-foreground" />,
                title: "Export Options",
                description: "Download your card as PNG or PDF for print and offline use."
              }
            ].map((feature, index) => (
              <div key={index} className={`p-8 rounded-3xl bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-300 border border-white/5 hover:border-primary/20 group hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 animate-fade-in-up delay-${(index + 1) * 100}`}>
                <div className="w-14 h-14 bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/5 shadow-lg group-hover:border-primary/20 group-hover:shadow-primary/20">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed font-light">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
