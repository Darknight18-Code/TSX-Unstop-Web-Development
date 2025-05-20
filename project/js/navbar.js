import { throttle } from './utils.js';

// Handle navbar scroll effect
export const handleNavbarScroll = () => {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const scrollHandler = () => {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
      navbar.classList.add('navbar-shrink');
    } else {
      navbar.classList.remove('scrolled');
      navbar.classList.remove('navbar-shrink');
    }

    // Highlight active nav item based on scroll position
    highlightNavItem();
  };

  window.addEventListener('scroll', throttle(scrollHandler, 100), { passive: true });
  scrollHandler(); // Call once on init
};

// Highlight active navigation item based on scroll position
export const highlightNavItem = () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  let currentSection = '';
  const scrollPosition = window.scrollY + 150; // Adjust offset as needed

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
};

// Smooth scrolling for navigation links
export const setupSmoothScrolling = () => {
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetSection = document.querySelector(targetId);
      if (!targetSection) return;

      const navbarHeight = document.querySelector('.navbar').offsetHeight;
      const targetPosition = targetSection.offsetTop - navbarHeight;

      // Smooth scroll to target
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      // Close mobile menu if open
      const navbarCollapse = document.querySelector('.navbar-collapse');
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        navbarCollapse.classList.remove('show');
      }

      // Delay update to match scroll behavior
      setTimeout(() => {
        highlightNavItem();
      }, 350); 
    });
  });

  // Scroll to section if hash in URL on load
  if (window.location.hash) {
    setTimeout(() => {
      const targetSection = document.querySelector(window.location.hash);
      if (targetSection) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetSection.offsetTop - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        setTimeout(() => {
          highlightNavItem();
        }, 400);
      }
    }, 500);
  }
};

// Initialize navbar functions
export const initNavbar = () => {
  handleNavbarScroll();
  setupSmoothScrolling();
};
