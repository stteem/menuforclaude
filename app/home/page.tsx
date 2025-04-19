"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// Features data
const features = [
  {
    title: "Custom Domain Setup",
    description: "Connect your own domain name and establish your brand's unique online identity in minutes.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: "Brand Customization",
    description: "Personalize your site with your logo, brand colors, and custom design elements.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
  },
  {
    title: "Order Management",
    description: "Efficiently manage all your orders from a single dashboard with real-time updates.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  {
    title: "Product Catalog",
    description: "Create and showcase your food or product catalog with beautiful images and descriptions.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
  },
  {
    title: "Promotions & Discounts",
    description: "Create and manage special offers, discounts, and promotional campaigns to boost sales.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" y1="5" x2="5" y2="19" />
        <circle cx="6.5" cy="6.5" r="2.5" />
        <circle cx="17.5" cy="17.5" r="2.5" />
      </svg>
    ),
  },
  {
    title: "Analytics Dashboard",
    description: "Track your business performance with comprehensive analytics and actionable insights.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
        <path d="M22 12A10 10 0 0 0 12 2v10z" />
      </svg>
    ),
  },
];

// Trusted businesses with custom logos
const trustedBusinesses = [
  { 
    name: "Savory Bites", 
    type: "Restaurant", 
    logoStyle: "rounded-md bg-gradient-to-br from-amber-500 to-amber-700",
    logoContent: (
      <div className="text-center">
        <div className="text-white text-xs font-bold">SAVORY</div>
        <div className="text-white text-[10px] border-t border-white/30 mt-1 pt-1">BITES</div>
        <div className="absolute -right-1 -top-1 w-3 h-3 bg-white rounded-full"></div>
      </div>
    )
  },
  { 
    name: "Tech Haven", 
    type: "Electronics", 
    logoStyle: "rounded-full bg-blue-600",
    logoContent: (
      <div className="h-full w-full flex flex-col justify-center items-center">
        <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/>
        </svg>
        <div className="text-white text-[8px] font-bold mt-1">TECH HAVEN</div>
      </div>
    )
  },
  { 
    name: "Urban Brews", 
    type: "Coffee Shop", 
    logoStyle: "rounded-md bg-gradient-to-br from-amber-800 to-amber-950",
    logoContent: (
      <div className="text-center">
        <svg className="w-6 h-6 text-amber-100 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
        </svg>
        <div className="text-amber-100 text-[8px] font-medium">URBAN BREWS</div>
      </div>
    )
  },
  { 
    name: "Fresh Basket", 
    type: "Grocery Store", 
    logoStyle: "rounded-full border-2 border-emerald-500",
    logoContent: (
      <div className="text-center">
        <svg className="w-7 h-7 text-emerald-500 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 6h19l-3 10H6L3 6z"/>
          <path d="M3 6l-1-4h2"/>
          <circle cx="9" cy="20" r="1"/>
          <circle cx="16" cy="20" r="1"/>
        </svg>
        <div className="text-emerald-600 text-[8px] font-semibold">FRESH BASKET</div>
      </div>
    )
  },
  { 
    name: "Chic Boutique", 
    type: "Fashion", 
    logoStyle: "rounded-md bg-gradient-to-r from-pink-400 to-pink-600",
    logoContent: (
      <div className="text-center">
        <div className="text-white text-sm font-serif italic">Chic</div>
        <div className="text-white text-[8px] font-light tracking-wider">BOUTIQUE</div>
      </div>
    )
  },
  { 
    name: "Artisan Works", 
    type: "Handmade Crafts", 
    logoStyle: "rounded-md border-2 border-purple-500 bg-white",
    logoContent: (
      <div className="flex flex-col items-center">
        <svg className="w-6 h-6 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
        <div className="text-purple-600 text-[8px] font-medium">ARTISAN</div>
      </div>
    )
  },
  { 
    name: "Grill Masters", 
    type: "Restaurant", 
    logoStyle: "rounded-md bg-gradient-to-br from-red-500 to-red-800",
    logoContent: (
      <div className="flex flex-col items-center">
        <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M8 3v3M16 3v3M4 11h16M6 19h4M14 19h4"/>
          <rect x="4" y="6" width="16" height="13" rx="2"/>
        </svg>
        <div className="text-white text-[8px] font-bold tracking-wide">GRILL MASTERS</div>
      </div>
    )
  },
  { 
    name: "Sweet Delights", 
    type: "Bakery", 
    logoStyle: "rounded-full bg-gradient-to-r from-amber-300 to-amber-500",
    logoContent: (
      <div className="text-center">
        <svg className="w-7 h-7 text-white mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M8 3.5a9 3.5 0 0 1 8 0"/>
          <path d="M6 8.5V13a6 6 0 1 0 12 0V8.5"/>
          <circle cx="12" cy="7" r="2"/>
        </svg>
        <div className="text-white text-[8px] font-semibold">SWEET DELIGHTS</div>
      </div>
    )
  },
  { 
    name: "Gadget World", 
    type: "Electronics", 
    logoStyle: "rounded-md bg-indigo-600 border-b-4 border-indigo-800",
    logoContent: (
      <div className="text-center">
        <div className="text-white text-xs font-bold mb-1">GW</div>
        <div className="text-white text-[7px] tracking-wider">GADGET WORLD</div>
      </div>
    )
  },
  { 
    name: "Spice Route", 
    type: "Restaurant", 
    logoStyle: "rounded-full bg-gradient-to-br from-orange-500 to-red-600",
    logoContent: (
      <div className="text-center transform -rotate-12">
        <div className="text-white text-xs font-bold font-serif">Spice</div>
        <div className="text-white text-[8px] font-light tracking-wider">ROUTE</div>
      </div>
    )
  },
  { 
    name: "The Book Nook", 
    type: "Book Store", 
    logoStyle: "rounded-md bg-emerald-700",
    logoContent: (
      <div className="text-center">
        <svg className="w-6 h-6 text-white mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
        </svg>
        <div className="text-white text-[8px] font-medium">BOOK NOOK</div>
      </div>
    )
  },
  { 
    name: "Pet Paradise", 
    type: "Pet Supplies", 
    logoStyle: "rounded-md bg-cyan-500",
    logoContent: (
      <div className="text-center">
        <svg className="w-7 h-7 text-white mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="7"/>
          <path d="M12 9v.01M8 12h.01M12 15v.01M16 12h.01"/>
          <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z"/>
        </svg>
        <div className="text-white text-[8px] font-medium">PET PARADISE</div>
      </div>
    )
  },
  { 
    name: "Organic Harvest", 
    type: "Grocery Store", 
    logoStyle: "rounded-full border-2 border-green-600 bg-white",
    logoContent: (
      <div className="text-center">
        <svg className="w-6 h-6 text-green-600 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2a9 9 0 0 1 9 9c0 3.95-3.05 7.5-4 8.5C13.34 23.17 12 23 12 23s-1.34.17-5-3.5c-.95-1-4-4.55-4-8.5a9 9 0 0 1 9-9z"/>
          <path d="M9 14l2 2 4-4"/>
        </svg>
        <div className="text-green-700 text-[7px] font-semibold">ORGANIC HARVEST</div>
      </div>
    )
  },
  { 
    name: "Fitness First", 
    type: "Gym & Equipment", 
    logoStyle: "rounded-md bg-gradient-to-br from-red-600 to-red-800",
    logoContent: (
      <div className="text-center">
        <div className="text-white text-sm font-bold">FF</div>
        <div className="text-white text-[8px] tracking-wider">FITNESS FIRST</div>
      </div>
    )
  },
  { 
    name: "Beauty Haven", 
    type: "Cosmetics", 
    logoStyle: "rounded-md bg-fuchsia-500 border border-white",
    logoContent: (
      <div className="text-center">
        <div className="text-white text-xs font-light italic">Beauty</div>
        <div className="text-white text-[8px] font-semibold tracking-wider">HAVEN</div>
      </div>
    )
  },
  { 
    name: "Toy Galaxy", 
    type: "Toy Store", 
    logoStyle: "rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600",
    logoContent: (
      <div className="text-center">
        <svg className="w-7 h-7 text-white mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/>
          <circle cx="12" cy="12" r="4"/>
          <path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>
        </svg>
        <div className="text-white text-[8px] font-bold">TOY GALAXY</div>
      </div>
    )
  },
  { 
    name: "Home Essentials", 
    type: "Home Goods", 
    logoStyle: "rounded-md bg-lime-600",
    logoContent: (
      <div className="text-center">
        <svg className="w-6 h-6 text-white mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
        <div className="text-white text-[7px] font-semibold">HOME ESSENTIALS</div>
      </div>
    )
  },
  { 
    name: "Style Studio", 
    type: "Fashion", 
    logoStyle: "rounded-md bg-gradient-to-r from-rose-400 to-rose-600",
    logoContent: (
      <div className="text-center font-serif">
        <div className="text-white text-sm font-bold italic">S</div>
        <div className="text-white text-[9px] font-light tracking-wider">STYLE STUDIO</div>
      </div>
    )
  },
];

// Customization points
const customizationPoints = [
  {
    title: "Custom Domain & Branding",
    description: "Connect your domain and customize every aspect of your site's look and feel.",
  },
  {
    title: "Flexible Menu Management",
    description: "Organize your products with categories, options, and modifiers for a seamless ordering experience.",
  },
  {
    title: "Payment & Delivery Options",
    description: "Accept payments online and configure delivery or pickup options that work for your business.",
  },
  {
    title: "Mobile-Optimized Design",
    description: "Your site looks and works perfectly on all devices, from desktops to smartphones.",
  },
];

// Testimonials
const testimonials = [
  {
    name: "Sarah Johnson",
    business: "Sarah's Bakery",
    quote: "Since using Kpaly, my bakery orders have increased by 35%. The custom domain and branding features helped establish my online presence.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80"
  },
  {
    name: "Michael Rodriguez",
    business: "MR Electronics",
    quote: "The product catalog and order management system saved me countless hours. My customers love the easy ordering experience.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80"
  },
  {
    name: "Priya Patel",
    business: "Spice House Restaurant",
    quote: "Kpaly made it so simple to take our restaurant online. The promotional tools helped us attract new customers during slower periods.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80"
  },
];

// Pricing plans
const pricingPlans = [
  {
    title: "Starter",
    description: "Perfect for small businesses",
    price: 19,
    features: [
      "Custom domain",
      "Basic branding",
      "Up to 50 products",
      "Order management",
      "Email support",
    ],
    buttonText: "Start Free Trial",
    popular: false,
  },
  {
    title: "Growth",
    description: "For growing businesses",
    price: 49,
    features: [
      "Everything in Starter",
      "Advanced branding",
      "Unlimited products",
      "Promotions & discounts",
      "Analytics dashboard",
      "Priority support",
    ],
    buttonText: "Get Started",
    popular: true,
  },
  {
    title: "Enterprise",
    description: "For large operations",
    price: 99,
    features: [
      "Everything in Growth",
      "Multiple locations",
      "API access",
      "Dedicated account manager",
      "Custom integrations",
      "24/7 support",
    ],
    buttonText: "Contact Sales",
    popular: false,
  },
];

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);
  
  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);
  
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-amber-50 to-emerald-50">
      {/* Hero Section */}
      <header className="relative w-full h-screen flex flex-col items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="z-20 text-center max-w-4xl relative"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
            Your Online Business, Simplified
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto drop-shadow-md">
            Kpaly helps food vendors and product sellers create stunning websites, manage orders, and grow their business - all from one platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/app/login"
              className="px-8 py-4 rounded-full bg-amber-500 text-white font-semibold text-lg hover:bg-amber-400 shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              Start for Free
            </Link>
            <Link
              href="#features"
              className="px-8 py-4 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white text-white font-semibold text-lg hover:bg-white/30 transition-all duration-300 shadow-lg"
            >
              See How It Works
            </Link>
          </div>
        </motion.div>
        
        <div className="absolute inset-0 overflow-hidden">
          {/* Dark overlay with reduced opacity for better image visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-amber-900/40 to-emerald-900/40 z-10 mix-blend-multiply"></div>
          
          {/* Modern asymmetric collage with exactly 5 images */}
          <div className="relative h-full w-full p-4">
            {/* Center image (restaurant) */}
            <motion.div 
              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[42%] h-[60%] overflow-hidden rounded-xl shadow-2xl z-20"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              whileHover={{ scale: 1.03 }}
            >
              <Image 
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=1000&q=90" 
                alt="Restaurant elegance"
                width={800}
                height={1000}
                className="h-full w-full object-cover"
                priority
              />
            </motion.div>
            
            {/* Top left (bakery) */}
            <motion.div 
              className="absolute left-[8%] top-[12%] w-[25%] h-[38%] overflow-hidden rounded-xl shadow-xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              <Image 
                src="https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=500&q=85" 
                alt="Bakery products"
                width={600}
                height={500}
                className="h-full w-full object-cover"
              />
            </motion.div>
            
            {/* Bottom left (coffee shop) */}
            <motion.div 
              className="absolute left-[10%] bottom-[15%] w-[22%] h-[30%] overflow-hidden rounded-xl shadow-xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              whileHover={{ scale: 1.03 }}
            >
              <Image 
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=400&q=85" 
                alt="Coffee shop"
                width={500}
                height={400}
                className="h-full w-full object-cover"
              />
            </motion.div>
            
            {/* Top right (electronics) */}
            <motion.div 
              className="absolute right-[10%] top-[14%] w-[20%] h-[35%] overflow-hidden rounded-xl shadow-xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              whileHover={{ scale: 1.03 }}
            >
              <Image 
                src="https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=700&q=85" 
                alt="Electronics store"
                width={500}
                height={700}
                className="h-full w-full object-cover"
              />
            </motion.div>
            
            {/* Bottom right (fashion store) */}
            <motion.div 
              className="absolute right-[8%] bottom-[17%] w-[25%] h-[32%] overflow-hidden rounded-xl shadow-xl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              whileHover={{ scale: 1.03 }}
            >
              <Image 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=85" 
                alt="Fashion store"
                width={600}
                height={400}
                className="h-full w-full object-cover"
              />
            </motion.div>
          </div>
        </div>
        
        <motion.div
          animate={{
            y: scrollY * 0.2,
            opacity: Math.max(0, 1 - scrollY * 0.002)
          }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20"
        >
          <div className="animate-bounce p-2 bg-white/20 backdrop-blur-sm rounded-full">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </motion.div>
      </header>

      {/* Social Proof */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-2xl font-bold text-gray-800 mb-2">Trusted by thousands of businesses worldwide</h2>
          <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">From local cafes to global brands, businesses of all sizes use Kpaly to create their online presence</p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-10 max-w-6xl mx-auto">
            {trustedBusinesses.map((business, index) => (
              <motion.div 
                key={index} 
                className="flex flex-col items-center justify-center px-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 mb-3 relative">
                  <div className={`absolute inset-0 flex items-center justify-center ${business.logoStyle}`}>
                    {business.logoContent}
                  </div>
                </div>
                <p className="font-medium text-gray-800 text-center">{business.name}</p>
                <p className="text-xs text-gray-500 text-center">{business.type}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <p className="text-gray-400 text-sm">
                <span className="font-medium">+2,500</span> more businesses using Kpaly daily
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-gradient-to-b from-white to-amber-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Everything You Need to Succeed Online</h2>
            <p className="text-xl text-gray-600">Powerful tools to build your brand, sell your products, and manage your business.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-400 to-emerald-400 flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Demo */}
      <section className="py-20 bg-gradient-to-b from-amber-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="lg:w-1/2"
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Customize Your Online Presence</h2>
              <ul className="space-y-4">
                {customizationPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 text-emerald-500">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12l5 5L20 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{point.title}</h3>
                      <p className="text-gray-600">{point.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link
                  href="/app/login"
                  className="px-6 py-3 rounded-lg bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors"
                >
                  Get Started Now
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="lg:w-1/2 relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&h=400&q=80"
                  alt="Kpaly Dashboard Preview"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-600/30 to-emerald-600/30 mix-blend-overlay"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-amber-200 rounded-full -z-10"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-emerald-200 rounded-full -z-10"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Loved by Businesses</h2>
            <p className="text-xl text-gray-600">See how Kpaly has helped businesses like yours grow and succeed.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-8 rounded-xl border border-gray-100"
              >
                <div className="flex items-center gap-4 mb-6">
                  <Image 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.business}</p>
                  </div>
                </div>
                <blockquote className="text-gray-700">{testimonial.quote}</blockquote>
                <div className="mt-4 flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-gradient-to-b from-white to-emerald-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600">Choose the plan that's right for your business.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`rounded-2xl p-8 border ${
                  plan.popular 
                    ? "border-emerald-200 bg-gradient-to-b from-white to-emerald-50 shadow-lg relative" 
                    : "border-gray-200 bg-white"
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-amber-500 to-emerald-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{plan.title}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="flex justify-center items-end">
                    <span className="text-4xl font-bold text-gray-800">${plan.price}</span>
                    <span className="text-gray-500 ml-1">/mo</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500">
                        <path d="M5 12l5 5L20 7" />
                      </svg>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/app/login"
                  className={`block w-full py-3 rounded-lg text-center font-semibold transition-colors ${
                    plan.popular 
                      ? "bg-gradient-to-r from-amber-500 to-emerald-500 text-white hover:from-amber-600 hover:to-emerald-600" 
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {plan.buttonText}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-amber-500 to-emerald-500 text-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-4">Ready to Grow Your Business?</h2>
            <p className="text-xl mb-8">Join thousands of vendors who trust Kpaly with their online presence.</p>
            <Link
              href="/app/login"
              className="px-8 py-4 bg-white text-emerald-600 rounded-full font-semibold text-lg hover:bg-opacity-90 transition-all duration-300 inline-block"
            >
              Get Started Today
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-gray-400">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Testimonials</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">FAQs</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Guides</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">API</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">GDPR</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Image 
                src="https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=40&h=40&q=80" 
                alt="Kpaly Logo"
                width={40}
                height={40}
                className="mr-2 rounded-md"
              />
              <span className="text-white font-semibold">Kpaly</span>
            </div>
            <div className="text-sm">
              &copy; {new Date().getFullYear()} Kpaly. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}