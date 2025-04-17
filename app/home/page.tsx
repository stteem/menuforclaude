import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  // Determine login URL based on environment
  const loginUrl = process.env.NODE_ENV === 'production'
    ? 'https://app.kpaly.com/login'
    : 'http://app.localhost:3000/login';

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header with Login Button */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="Kpaly Logo"
              width={32}
              height={32}
              className="w-8 h-8"
              priority
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-yellow-500 bg-clip-text text-transparent">
              Kpaly
            </span>
          </Link>
          <Link 
            href={loginUrl} 
            className="rounded-md bg-gradient-to-r from-orange-600 to-amber-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:from-orange-700 hover:to-amber-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2"
          >
            Login
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-amber-50 opacity-70"></div>
        <div className="container relative mx-auto px-4">
          <div className="flex flex-col items-center lg:flex-row lg:justify-between lg:space-x-10">
            <div className="mb-12 w-full lg:mb-0 lg:w-1/2">
              <div className="space-y-6">
                <h1 className="text-center text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-left lg:text-6xl xl:text-7xl">
                  <span className="block text-transparent bg-gradient-to-r from-orange-600 to-yellow-500 bg-clip-text">Kpaly</span>
                  <span className="block">Your online business, simplified</span>
                </h1>
                <p className="mx-auto mt-3 max-w-md text-center text-lg text-gray-600 sm:text-xl md:mt-5 md:max-w-3xl lg:text-left">
                  The all-in-one platform for food vendors and product sellers to create beautiful online stores, manage orders, and grow their business.
                </p>
                <div className="mt-6 flex justify-center gap-x-6 lg:justify-start">
                  <Link href={loginUrl} className="rounded-full bg-gradient-to-r from-orange-600 to-amber-500 px-8 py-3 text-base font-medium text-white shadow-md transition-all hover:from-orange-700 hover:to-amber-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 md:py-4 md:px-10 md:text-lg">
                    Get Started Free
                  </Link>
                  <Link href="#features" className="flex items-center rounded-full border border-amber-300 bg-white px-8 py-3 text-base font-medium text-gray-700 shadow-sm transition-colors hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 md:py-4 md:px-10 md:text-lg">
                    Learn More
                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v10.586l3.293-3.293a1 1 0 011.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L9 14.586V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative w-full lg:w-1/2">
              <div className="rounded-xl border-2 border-amber-100 shadow-2xl overflow-hidden">
                <div className="grid grid-cols-2 grid-rows-2 h-[450px] md:h-[500px] lg:h-[550px]">
                  {/* Image 1: Restaurant/Food */}
                  <div className="relative w-full h-full border-r border-b border-amber-100">
                    <Image
                      src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=987&q=80"
                      alt="Restaurant food service"
                      fill
                      style={{ objectFit: 'cover', objectPosition: 'center' }}
                      className="brightness-105 contrast-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5">
                      <span className="text-xs font-medium text-gray-800">Food Services</span>
                    </div>
                  </div>

                  {/* Image 2: Retail/Products */}
                  <div className="relative w-full h-full border-b border-amber-100">
                    <Image
                      src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=987&q=80"
                      alt="Retail store products"
                      fill
                      style={{ objectFit: 'cover', objectPosition: 'center' }}
                      className="brightness-105 contrast-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-bl from-amber-900/20 to-transparent"></div>
                    <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5">
                      <span className="text-xs font-medium text-gray-800">Retail Products</span>
                    </div>
                  </div>

                  {/* Image 3: Services */}
                  <div className="relative w-full h-full border-r border-amber-100">
                    <Image
                      src="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=987&q=80"
                      alt="Service based business"
                      fill
                      style={{ objectFit: 'cover', objectPosition: 'center' }}
                      className="brightness-105 contrast-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-yellow-900/20 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5">
                      <span className="text-xs font-medium text-gray-800">Professional Services</span>
                    </div>
                  </div>

                  {/* Image 4: Digital Products */}
                  <div className="relative w-full h-full">
                    <Image
                      src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=987&q=80"
                      alt="Digital products and software"
                      fill
                      style={{ objectFit: 'cover', objectPosition: 'center' }}
                      className="brightness-105 contrast-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-tl from-orange-900/20 to-transparent"></div>
                    <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5">
                      <span className="text-xs font-medium text-gray-800">Digital Products</span>
                    </div>
                  </div>
                </div>

                {/* UI overlay elements */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-4 min-w-[240px] z-10">
                  <p className="text-base font-semibold text-center text-gray-900 mb-2">One Platform, Many Possibilities</p>
                  <p className="text-xs text-center text-gray-600 mb-3">Create your perfect online store regardless of what you sell</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2 text-xs text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Custom Domains</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Mobile Ready</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Easy Setup</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Secure Checkout</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 z-10 hidden md:block">
                <div className="rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 p-4 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 rounded-full bg-white"></div>
                    <span className="text-sm font-medium text-white">Business growth</span>
                  </div>
                  <div className="mt-2 text-2xl font-bold text-white">+32%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-12 sm:py-16 border-y border-amber-100 bg-gradient-to-r from-orange-50/50 to-amber-50/50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">
            <h2 className="mb-8 text-center text-sm font-semibold uppercase tracking-wide text-amber-700">Trusted by businesses worldwide</h2>
            
            {/* Marquee container */}
            <div className="relative w-full">
              <div className="flex overflow-hidden select-none">
                <div className="flex animate-marquee">
                  {/* First set of logos */}
                  {[
                    { initials: 'TB', name: 'TechBite', gradient: 'from-purple-600 to-indigo-600', shape: 'rounded-lg' },
                    { initials: 'CS', name: 'CraftStyle', gradient: 'from-teal-500 to-emerald-500', shape: 'rounded-full' },
                    { initials: 'F', name: 'FoodFleet', gradient: 'from-rose-500 to-orange-500', shape: 'rounded-lg' },
                    { initials: 'M', name: 'MediCare', gradient: 'from-blue-600 to-cyan-500', shape: 'rounded-full' },
                    { initials: 'EC', name: 'EcoBrands', gradient: 'from-amber-500 to-yellow-400', shape: 'rounded-lg' },
                    { initials: 'VN', name: 'VinoNext', gradient: 'from-purple-600 to-pink-500', shape: 'rounded-full' },
                    { initials: 'HB', name: 'HealthBox', gradient: 'from-green-500 to-teal-500', shape: 'rounded-lg' },
                    { initials: 'FS', name: 'FitStyle', gradient: 'from-red-500 to-pink-500', shape: 'rounded-full' },
                    { initials: 'DC', name: 'DigitalCraft', gradient: 'from-blue-600 to-purple-600', shape: 'rounded-lg' },
                    { initials: 'LH', name: 'LocalHarvest', gradient: 'from-green-600 to-lime-500', shape: 'rounded-full' },
                    { initials: 'SS', name: 'StyleSense', gradient: 'from-pink-500 to-rose-500', shape: 'rounded-lg' },
                    { initials: 'CP', name: 'CloudPeak', gradient: 'from-cyan-500 to-blue-600', shape: 'rounded-full' }
                  ].map((company, index) => (
                    <div key={`first-${index}`} className="flex items-center mx-8 opacity-60 hover:opacity-100 transition-opacity group">
                      <div className={`h-10 w-10 bg-gradient-to-br ${company.gradient} ${company.shape} flex items-center justify-center text-white font-bold mr-2 group-hover:scale-110 transform transition-transform`}>
                        {company.initials}
                      </div>
                      <span className="text-gray-600 font-semibold">{company.name}</span>
                    </div>
                  ))}
                </div>
                
                {/* Duplicate set for seamless looping */}
                <div className="flex animate-marquee" aria-hidden="true">
                  {[
                    { initials: 'TB', name: 'TechBite', gradient: 'from-purple-600 to-indigo-600', shape: 'rounded-lg' },
                    { initials: 'CS', name: 'CraftStyle', gradient: 'from-teal-500 to-emerald-500', shape: 'rounded-full' },
                    { initials: 'F', name: 'FoodFleet', gradient: 'from-rose-500 to-orange-500', shape: 'rounded-lg' },
                    { initials: 'M', name: 'MediCare', gradient: 'from-blue-600 to-cyan-500', shape: 'rounded-full' },
                    { initials: 'EC', name: 'EcoBrands', gradient: 'from-amber-500 to-yellow-400', shape: 'rounded-lg' },
                    { initials: 'VN', name: 'VinoNext', gradient: 'from-purple-600 to-pink-500', shape: 'rounded-full' },
                    { initials: 'HB', name: 'HealthBox', gradient: 'from-green-500 to-teal-500', shape: 'rounded-lg' },
                    { initials: 'FS', name: 'FitStyle', gradient: 'from-red-500 to-pink-500', shape: 'rounded-full' },
                    { initials: 'DC', name: 'DigitalCraft', gradient: 'from-blue-600 to-purple-600', shape: 'rounded-lg' },
                    { initials: 'LH', name: 'LocalHarvest', gradient: 'from-green-600 to-lime-500', shape: 'rounded-full' },
                    { initials: 'SS', name: 'StyleSense', gradient: 'from-pink-500 to-rose-500', shape: 'rounded-lg' },
                    { initials: 'CP', name: 'CloudPeak', gradient: 'from-cyan-500 to-blue-600', shape: 'rounded-full' }
                  ].map((company, index) => (
                    <div key={`second-${index}`} className="flex items-center mx-8 opacity-60 hover:opacity-100 transition-opacity group">
                      <div className={`h-10 w-10 bg-gradient-to-br ${company.gradient} ${company.shape} flex items-center justify-center text-white font-bold mr-2 group-hover:scale-110 transform transition-transform`}>
                        {company.initials}
                      </div>
                      <span className="text-gray-600 font-semibold">{company.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <span className="inline-block rounded-full bg-amber-100 px-4 py-1 text-sm font-medium text-amber-800">Features</span>
            <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Everything you need to succeed online
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-600">
              From custom domains to mobile-friendly designs, Kpaly helps you build a professional online presence.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Custom Domains",
                description: "Use your own domain name or get a free Kpaly subdomain to create a professional web presence.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                ),
                color: "bg-amber-50 border-amber-100"
              },
              {
                title: "Brand Customization",
                description: "Customize colors, logos, and styles to match your brand identity and create a cohesive customer experience.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                ),
                color: "bg-orange-50 border-orange-100"
              },
              {
                title: "Order Management",
                description: "Easily track and manage customer orders with real-time notifications and a user-friendly dashboard.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                ),
                color: "bg-yellow-50 border-yellow-100"
              },
              {
                title: "Promotions & Discounts",
                description: "Create and manage promotional campaigns, discount codes, and special offers to drive sales.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                color: "bg-rose-50 border-rose-100"
              },
              {
                title: "Mobile Friendly",
                description: "Your store automatically looks great on any device, providing a seamless experience for all your customers.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                ),
                color: "bg-orange-50 border-orange-100"
              },
              {
                title: "Analytics & Insights",
                description: "Track performance with detailed analytics on sales, popular items, customer behavior, and more.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
                color: "bg-emerald-50 border-emerald-100"
              },
            ].map((feature, index) => (
              <div
                key={index}
                className={`rounded-lg ${feature.color} border p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
              >
                <div className="mb-5">{feature.icon}</div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <span className="inline-block rounded-full bg-orange-100 px-4 py-1 text-sm font-medium text-orange-800">Testimonials</span>
            <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              What our customers say
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                quote: "Kpaly transformed my small bakery business. Setting up my online store was incredibly easy, and I've seen a 40% increase in orders since launching.",
                author: "Sarah Johnson",
                role: "Owner, Sweet Delights Bakery",
                color: "border-l-orange-400 bg-orange-50"
              },
              {
                quote: "The ability to customize everything to match my brand made all the difference. My customers love how professional my site looks, and I love how simple it is to manage.",
                author: "Michael Chen",
                role: "Founder, Urban Gadgets",
                color: "border-l-amber-400 bg-amber-50"
              },
              {
                quote: "As a food truck owner, I needed a way for customers to order ahead. Kpaly gave me exactly what I needed, plus tools to grow my business I didn't know I needed!",
                author: "Priya Patel",
                role: "Owner, Spice Wheels Food Truck",
                color: "border-l-yellow-400 bg-yellow-50"
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className={`rounded-lg border-l-4 ${testimonial.color} p-8 shadow-lg`}
              >
                <svg className="mb-6 h-10 w-10 text-orange-600" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="mb-4 text-lg leading-relaxed text-gray-600">{testimonial.quote}</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-white to-orange-50">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <span className="inline-block rounded-full bg-amber-100 px-4 py-1 text-sm font-medium text-amber-800">Pricing</span>
            <h2 className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Simple, transparent pricing
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-600">
              Start for free, upgrade as you grow. No hidden fees.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {[
              {
                name: "Starter",
                price: "Free",
                description: "Perfect for new businesses just getting started online.",
                features: [
                  "Kpaly subdomain",
                  "Basic customization",
                  "Up to 50 products",
                  "Order management",
                  "Mobile-friendly design",
                  "Community support"
                ],
                cta: "Get Started",
                highlighted: false,
                color: "bg-amber-50 border-amber-200",
                btnColor: "bg-white text-amber-700 hover:bg-amber-50 ring-1 ring-amber-700"
              },
              {
                name: "Growth",
                price: "$29",
                period: "/month",
                description: "Everything you need to grow your online business.",
                features: [
                  "Custom domain",
                  "Advanced customization",
                  "Unlimited products",
                  "Promotions & discounts",
                  "Customer accounts",
                  "Basic analytics",
                  "Email support"
                ],
                cta: "Start 14-day Trial",
                highlighted: true,
                color: "bg-orange-50 border-orange-200",
                btnColor: "bg-gradient-to-r from-orange-600 to-amber-500 text-white hover:from-orange-700 hover:to-amber-600"
              },
              {
                name: "Enterprise",
                price: "$99",
                period: "/month",
                description: "Advanced features for established businesses.",
                features: [
                  "Multiple custom domains",
                  "Advanced analytics",
                  "API access",
                  "Multiple staff accounts",
                  "Priority support",
                  "Custom integrations",
                  "Dedicated account manager"
                ],
                cta: "Contact Sales",
                highlighted: false,
                color: "bg-yellow-50 border-yellow-200",
                btnColor: "bg-white text-yellow-700 hover:bg-yellow-50 ring-1 ring-yellow-700"
              }
            ].map((plan, index) => (
              <div
                key={index}
                className={`rounded-lg ${plan.highlighted ? 'border-2 border-orange-600 shadow-xl' : `border ${plan.color}`} flex flex-col overflow-hidden bg-white`}
              >
                <div className={`px-6 py-8 ${plan.highlighted ? 'bg-orange-50' : plan.color}`}>
                  <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                    {plan.period && <span className="ml-1 text-xl font-medium text-gray-500">{plan.period}</span>}
                  </div>
                  <p className="mt-5 text-gray-600">{plan.description}</p>
                </div>
                <div className="flex flex-1 flex-col justify-between px-6 pb-8 pt-6">
                  <div>
                    <ul className="space-y-4">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <svg className="h-5 w-5 flex-shrink-0 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="ml-3 text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-8">
                    <button
                      className={`w-full rounded-md px-4 py-2 text-center text-base font-medium ${
                        plan.btnColor
                      } transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2`}
                    >
                      {plan.cta}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-orange-700 to-amber-600 py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Ready to grow your business?
              </h2>
              <p className="mt-3 max-w-lg text-lg text-orange-100">
                Join thousands of vendors and product sellers who are expanding their reach online with Kpaly.
              </p>
            </div>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow">
                <Link href={loginUrl} className="rounded-md bg-white px-5 py-3 text-base font-medium text-orange-600 hover:bg-orange-50 md:py-4 md:px-8 md:text-lg">
                  Get Started Free
                </Link>
              </div>
              <div className="ml-3 inline-flex rounded-md shadow">
                <Link href="#" className="rounded-md border border-orange-300 bg-transparent px-5 py-3 text-base font-medium text-white hover:bg-orange-800 md:py-4 md:px-8 md:text-lg">
                  Watch Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-orange-400">Company</h3>
              <ul className="space-y-2">
                {['About', 'Blog', 'Careers', 'Contact'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-base text-gray-300 hover:text-orange-300">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-amber-400">Product</h3>
              <ul className="space-y-2">
                {['Features', 'Pricing', 'Testimonials', 'Integrations'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-base text-gray-300 hover:text-amber-300">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-yellow-400">Resources</h3>
              <ul className="space-y-2">
                {['Documentation', 'Guides', 'API Reference', 'Support'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-base text-gray-300 hover:text-yellow-300">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-rose-400">Legal</h3>
              <ul className="space-y-2">
                {['Privacy', 'Terms', 'Security', 'Cookies'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-base text-gray-300 hover:text-rose-300">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-800 pt-8">
            <p className="text-center text-base text-gray-400">
              &copy; {new Date().getFullYear()} Kpaly. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}