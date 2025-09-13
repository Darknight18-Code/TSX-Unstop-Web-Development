import React, { useEffect, useRef } from 'react';
import { Github, Linkedin, Twitter, Mail, Phone, MapPin, Heart, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const scrollToTopRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!footerRef.current || !scrollToTopRef.current) return;

      const rect = footerRef.current.getBoundingClientRect();
      const scrollProgress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / window.innerHeight));
      
      // Show/hide scroll to top button
      if (window.scrollY > 500) {
        scrollToTopRef.current.style.opacity = '1';
        scrollToTopRef.current.style.transform = 'translateY(0) scale(1)';
      } else {
        scrollToTopRef.current.style.opacity = '0';
        scrollToTopRef.current.style.transform = 'translateY(20px) scale(0.8)';
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub', color: 'hover:text-gray-300' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:text-blue-400' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-cyan-400' },
    { icon: Mail, href: 'mailto:hello@yourname.com', label: 'Email', color: 'hover:text-purple-400' }
  ];

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' }
  ];

  const services = [
    { name: 'Web Development', href: '#web-dev' },
    { name: 'UI/UX Design', href: '#design' },
    { name: 'Mobile Apps', href: '#mobile' },
    { name: 'Consulting', href: '#consulting' }
  ];

  return (
    <>
      <footer 
        ref={footerRef}
        className="relative overflow-hidden"
      >
        

        <div className="relative z-10 container mx-auto px-6 py-16">
          {/* Main Footer Content */}
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12 mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-4">
                  Your Name
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed max-w-md">
                  Crafting exceptional digital experiences with cutting-edge technology and creative innovation. 
                  Let's build something extraordinary together.
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-300 group">
                  <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-blue-500/20 transition-colors duration-300">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span>hello@yourname.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-300 group">
                  <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-purple-500/20 transition-colors duration-300">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors duration-300 group">
                  <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-amber-500/20 transition-colors duration-300">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xl font-semibold text-white mb-6 relative">
                Quick Links
                <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2 inline-block group"
                    >
                      <span className="relative">
                        {link.name}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-xl font-semibold text-white mb-6 relative">
                Services
                <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"></div>
              </h4>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.name}>
                    <a
                      href={service.href}
                      className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2 inline-block group"
                    >
                      <span className="relative">
                        {service.name}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social Links */}
          <div className="border-t border-gray-700/50 pt-8 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Follow Me</h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className={`group relative p-3  border border-gray-700 rounded-xl transition-all duration-300 hover:border-opacity-100 hover:scale-110 hover:rotate-3 ${social.color}`}
                      style={{
                        transform: 'translateZ(0)',
                        transformStyle: 'preserve-3d'
                      }}
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                      <div className="absolute inset-0  rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="text-center md:text-right">
                <h4 className="text-lg font-semibold text-white mb-4">Stay Updated</h4>
                <div className="flex max-w-sm">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors duration-300"
                  />
                  <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-r-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-105">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700/50 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-gray-400">
              <div className="flex items-center space-x-2">
                <span>© 2025 Ravindra Singh. Made with</span>
                <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                <span>and lots of coffee.</span>
              </div>
              <div className="flex space-x-6 text-sm">
                <a href="#privacy" className="hover:text-white transition-colors duration-300">
                  Privacy Policy
                </a>
                <a href="#terms" className="hover:text-white transition-colors duration-300">
                  Terms of Service
                </a>
                <a href="#cookies" className="hover:text-white transition-colors duration-300">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-ping"></div>
        <div className="absolute bottom-40 right-40 w-1 h-1 bg-purple-400 rounded-full opacity-80 animate-pulse"></div>
        <div className="absolute top-1/2 right-20 w-1.5 h-1.5 bg-amber-400 rounded-full opacity-70 animate-bounce"></div>
      </footer>

      {/* Scroll to Top Button */}
      <button
        ref={scrollToTopRef}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50 opacity-0"
        style={{
          transform: 'translateY(20px) scale(0.8)',
          transition: 'all 0.3s ease'
        }}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-lg opacity-0 hover:opacity-50 transition-opacity duration-300"></div>
      </button>
    </>
  );
};

export default Footer;