"use client";

import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import * as THREE from 'three';

interface TimelineItem {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const timelineData: TimelineItem[] = [
  {
    id: 1,
    title: "Education",
    description: "Completed B.Tech in Computer Science at XYZ University",
    icon: "🎓",
    color: "from-cyan-400 to-blue-500"
  },
  {
    id: 2,
    title: "Technical Skills",
    description: "React, Next.js, TailwindCSS, Node.js, MongoDB, TypeScript, AI/ML (TensorFlow)",
    icon: "⚡",
    color: "from-purple-400 to-pink-500"
  },
  {
    id: 3,
    title: "Achievements",
    description: "Participated and won several hackathons focused on AI and Web Development",
    icon: "🏆",
    color: "from-green-400 to-teal-500"
  },
  {
    id: 4,
    title: "Additional Skills",
    description: "Cloud (AWS, GCP), Git, DevOps basics",
    icon: "☁️",
    color: "from-yellow-400 to-orange-500"
  }
];

const TimelineItem: React.FC<{ item: TimelineItem; index: number; isLeft: boolean }> = ({ 
  item, 
  index, 
  isLeft 
}) => {
  const itemRef = useRef(null);
  const isInView = useInView(itemRef, { 
    once: true, 
    margin: "-100px 0px"
  });

  const variants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as "spring",
        damping: 20,
        stiffness: 100,
        duration: 0.8
      }
    }
  };

  return (
    <motion.div
      ref={itemRef}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`flex items-center w-full mb-16 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
    >
      {/* Timeline Content */}
      <motion.div 
        className={`w-5/12 ${isLeft ? 'pr-8 text-right' : 'pl-8 text-left'}`}
        whileHover={{ scale: 1.02, y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <motion.div 
          className={`relative p-8 bg-gradient-to-br ${item.color} rounded-2xl shadow-2xl backdrop-blur-sm border border-white/10 overflow-hidden group`}
          whileHover={{ rotateY: isLeft ? 5 : -5, rotateX: 2 }}
          transition={{ duration: 0.3 }}
        >
          {/* Animated background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
          
          {/* Content */}
          <div className="relative z-10">
            <motion.div 
              className="flex items-center gap-4 mb-4"
              style={{ justifyContent: isLeft ? 'flex-end' : 'flex-start' }}
            >
              <motion.span 
                className="text-3xl"
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {item.icon}
              </motion.span>
              <h3 className="text-2xl font-bold text-white">{item.title}</h3>
            </motion.div>
            <p className="text-gray-100 leading-relaxed font-medium">
              {item.description}
            </p>
          </div>

          {/* Glowing corner accent */}
          <motion.div 
            className={`absolute ${isLeft ? 'top-0 right-0' : 'top-0 left-0'} w-20 h-20 bg-white/20 rounded-full blur-xl`}
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              delay: index * 0.5
            }}
          />
        </motion.div>
      </motion.div>

      {/* Timeline Center Point */}
      <div className="w-2/12 flex justify-center relative">
        <motion.div 
          className="relative z-10"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        >
          <motion.div 
            className={`w-6 h-6 bg-gradient-to-r ${item.color} rounded-full border-4 border-white shadow-2xl relative`}
            animate={{ 
              boxShadow: [
                "0 0 20px rgba(0, 255, 255, 0.5)",
                "0 0 40px rgba(255, 0, 255, 0.7)",
                "0 0 20px rgba(0, 255, 255, 0.5)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div 
            className={`absolute inset-0 w-6 h-6 bg-gradient-to-r ${item.color} rounded-full opacity-50`}
            animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </div>

      {/* Empty space for opposite side */}
      <div className="w-5/12"></div>
    </motion.div>
  );
};

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: true });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  

  return (
    <motion.section 
      ref={sectionRef}
      className="relative min-h-screen py-20 overflow-hidden"
      initial={{ filter: "blur(10px)", opacity: 0 }}
      whileInView={{ filter: "blur(0px)", opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      {/* 3D Background Canvas */}
      
      <div className="relative z-10 container mx-auto px-6 lg:px-16">
        {/* Section Title */}
        <motion.div 
          ref={titleRef}
          className="text-center mb-20"
          initial={{ opacity: 0, y: 100 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.h2 
            className="text-5xl md:text-7xl font-extrabold text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text mb-6"
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ backgroundSize: "200% 200%" }}
          >
            About Me
          </motion.h2>
          <motion.div 
            className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={isTitleInView ? { width: 128 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <motion.p 
            className="text-xl text-gray-300 mt-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.7 }}
          >
            My journey in technology and the milestones that shaped my expertise
          </motion.p>
        </motion.div>

        {/* Curved Timeline */}
        <div className="relative max-w-6xl mx-auto">
          {/* Curved SVG Path */}
          <div className="absolute left-1/2 top-0 bottom-0 transform -translate-x-1/2 w-1 overflow-visible">
            <svg 
              className="absolute left-1/2 top-0 transform -translate-x-1/2 w-96 h-full"
              viewBox="0 0 400 1000"
              preserveAspectRatio="none"
              style={{ minHeight: '100%' }}
            >
              <defs>
                <linearGradient id="timelineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#00ffff" />
                  <stop offset="33%" stopColor="#ff00ff" />
                  <stop offset="66%" stopColor="#00ff00" />
                  <stop offset="100%" stopColor="#ffff00" />
                </linearGradient>
                <filter id="timelineGlow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <motion.path
                d="M200,0 C150,250 250,500 200,750 C180,875 220,1000 200,1000"
                stroke="url(#timelineGradient)"
                strokeWidth="4"
                fill="none"
                filter="url(#timelineGlow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </svg>
          </div>

          {/* Timeline Items */}
          {timelineData.map((item, index) => (
            <TimelineItem
              key={item.id}
              item={item}
              index={index}
              isLeft={index % 2 === 0}
            />
          ))}
        </div>

        {/* Bottom CTA Section */}
        <motion.div 
          className="text-center mt-20 pt-16 border-t border-gray-700/50"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.h3 
            className="text-3xl font-bold text-white mb-6"
            whileHover={{ scale: 1.05 }}
          >
            Ready to collaborate?
          </motion.h3>
          <motion.p className="text-gray-300 mb-8 text-lg">
            Let's bring your vision to life with cutting-edge technology
          </motion.p>
          
        </motion.div>
      </div>
    </motion.section>
  );
};

export default About;
