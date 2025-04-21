"use client";

import { ArrowRight, Globe, Palette, ShoppingBag, Zap, Shield, Settings, ExternalLink, Star, Check, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
    handlePauseAnimation();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
    handlePauseAnimation();
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (scrollRef.current) {
      scrollRef.current.style.animationPlayState = 'running';
    }
  };

  const handleStartAnimation = useCallback(() => {
    if (scrollRef.current && !isDragging) {
      scrollRef.current.style.animationPlayState = 'running';
    }
  }, [isDragging, scrollRef]);

  const handlePauseAnimation = () => {
    if (scrollRef.current) {
      scrollRef.current.style.animationPlayState = 'paused';
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isDragging && scrollRef.current) {
        handleStartAnimation();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [handleStartAnimation]); // isDragging is included in handleStartAnimation dependency

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const loginUrl = process.env.NODE_ENV === 'development' 
    ? 'http://app.localhost:3000/login'
    : 'https://app.kpaly.com/login';

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50 dark:from-zinc-900 dark:to-zinc-800">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md shadow-sm" : ""}`}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="Kpaly Logo"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <span className="font-cal text-2xl font-bold bg-gradient-to-r from-orange-600 to-green-600 text-transparent bg-clip-text">Kpaly</span>
          </Link>
          
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-zinc-700 dark:text-zinc-300"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition-colors">Features</Link>
            <Link href="#how-it-works" className="text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition-colors">How It Works</Link>
            <Link href="#pricing" className="text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition-colors">Pricing</Link>
            <ThemeToggle />
            <Link
              href={loginUrl}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-green-500 text-white font-medium hover:opacity-90 transition-opacity"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-zinc-900 shadow-lg">
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-4">
                <Link 
                  href="#features" 
                  className="text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </Link>
                <Link 
                  href="#how-it-works" 
                  className="text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  How It Works
                </Link>
                <Link 
                  href="#pricing" 
                  className="text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Pricing
                </Link>
                <Link
                  href={loginUrl}
                  className="px-4 py-3 rounded-full bg-gradient-to-r from-orange-500 to-green-500 text-white font-medium hover:opacity-90 transition-opacity text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden bg-white dark:bg-zinc-900">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-5xl md:text-6xl font-cal font-bold mb-6 leading-tight">
                <span className="text-zinc-900 dark:text-white">Launch Your Online Store</span>
                <br />
                <span className="bg-gradient-to-r from-orange-500 to-green-500 text-transparent bg-clip-text">
                  in Minutes, Not Months
                </span>
              </h1>
              <p className="text-xl text-zinc-700 dark:text-zinc-300 mb-8 max-w-xl mx-auto lg:mx-0">
                Create a professional online presence for your food business or product store. 
                Custom domains, branded experience, and powerful management tools - all in one platform.
              </p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <Link
                  href={loginUrl}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-orange-500 to-green-500 text-white font-medium hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
                >
                  <span>Start Free Trial</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="https://ueats.kpaly.com"
                  target="_blank"
                  className="px-8 py-3 rounded-full border-2 border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors flex items-center justify-center space-x-2"
                >
                  <span>View Demo Site</span>
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>
            
            {/* Image Gallery */}
            <div className="relative lg:h-[600px] hidden lg:block">
              <div className="grid grid-cols-3 grid-rows-3 gap-3 absolute inset-0 rotate-3">
                {[
                  {
                    src: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    alt: "Gourmet food plating"
                  },
                  {
                    src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    alt: "Premium watch product"
                  },
                  {
                    src: "https://images.unsplash.com/photo-1556742393-d75f468bfcb0?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    alt: "Delivered meals"
                  },
                  {
                    src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    alt: "Headphones product"
                  },
                  {
                    src: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    alt: "Shopping district"
                  },
                  {
                    src: "https://images.unsplash.com/photo-1553531384-411a247ccd73?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    alt: "Digital device"
                  },
                  {
                    src: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    alt: "Home essentials"
                  },
                  {
                    src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    alt: "Nike shoes product"
                  },
                  {
                    src: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    alt: "T-shirt apparel"
                  }
                ].map((image, index) => (
                  <div key={index} className="relative rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Image Strip */}
          <div className="lg:hidden mt-12 pb-8 overflow-x-auto scrollbar-hide">
            <div className="flex gap-4 min-w-max px-4">
              {[
                {
                  src: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  alt: "Gourmet food plating"
                },
                {
                  src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  alt: "Premium watch product"
                },
                {
                  src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  alt: "Headphones product"
                },
                {
                  src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  alt: "Nike shoes product"
                },
                {
                  src: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  alt: "Home essentials"
                }
              ].map((image, index) => (
                <div key={index} className="relative w-48 h-48 flex-shrink-0 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-4 bg-white dark:bg-zinc-800">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-cal font-bold text-center mb-16 text-zinc-900 dark:text-white">
            Everything You Need to Succeed
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: "Custom Domain Setup",
                description: "Use your own domain or get a free subdomain. Professional presence with seamless SSL security."
              },
              {
                icon: Palette,
                title: "Brand Customization",
                description: "Make it yours with custom colors, logos, and themes that match your brand identity."
              },
              {
                icon: ShoppingBag,
                title: "Product Management",
                description: "Easily add and manage products, set prices, run promotions, and track inventory."
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Built on modern tech stack with edge deployment for the best customer experience."
              },
              {
                icon: Shield,
                title: "Secure by Default",
                description: "Enterprise-grade security with automatic SSL, DDoS protection, and secure checkout."
              },
              {
                icon: Settings,
                title: "Easy Management",
                description: "Intuitive dashboard to manage orders, customers, and analytics from anywhere."
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-700 hover:border-orange-300 dark:hover:border-orange-800 transition-colors"
              >
                <feature.icon className="w-12 h-12 mb-4 text-orange-500" />
                <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-white">{feature.title}</h3>
                <p className="text-zinc-600 dark:text-zinc-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories Showcase */}
      <section className="py-20 px-4 bg-orange-50 dark:bg-zinc-900">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-cal font-bold text-center mb-4 text-zinc-900 dark:text-white">
            Build Websites for Anything
          </h2>
          <p className="text-xl text-zinc-700 dark:text-zinc-300 text-center mb-16 max-w-3xl mx-auto">
            From restaurants to artisan workshops, tech stores to jewelry boutiques - transform any business into a thriving online presence
          </p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Restaurants & Cafes",
                image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2000&auto=format&fit=crop",
                description: "Digital menus, online ordering, and table reservations for dining establishments"
              },
              {
                title: "Retail Stores",
                image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000&auto=format&fit=crop",
                description: "Showcase clothing, electronics, and consumer goods with professional e-commerce"
              },
              {
                title: "Beauty & Wellness",
                image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2000&auto=format&fit=crop",
                description: "Spa services, cosmetics, and wellness products with booking functionality"
              },
              {
                title: "Artisan & Handmade",
                image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=2000&auto=format&fit=crop",
                description: "Crafts, jewelry, and unique creations with story-driven product pages"
              },
              {
                title: "Educational Services",
                image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2000&auto=format&fit=crop",
                description: "Courses, tutoring, and training programs with enrollment management"
              },
              {
                title: "Home & Garden",
                image: "https://images.unsplash.com/photo-1558211583-d26f610c1eb1?q=80&w=2000&auto=format&fit=crop",
                description: "Furniture, decor, and landscaping services with visual galleries"
              },
              {
                title: "Automotive",
                image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2000&auto=format&fit=crop",
                description: "Car dealerships, parts, and service centers with inventory management"
              },
              {
                title: "Creative Services",
                image: "https://images.unsplash.com/photo-1511376777868-611b54f68947?q=80&w=2000&auto=format&fit=crop",
                description: "Photography, design studios, and agencies with portfolio showcases"
              }
            ].map((category, index) => (
              <div 
                key={index} 
                className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-[4/3] relative">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                  <p className="text-sm text-white/90 line-clamp-2">{category.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-cal font-bold mb-4 text-zinc-900 dark:text-white">
              ... And So Much More!
            </h3>
            <p className="text-zinc-700 dark:text-zinc-300 mb-8 max-w-2xl mx-auto">
              Pet stores, bookshops, event venues, fitness centers, bakeries, tech startups, professional services, subscription boxes, art galleries, and beyond - if you can imagine it, you can build it with Kpaly.
            </p>
            <Link
              href={loginUrl}
              className="inline-flex items-center space-x-2 px-8 py-3 rounded-full bg-gradient-to-r from-orange-500 to-green-500 text-white font-medium hover:opacity-90 transition-opacity"
            >
              <span>Start Building Your Vision</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-cal font-bold text-center mb-16 text-zinc-900 dark:text-white">
            Launch Your Store in 3 Simple Steps
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Create Your Account",
                description: "Sign up in seconds and choose your store name."
              },
              {
                step: "2",
                title: "Customize Your Store",
                description: "Add products, set your brand colors, and configure settings."
              },
              {
                step: "3",
                title: "Go Live",
                description: "Publish and start selling immediately with your custom domain."
              }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-green-500 text-white text-2xl font-bold mb-6 mx-auto">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-2 text-center text-zinc-900 dark:text-white">{item.title}</h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-center">{item.description}</p>
                {index < 2 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-orange-300 to-green-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-20 px-4 bg-white dark:bg-zinc-800 overflow-hidden">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-cal font-bold mb-4 text-zinc-900 dark:text-white">
            Trusted by Businesses Worldwide
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-12">
            Powering thousands of online stores and restaurants globally
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {[
              { value: "10,000+", label: "Active Stores" },
              { value: "50M+", label: "Orders Processed" },
              { value: "99.9%", label: "Uptime SLA" },
              { value: "4.9/5", label: "Customer Satisfaction" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-orange-500 dark:text-orange-400 mb-2">{stat.value}</div>
                <div className="text-zinc-600 dark:text-zinc-400">{stat.label}</div>
              </div>
            ))}
          </div>
          
          {/* Grabbable Scrolling Logos */}
          <div className="relative w-full overflow-hidden">
            <div
              ref={scrollRef}
              className={`flex overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing select-none ${
                isDragging ? 'animate-none' : 'animate-infinite-scroll'
              }`}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleMouseUp}
              style={{ scrollBehavior: 'auto' }}
            >
              {[...Array(3)].map((_, setIndex) => (
                <div key={setIndex} className="flex flex-shrink-0">
                  {[
                    { name: "Fresh Foods", style: "text-2xl font-semibold text-zinc-700 dark:text-zinc-300" },
                    { name: "Urban Bistro", style: "text-2xl font-semibold text-zinc-700 dark:text-zinc-300" },
                    { name: "Sweet Treats", style: "text-2xl font-semibold text-zinc-700 dark:text-zinc-300" },
                    { name: "Tech Gadgets", style: "text-2xl font-semibold text-zinc-700 dark:text-zinc-300" },
                    { name: "Home Essentials", style: "text-2xl font-semibold text-zinc-700 dark:text-zinc-300" },
                    { name: "Artisan Crafts", style: "text-2xl font-semibold text-zinc-700 dark:text-zinc-300" },
                    { name: "Green Market", style: "text-2xl font-semibold text-zinc-700 dark:text-zinc-300" },
                    { name: "Daily Deli", style: "text-2xl font-semibold text-zinc-700 dark:text-zinc-300" },
                    { name: "Gourmet Junction", style: "text-2xl font-semibold text-zinc-700 dark:text-zinc-300" },
                    { name: "Kitchen Central", style: "text-2xl font-semibold text-zinc-700 dark:text-zinc-300" }
                  ].map((company, index) => (
                    <div key={`${setIndex}-${index}`} className="flex items-center justify-center h-16 mx-8 min-w-[200px]">
                      <span className={`${company.style} opacity-50 hover:opacity-100 transition-opacity duration-300`}>{company.name}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            {/* Gradient overlays */}
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white dark:from-zinc-800 to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white dark:from-zinc-800 to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-cal font-bold text-center mb-16 text-zinc-900 dark:text-white">
            Loved by Businesses Worldwide
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Bakery Owner",
                content: "Kpaly transformed my local bakery into an online success. The custom domain and branding options made all the difference!",
                rating: 5
              },
              {
                name: "Mike Chen",
                role: "Restaurant Chain Manager",
                content: "Managing multiple locations has never been easier. The analytics and order management features are fantastic.",
                rating: 5
              },
              {
                name: "Emily Rodriguez",
                role: "Artisan Products",
                content: "As a small business owner, Kpaly gave me everything I needed to compete with bigger brands. Simply amazing!",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-700">
                <div className="flex mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-zinc-700 dark:text-zinc-300 mb-4">&quot;{testimonial.content}&quot;</p>
                <div>
                  <p className="font-bold text-zinc-900 dark:text-white">{testimonial.name}</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-cal font-bold text-center mb-4 text-zinc-900 dark:text-white">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-zinc-700 dark:text-zinc-300 text-center mb-16">
            Start free, upgrade when you grow
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Starter",
                price: "$0",
                description: "Perfect for getting started",
                features: [
                  "Up to 25 products",
                  "Free subdomain",
                  "Basic customization",
                  "Email support"
                ]
              },
              {
                name: "Pro",
                price: "$10",
                description: "For growing businesses",
                features: [
                  "Unlimited products",
                  "Custom domain",
                  "Advanced customization",
                  "Priority support",
                  "Analytics dashboard",
                  "Promotional tools"
                ],
                popular: true
              },
              {
                name: "Enterprise",
                price: "Custom",
                description: "For large businesses",
                features: [
                  "Everything in Pro",
                  "Multiple store management",
                  "Custom integrations",
                  "Dedicated account manager",
                  "SLA guarantee",
                  "Phone support"
                ]
              }
            ].map((plan, index) => (
              <div
                key={index}
                className={`p-8 rounded-2xl ${
                  plan.popular
                    ? "bg-gradient-to-b from-orange-50 to-green-50 dark:from-orange-900/20 dark:to-green-900/20 border-2 border-orange-500 dark:border-orange-600"
                    : "border border-zinc-200 dark:border-zinc-700"
                }`}
              >
                {plan.popular && (
                  <span className="px-3 py-1 rounded-full bg-orange-500 text-white text-sm font-medium">
                    Most Popular
                  </span>
                )}
                <h3 className="text-2xl font-bold mt-4 text-zinc-900 dark:text-white">{plan.name}</h3>
                <p className="text-zinc-600 dark:text-zinc-400 mb-4">{plan.description}</p>
                <p className="text-4xl font-bold mb-6 text-zinc-900 dark:text-white">
                  {plan.price}
                  {plan.price !== "Custom" && <span className="text-lg font-normal text-zinc-600 dark:text-zinc-400">/month</span>}
                </p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center space-x-2">
                      <Check className="w-5 h-5 text-green-500" />
                      <span className="text-zinc-700 dark:text-zinc-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={loginUrl}
                  className={`block w-full text-center py-3 rounded-full font-medium transition-colors ${
                    plan.popular
                      ? "bg-gradient-to-r from-orange-500 to-green-500 text-white hover:opacity-90"
                      : "border border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-500 to-green-500">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-cal font-bold text-white mb-6">
            Ready to Launch Your Online Business?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of successful businesses already using Kpaly to power their online presence.
          </p>
          <Link
            href={loginUrl}
            className="inline-flex items-center space-x-2 px-8 py-3 rounded-full bg-white text-orange-600 font-medium hover:bg-zinc-100 transition-colors"
          >
            <span>Start Your Free Trial</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <Image
                  src="/logo.png"
                  alt="Kpaly Logo"
                  width={32}
                  height={32}
                  className="rounded-lg"
                />
                <span className="font-cal text-xl font-bold text-zinc-900 dark:text-white">Kpaly</span>
              </Link>
              <p className="text-zinc-600 dark:text-zinc-400">
                Empowering businesses to succeed online with powerful, easy-to-use tools.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-zinc-900 dark:text-white">Product</h4>
              <ul className="space-y-2">
                <li><Link href="#features" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white">Features</Link></li>
                <li><Link href="#pricing" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white">Pricing</Link></li>
                <li><Link href={loginUrl} className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white">Login</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-zinc-900 dark:text-white">Company</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white">About</Link></li>
                <li><Link href="/blog" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white">Blog</Link></li>
                <li><Link href="/careers" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-zinc-900 dark:text-white">Support</h4>
              <ul className="space-y-2">
                <li><Link href="/help" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white">Help Center</Link></li>
                <li><Link href="/contact" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white">Contact</Link></li>
                <li><Link href="/privacy" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800 text-center text-zinc-600 dark:text-zinc-400">
            <p>&copy; {new Date().getFullYear()} Kpaly. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
