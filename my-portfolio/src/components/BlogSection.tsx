"use client";

import { motion } from 'framer-motion';
import Card3D from './Card3D';
import BlogBackground from './BlogBackground';
import { BlogPost } from '@/types/blog';
import { ArrowRight, Zap } from 'lucide-react';



const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Building Modern Web Applications with Next.js 14',
    description: 'Explore the latest features in Next.js 14, including app router, server components, and performance optimizations that will revolutionize your development workflow.',
    coverImage: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: 'Dec 15, 2024',
    readingTime: '8 min read',
    category: 'Web Dev',
    slug: 'nextjs-14-guide'
  },
  {
    id: '2',
    title: 'The Future of AI in Creative Design',
    description: 'How artificial intelligence is transforming the creative industry, from automated design generation to intelligent user experience optimization.',
    coverImage: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: 'Dec 12, 2024',
    readingTime: '6 min read',
    category: 'AI',
    slug: 'ai-creative-design'
  },
  {
    id: '3',
    title: 'Mastering CSS Grid and Flexbox Layouts',
    description: 'A comprehensive guide to creating responsive, modern layouts using CSS Grid and Flexbox, with practical examples and best practices.',
    coverImage: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: 'Dec 10, 2024',
    readingTime: '12 min read',
    category: 'Design',
    slug: 'css-grid-flexbox'
  },
  {
    id: '4',
    title: 'TypeScript Best Practices for Large Applications',
    description: 'Learn advanced TypeScript patterns and architectural decisions that scale well in enterprise-level applications and team environments.',
    coverImage: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: 'Dec 8, 2024',
    readingTime: '10 min read',
    category: 'Web Dev',
    slug: 'typescript-best-practices'
  },
  {
    id: '5',
    title: 'The Rise of Edge Computing',
    description: 'Understanding how edge computing is changing the landscape of web development and why it matters for modern applications.',
    coverImage: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: 'Dec 5, 2024',
    readingTime: '7 min read',
    category: 'Tech',
    slug: 'edge-computing-rise'
  },
  {
    id: '6',
    title: 'Creating Immersive User Experiences',
    description: 'Explore the principles of immersive design, from micro-interactions to comprehensive user journeys that keep users engaged.',
    coverImage: 'https://images.pexels.com/photos/4164419/pexels-photo-4164419.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: 'Dec 3, 2024',
    readingTime: '9 min read',
    category: 'Design',
    slug: 'immersive-user-experiences'
  }
];

const headerVariants = {
  hidden: { opacity: 0, y: 50, rotateX: -15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 1,
      ease: "easeInOut"
    }
  }
};

const buttonVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      delay: 1.2,
      ease: "easeInOut"
    }
  }
};

const BlogSection3D: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      
      {/* Content */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header with 3D effect */}
          <motion.div
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-20"
            style={{ 
              transformStyle: "preserve-3d",
              perspective: 1000
            }}
          >
            <div className="relative inline-block">
              <motion.h2 
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  rotateX: 5
                }}
                transition={{ duration: 0.3 }}
                className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-purple-200 mb-6 tracking-tight cursor-pointer"
                style={{ 
                  textShadow: "0 0 30px rgba(59, 130, 246, 0.3)",
                  transform: "translateZ(20px)"
                }}
              >
                Blog
              </motion.h2>
              
              {/* Enhanced gradient underline with glow */}
              <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
                style={{ 
                  boxShadow: "0 0 20px rgba(139, 92, 246, 0.6)",
                  transform: "translateX(-50%) translateZ(10px)"
                }}
              />
            </div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl text-slate-300 mt-8 max-w-2xl mx-auto leading-relaxed"
              style={{ transform: "translateZ(15px)" }}
            >
              Sharing what I learn along the way
            </motion.p>
          </motion.div>

          {/* 3D Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {mockBlogPosts.map((post, index) => (
              <Card3D key={post.id} post={post} index={index} />
            ))}
          </div>

          {/* Enhanced View All Posts Button */}
          <motion.div
            variants={buttonVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.button
              whileHover={{ 
                scale: 1.05,
                rotateX: 5,
                rotateY: 5,
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl text-white font-bold text-lg overflow-hidden transition-all duration-300 shadow-2xl border border-white/20"
              style={{
                transformStyle: "preserve-3d",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
              }}
            >
              {/* Background layers for depth */}
              <div 
                className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ transform: "translateZ(-5px)" }}
              />
              
              {/* Button content */}
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                className="relative z-10"
              >
                <Zap size={20} />
              </motion.div>
              <span className="relative z-10">View All Posts</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="relative z-10"
              >
                <ArrowRight size={20} />
              </motion.div>
              
              {/* Shine effect */}
              <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300" />
            </motion.button>
          </motion.div>
        </div>
      </section>
      
      {/* Ambient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 pointer-events-none" />
    </div>
  );
};

export default BlogSection3D;