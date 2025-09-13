import React, { useRef, useEffect } from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ContactCardProps {
  icon: typeof LucideIcon;
  title: string;
  description: string;
  link: string;
  color: string;
  delay?: number;
}

const ContactCard: React.FC<ContactCardProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  link, 
  color, 
  delay = 0 
}) => {
  const cardRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `
        perspective(1000px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg) 
        translateZ(20px)
      `;
    };

    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    };

    const handleMouseEnter = () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(10px)';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
      card.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return (
    <a
      ref={cardRef}
      href={link}
      className="group relative block p-6 bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-xl transition-all duration-500 hover:border-opacity-100 hover:shadow-2xl"
      style={{
        transform: 'translateZ(0)',
        transformStyle: 'preserve-3d',
        animationDelay: `${delay}s`
      }}
    >
      {/* Gradient Background Effect */}
      <div className={`absolute inset-0 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-500 blur-xl`}></div>
      
      {/* Card Content */}
      <div className="relative z-10 flex items-center space-x-4">
        {/* Icon Container */}
        <div className={`relative p-3 bg-gradient-to-r ${color} rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
          <Icon className="w-6 h-6 text-white" />
          
          {/* Icon glow effect */}
          <div className={`absolute inset-0 bg-gradient-to-r ${color} rounded-lg blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300`}></div>
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className="text-lg font-semibold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
            {title}
          </h4>
          <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 truncate">
            {description}
          </p>
        </div>
        
        {/* Hover arrow indicator */}
        <div className="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
      
      {/* Floating particles effect */}
      <div className="absolute top-2 right-2 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 animate-pulse"></div>
      <div className="absolute bottom-4 left-4 w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
      
      {/* Edge highlight */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </a>
  );
};

export default ContactCard;