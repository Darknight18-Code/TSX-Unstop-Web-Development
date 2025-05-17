import './style.css'
// Keep the counter code for demonstration purposes
import { setupCounter } from './counter.js'

// Set up counter if the element exists
const counterButton = document.querySelector('#counter');
if (counterButton) {
  setupCounter(counterButton);
}

// Add subtle animation to hero section
document.addEventListener('DOMContentLoaded', () => {
  const heroTitle = document.querySelector('.hero h2');
  
  if (heroTitle) {
    // Simple entrance animation
    heroTitle.style.opacity = '0';
    heroTitle.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      heroTitle.style.transition = 'opacity 800ms ease, transform 800ms ease';
      heroTitle.style.opacity = '1';
      heroTitle.style.transform = 'translateY(0)';
    }, 300);
  }
});

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navList = document.querySelector('.nav-list');
  
  if (mobileMenuToggle && navList) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileMenuToggle.classList.toggle('active');
      navList.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
      if (!navList.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
        mobileMenuToggle.classList.remove('active');
        navList.classList.remove('active');
      }
    });
    
    // Close menu when clicking on a nav link
    const navLinks = navList.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        navList.classList.remove('active');
      });
    });
  }
  
  // Subtle header animation on scroll
  const header = document.querySelector('.site-header');
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.boxShadow = '0 1px 0 rgba(0, 0, 0, 0.1)';
    }
    
    lastScrollTop = scrollTop;
  });
});