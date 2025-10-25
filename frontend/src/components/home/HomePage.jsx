
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import { useState, useEffect } from 'react';
import React from 'react';

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: '📊',
      title: 'Data Visualization',
      description: 'Transform your data into beautiful, interactive charts and graphs with just a few clicks.'
    },
    {
      icon: '📁',
      title: 'File Upload',
      description: 'Seamlessly upload Excel and CSV files. Support for multiple formats and large datasets.'
    },
    {
      icon: '🔍',
      title: 'Smart Search',
      description: 'Powerful search and filter capabilities to find exactly what you need instantly.'
    },
    {
      icon: '📈',
      title: 'Real-time Analytics',
      description: 'Get instant insights with dynamic sorting, pagination, and aggregation features.'
    },
    {
      icon: '🔒',
      title: 'Secure & Private',
      description: 'Your data is encrypted and secured with industry-standard authentication protocols.'
    },
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Optimized performance ensures smooth experience even with large datasets.'
    }
  ];

  const stats = [
    { value: '10K+', label: 'Active Users' },
    { value: '1M+', label: 'Data Points' },
    { value: '99.9%', label: 'Uptime' },
    { value: '24/7', label: 'Support' }
  ];

  return (
    <div className="min-h-screen from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                DataViz Pro
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-700 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition">
                How It Works
              </a>
              <a href="#pricing" className="text-red-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition">
                Pricing
              </a>
             

              {/* Auth Buttons */}
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition duration-200"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className="px-6 py-2 text-gray-700 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition duration-200"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
            
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <svg className="h-6 w-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 bg-white dark:bg-gray-900 rounded-b-2xl shadow-lg">
              <div className="flex flex-col space-y-4 px-4">
                <a 
                  href="#features" 
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </a>
                <a 
                  href="#how-it-works" 
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  How It Works
                </a>
                <a 
                  href="#pricing" 
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Pricing
                </a>
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  {isAuthenticated ? (
                    <Link
                      to="/dashboard"
                      className="block w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-center hover:shadow-lg transition duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  ) : (
                    <div className="space-y-3">
                      <Link
                        to="/signin"
                        className="block w-full px-6 py-3 text-gray-700 dark:text-gray-300 text-center border border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-600 transition"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/signup"
                        className="block w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-center hover:shadow-lg transition duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Get Started
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
              Visualize Your Data
              <br />
              Like Never Before
            </h1>
            <p className="text-lg md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
              Transform spreadsheets into stunning, interactive visualizations. Upload, analyze, and share insights in seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-2xl transform hover:-translate-y-1 transition duration-200"
                >
                  Go to Dashboard →
                </Link>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-2xl transform hover:-translate-y-1 transition duration-200"
                  >
                    Start Free Trial
                  </Link>
                  <Link
                    to="/signin"
                    className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-semibold text-lg border-2 border-gray-300 dark:border-gray-700 hover:border-blue-600 dark:hover:border-blue-400 transform hover:-translate-y-1 transition duration-200"
                  >
                    Watch Demo
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-20">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-4 md:p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-200"
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Demo Image/Video Placeholder */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-700 p-4 md:p-8">
            <div className="aspect-video bg-white dark:bg-gray-900 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl md:text-6xl mb-4">📊</div>
                <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">Interactive Dashboard Preview</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              Powerful Features
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need to turn raw data into actionable insights
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 md:p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl hover:shadow-xl transform hover:-translate-y-2 transition duration-300 border border-gray-200 dark:border-gray-700"
              >
                <div className="text-4xl md:text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              How It Works
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {[
              { step: '1', title: 'Upload Your Data', desc: 'Drag and drop your Excel or CSV files' },
              { step: '2', title: 'Customize Views', desc: 'Choose from various chart types and filters' },
              { step: '3', title: 'Share Insights', desc: 'Export or share your visualizations' }
            ].map((item, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 md:w-20 h-16 md:h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl md:text-3xl font-bold mx-auto mb-6 shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-900 dark:text-gray-400">
                  {item.title}
                </h3>
                <p className="text-sm md:text-base text-gray-400 dark:text-gray-400">
                  {item.desc}
                </p>
                {index < 2 && (
                  <div className="hidden md:block absolute top-10 -right-6 w-12 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            Ready to Get Started?
          </h2>
          <p className="text-lg md:text-xl text-blue-100 mb-8">
            Join thousands of users who are already visualizing their data better
          </p>
          {!isAuthenticated && (
            <Link
              to="/signup"
              className="inline-block px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg hover:shadow-2xl transform hover:-translate-y-1 transition duration-200"
            >
              Start Your Free Trial →
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 dark:bg-black text-gray-300">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl">📊</span>
                <span className="text-xl font-bold text-white">DataViz Pro</span>
              </div>
              <p className="text-gray-400">
                Transform your data into insights
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="hover:text-white transition">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                <li><a href="#" className="hover:text-white transition">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 DataViz Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}