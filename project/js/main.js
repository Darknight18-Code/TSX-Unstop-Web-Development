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

// Wait for DOM to be fully loaded before initializing
document.addEventListener('DOMContentLoaded', function() {
  'use strict';
  
  // Prevent fouc (flash of unstyled content)
  document.documentElement.classList.add('loaded');
  
  // Initialize all components
  const init = () => {
    // Add page loading class to body to prevent scrolling during loading
    document.body.classList.add('page-loading');
    
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