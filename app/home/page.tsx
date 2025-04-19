"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, RefObject } from "react";
import Magic from "@/components/icons/magic";
import { ThemeToggle } from "@/components/theme-toggle";

// Testimonial data
const testimonials = [
  {
    name: "Sarah Johnson",
    position: "Owner, Bistro Delight",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    testimonial: "Kpaly transformed our online presence. The custom domain and branding features helped establish trust with our customers."
  },
  {
    name: "Marcus Lee",
    position: "CEO, Urban Apparel",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    testimonial: "Since launching our store with Kpaly, we've seen a 40% increase in online sales. The analytics tools are invaluable for our business decisions."
  },
  {
    name: "Priya Patel",
    position: "Founder, Spice Market",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    testimonial: "The ordering system is seamless. Our customers love the experience, and it's saved us countless hours in order management."
  },
  {
    name: "David Chen",
    position: "Marketing Director, Tech Solutions",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    testimonial: "The customization options are unmatched. We were able to create a store that perfectly aligns with our brand identity."
  },
  {
    name: "Emma Rodriguez",
    position: "Owner, Craft Collective",
    image: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    testimonial: "As an artisan marketplace, we needed flexibility. Kpaly delivered with features that showcase our products beautifully."
  },
  {
    name: "James Wilson",
    position: "Operations Manager, Fresh Foods",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    testimonial: "The multi-tenant architecture gives each of our franchise locations their own space, while keeping our brand consistent."
  },
  {
    name: "Aisha Mohammed",
    position: "Founder, Boutique Beauty",
    image: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    testimonial: "Kpaly's analytics dashboard has given us insights we never had before. Now we know exactly what products are trending."
  },
  {
    name: "Thomas Müller",
    position: "CTO, Digital Innovators",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    testimonial: "The API integrations were exactly what we needed. We connected our inventory system seamlessly within a day."
  }
];

// Create a duplicated array for infinite scrolling effect
const duplicatedTestimonials = [...testimonials, ...testimonials];
// Add a repeated set of the first few testimonials at the end to ensure seamless looping
const testimonialsList = [...duplicatedTestimonials, ...testimonials.slice(0, 3)];

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const testimonialRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const testimonialWidth = useRef(352); // 320px card width + 2 * 16px margin
  const testimonialContainerWidth = useRef(0);
  
  useEffect(() => {
    setMounted(true);
    
    // Calculate total width of all testimonials
    if (testimonialRef.current) {
      testimonialContainerWidth.current = testimonialRef.current.scrollWidth;
    }

    const autoScroll = setInterval(() => {
      if (!isDragging.current && testimonialRef.current) {
        // Loop the scroll by resetting to beginning when it reaches the end
        setDragOffset(prev => {
          // Total scrollable width calculation (8 testimonials * width - visible area)
          const maxScroll = testimonialContainerWidth.current || (8 * testimonialWidth.current);
          const newOffset = prev - 1;
          
          // When we've scrolled significantly, reset position to create continuous loop effect
          // This is the key to the infinite scroll illusion
          if (Math.abs(newOffset) >= (testimonialWidth.current * 8)) { // After 8 cards, reset
            return 0; // Reset to beginning
          }
          
          return newOffset;
        });
      }
    }, 20);

    // Update the testimonial width if window resizes
    const handleResize = () => {
      if (testimonialRef.current) {
        testimonialContainerWidth.current = testimonialRef.current.scrollWidth;
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      clearInterval(autoScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const benefits = [
    {
      title: "Custom Domains",
      description: "Connect your own domain or use a free subdomain. Your brand, your rules.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
      ),
    },
    {
      title: "Brand Customization",
      description: "Upload your logo, set your brand colors, and create a cohesive online presence.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
        </svg>
      ),
    },
    {
      title: "Order Management",
      description: "Streamline your business with seamless order tracking and fulfillment.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        </svg>
      ),
    },
    {
      title: "Analytics Dashboard",
      description: "Track sales, visitor behavior, and performance with real-time insights.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
        </svg>
      ),
    },
    {
      title: "Promotions & Discounts",
      description: "Create special offers, coupon codes, and seasonal promotions easily.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
      ),
    },
    {
      title: "Multi-Tenant Architecture",
      description: "Each store is isolated with its own database, ensuring privacy and scalability.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
        </svg>
      ),
    },
  ];

  const features = [
    {
      title: "Product Catalog Management",
      description: "Organize and showcase your products or menu items with beautiful, customizable layouts.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2000&auto=format&fit=crop",
    },
    {
      title: "Online Ordering System",
      description: "Accept orders directly through your website with a seamless checkout experience.",
      image: "https://images.unsplash.com/photo-1556742521-9713bf272865?q=80&w=2000&auto=format&fit=crop",
    },
    {
      title: "Customer Management",
      description: "Build and manage your customer relationships with integrated CRM tools.",
      image: "https://images.unsplash.com/photo-1553775282-20af80779df7?q=80&w=2000&auto=format&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-stone-950 dark:via-stone-900 dark:to-emerald-950">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/70 dark:bg-stone-900/70 backdrop-blur-lg z-50 border-b border-gray-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Image src="/logo.png" alt="Kpaly" width={32} height={32} className="h-8 w-auto" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">Kpaly</span>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Link 
                href={process.env.NODE_ENV === 'development' ? 'http://app.localhost:3000/login' : 'https://app.kpaly.com/login'} 
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Build Your Online <span className="bg-gradient-to-r from-orange-500 to-emerald-500 bg-clip-text text-transparent">Store</span> in Minutes
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
                Kpaly helps food and product vendors create beautiful, fully-functional online stores with custom domains, real-time order management, and powerful analytics.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href={process.env.NODE_ENV === 'development' ? 'http://app.localhost:3000/login' : 'https://app.kpaly.com/login'} className="bg-gradient-to-r from-orange-500 to-emerald-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:opacity-90 transition duration-200 shadow-lg hover:shadow-xl">
                  Start Building
                </Link>
                <a href="#features" className="border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-300 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 dark:hover:bg-stone-800 transition duration-200">
                  Learn More
                </a>
              </div>
            </div>
            
            {/* Hero Image for E-commerce Dashboard */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-emerald-500/20 rounded-2xl transform rotate-3"></div>
              <div className="relative bg-white dark:bg-stone-900 p-3 rounded-2xl shadow-2xl">
                <Image 
                  src="https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?q=80&w=1600&auto=format&fit=crop" 
                  alt="Kpaly E-commerce Dashboard Preview" 
                  width={800} 
                  height={450}
                  className="rounded-lg w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 dark:from-stone-900 dark:to-stone-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Build Websites for <span className="bg-gradient-to-r from-orange-500 to-emerald-500 bg-clip-text text-transparent">Anything</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              From food to fashion, art to technology – create the perfect online presence for your business
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Fine Dining",
                image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=400&h=300&auto=format&fit=crop",
                color: "from-orange-400 to-red-500",
              },
              {
                name: "Food Trucks",
                image: "https://images.unsplash.com/photo-1566843972142-a7fcb70de55a?q=80&w=400&h=300&auto=format&fit=crop",
                color: "from-pink-500 to-purple-600",
              },
              {
                name: "Fashion Boutiques",
                image: "https://images.unsplash.com/photo-1582719188393-bb71ca45dbb9?q=80&w=400&h=300&auto=format&fit=crop",
                color: "from-purple-400 to-indigo-500",
              },
              {
                name: "Artisan Markets",
                image: "https://images.unsplash.com/photo-1578237493287-8d4d2b03591a?q=80&w=400&h=300&auto=format&fit=crop",
                color: "from-emerald-400 to-teal-500",
              },
              {
                name: "Tech Products",
                image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=400&h=300&auto=format&fit=crop",
                color: "from-blue-500 to-cyan-600",
              },
              {
                name: "Beauty & Wellness",
                image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=400&h=300&auto=format&fit=crop",
                color: "from-rose-400 to-pink-500",
              },
              {
                name: "Flower Shops",
                image: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?q=80&w=400&h=300&auto=format&fit=crop",
                color: "from-pink-400 to-red-400",
              },
              {
                name: "Vintage Stores",
                image: "https://images.unsplash.com/photo-1505740106531-4243f3831c78?q=80&w=400&h=300&auto=format&fit=crop",
                color: "from-amber-400 to-yellow-500",
              },
              {
                name: "Jewelry Designers",
                image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=400&h=300&auto=format&fit=crop",
                color: "from-yellow-400 to-amber-500",
              },
              {
                name: "Coffee Shops",
                image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=400&h=300&auto=format&fit=crop",
                color: "from-amber-600 to-brown-600",
              },
              {
                name: "Pet Products",
                image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=400&h=300&auto=format&fit=crop",
                color: "from-lime-400 to-green-500",
              },
              {
                name: "Home Decor",
                image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=400&h=300&auto=format&fit=crop",
                color: "from-slate-400 to-gray-500",
              },
              {
                name: "Music Equipment",
                image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=400&h=300&auto=format&fit=crop",
                color: "from-red-500 to-pink-600",
              },
              {
                name: "Sporting Goods",
                image: "https://images.unsplash.com/photo-1518013431117-eb1465fa5752?q=80&w=400&h=300&auto=format&fit=crop",
                color: "from-green-400 to-emerald-500",
              },
              {
                name: "Books & Stationery",
                image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=400&h=300&auto=format&fit=crop",
                color: "from-indigo-400 to-purple-600",
              },
              {
                name: "Handmade Crafts",
                image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=400&h=300&auto=format&fit=crop",
                color: "from-sky-400 to-blue-500",
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className={`relative group overflow-hidden rounded-xl shadow-sm hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-stone-800/50 dark:hover:border-orange-500/30 ${mounted ? 'animate-slideUpAndFade' : ''}`}
                style={{ 
                  animationDelay: `${index * 80}ms`,
                  animationFillMode: 'forwards'
                }}
              >
                <div className="relative h-48">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-70 transition-opacity duration-300`}></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link 
                      href={process.env.NODE_ENV === 'development' ? 'http://app.localhost:3000/login' : 'https://app.kpaly.com/login'} 
                      className="bg-white/90 dark:bg-stone-800/90 text-gray-900 dark:text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-white dark:hover:bg-stone-700 transition duration-200"
                    >
                      Build for {item.name}
                    </Link>
                  </div>
                </div>
                <div className="p-4 bg-white dark:bg-stone-900">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              ...and limitless possibilities for your business!
            </p>
            <Link 
              href={process.env.NODE_ENV === 'development' ? 'http://app.localhost:3000/login' : 'https://app.kpaly.com/login'} 
              className="inline-flex items-center text-white bg-gradient-to-r from-orange-500 to-emerald-500 px-8 py-3 rounded-full text-lg font-semibold hover:opacity-90 transition duration-200 group"
            >
              Start Building Your Website 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-200">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need to Succeed Online
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Powerful features that help you grow your business
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className={`p-6 bg-white dark:bg-stone-900 rounded-xl shadow-sm border border-gray-100 dark:border-stone-800/50 hover:shadow-lg dark:hover:shadow-2xl dark:hover:border-orange-500/30 hover:-translate-y-1 transition-all duration-300 group ${mounted ? 'animate-slideUpAndFade' : ''}`}
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'forwards'
                }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4 text-white transform group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-orange-500/20 transition-all duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-stone-900/50">
        <div className="max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 mb-20 ${mounted ? 'animate-slideUpAndFade' : ''}`}
              style={{ 
                animationDelay: `${index * 200}ms`,
                animationFillMode: 'forwards'
              }}
            >
              <div className="flex-1">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{feature.title}</h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">{feature.description}</p>
                <Link href={process.env.NODE_ENV === 'development' ? 'http://app.localhost:3000/login' : 'https://app.kpaly.com/login'} className="inline-flex items-center text-orange-500 font-semibold hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300 transition-colors duration-200 group">
                  Get Started <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-200">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
              <div className="flex-1">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-emerald-500/20 rounded-xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300"></div>
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    width={600}
                    height={400}
                    className="relative rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-stone-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Choose the plan that best fits your business needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <div className={`bg-white dark:bg-stone-900 rounded-xl shadow-sm border border-gray-200 dark:border-stone-800/70 p-8 hover:shadow-lg dark:hover:shadow-2xl dark:hover:border-emerald-500/30 hover:-translate-y-2 transition-all duration-300 ${mounted ? 'animate-slideUpAndFade' : ''}`}
              style={{ 
                animationDelay: '300ms',
                animationFillMode: 'forwards'
              }}>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Starter</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Perfect for getting started</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">Free</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Subdomain only (yourstore.kpaly.com)
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Up to 50 products
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Basic analytics
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Community support
                </li>
              </ul>
              <Link href={process.env.NODE_ENV === 'development' ? 'http://app.localhost:3000/login' : 'https://app.kpaly.com/login'} className="block w-full text-center bg-gray-100 hover:bg-gray-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-gray-900 dark:text-white px-6 py-3 rounded-lg font-semibold transition duration-200">
                Get Started Free
              </Link>
            </div>
            
            {/* Professional Plan */}
            <div className={`bg-gradient-to-br from-orange-500 to-emerald-500 rounded-xl shadow-xl p-8 text-white relative overflow-hidden hover:shadow-2xl dark:hover:shadow-orange-500/30 hover:-translate-y-2 transition-all duration-300 ${mounted ? 'animate-slideUpAndFade' : ''}`}
              style={{ 
                animationDelay: '400ms',
                animationFillMode: 'forwards'
              }}>
              <div className="absolute top-0 right-0 bg-yellow-400 text-gray-900 text-sm font-semibold px-3 py-1 rounded-bl-lg">Popular</div>
              <h3 className="text-xl font-bold mb-2">Professional</h3>
              <p className="text-orange-100 mb-4">For growing businesses</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">$20</span>
                <span className="text-orange-100">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-white mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Everything in Starter
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-white mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Custom domain
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-white mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Unlimited products
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-white mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Advanced analytics
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-white mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Priority support
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-white mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Custom branding
                </li>
              </ul>
              <Link href={process.env.NODE_ENV === 'development' ? 'http://app.localhost:3000/login' : 'https://app.kpaly.com/login'} className="block w-full text-center bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-200">
                Get Started
              </Link>
            </div>
            
            {/* Enterprise Plan */}
            <div className={`bg-white dark:bg-stone-900 rounded-xl shadow-sm border border-gray-200 dark:border-stone-800/70 p-8 hover:shadow-lg dark:hover:shadow-2xl dark:hover:border-indigo-500/30 hover:-translate-y-2 transition-all duration-300 ${mounted ? 'animate-slideUpAndFade' : ''}`}
              style={{ 
                animationDelay: '500ms',
                animationFillMode: 'forwards'
              }}>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Enterprise</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">For large businesses</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">Custom</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Everything in Professional
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Multi-store management
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Dedicated support
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Custom integrations
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <svg className="w-5 h-5 text-emerald-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  SLA guarantees
                </li>
              </ul>
              <Link href={process.env.NODE_ENV === 'development' ? 'http://app.localhost:3000/login' : 'https://app.kpaly.com/login'} className="block w-full text-center bg-gray-100 hover:bg-gray-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-gray-900 dark:text-white px-6 py-3 rounded-lg font-semibold transition duration-200">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Trusted by Businesses Like Yours
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Join thousands of vendors who&apos;ve grown their business with Kpaly
            </p>
          </div>
          
          <div 
            ref={testimonialRef}
            className="relative overflow-hidden rounded-xl"
            onMouseDown={(e) => {
              isDragging.current = true;
              startX.current = e.clientX;
              // Add grabbing style to indicate dragging
              if (e.currentTarget.firstChild) {
                (e.currentTarget.firstChild as HTMLElement).style.cursor = 'grabbing';
              }
            }}
            onMouseMove={(e) => {
              if (isDragging.current) {
                const deltaX = e.clientX - startX.current;
                setDragOffset(prev => {
                  // Handle limits to prevent dragging too far in either direction
                  const newOffset = prev + deltaX;
                  // Allow some elasticity but prevent dragging beyond certain limits
                  const maxBackScroll = testimonialWidth.current;
                  if (newOffset > maxBackScroll) {
                    return maxBackScroll * 0.5; // Elastic resistance when pulling too far right
                  }
                  return newOffset;
                });
                startX.current = e.clientX;
              }
            }}
            onMouseUp={(e) => {
              isDragging.current = false;
              // Restore cursor
              if (e.currentTarget.firstChild) {
                (e.currentTarget.firstChild as HTMLElement).style.cursor = 'grab';
              }
            }}
            onMouseLeave={(e) => {
              isDragging.current = false;
              // Restore cursor
              if (e.currentTarget.firstChild) {
                (e.currentTarget.firstChild as HTMLElement).style.cursor = 'grab';
              }
            }}
            onTouchStart={(e) => {
              isDragging.current = true;
              startX.current = e.touches[0].clientX;
            }}
            onTouchMove={(e) => {
              if (isDragging.current) {
                const deltaX = e.touches[0].clientX - startX.current;
                setDragOffset(prev => {
                  // Similar limit logic as mouse movement
                  const newOffset = prev + deltaX;
                  const maxBackScroll = testimonialWidth.current;
                  if (newOffset > maxBackScroll) {
                    return maxBackScroll * 0.5;
                  }
                  return newOffset;
                });
                startX.current = e.touches[0].clientX;
              }
            }}
            onTouchEnd={() => {
              isDragging.current = false;
            }}
          >
            <div 
              className="flex transition-transform duration-200 cursor-grab active:cursor-grabbing py-4"
              style={{ transform: `translateX(${dragOffset}px)` }}
            >
              {testimonialsList.map((testimonial, index) => (
                <div 
                  key={index} 
                  className="flex-none w-80 p-6 mx-4 bg-white dark:bg-stone-900 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
                  style={{
                    transform: isDragging.current ? 'scale(1.02)' : 'scale(1)'
                  }}
                >
                  <div className="flex items-center mb-4">
                    <Image 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      width={48} 
                      height={48} 
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="ml-4">
                      <div className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{testimonial.position}</div>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    &quot;{testimonial.testimonial}&quot;
                  </p>
                </div>
              ))}
            </div>
            
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent dark:from-stone-950 dark:to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent dark:from-stone-950 dark:to-transparent z-10 pointer-events-none"></div>
            
            <div className="flex justify-center mt-8">
              <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                Drag to explore more testimonials
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-orange-500 to-emerald-500 rounded-2xl p-12 text-center relative overflow-hidden">
            <Magic className="absolute right-0 top-0 w-40 h-40 text-white/10 transform translate-x-8 -translate-y-8" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Build Your Online Store?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join Kpaly today and start accepting orders online within minutes. No technical skills required.
            </p>
            <Link href={process.env.NODE_ENV === 'development' ? 'http://app.localhost:3000/login' : 'https://app.kpaly.com/login'} className="bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-50 transition duration-200 inline-flex items-center shadow-lg hover:shadow-xl">
              Get Started Now <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-stone-900 border-t border-gray-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Image src="/logo.png" alt="Kpaly" width={32} height={32} className="h-8 w-auto" />
                <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">Kpaly</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Build your online store with custom domains, branding, and powerful e-commerce features.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200">Features</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200">Pricing</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200">About</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200">Blog</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200">Privacy</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200">Terms</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200">Refund Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-stone-800">
            <p className="text-center text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} Kpaly. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}