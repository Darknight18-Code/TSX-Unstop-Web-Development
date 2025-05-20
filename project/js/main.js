/**
 * Main JavaScript File
 * Author: John Doe
 * Version: 1.0
 */

// Import initialization functions from modules
import { initAllAnimations } from './animations.js';
import { initTheme } from './theme.js';
import { initNavbar } from './navbar.js';
import { initProjects } from './projects.js';
import { initContact } from './contact.js';
import { initCursor } from './cursor.js';
import { updateProgressCircle } from './utils.js';

// Wait for DOM to be fully loaded before initializing
document.addEventListener('DOMContentLoaded', function() {
  'use strict';
  
  // Prevent fouc (flash of unstyled content)
  document.documentElement.classList.add('loaded');
  
  // Initialize all components
  const init = () => {
    // Add page loading class to body to prevent scrolling during loading
    document.body.classList.add('page-loading');
    
    // Add progress circle to body
    const progressCircle = document.createElement('div');
    progressCircle.className = 'progress-circle-container';
    progressCircle.innerHTML = `
      <div class="progress-circle" data-progress="0">
        <div class="progress-circle-fill"></div>
      </div>
    `;
    document.body.appendChild(progressCircle);
    
    // Update progress on scroll
    window.addEventListener('scroll', () => {
      updateProgressCircle();
    });
    
    // Initialize progress
    updateProgressCircle();
    
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