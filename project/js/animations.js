/**
 * Animation Functions
 * Author: John Doe
 * Version: 1.0
 */

import { isInViewport, throttle } from './utils.js';

// Initialize AOS animation library
export const initAOS = () => {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: false, // Animations trigger every time
      mirror: true, // Animations trigger when scrolling back up
      disable: false, // Enable on all devices
      anchorPlacement: 'top-bottom'
    });
    
    // Refresh AOS on window resize
    window.addEventListener('resize', throttle(function() {
      AOS.refresh();
    }, 200));
    
    // Refresh AOS on scroll for better performance
    window.addEventListener('scroll', throttle(function() {
      AOS.refresh();
    }, 200), { passive: true });
  }
};

// Initialize typing animation
export const initTyped = () => {
  const typedElement = document.querySelector('.typed-text');
  if (typedElement && typeof Typed !== 'undefined') {
    new Typed(typedElement, {
      strings: ["Web Developer", "UI/UX Designer", "Frontend Engineer", "Creative Coder"],
      typeSpeed: 70,       // Typing speed
      backSpeed: 40,       // Backspacing speed
      backDelay: 1500,     // Delay before backspacing
      startDelay: 300,     // Initial delay
      loop: true,
      showCursor: true,
      cursorChar: '|',
      autoInsertCss: true,
      smartBackspace: true
    });
  }
};

// Setup progress bars animation
export const setupProgressBars = () => {
  const progressBars = document.querySelectorAll('.progress-bar');
  
  const animateProgressBars = () => {
    progressBars.forEach(bar => {
      if (isInViewport(bar.parentElement, 0.2) && bar.style.width === '0%') {
        const value = bar.getAttribute('aria-valuenow');
        setTimeout(() => {
          bar.style.width = `${value}%`;
        }, 100);
      }
    });
  };
  
  // Initial check
  animateProgressBars();
  
  // Check on scroll
  window.addEventListener('scroll', throttle(animateProgressBars, 200), { passive: true });
};

// Initialize tilt effect for project cards
export const initTiltEffect = () => {
  const projectCards = document.querySelectorAll('.project-card');
  
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(projectCards, {
      max: 5,
      speed: 400,
      glare: true,
      "max-glare": 0.3,
      scale: 1.03,
      perspective: 1000
    });
  }
};

// Initialize particles.js
export const initParticles = () => {
  const particlesContainer = document.getElementById('particles-js');
  
  if (particlesContainer && typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: "#ffffff"
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000"
          },
        },
        opacity: {
          value: 0.5,
          random: true,
        },
        size: {
          value: 3,
          random: true,
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#ffffff",
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: true,
          out_mode: "out",
          bounce: false,
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "grab"
          },
          onclick: {
            enable: true,
            mode: "push"
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 1
            }
          },
          push: {
            particles_nb: 4
          }
        }
      },
      retina_detect: true
    });
  }
};

// Initialize page loader
export const initPageLoader = () => {
  // Hide loader after page load
  window.addEventListener('load', () => {
    const loader = document.querySelector('.page-loader');
    
    if (loader) {
      setTimeout(() => {
        loader.classList.add('loaded');
        
        // Enable scrolling on body
        document.body.classList.remove('page-loading');
      }, 500);
    }
  });
};

// Setup animation on scroll for elements
export const setupScrollAnimations = () => {
  const scrollElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in, .stagger-children');
  
  const handleScrollAnimation = () => {
    scrollElements.forEach(element => {
      if (isInViewport(element, 0.15)) {
        element.classList.add('active');
      } else if (!element.classList.contains('once')) {
        element.classList.remove('active');
      }
    });
  };
  
  // Run on scroll
  window.addEventListener('scroll', throttle(handleScrollAnimation, 100), { passive: true });
  
  // Initial check
  setTimeout(handleScrollAnimation, 100);
};

// Setup mouse scroll indicator
export const setupMouseScrollIndicator = () => {
  const mouseScroll = document.querySelector('.mouse-scroll-container');
  if (!mouseScroll) return;
  
  // Scroll to About section when clicked
  mouseScroll.addEventListener('click', function() {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      const navbarHeight = document.querySelector('.navbar').offsetHeight;
      const targetPosition = aboutSection.offsetTop - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
  
  // Hide mouse scroll on scroll
  const hideMouseScrollOnScroll = function() {
    if (window.scrollY > 200) {
      mouseScroll.style.opacity = '0';
      mouseScroll.style.transform = 'translate(-50%, 20px)';
    } else {
      mouseScroll.style.opacity = '1';
      mouseScroll.style.transform = 'translate(-50%, 0)';
    }
  };
  
  window.addEventListener('scroll', throttle(hideMouseScrollOnScroll, 200), { passive: true });
};

// Setup scroll to top button
export const setupScrollToTop = () => {
  const scrollTopBtn = document.querySelector('.scroll-to-top');
  
  if (!scrollTopBtn) return;
  
  // Show/hide button based on scroll position
  const toggleScrollButton = function() {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  };
  
  // Scroll to top when button is clicked
  scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Check scroll position
  window.addEventListener('scroll', throttle(toggleScrollButton, 200), { passive: true });
  toggleScrollButton(); // Call once on init
};

// Initialize animations
export const initAllAnimations = () => {
  initPageLoader();
  initAOS();
  initTyped();
  setupProgressBars();
  initTiltEffect();
  initParticles();
  setupScrollAnimations();
  setupMouseScrollIndicator();
  setupScrollToTop();
};