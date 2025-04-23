"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);
  const featuresRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 }
    );
    
    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });
    
    return () => observer.disconnect();
  }, []);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Customer testimonials data
  const testimonials = [
    {
      text: "Kpaly transformed my restaurant business completely. I was able to set up my online menu in minutes, and the customization options are amazing. Orders have increased by 40% since I started using it!",
      name: "Sarah Johnson",
      role: "Restaurant Owner",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      text: "As a bakery owner, I needed a simple way to showcase my products online. Kpaly made it incredibly easy to set up my store, customize my branding, and start taking orders right away.",
      name: "Michael Chen",
      role: "Bakery Owner",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      text: "The custom domain feature is a game-changer. My handmade jewelry brand looks so professional now, and I love how easy it is to run promotions and track my sales with Kpaly's analytics.",
      name: "Jessica Williams",
      role: "Jewelry Vendor",
      image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    }
  ];

  // Trusted brands/logos data for demonstration
  const trustedBrands = [
    { name: "Brand 1", image: "https://images.unsplash.com/photo-1587653263995-422546a7a569?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=50&q=80" },
    { name: "Brand 2", image: "https://images.unsplash.com/photo-1587653263995-422546a7a569?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=50&q=80" },
    { name: "Brand 3", image: "https://images.unsplash.com/photo-1587653263995-422546a7a569?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=50&q=80" },
    { name: "Brand 4", image: "https://images.unsplash.com/photo-1587653263995-422546a7a569?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=50&q=80" },
    { name: "Brand 5", image: "https://images.unsplash.com/photo-1587653263995-422546a7a569?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=50&q=80" }
  ];

  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-[#F8FAFC] to-[#EFF6FF]">
      {/* Hero Section */}
      <section className="w-full max-w-7xl px-4 pt-24 pb-16 md:pt-32 md:pb-24 mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="px-4 py-2 text-sm font-medium rounded-full bg-orange-100 text-orange-800">
                Launch Your Online Store Today
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Turn Food & Products Into 
              <span className="text-blue-600"> Digital Success</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-slate-600 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Set up your online store in minutes. Customize your brand, manage orders, 
              and grow your business with Kpaly — the all-in-one platform for food and product vendors.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Link href="/app/login" className="px-8 py-4 text-lg font-medium text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition-all">
                Get Started Free
              </Link>
              <button 
                onClick={scrollToFeatures}
                className="px-8 py-4 text-lg font-medium text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-all"
              >
                See Features
              </button>
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-2 text-slate-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: isVisible ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <span>No credit card required</span>
              <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
              <span>14-day free trial</span>
              <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
              <span>Cancel anytime</span>
            </motion.div>
          </div>
          
          <motion.div 
            className="flex-1 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="relative w-full max-w-md mx-auto">
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-orange-400 to-blue-600 blur-3xl opacity-20 rounded-full transform -translate-x-10 translate-y-10"></div>
              <Image
                src="https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600&q=80"
                width={800}
                height={600}
                alt="Professional online store dashboard on laptop with analytics and product management"
                className="rounded-xl shadow-2xl border border-slate-200 object-cover"
                unoptimized
              />
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Clients/Trusted By Section */}
      <section className="w-full bg-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-center text-slate-500 mb-8">Trusted by vendors worldwide</p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-items-center">
            <div className="h-16 flex items-center justify-center">
              <div className="flex items-center px-3 py-2">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <div>
                  <span className="text-green-800 font-bold text-sm">Fresh</span>
                  <span className="text-green-600 font-medium text-sm">Harvest</span>
                </div>
              </div>
            </div>
            
            <div className="h-16 flex items-center justify-center">
              <div className="bg-slate-800 text-white px-3 py-2 rounded-lg">
                <div className="flex items-center">
                  <div className="mr-1">
                    <span className="font-bold text-sm uppercase tracking-wider">Urban</span>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <span className="font-bold text-sm uppercase tracking-wider ml-1">Eats</span>
                </div>
              </div>
            </div>
            
            <div className="h-16 flex items-center justify-center">
              <div className="border-2 border-purple-300 rounded-lg px-2 py-2">
                <div className="flex flex-col items-center">
                  <span className="text-purple-800 font-serif italic font-medium">Artisan</span>
                  <div className="flex items-center">
                    <div className="w-4 h-1 bg-purple-400 rounded-full"></div>
                    <span className="text-purple-600 font-serif mx-1">Crafts</span>
                    <div className="w-4 h-1 bg-purple-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="h-16 flex items-center justify-center">
              <div className="flex flex-col items-center px-3">
                <div className="flex items-center">
                  <span className="text-red-600 font-bold text-lg">Spice</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mx-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-red-800 text-xs uppercase tracking-widest">Avenue</span>
              </div>
            </div>
            
            <div className="h-16 flex items-center justify-center">
              <div className="bg-blue-50 px-2 py-1 rounded-full border border-blue-200">
                <div className="flex items-center">
                  <span className="text-blue-800 font-bold text-sm">Gourmet</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mx-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  </svg>
                  <span className="text-blue-600 font-bold text-sm">Express</span>
                </div>
              </div>
            </div>

            {/* New logos */}
            <div className="h-16 flex items-center justify-center">
              <div className="bg-amber-100 px-3 py-2 rounded-md">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-600 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                  <div className="flex flex-col">
                    <span className="text-amber-800 font-bold text-sm">SWEET</span>
                    <span className="text-amber-600 font-medium text-xs -mt-1">Bakery</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-16 flex items-center justify-center">
              <div className="relative">
                <div className="w-10 h-10 rounded-full border-2 border-teal-500 absolute -top-0.5 -left-0.5"></div>
                <div className="bg-white border-2 border-teal-500 px-2 py-0.5 rounded-md relative">
                  <div className="flex flex-col items-center">
                    <span className="text-teal-800 font-bold text-sm tracking-tight">eco</span>
                    <span className="text-teal-600 text-xs -mt-1">essentials</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-16 flex items-center justify-center">
              <div className="border-b-2 border-gray-800">
                <div className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span className="font-sans font-bold text-gray-800 tracking-wider">CRAFT</span>
                </div>
                <div className="text-right">
                  <span className="text-gray-500 text-xs italic">furniture co.</span>
                </div>
              </div>
            </div>

            <div className="h-16 flex items-center justify-center">
              <div className="bg-rose-50 px-2 py-1 rounded-lg border border-rose-200">
                <div className="flex flex-col items-center">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-rose-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                    <span className="text-rose-700 font-medium text-sm ml-1">Bella</span>
                  </div>
                  <span className="text-rose-500 text-xs uppercase tracking-wider -mt-1">Cosmetics</span>
                </div>
              </div>
            </div>

            <div className="h-16 flex items-center justify-center">
              <div className="px-3 py-1">
                <div className="flex items-center justify-center">
                  <span className="text-yellow-500 font-bold text-xl">Sun</span>
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 mx-1 flex items-center justify-center">
                    <span className="text-white font-bold text-xs">&</span>
                  </div>
                  <span className="text-orange-500 font-bold text-xl">Soil</span>
                </div>
                <div className="text-center">
                  <span className="text-gray-500 text-xs">organic produce</span>
                </div>
              </div>
            </div>

            <div className="h-16 flex items-center justify-center">
              <div className="bg-indigo-800 text-white px-3 py-1 rounded">
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <span className="ml-1 font-mono font-bold tracking-wider">BYTE</span>
                  </div>
                  <span className="text-xs text-indigo-300 tracking-widest font-light">TECH SHOP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section ref={featuresRef} className="w-full max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Everything You Need to Succeed Online</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Powerful tools that help you sell more and manage your business effortlessly.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Custom Domain",
              description: "Use your own domain name and build your brand identity with a professional online presence.",
              icon: "🌐",
              color: "bg-blue-100"
            },
            {
              title: "Brand Customization",
              description: "Personalize colors, logos, and layouts to match your brand perfectly.",
              icon: "🎨",
              color: "bg-orange-100"
            },
            {
              title: "Order Management",
              description: "Easily track and fulfill orders with our intuitive dashboard system.",
              icon: "📦",
              color: "bg-teal-100"
            },
            {
              title: "Promotions & Discounts",
              description: "Create and manage special offers to attract customers and boost sales.",
              icon: "🏷️",
              color: "bg-purple-100"
            },
            {
              title: "Analytics & Insights",
              description: "Make data-driven decisions with comprehensive sales and customer analytics.",
              icon: "📊",
              color: "bg-pink-100"
            },
            {
              title: "Mobile Optimized",
              description: "Reach customers on any device with fully responsive, mobile-friendly stores.",
              icon: "📱",
              color: "bg-green-100"
            }
          ].map((feature, i) => (
            <div 
              key={i} 
              className="animate-on-scroll rounded-xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:shadow-md"
            >
              <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center text-2xl mb-6`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Showcase Section */}
      <section className="w-full py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">
              <Image
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                width={600}
                height={400}
                alt="Professional-looking online food store on laptop and mobile"
                className="rounded-xl shadow-lg object-cover"
                unoptimized
              />
            </div>
            <div className="flex-1 space-y-6">
              <div className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                Beautiful Online Presence
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Create a stunning website that converts visitors into customers</h2>
              <p className="text-lg text-slate-600">
                With Kpaly, you can easily build a professional online store that reflects your brand's identity. 
                Our intuitive drag-and-drop editor and customizable templates make it simple to create a website 
                that stands out from the competition.
              </p>
              <ul className="space-y-3">
                {["Mobile-responsive design", "Brand customization", "SEO optimization", "Fast loading speeds"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="w-full bg-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">How It Works</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Get your online store up and running in three simple steps.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Sign Up",
                description: "Create your account in seconds and access your dashboard immediately.",
                step: "1"
              },
              {
                title: "Customize Your Store",
                description: "Add your products, set your branding, and configure your preferences.",
                step: "2"
              },
              {
                title: "Start Selling",
                description: "Share your store link, connect your domain, and start receiving orders.",
                step: "3"
              }
            ].map((step, i) => (
              <div key={i} className="animate-on-scroll">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mb-6">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="w-full max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">What Our Customers Say</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Join thousands of vendors who've grown their business with Kpaly.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item, i) => (
            <div key={i} className="animate-on-scroll bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <p className="text-slate-700 mb-6">
                "{item.text}"
              </p>
              <div className="flex items-center gap-3">
                <Image 
                  src={item.image}
                  width={40}
                  height={40}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover"
                  unoptimized
                />
                <div>
                  <p className="font-semibold text-slate-900">{item.name}</p>
                  <p className="text-sm text-slate-500">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Product Showcase Section */}
      <section className="w-full bg-gradient-to-b from-white to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-6">
              <div className="inline-block px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                Powerful Management Tools
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Easily manage your products and orders</h2>
              <p className="text-lg text-slate-600">
                Kpaly provides powerful yet simple tools to manage your products, track inventory, 
                and process orders efficiently. Our intuitive dashboard gives you real-time insights 
                into your business performance.
              </p>
              <ul className="space-y-3">
                {["Inventory management", "Order tracking", "Customer database", "Sales analytics"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1">
              <Image
                src="https://images.unsplash.com/photo-1556155092-490a1ba16284?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                width={600}
                height={400}
                alt="Business owner managing online store"
                className="rounded-xl shadow-lg object-cover"
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section className="w-full bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Simple Pricing for Everyone</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Choose the plan that works best for your business.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Starter",
                price: "$9",
                features: [
                  "Basic customization",
                  "Up to 50 products",
                  "Standard analytics",
                  "Email support"
                ],
                cta: "Get Started",
                highlight: false
              },
              {
                name: "Professional",
                price: "$29",
                features: [
                  "Advanced customization",
                  "Up to 500 products",
                  "Advanced analytics",
                  "Priority support",
                  "Custom domain",
                  "Promotional tools"
                ],
                cta: "Get Started",
                highlight: true
              },
              {
                name: "Enterprise",
                price: "$99",
                features: [
                  "Full customization",
                  "Unlimited products",
                  "Premium analytics",
                  "24/7 support",
                  "Multiple domains",
                  "Advanced marketing tools",
                  "API access"
                ],
                cta: "Contact Sales",
                highlight: false
              }
            ].map((plan, i) => (
              <div 
                key={i} 
                className={`animate-on-scroll rounded-xl p-8 border transition-all ${
                  plan.highlight 
                    ? "bg-blue-600 text-white border-blue-500 shadow-xl scale-105 -mt-4" 
                    : "bg-white text-slate-900 border-slate-200 hover:shadow-md"
                }`}
              >
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className={`ml-2 ${plan.highlight ? "text-blue-200" : "text-slate-500"}`}>/month</span>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2">
                      <svg className={`w-5 h-5 ${plan.highlight ? "text-blue-300" : "text-blue-600"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className={`w-full py-3 rounded-lg font-medium ${
                  plan.highlight 
                    ? "bg-white text-blue-600 hover:bg-blue-50" 
                    : "bg-blue-600 text-white hover:bg-blue-700"
                } transition-all`}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="w-full max-w-7xl mx-auto px-4 py-20">
        <div className="animate-on-scroll rounded-2xl overflow-hidden relative">
          <Image
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
            alt="Food marketplace"
            width={1920}
            height={600}
            className="absolute inset-0 object-cover w-full h-full"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-900/70"></div>
          <div className="relative z-10 p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-6">Ready to Grow Your Business?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
              Join thousands of successful vendors who've transformed their business with Kpaly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/app/login" className="px-8 py-4 text-lg font-medium bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-all">
                Start Your Free Trial
              </Link>
              <Link href="#" className="px-8 py-4 text-lg font-medium border-2 border-white text-white rounded-lg hover:bg-blue-700/30 transition-all">
                Schedule a Demo
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="w-full bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="font-bold text-lg mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-slate-400 hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#" className="text-slate-400 hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="#" className="text-slate-400 hover:text-white transition-colors">API</Link></li>
                <li><Link href="#" className="text-slate-400 hover:text-white transition-colors">Integrations</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-slate-400 hover:text-white transition-colors">Documentation</Link></li>
                <li><Link href="#" className="text-slate-400 hover:text-white transition-colors">Guides</Link></li>
                <li><Link href="#" className="text-slate-400 hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="#" className="text-slate-400 hover:text-white transition-colors">Support</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-slate-400 hover:text-white transition-colors">About</Link></li>
                <li><Link href="#" className="text-slate-400 hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="#" className="text-slate-400 hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="#" className="text-slate-400 hover:text-white transition-colors">Partners</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-slate-400 hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="#" className="text-slate-400 hover:text-white transition-colors">Terms</Link></li>
                <li><Link href="#" className="text-slate-400 hover:text-white transition-colors">Security</Link></li>
                <li><Link href="#" className="text-slate-400 hover:text-white transition-colors">Cookies</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Image
                src="/logo.png" 
                alt="Kpaly Logo"
                width={40}
                height={40}
                className="rounded"
              />
              <span className="font-bold text-xl">Kpaly</span>
            </div>
            
            <div className="flex gap-6">
              {["Twitter", "Facebook", "Instagram", "LinkedIn"].map((social, i) => (
                <Link key={i} href="#" className="text-slate-400 hover:text-white transition-colors">
                  {social}
                </Link>
              ))}
            </div>
            
            <p className="text-slate-400 mt-4 md:mt-0">© {new Date().getFullYear()} Kpaly. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}