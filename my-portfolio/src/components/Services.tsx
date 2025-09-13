"use client";

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Variants } from 'framer-motion';
import { 
  Code, 
  Palette, 
  Database, 
  Brain, 
  Cloud,
  Zap
} from 'lucide-react';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
}

const services: Service[] = [
  {
    id: 1,
    title: "Web Development",
    description: "Responsive websites using Next.js, React, TailwindCSS, and TypeScript for modern web experiences.",
    icon: Code,
    gradient: "from-blue-500/20 to-cyan-500/20"
  },
  {
    id: 2,
    title: "UI/UX Design",
    description: "Modern, accessible designs with smooth animations and exceptional usability for optimal user experiences.",
    icon: Palette,
    gradient: "from-purple-500/20 to-pink-500/20"
  },
  {
    id: 3,
    title: "API Development",
    description: "RESTful & GraphQL APIs built with Node.js, Express, and MongoDB for scalable backend solutions.",
    icon: Database,
    gradient: "from-green-500/20 to-emerald-500/20"
  },
  {
    id: 4,
    title: "AI Integrations",
    description: "AI-powered applications using TensorFlow, OpenAI, and Gemini for intelligent user experiences.",
    icon: Brain,
    gradient: "from-orange-500/20 to-red-500/20"
  },
  {
    id: 5,
    title: "DevOps & Deployment",
    description: "CI/CD pipelines, Docker containerization, and cloud hosting solutions on Vercel and AWS.",
    icon: Cloud,
    gradient: "from-indigo-500/20 to-blue-500/20"
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      duration: 0.6
    }
  }
};

const cardVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.9
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeInOut"
    }
  }
};


const ServiceCard: React.FC<{ service: Service; index: number }> = ({ service, index }) => {
  const Icon = service.icon;
  
  return (
    <motion.div
      variants={cardVariants}
      className="group relative overflow-hidden"
      whileHover={{
        y: -10,
        rotateX: 5,
        rotateY: 5,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d"
      }}
    >
      {/* Glassmorphism Card */}
      <div className={`
        relative h-full p-8 rounded-2xl backdrop-blur-xl bg-gradient-to-br ${service.gradient}
        border border-white/10 shadow-2xl
        before:absolute before:inset-0 before:rounded-2xl
        before:bg-gradient-to-br before:from-white/5 before:to-transparent
        before:opacity-0 group-hover:before:opacity-100
        before:transition-opacity before:duration-500
        transform-gpu transition-all duration-500
        group-hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]
      `}>

        {/* Content */}
        <div className="relative z-10">
          {/* Icon Container */}
          <div className="mb-6 relative">
            <div className={`
              w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient}
              flex items-center justify-center backdrop-blur-sm border border-white/20
              group-hover:scale-110 transition-transform duration-300
              shadow-lg group-hover:shadow-xl
            `}>
              <Icon 
                className="w-8 h-8 text-white group-hover:text-white/90 transition-colors duration-300" 
                strokeWidth={1.5}
              />
            </div>
            
            {/* Icon Glow Effect */}
            <div className={`
              absolute inset-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient}
              blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500
            `} />
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white mb-4 group-hover:text-white/90 transition-colors duration-300">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-gray-300 leading-relaxed text-sm group-hover:text-gray-200 transition-colors duration-300">
            {service.description}
          </p>

          {/* Subtle Border Highlight */}
          <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-white/20 transition-colors duration-500" />
        </div>

        {/* Corner Accent */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </motion.div>
  );
};

const Services: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Services
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6 rounded-full" />
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            What I Do
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </motion.div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
    </section>
  );
};

export default Services;