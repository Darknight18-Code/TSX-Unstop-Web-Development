"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { ExternalLink, Github } from "lucide-react";
import * as THREE from 'three';

interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  gradient: string;
  image?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "AI-Powered Analytics Dashboard",
    description: "A comprehensive analytics platform with real-time data visualization, machine learning insights, and predictive modeling capabilities.",
    techStack: ["Next.js", "TypeScript", "Python", "TensorFlow", "PostgreSQL"],
    gradient: "from-purple-900 via-blue-900 to-indigo-900",
    image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with advanced filtering, payment integration, inventory management, and admin dashboard.",
    techStack: ["React", "Node.js", "MongoDB", "Stripe", "Redis"],
    gradient: "from-emerald-900 via-teal-900 to-cyan-900",
    image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 3,
    title: "Real-Time Collaboration Tool",
    description: "Slack-like collaboration platform with real-time messaging, file sharing, video calls, and project management features.",
    techStack: ["Vue.js", "Socket.io", "Express", "AWS", "WebRTC"],
    gradient: "from-orange-900 via-red-900 to-pink-900",
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 4,
    title: "Mobile Fitness Tracker",
    description: "Cross-platform mobile app for fitness tracking, workout planning, nutrition logging, and social features.",
    techStack: ["React Native", "Firebase", "Node.js", "Expo", "GraphQL"],
    gradient: "from-violet-900 via-purple-900 to-fuchsia-900",
    image: "https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];

interface ProjectCardProps {
  project: Project;
  index: number;
  progress: any;
}

const ProjectCard = ({ project, index, progress }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Calculate transforms based on scroll progress and card index
  const start = index / projects.length;
  const end = (index + 1) / projects.length;
  
  const y = useTransform(progress, [start, end], [100, -100]);
  const scale = useTransform(progress, [start, start + 0.1, end - 0.1, end], [0.8, 1, 1, 0.8]);
  const opacity = useTransform(progress, [start, start + 0.1, end - 0.1, end], [0.3, 1, 1, 0]);
  const blur = useTransform(progress, [start, start + 0.1, end - 0.1, end], [10, 0, 0, 10]);
  const brightness = useTransform(progress, [start, start + 0.1, end - 0.1, end], [0.3, 1, 1, 0.3]);

  return (
    <motion.div
      ref={cardRef}
      style={{
        y,
        scale,
        opacity,
        filter: useTransform(blur, (value) => `blur(${value}px) brightness(${brightness.get()})`),
      }}
      className="sticky top-20 mx-auto w-full max-w-4xl"
    >
      <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${project.gradient} p-8 shadow-2xl backdrop-blur-sm md:p-12`}>
        {/* Background Image */}
        {project.image && (
          <div className="absolute inset-0">
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}
        
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-60 mix-blend-multiply`} />
        
        {/* Content */}
        <div className="relative z-10 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <h3 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
              {project.title}
            </h3>
            <p className="text-lg leading-relaxed text-gray-200 md:text-xl">
              {project.description}
            </p>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8"
          >
            <div className="flex flex-wrap gap-3">
              {project.techStack.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <button className="group inline-flex items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-lg font-semibold text-gray-900 transition-all duration-300 hover:bg-gray-100 hover:scale-105">
              View Project
              <ExternalLink className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button className="group inline-flex items-center justify-center gap-3 rounded-full border-2 border-white/30 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:scale-105">
              View Code
              <Github className="h-5 w-5 transition-transform group-hover:scale-110" />
            </button>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-white/5 blur-2xl" />
      </div>
    </motion.div>
  );
};

const Work = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="relative min-h-screen py-20">
      

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-20 text-center"
        >
          <h2 className="mb-6 text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
            Featured
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Work
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-400 md:text-2xl">
            A collection of projects that showcase innovation, creativity, and technical excellence.
          </p>
        </motion.div>

        {/* Projects Stack */}
        <div ref={containerRef} className="relative">
          <div className="space-y-20">
            {projects.map((project, index) => (
              <div key={project.id} className="relative h-screen flex items-center">
                <ProjectCard
                  project={project}
                  index={index}
                  progress={scrollYProgress}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mt-32 text-center"
        >
          <motion.h3 
            className="mb-6 text-3xl font-bold text-white md:text-4xl"
            whileHover={{ scale: 1.05 }}
          >
            Ready to work together?
          </motion.h3>
          <p className="mb-8 text-xl text-gray-400">
            Let's create something extraordinary.
          </p>
          
        </motion.div>
      </div>
    </section>
  );
};

export default Work;
