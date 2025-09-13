"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform, Variants } from 'framer-motion';
import { 
  Code2, 
  Palette, 
  Database, 
  Brain, 
  Cloud,
  Smartphone,
} from 'lucide-react';

interface Skill {
  id: number;
  name: string;
  category: 'Frontend' | 'Backend' | 'Mobile' | 'DevOps' | 'AI/ML';
  level: number;
  icon: React.ElementType;
  description: string;
  color: string;
  gradient: string;
  technologies: string[];
}

const skills: Skill[] = [
  {
    id: 1,
    name: "Frontend Development",
    category: "Frontend",
    level: 95,
    icon: Code2,
    description: "Modern web applications with React, Next.js, and TypeScript",
    color: "#3B82F6",
    gradient: "from-blue-500 to-cyan-500",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"]
  },
  {
    id: 2,
    name: "UI/UX Design",
    category: "Frontend",
    level: 88,
    icon: Palette,
    description: "User-centered design with modern aesthetics and accessibility",
    color: "#8B5CF6",
    gradient: "from-purple-500 to-pink-500",
    technologies: ["Figma", "Adobe XD", "Framer", "Principle"]
  },
  {
    id: 3,
    name: "Backend Development",
    category: "Backend",
    level: 92,
    icon: Database,
    description: "Scalable APIs and database architecture",
    color: "#10B981",
    gradient: "from-green-500 to-emerald-500",
    technologies: ["Node.js", "Python", "PostgreSQL", "MongoDB"]
  },
  {
    id: 4,
    name: "AI & Machine Learning",
    category: "AI/ML",
    level: 85,
    icon: Brain,
    description: "Intelligent applications with modern AI frameworks",
    color: "#F59E0B",
    gradient: "from-orange-500 to-red-500",
    technologies: ["TensorFlow", "PyTorch", "OpenAI", "Hugging Face"]
  },
  {
    id: 5,
    name: "Cloud & DevOps",
    category: "DevOps",
    level: 90,
    icon: Cloud,
    description: "Scalable infrastructure and deployment pipelines",
    color: "#06B6D4",
    gradient: "from-cyan-500 to-blue-500",
    technologies: ["AWS", "Docker", "Kubernetes", "Terraform"]
  },
  {
    id: 6,
    name: "Mobile Development",
    category: "Mobile",
    level: 82,
    icon: Smartphone,
    description: "Cross-platform mobile apps with native performance",
    color: "#EC4899",
    gradient: "from-pink-500 to-rose-500",
    technologies: ["React Native", "Flutter", "Swift", "Kotlin"]
  }
];

const categories = ['All', 'Frontend', 'Backend', 'Mobile', 'DevOps', 'AI/ML'];

// 3D Card Component with advanced animations
const SkillCard: React.FC<{ skill: Skill; index: number; isVisible: boolean }> = ({ 
  skill, 
  index, 
  isVisible 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Mouse tracking for 3D tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), {
    stiffness: 300,
    damping: 30
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), {
    stiffness: 300,
    damping: 30
  });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set((event.clientX - centerX) / (rect.width / 2));
    mouseY.set((event.clientY - centerY) / (rect.height / 2));
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const Icon = skill.icon;

  // Cinematic entry animation variants
  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 100,
      rotateX: -30,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    }
  };

  const glowVariants: Variants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: [0, 0.5, 0],
      scale: [0.8, 1.2, 0.8],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      className="relative group perspective-1000"
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      {/* Animated Glow Effect */}
      <motion.div
        variants={glowVariants}
        initial="initial"
        animate={isHovered ? "animate" : "initial"}
        className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${skill.gradient} blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
        style={{ zIndex: -1 }}
      />

      {/* Main Card Container */}
      <motion.div
        className="relative w-full h-80 cursor-pointer"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        whileHover={{
          z: 50,
          transition: { duration: 0.3 }
        }}
      >
        {/* Front Face */}
        <motion.div
          className={`absolute inset-0 w-full h-full rounded-2xl backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 shadow-2xl overflow-hidden`}
          style={{
            backfaceVisibility: "hidden",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            transition: "transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
          }}
        >
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className={`absolute inset-0 bg-gradient-to-br ${skill.gradient}`} />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
          </div>

          {/* Floating Particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/30 rounded-full"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${10 + i * 10}%`,
                }}
                animate={{
                  y: [-10, 10, -10],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* Content */}
          <div className="relative z-10 p-8 h-full flex flex-col">
            {/* Icon with 3D effect */}
            <motion.div
              className="mb-6 relative"
              whileHover={{ 
                rotateY: 360,
                transition: { duration: 0.8, ease: "easeInOut" }
              }}
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${skill.gradient} flex items-center justify-center shadow-lg relative overflow-hidden`}>
                <Icon className="w-8 h-8 text-white z-10" strokeWidth={1.5} />
                
                {/* Icon Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${skill.gradient} blur-md opacity-50`} />
              </div>
            </motion.div>

            {/* Category Badge */}
            <div className="mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${skill.gradient} text-white shadow-lg`}>
                {skill.category}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-white/90 transition-colors">
              {skill.name}
            </h3>

            {/* Description */}
            <p className="text-gray-300 text-sm leading-relaxed mb-6 flex-grow">
              {skill.description}
            </p>

            {/* Skill Level Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">Proficiency</span>
                <span className="text-xs text-white font-medium">{skill.level}%</span>
              </div>
              
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full bg-gradient-to-r ${skill.gradient} rounded-full relative`}
                  initial={{ width: 0 }}
                  animate={isVisible ? { width: `${skill.level}%` } : { width: 0 }}
                  transition={{ 
                    duration: 1.5, 
                    delay: index * 0.1 + 0.5,
                    ease: "easeOut"
                  }}
                >
                  {/* Progress Bar Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${skill.gradient} blur-sm opacity-50`} />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Corner Accent */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/10 to-transparent" />
        </motion.div>

        {/* Back Face */}
        <motion.div
          className={`absolute inset-0 w-full h-full rounded-2xl backdrop-blur-xl bg-gradient-to-br from-gray-900/90 to-black/90 border border-white/20 shadow-2xl p-8`}
          style={{
            backfaceVisibility: "hidden",
            transform: isFlipped ? "rotateY(0deg)" : "rotateY(-180deg)",
            transition: "transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
          }}
        >
          <div className="h-full flex flex-col justify-center">
            <h4 className="text-lg font-bold text-white mb-4">Technologies</h4>
            <div className="grid grid-cols-2 gap-3">
              {skill.technologies.map((tech, i) => (
                <motion.div
                  key={tech}
                  className="px-3 py-2 rounded-lg bg-white/10 text-white text-sm text-center backdrop-blur-sm border border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {tech}
                </motion.div>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-400">Click to flip back</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Main Skills Component
const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const filteredSkills = activeCategory === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6
      }
    }
  };

  // Header animation variants
  const headerVariants: Variants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute inset-0">
        {/* Animated Background Elements */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Cinematic Entry */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-5xl md:text-6xl font-bold text-white mb-4"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Skills & Expertise
          </motion.h2>
          
          <motion.div 
            className="w-32 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto mb-6 rounded-full"
            initial={{ width: 0 }}
            animate={isInView ? { width: 128 } : { width: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          
          <motion.p 
            className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Cutting-edge technologies and frameworks I work with
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 backdrop-blur-sm border ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-transparent shadow-lg'
                  : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredSkills.map((skill, index) => (
            <SkillCard 
              key={skill.id} 
              skill={skill} 
              index={index}
              isVisible={isInView && !isLoading}
            />
          ))}
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="text-center">
              <motion.div
                className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full mx-auto mb-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <p className="text-white text-lg">Loading Skills...</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
    </section>
  );
};

export default Skills;