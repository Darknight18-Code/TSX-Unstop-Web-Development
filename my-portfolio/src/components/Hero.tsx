"use client";


import React, { useEffect, useRef } from "react";
import * as THREE from 'three';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-50 font-sans">
      <style>
        {`
        .animate-float {
            animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(15deg); }
        }

        .animate-bounce-slow {
            animation: bounce-slow 4s infinite;
        }
        @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
        }

        @keyframes wave-animation-1 {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }

        @keyframes wave-animation-2 {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
        `}
      </style>
      

      {/* Left Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 lg:px-16">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight drop-shadow-2xl">
          Ravindra <span className="text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text animate-pulse">Singh</span> is <br />
          <span className="text-transparent bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text">Right Here!</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-lg drop-shadow-lg">
          With a seasoned eye for design, I like to transform ideas into elegant
          digital solutions that speak out their functionalities.
        </p>

        {/* CTA buttons with 3D effect */}
        <div className="mt-8 flex flex-wrap gap-4">
          <button className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold rounded-lg hover:from-cyan-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-cyan-500/50">
            CHAT WITH ME
          </button>
          <button className="px-6 py-3 border-2 border-purple-400 text-purple-300 rounded-lg hover:bg-purple-400 hover:text-black transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-purple-500/50">
            START A PROJECT
          </button>
        </div>

        {/* Stats with neon glow */}
        <div className="mt-10 flex gap-12">
          <div className="text-center">
            <p className="text-3xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text drop-shadow-lg">98%</p>
            <p className="text-sm text-gray-300">Satisfaction Rate</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text drop-shadow-lg">100+</p>
            <p className="text-sm text-gray-300">Projects Delivered</p>
          </div>
        </div>
      </div>

      {/* Right Content (Photo clipped with wave) */}
      <div className="relative flex-1 flex justify-center items-end">
        <div className="relative w-[400px] md:w-[500px] lg:w-[550px]">
          {/* Glowing backdrop */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg filter blur-xl animate-pulse"></div>
          
          <svg
            viewBox="0 0 500 600"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto relative z-10"
          >
            <defs>
              <clipPath id="waveClip" clipPathUnits="objectBoundingBox">
                <path
                  d="M0,0 H1 V0.85 
                    C0.7,1 0.3,0.7 0,0.85 Z"
                  transform="scale(1,1)"
                />
              </clipPath>
              <filter id="neonGlow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <image
              href="vk-1.jpg"
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#waveClip)"
              filter="url(#neonGlow)"
            />
          </svg>
          
          {/* 3D floating elements around image */}
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full animate-ping shadow-2xl shadow-cyan-500/50"></div>
          <div className="absolute top-1/4 -left-4 w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full animate-pulse shadow-2xl shadow-purple-500/50"></div>
          <div className="absolute top-1/2 -left-8 w-4 h-4 bg-gradient-to-br from-green-400 to-teal-500 rounded-full animate-bounce shadow-2xl shadow-green-500/50"></div>
          <div className="absolute top-10 -right-6 w-5 h-5 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse shadow-2xl shadow-yellow-500/50" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>

      {/* Animated neon waves at bottom */}
      <div className="absolute bottom-0 left-0 w-[200%] h-32 z-0 overflow-hidden leading-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="spaceWaveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(58, 28, 113, 0.8)" />
                <stop offset="25%" stopColor="rgba(91, 44, 111, 0.6)" />
                <stop offset="50%" stopColor="rgba(20, 145, 155, 0.8)" />
                <stop offset="75%" stopColor="rgba(91, 44, 111, 0.6)" />
                <stop offset="100%" stopColor="rgba(58, 28, 113, 0.8)" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <path
            d="M0,50 C150,150 350,-50 600,50 C850,150 1050,-50 1200,50 L1200,120 L0,120 Z"
            fill="url(#spaceWaveGradient)"
            filter="url(#glow)"
            opacity="0.6"
            className="animate-[wave-animation-1_10s_linear_infinite]"
          />
          <path
            d="M0,70 C150,170 350,-30 600,70 C850,170 1050,-30 1200,70 L1200,120 L0,120 Z"
            fill="url(#spaceWaveGradient)"
            filter="url(#glow)"
            opacity="0.3"
            className="animate-[wave-animation-2_8s_linear_infinite]"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
