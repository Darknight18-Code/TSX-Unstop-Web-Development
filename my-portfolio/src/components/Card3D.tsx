"use client";

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, MouseEvent } from 'react';
import { BlogPost } from '@/types/blog';
import { Calendar, Clock, ArrowUpRight, Sparkles } from 'lucide-react';
import Image from 'next/image';

interface Card3DProps {
  post: BlogPost;
  index: number;
}

const Card3D: React.FC<Card3DProps> = ({ post, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Motion values for 3D transforms
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring animations for smooth movement
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), {
    stiffness: 300,
    damping: 30
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), {
    stiffness: 300,
    damping: 30
  });
  
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    
    mouseX.set(x);
    mouseY.set(y);
  };
  
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Web Dev': 'from-blue-500 to-cyan-400',
      'AI': 'from-purple-500 to-pink-400',
      'Design': 'from-green-500 to-teal-400',
      'Tech': 'from-orange-500 to-red-400',
    };
    return colors[category] || 'from-gray-500 to-gray-400';
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 100, rotateX: -15 }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        rotateX: 0,
        transition: {
          duration: 0.8,
          delay: index * 0.1,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      }}
      viewport={{ once: true, margin: "-50px" }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000
      }}
      whileHover={{ 
        z: 50,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative w-full max-w-sm mx-auto"
    >
      {/* Card Container with 3D depth */}
      <div className="relative">
        {/* Main Card */}
        <motion.div
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-slate-700/50 shadow-2xl"
          style={{
            transformStyle: "preserve-3d",
            transform: "translateZ(0px)"
          }}
        >
          {/* Animated gradient border */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="h-full w-full rounded-2xl bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl" />
          </div>
          
          {/* Depth layers for 3D effect */}
          <div 
            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-slate-700/20 to-slate-800/20 blur-sm"
            style={{ transform: "translateZ(-10px)" }}
          />
          <div 
            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-slate-600/10 to-slate-700/10 blur-md"
            style={{ transform: "translateZ(-20px)" }}
          />
          
          {/* Content */}
          <div className="relative z-10">
            {/* Cover Image */}
            <div className="relative h-48 overflow-hidden rounded-t-2xl">
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="h-full w-full"
              >
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </motion.div>
              
              {/* Cinematic overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"
              />
              
              {/* Category tag with 3D effect */}
              <div 
                className="absolute top-4 left-4 z-20"
                style={{ transform: "translateZ(20px)" }}
              >
                <motion.span 
                  whileHover={{ scale: 1.1 }}
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getCategoryColor(post.category)} shadow-lg backdrop-blur-sm`}
                >
                  <Sparkles size={12} />
                  {post.category}
                </motion.span>
              </div>
              
              {/* Hover content with slide-up animation */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="absolute bottom-4 left-4 right-4 z-20"
                style={{ transform: "translateZ(30px)" }}
              >
                <motion.button
                  whileHover={{ scale: 1.05, rotateX: 5 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-xl text-white font-medium hover:bg-white/30 transition-all duration-300 shadow-lg border border-white/20"
                >
                  Read More
                  <ArrowUpRight size={16} />
                </motion.button>
              </motion.div>
            </div>
            
            {/* Card Content with depth */}
            <div 
              className="p-6 space-y-4"
              style={{ transform: "translateZ(10px)" }}
            >
              <motion.h3 
                whileHover={{ 
                  scale: 1.02,
                  color: "transparent",
                  backgroundImage: "linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899)",
                  backgroundClip: "text"
                }}
                transition={{ duration: 0.3 }}
                className="text-xl font-bold text-white line-clamp-2 cursor-pointer [background-clip:text] [--tw-bg-clip:text] hover:[-webkit-background-clip:text]"
                style={{ WebkitBackgroundClip: "text" }}
              >
                {post.title}
              </motion.h3>
              
              <p className="text-slate-300 text-sm line-clamp-3 leading-relaxed">
                {post.description}
              </p>
              
              {/* Meta information with micro-animations */}
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <motion.div 
                  whileHover={{ scale: 1.1, color: "#60a5fa" }}
                  className="flex items-center gap-1 cursor-pointer"
                >
                  <Calendar size={14} />
                  <span>{post.date}</span>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.1, color: "#34d399" }}
                  className="flex items-center gap-1 cursor-pointer"
                >
                  <Clock size={14} />
                  <span>{post.readingTime}</span>
                </motion.div>
              </div>
            </div>
          </div>
          
          {/* Ambient lighting effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </motion.div>
        
        {/* Enhanced shadow for depth */}
        <div className="absolute inset-0 rounded-2xl bg-black/20 blur-xl transform translate-y-4 scale-95 -z-10 opacity-50 group-hover:opacity-70 group-hover:scale-100 transition-all duration-500" />
      </div>
    </motion.div>
  );
};

export default Card3D;