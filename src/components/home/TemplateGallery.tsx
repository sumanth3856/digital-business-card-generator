'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CardRenderer } from '@/components/preview/CardRenderer';
import { templates } from '@/components/templates/template-registry';
import { CardData } from '@/types/card';
import { motion } from 'framer-motion';

// Dummy data for preview
const previewData: CardData = {
    personal: {
        fullName: "Sarah Cole",
        jobTitle: "Product Designer",
        tagline: "Building digital products",
        about: "I craft user-centric interfaces and experiences.",
        email: "sarah@example.com",
        phone: "+1 234 567 890",
        location: "San Francisco, CA",
        company: "TechFlow",
        website: "https://sarah.design",
    },
    socialLinks: [],
    theme: {
        primaryColor: "#2563eb",
        secondaryColor: "#4f46e5",
        backgroundColor: "#ffffff",
        textColor: "#0f172a",
        fontPair: "sans",
    },
    templateId: "modern", // Will be overridden
};

export const TemplateGallery = () => {
    return (
        <section id="templates" className="py-32 bg-neutral-50">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-2xl mx-auto mb-20"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                        Choose your style
                    </h2>
                    <p className="text-neutral-600 text-lg font-light">
                        Select a professionally designed template to get started. You can customize colors, fonts, and content later.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {Object.values(templates).map((template, index) => (
                        <motion.div
                            key={template.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-red-500/10 transition-all duration-500 border border-neutral-200 hover:border-red-500/30 flex flex-col"
                        >
                            {/* Preview Area */}
                            <div className="relative aspect-[4/5] bg-neutral-100 overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center p-8 transform group-hover:scale-105 transition-transform duration-700 ease-out">
                                    <div className="w-full h-full shadow-2xl rounded-2xl overflow-hidden ring-1 ring-black/5">
                                        <CardRenderer
                                            data={{ ...previewData, templateId: template.id }}
                                            templateId={template.id}
                                        />
                                    </div>
                                </div>

                                {/* Overlay on hover */}
                                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                    <Link
                                        href={`/create?template=${template.id}`}
                                        className="px-8 py-4 bg-white text-neutral-900 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl hover:scale-105"
                                    >
                                        Use This Template
                                    </Link>
                                </div>
                            </div>

                            {/* Info Area */}
                            <div className="p-8 flex flex-col flex-grow bg-white">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="text-xl font-bold text-neutral-900">
                                        {template.name}
                                    </h3>
                                    {template.id === 'modern' && (
                                        <span className="px-3 py-1 bg-red-50 border border-red-100 text-red-600 text-xs font-semibold rounded-full uppercase tracking-wide">
                                            Popular
                                        </span>
                                    )}
                                </div>
                                <p className="text-neutral-500 text-sm mb-8 flex-grow font-light leading-relaxed">
                                    {template.id === 'modern'
                                        ? 'A clean, professional look perfect for corporate identities.'
                                        : 'Minimalist design focusing on essential information.'}
                                </p>
                                <Link
                                    href={`/create?template=${template.id}`}
                                    className="w-full py-4 flex items-center justify-center gap-2 rounded-2xl border border-neutral-200 hover:bg-neutral-900 text-neutral-900 hover:text-white font-semibold transition-all duration-300"
                                >
                                    Select Template <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
