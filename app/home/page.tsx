import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-teal-50 opacity-70"></div>
        <div className="container relative mx-auto px-4">
          <div className="flex flex-col items-center lg:flex-row lg:justify-between lg:space-x-10">
            <div className="mb-12 w-full lg:mb-0 lg:w-1/2">
              <div className="space-y-6">
                <h1 className="text-center text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-left lg:text-6xl xl:text-7xl">
                  <span className="block text-transparent bg-gradient-to-r from-purple-600 to-teal-500 bg-clip-text">Kpaly</span>
                  <span className="block">Your online business, simplified</span>
                </h1>
                <p className="mx-auto mt-3 max-w-md text-center text-lg text-gray-600 sm:text-xl md:mt-5 md:max-w-3xl lg:text-left">
                  The all-in-one platform for food vendors and product sellers to create beautiful online stores, manage orders, and grow their business.
                </p>
                <div className="mt-6 flex justify-center gap-x-6 lg:justify-start">
                  <Link href="/app/login" className="rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-3 text-base font-medium text-white shadow-md transition-all hover:from-purple-700 hover:to-indigo-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 md:py-4 md:px-10 md:text-lg">
                    Get Started Free
                  </Link>
                  <Link href="#features" className="flex items-center rounded-full border border-teal-300 bg-white px-8 py-3 text-base font-medium text-gray-700 shadow-sm transition-colors hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 md:py-4 md:px-10 md:text-lg">
                    Learn More
                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v10.586l3.293-3.293a1 1 0 011.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L9 14.586V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative w-full lg:w-1/2">
              <div className="rounded-xl border-2 border-teal-100 shadow-2xl overflow-hidden">
                <div className="relative h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&w=1974&q=80"
                    alt="Kpaly food ordering app on mobile phone"
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                    className="brightness-105 contrast-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-teal-900/20"></div>
                  
                  {/* UI overlay elements */}
                  <div className="absolute top-10 right-8 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                      <span className="text-sm font-medium text-gray-800">Online Store</span>
                    </div>
                    <p className="text-xs text-gray-600">Custom domain setup complete</p>
                  </div>
                  
                  <div className="absolute bottom-10 left-8 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4 max-w-[220px]">
                    <p className="text-sm font-medium text-gray-800 mb-1">New Order Received!</p>
                    <p className="text-xs text-gray-600">Customer: Mark Johnson</p>
                    <p className="text-xs text-gray-600">Total: $34.99</p>
                    <div className="mt-2 flex space-x-2">
                      <span className="text-xs bg-teal-100 text-teal-800 px-2 py-1 rounded-full">Accept</span>
                      <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">Details</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 z-10 hidden md:block">
                <div className="rounded-lg bg-gradient-to-br from-teal-500 to-emerald-500 p-4 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <div className="h-3 w-3 rounded-full bg-white"></div>
                    <span className="text-sm font-medium text-white">Orders increasing</span>
                  </div>
                  <div className="mt-2 text-2xl font-bold text-white">+32%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-12 sm:py-16 border-y border-teal-100 bg-gradient-to-r from-gray-50 to-teal-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">
            <h2 className="mb-8 text-center text-sm font-semibold uppercase tracking-wide text-teal-700">Trusted by businesses worldwide</h2>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 opacity-70">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-8 w-32 bg-teal-200 rounded-md"></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <span className="inline-block rounded-full bg-teal-100 px-4 py-1 text-sm font-medium text-teal-800">Features</span>
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
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                ),
                color: "bg-indigo-50 border-indigo-100"
              },
              {
                title: "Brand Customization",
                description: "Customize colors, logos, and styles to match your brand identity and create a cohesive customer experience.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                ),
                color: "bg-purple-50 border-purple-100"
              },
              {
                title: "Order Management",
                description: "Easily track and manage customer orders with real-time notifications and a user-friendly dashboard.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                ),
                color: "bg-teal-50 border-teal-100"
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
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                ),
                color: "bg-amber-50 border-amber-100"
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
            <span className="inline-block rounded-full bg-purple-100 px-4 py-1 text-sm font-medium text-purple-800">Testimonials</span>
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
                color: "border-l-purple-400 bg-purple-50"
              },
              {
                quote: "The ability to customize everything to match my brand made all the difference. My customers love how professional my site looks, and I love how simple it is to manage.",
                author: "Michael Chen",
                role: "Founder, Urban Gadgets",
                color: "border-l-teal-400 bg-teal-50"
              },
              {
                quote: "As a food truck owner, I needed a way for customers to order ahead. Kpaly gave me exactly what I needed, plus tools to grow my business I didn't know I needed!",
                author: "Priya Patel",
                role: "Owner, Spice Wheels Food Truck",
                color: "border-l-indigo-400 bg-indigo-50"
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className={`rounded-lg border-l-4 ${testimonial.color} p-8 shadow-lg`}
              >
                <svg className="mb-6 h-10 w-10 text-purple-600" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
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
      <section className="py-16 sm:py-24 bg-gradient-to-b from-white to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <span className="inline-block rounded-full bg-indigo-100 px-4 py-1 text-sm font-medium text-indigo-800">Pricing</span>
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
                color: "bg-teal-50 border-teal-200",
                btnColor: "bg-white text-teal-700 hover:bg-teal-50 ring-1 ring-teal-700"
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
                color: "bg-purple-50 border-purple-200",
                btnColor: "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700"
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
                color: "bg-indigo-50 border-indigo-200",
                btnColor: "bg-white text-indigo-700 hover:bg-indigo-50 ring-1 ring-indigo-700"
              }
            ].map((plan, index) => (
              <div
                key={index}
                className={`rounded-lg ${plan.highlighted ? 'border-2 border-purple-600 shadow-xl' : `border ${plan.color}`} flex flex-col overflow-hidden bg-white`}
              >
                <div className={`px-6 py-8 ${plan.highlighted ? 'bg-purple-50' : plan.color}`}>
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
                      } transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2`}
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
      <section className="bg-gradient-to-r from-purple-700 to-indigo-700 py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Ready to grow your business?
              </h2>
              <p className="mt-3 max-w-lg text-lg text-purple-100">
                Join thousands of vendors and product sellers who are expanding their reach online with Kpaly.
              </p>
            </div>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow">
                <Link href="/app/login" className="rounded-md bg-white px-5 py-3 text-base font-medium text-purple-600 hover:bg-purple-50 md:py-4 md:px-8 md:text-lg">
                  Get Started Free
                </Link>
              </div>
              <div className="ml-3 inline-flex rounded-md shadow">
                <Link href="#" className="rounded-md border border-teal-300 bg-transparent px-5 py-3 text-base font-medium text-white hover:bg-purple-800 md:py-4 md:px-8 md:text-lg">
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
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-teal-400">Company</h3>
              <ul className="space-y-2">
                {['About', 'Blog', 'Careers', 'Contact'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-base text-gray-300 hover:text-teal-300">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-indigo-400">Product</h3>
              <ul className="space-y-2">
                {['Features', 'Pricing', 'Testimonials', 'Integrations'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-base text-gray-300 hover:text-indigo-300">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-purple-400">Resources</h3>
              <ul className="space-y-2">
                {['Documentation', 'Guides', 'API Reference', 'Support'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-base text-gray-300 hover:text-purple-300">
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