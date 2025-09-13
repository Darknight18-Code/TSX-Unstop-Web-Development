import React, { useEffect, useRef } from 'react';
import ContactForm from './ContactForm';
import ContactCard from './ContactCard';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';

const GetInTouchSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !titleRef.current || !cardsRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const scrollProgress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / window.innerHeight));
      
      // Parallax effect for title
      const titleTranslateY = (1 - scrollProgress) * 50;
      titleRef.current.style.transform = `translateY(${titleTranslateY}px) translateZ(0)`;
      
      // Parallax effect for cards with different speeds
      const cardsTranslateY = (1 - scrollProgress) * 30;
      cardsRef.current.style.transform = `translateY(${cardsTranslateY}px) translateZ(0)`;
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      description: 'hello@yourname.com',
      link: 'mailto:hello@yourname.com',
      color: 'from-blue-500 to-cyan-400'
    },
    {
      icon: Phone,
      title: 'Phone',
      description: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
      color: 'from-purple-500 to-pink-400'
    },
    {
      icon: MapPin,
      title: 'Location',
      description: 'San Francisco, CA',
      link: '#',
      color: 'from-amber-500 to-orange-400'
    }
  ];

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      <div className="relative z-10 container mx-auto px-6 py-20">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-6 leading-tight">
            Get in <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Ready to bring your ideas to life? Let's collaborate on something extraordinary together.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Form */}
          <div className="order-2 lg:order-1">
            <ContactForm />
          </div>

          {/* Contact Methods */}
          <div ref={cardsRef} className="order-1 lg:order-2 space-y-8">
            <h3 className="text-3xl font-semibold text-white mb-8">Let's Connect</h3>
            
            {/* Contact Cards */}
            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <ContactCard
                  key={method.title}
                  icon={method.icon}
                  title={method.title}
                  description={method.description}
                  link={method.link}
                  color={method.color}
                  delay={index * 0.1}
                />
              ))}
            </div>

            {/* Social Links */}
            <div className="pt-12">
              <h4 className="text-xl font-semibold text-white mb-6">Follow Me</h4>
              <div className="flex space-x-6">
                {socialLinks.map((social, index) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="group relative p-4 bg-gray-800/50 border border-gray-700 rounded-xl hover:border-blue-500/50 transition-all duration-300 hover:scale-110 hover:rotate-3"
                    style={{
                      transform: 'translateZ(0)',
                      transformStyle: 'preserve-3d'
                    }}
                    aria-label={social.label}
                  >
                    <social.icon className="w-6 h-6 text-gray-400 group-hover:text-blue-400 transition-colors duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
    </section>
  );
};

export default GetInTouchSection;