import { isTouchDevice } from './utils.js';

// Create custom cursor
export const setupCustomCursor = () => {
  // Only show custom cursor on non-touch devices
  if (isTouchDevice()) return;
  
  const cursor = {
    outer: document.querySelector('.custom-cursor-outer'),
    inner: document.querySelector('.custom-cursor-inner'),
    visible: false
  };
  
  if (!cursor.outer || !cursor.inner) return;
  
  document.addEventListener('mousemove', (e) => {
    // Set cursor visibility after first mouse move
    if (!cursor.visible) {
      cursor.visible = true;
      document.body.classList.add('custom-cursor-visible');
    }
    
    // Position the cursor elements
    const posX = e.clientX;
    const posY = e.clientY;
    
    // Use requestAnimationFrame for smooth animation
    requestAnimationFrame(() => {
      cursor.outer.style.transform = `translate(${posX}px, ${posY}px)`;
      cursor.inner.style.transform = `translate(${posX}px, ${posY}px)`;
    });
  });
  
  // Handle cursor hiding when mouse leaves the window
  document.addEventListener('mouseleave', () => {
    document.body.classList.remove('custom-cursor-visible');
  });
  
  document.addEventListener('mouseenter', () => {
    document.body.classList.add('custom-cursor-visible');
  });
  
  // Add cursor hover effect for interactive elements
  const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, .project-card, .filter-btn, .social-icon, .project-card-img-wrapper, .scroll-to-top, .contact-card-front, .theme-toggle');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      document.body.classList.add('cursor-hover');
    });
    
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-hover');
    });
    
    el.addEventListener('mousedown', () => {
      document.body.classList.add('cursor-active');
    });
    
    el.addEventListener('mouseup', () => {
      document.body.classList.remove('cursor-active');
    });
  });
  
  // Add a pulse animation when clicking
  document.addEventListener('click', (e) => {
    // Create ripple effect element
    const ripple = document.createElement('div');
    ripple.classList.add('cursor-ripple');
    ripple.style.left = e.clientX + 'px';
    ripple.style.top = e.clientY + 'px';
    document.body.appendChild(ripple);
    
    // Remove after animation completes
    setTimeout(() => {
      ripple.remove();
    }, 1000);
  });
};

// Initialize cursor
export const initCursor = () => {
  setupCustomCursor();
};