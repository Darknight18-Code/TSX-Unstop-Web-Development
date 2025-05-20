
// Import initialization functions from modules
import { initAllAnimations } from './animations.js';
import { initTheme } from './theme.js';
import { initNavbar } from './navbar.js';
import { initProjects } from './projects.js';
import { initContact } from './contact.js';
import { initCursor } from './cursor.js';

// Wait for DOM to be fully loaded before initializing
document.addEventListener('DOMContentLoaded', function() {
  'use strict';
  
  // Prevent fouc (flash of unstyled content)
  document.documentElement.classList.add('loaded');
  
  // Initialize all components
  const init = () => {
    // Add page loading class to body to prevent scrolling during loading
    document.body.classList.add('page-loading');
    
    // Initialize progress bars
    const progressBars = document.querySelectorAll('.progress-bar');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const value = bar.getAttribute('aria-valuenow');
          bar.style.width = value + '%';
        }
      });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
      bar.style.width = '0%';
      observer.observe(bar);
    });


const fg = document.querySelector('.compass-fg');
  const percentText = document.querySelector('.scroll-percent');
  const needle = document.querySelector('.needle');
  const circumference = 2 * Math.PI * 45;

  function updateCompassScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const percent = Math.min(Math.round((scrollTop / docHeight) * 100), 100);
    const offset = circumference - (percent / 100) * circumference;
    const rotation = (percent / 100) * 360;

    fg.style.strokeDashoffset = offset;
    percentText.textContent = `${percent}%`;
    needle.style.transform = `rotate(${rotation}deg)`;
  }

  window.addEventListener('scroll', updateCompassScroll);
  window.addEventListener('load', updateCompassScroll);
    
    // Initialize theme
    initTheme();
    
    // Initialize navbar effects
    initNavbar();
    
    // Initialize animations and effects
    initAllAnimations();
    
    // Initialize project features
    initProjects();
    
    // Initialize contact form
    initContact();
    
    // Initialize custom cursor
    initCursor();
    
    // Log initialization complete
    console.log('Portfolio website initialized!');
  };
  
  // Run initialization
  init();
});