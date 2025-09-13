"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Header = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShow(false); // scrolling down → hide
      } else {
        setShow(true); // scrolling up → show
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: show ? 0 : -100 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-sm px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img 
            src="/logo.png"
            alt="PS Creative Logo" 
            className="h-18 w-auto"
          />
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 flex justify-center">
          <div className="bg-black/50 backdrop-blur-lg rounded-full px-8 py-3 shadow-lg">
            <ul className="flex items-center space-x-8">
              <li><a href="#about" className="text-white hover:text-gray-300 text-sm font-medium">About</a></li>
              <li><a href="#services" className="text-white hover:text-gray-300 text-sm font-medium">Services</a></li>
              <li><a href="#work" className="text-white hover:text-gray-300 text-sm font-medium">Work</a></li>
              <li><a href="#blog" className="text-white hover:text-gray-300 text-sm font-medium">Blog</a></li>
            </ul>
          </div>
        </nav>

        {/* Get in touch button */}
        <div className="flex-shrink-0">
          <a href="#get-in-touch">
            <button className="bg-white rounded-full px-6 py-3 shadow-lg hover:shadow-xl transition-shadow duration-200 flex items-center space-x-2 border border-gray-200">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-gray-900 text-sm font-medium">Get in touch</span>
            </button>
          </a>

        </div>
      </div>
    </motion.header>
  );
};

export default Header;
