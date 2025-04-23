"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Globe, Palette, ShoppingCart, Zap, Sparkles, Megaphone, Store, PieChart, Lock, ChevronRight } from "lucide-react";

const GridPattern = () => (
  <div className="absolute inset-0 -z-10 h-full w-full bg-white [background-image:radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-stone-950 dark:[background-image:radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]" />
);

const GradientBlob = () => (
  <div className="absolute -top-40 -right-40 -z-10 h-80 w-80 rounded-full bg-gradient-to-br from-orange-400/30 to-cyan-400/30 blur-[100px]" />
);

const features = [
  {
    title: "Custom Domains",
    description: "Connect your custom domain or use our subdomains. SSL included automatically for all domains.",
    icon: Globe,
  },
  {
    title: "Brand Customization",
    description: "Customize logos, colors, fonts, and layouts to match your brand identity perfectly.",
    icon: Palette,
  },
  {
    title: "Order Management",
    description: "Streamlined order processing with real-time notifications and inventory tracking.",
    icon: ShoppingCart,
  },
  {
    title: "Promos & Discounts",
    description: "Create targeted promotions, discount codes, and seasonal campaigns easily.",
    icon: Megaphone,
  },
  {
    title: "Analytics Dashboard",
    description: "Track sales, customer behavior, and performance metrics with detailed analytics.",
    icon: PieChart,
  },
  {
    title: "Secure by Default",
    description: "Enterprise-grade security with SSL, data encryption, and secure payment processing built-in from day one.",
    icon: Lock,
  },
];

const testimonials = [
  {
    content: "Kpaly transformed our online business. We now manage 5 different stores from one platform!",
    author: "Sarah Chen",
    role: "CEO, FreshFoods",
    image: "/placeholder.png",
  },
  {
    content: "The custom branding options are fantastic. Our store looks exactly how we envisioned it.",
    author: "Michael Rodriguez",
    role: "Founder, ArtisanCrafts",
    image: "/placeholder.png",
  },
  {
    content: "Setting up promotions and discounts has never been easier. Sales have increased by 40%!",
    author: "Emma Thompson",
    role: "Marketing Director, StyleHub",
    image: "/placeholder.png",
  },
];

const showcase = [
  { 
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=600&fit=crop", 
    title: "Fresh Market",
    category: "Food & Groceries",
    color: "from-green-500/20 to-emerald-500/20"
  },
  { 
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
    title: "Urban Boutique",
    category: "Fashion & Apparel",
    color: "from-purple-500/20 to-pink-500/20"
  },
  { 
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop",
    title: "Tech Gadgets",
    category: "Electronics",
    color: "from-blue-500/20 to-cyan-500/20"
  },
  { 
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop",
    title: "Artisan Bakery",
    category: "Restaurant & Cafe",
    color: "from-amber-500/20 to-orange-500/20"
  },
];

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white dark:from-stone-950 dark:to-stone-900 relative overflow-hidden">
      <GridPattern />
      <GradientBlob />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200 dark:bg-stone-950/80 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center"
            >
              <Image
                src="/logo.png"
                alt="Kpaly"
                width={120}
                height={30}
                className="h-8 w-auto"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4"
            >
              <Link href="#features" className="text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100">
                Features
              </Link>
              <Link href="#showcase" className="text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100">
                Showcase
              </Link>
              <Link href="#testimonials" className="text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100">
                Testimonials
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-4 py-2 mb-8 bg-orange-100 text-orange-800 rounded-full text-sm font-medium dark:bg-orange-900/30 dark:text-orange-300"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            The Smart Way to Sell Online
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-orange-600 via-amber-500 to-cyan-600 bg-clip-text text-transparent mb-6">
            Launch Your Online Store
            <br />
            <span className="text-stone-900 dark:text-stone-100">In Minutes, Not Months</span>
          </h1>
          
          <p className="text-xl text-stone-600 max-w-2xl mx-auto mb-12 dark:text-stone-400">
            Kpaly helps food vendors and product sellers create beautiful, custom-branded online stores. Manage multiple storefronts, process orders, and grow your business—all from one platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-orange-600 text-white rounded-xl font-medium hover:bg-orange-700 transition-colors flex items-center text-lg"
            >
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white border border-stone-200 rounded-xl font-medium hover:bg-stone-50 transition-colors flex items-center text-lg text-stone-900 dark:bg-stone-900 dark:border-stone-700 dark:hover:bg-stone-800 dark:text-stone-100"
            >
              Watch Demo
              <ChevronRight className="ml-2 w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-6xl mx-auto mt-16 px-4"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-stone-200 dark:border-stone-800">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-cyan-500/20" />
            <Image
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&h=900&fit=crop"
              alt="Dashboard Preview"
              width={1600}
              height={900}
              className="w-full h-auto"
            />
          </div>
        </motion.div>
      </div>

      {/* Trusted By Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-stone-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-sm font-semibold text-stone-600 dark:text-stone-400 uppercase tracking-wide mb-3">
              Trusted by businesses worldwide
            </h2>
            <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">
              Powering 10,000+ online stores globally
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 items-center justify-items-center px-4">
            {/* Zestify Logo - Food Delivery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
              className="h-16 w-40 relative group"
            >
              <svg viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-70 group-hover:opacity-100 transition-opacity">
                <path d="M5 20C5 14 9 10 15 10L25 10C31 10 35 14 35 20L25 30C18.5 30 15 25 15 20Z" fill="#FF6B6B"/>
                <circle cx="18" cy="18" r="3" fill="white"/>
                <path d="M22 20C22 23 20 25 18 25" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <text x="42" y="25" fill="currentColor" className="text-sm font-bold dark:fill-stone-300">Zestify</text>
              </svg>
            </motion.div>

            {/* NeoLux Logo - Fashion & Luxury */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="h-16 w-40 relative group"
            >
              <svg viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-70 group-hover:opacity-100 transition-opacity">
                <path d="M10 15L20 5L30 15L20 35L10 15Z" fill="#1A1A1A" stroke="#8B5CF6" strokeWidth="2"/>
                <path d="M15 20L20 15L25 20" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <text x="38" y="25" fill="currentColor" className="text-sm font-bold dark:fill-stone-300">NeoLux</text>
              </svg>
            </motion.div>

            {/* Botanica Logo - Plant Shop */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="h-16 w-40 relative group"
            >
              <svg viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-70 group-hover:opacity-100 transition-opacity">
                <path d="M20 30C20 22 25 17 30 17M20 30C20 22 15 17 10 17" stroke="#059669" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M20 30V35" stroke="#059669" strokeWidth="2.5" strokeLinecap="round"/>
                <circle cx="20" cy="12" r="4" fill="#059669"/>
                <text x="38" y="25" fill="currentColor" className="text-sm font-bold dark:fill-stone-300">Botanica</text>
              </svg>
            </motion.div>

            {/* Quantum Co Logo - Tech Store */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="h-16 w-40 relative group"
            >
              <svg viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-70 group-hover:opacity-100 transition-opacity">
                <circle cx="20" cy="20" r="10" stroke="#0EA5E9" strokeWidth="2"/>
                <circle cx="20" cy="20" r="6" stroke="#0EA5E9" strokeWidth="2"/>
                <circle cx="20" cy="20" r="2" fill="#0EA5E9"/>
                <path d="M25 15L30 10M25 25L30 30M15 15L10 10M15 25L10 30" stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round"/>
                <text x="38" y="25" fill="currentColor" className="text-sm font-bold dark:fill-stone-300">Quantum</text>
              </svg>
            </motion.div>

            {/* Artisanal Logo - Handcrafted Goods */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="h-16 w-40 relative group"
            >
              <svg viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-70 group-hover:opacity-100 transition-opacity">
                <path d="M10 30C10 20 20 10 30 20M30 20C30 25 25 30 20 30" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round"/>
                <circle cx="15" cy="15" r="3" fill="#D97706"/>
                <circle cx="25" cy="25" r="2" fill="#D97706"/>
                <text x="38" y="25" fill="currentColor" className="text-sm font-bold dark:fill-stone-300">Artisanal</text>
              </svg>
            </motion.div>

            {/* PureVibe Logo - Wellness */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="h-16 w-40 relative group"
            >
              <svg viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-70 group-hover:opacity-100 transition-opacity">
                <path d="M5 20C10 15 15 25 20 20C25 15 30 25 35 20" stroke="#EC4899" strokeWidth="2.5" strokeLinecap="round"/>
                <circle cx="12.5" cy="17" r="2" fill="#EC4899"/>
                <circle cx="27.5" cy="23" r="2" fill="#EC4899"/>
                <text x="42" y="25" fill="currentColor" className="text-sm font-bold dark:fill-stone-300">PureVibe</text>
              </svg>
            </motion.div>

            {/* Savora Logo - Gourmet Foods */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="h-16 w-40 relative group"
            >
              <svg viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-70 group-hover:opacity-100 transition-opacity">
                <path d="M20 10C25 10 30 15 30 20C30 25 25 30 20 30C15 30 10 25 10 20C10 15 15 10 20 10Z" stroke="#F59E0B" strokeWidth="2"/>
                <path d="M20 15C22 17 24 19 24 21C24 23 22 25 20 25C18 25 16 23 16 21C16 19 18 17 20 15Z" fill="#F59E0B"/>
                <text x="38" y="25" fill="currentColor" className="text-sm font-bold dark:fill-stone-300">Savora</text>
              </svg>
            </motion.div>

            {/* Nexus Design Logo - Creative Agency */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="h-16 w-40 relative group"
            >
              <svg viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-70 group-hover:opacity-100 transition-opacity">
                <path d="M10 20L20 10L30 20L20 30L10 20Z" stroke="#3B82F6" strokeWidth="2"/>
                <path d="M15 20L20 15L25 20L20 25L15 20Z" fill="#3B82F6"/>
                <text x="38" y="25" fill="currentColor" className="text-sm font-bold dark:fill-stone-300">Nexus</text>
              </svg>
            </motion.div>

            {/* ECHO Logo - Audio Equipment */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="h-16 w-40 relative group"
            >
              <svg viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-70 group-hover:opacity-100 transition-opacity">
                <circle cx="20" cy="20" r="4" fill="#10B981"/>
                <path d="M26 20C26 16.686 23.314 14 20 14M14 20C14 23.314 16.686 26 20 26" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M30 20C30 14.477 25.523 10 20 10M10 20C10 25.523 14.477 30 20 30" stroke="#10B981" strokeWidth="2" strokeLinecap="round"/>
                <text x="38" y="25" fill="currentColor" className="text-sm font-bold dark:fill-stone-300">ECHO</text>
              </svg>
            </motion.div>

            {/* Forge & Folk Logo - Artisan Marketplace */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9 }}
              className="h-16 w-40 relative group"
            >
              <svg viewBox="0 0 140 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-70 group-hover:opacity-100 transition-opacity">
                <path d="M10 25L15 10L20 25L25 10L30 25" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="15" cy="32" r="2" fill="#DC2626"/>
                <circle cx="25" cy="32" r="2" fill="#DC2626"/>
                <text x="38" y="25" fill="currentColor" className="text-sm font-bold dark:fill-stone-300">Forge & Folk</text>
              </svg>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-stone-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-stone-900 dark:text-stone-100">Everything You Need to Succeed</h2>
            <p className="text-xl text-stone-600 dark:text-stone-400">Powerful features to help you scale your online business</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl border border-stone-200 hover:border-orange-200 transition-colors dark:border-stone-800 dark:hover:border-orange-800 bg-white dark:bg-stone-900"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-cyan-100 rounded-xl flex items-center justify-center mb-4 dark:from-orange-900/30 dark:to-cyan-900/30">
                  <feature.icon className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-stone-900 dark:text-stone-100">{feature.title}</h3>
                <p className="text-stone-600 dark:text-stone-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Showcase Section */}
      <div id="showcase" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-stone-900 dark:text-stone-100">Built for Every Business</h2>
            <p className="text-xl text-stone-600 dark:text-stone-400">See how businesses like yours succeed with Kpaly</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {showcase.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative rounded-2xl overflow-hidden"
              >
                <div className="aspect-[4/5] relative">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${item.color} to-transparent opacity-80`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-sm text-orange-400 font-medium mb-1">{item.category}</p>
                    <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8 bg-stone-50 dark:bg-stone-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-stone-900 dark:text-stone-100">Loved by Business Owners</h2>
            <p className="text-xl text-stone-600 dark:text-stone-400">Hear what our customers have to say</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg dark:bg-stone-900"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-stone-600 mb-6 dark:text-stone-400">&ldquo;{testimonial.content}&rdquo;</p>
                <div className="flex items-center">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.author}
                    width={48}
                    height={48}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold text-stone-900 dark:text-stone-100">{testimonial.author}</p>
                    <p className="text-sm text-stone-600 dark:text-stone-400">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center bg-gradient-to-r from-orange-600 to-amber-500 rounded-3xl p-12 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-10" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Launch Your Store?</h2>
          <p className="text-xl text-white/90 mb-8">Join thousands of businesses already growing with Kpaly</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-orange-600 rounded-xl font-semibold hover:bg-orange-50 transition-colors flex items-center text-lg"
            >
              Start Free Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </motion.button>
            <div className="flex items-center text-white">
              <Lock className="w-5 h-5 mr-2" />
              <span>No credit card required</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="bg-stone-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <Image
              src="/logo.png"
              alt="Kpaly"
              width={120}
              height={30}
              className="h-8 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-stone-400">Multi-tenant e-commerce platform for modern businesses.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-white">Product</h3>
            <ul className="space-y-2 text-stone-400">
              <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Integrations</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">API</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-white">Company</h3>
            <ul className="space-y-2 text-stone-400">
              <li><Link href="#" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-white">Legal</h3>
            <ul className="space-y-2 text-stone-400">
              <li><Link href="#" className="hover:text-white transition-colors">Privacy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Security</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-stone-800 text-center text-stone-400">
          <p>&copy; {new Date().getFullYear()} Kpaly. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}