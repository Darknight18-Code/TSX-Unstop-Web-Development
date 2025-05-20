import { showNotification } from './utils.js';

// Initialize contact form
export const initContactForm = () => {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;
  
  // Make sure the form inputs work correctly by adding placeholder attributes
  contactForm.querySelectorAll('input, textarea').forEach(input => {
    // If placeholder doesn't exist, add an empty one
    if (!input.hasAttribute('placeholder')) {
      input.setAttribute('placeholder', ' ');
    }
  });
  
  // Input focus effect for floating labels
  const formInputs = contactForm.querySelectorAll('input, textarea');
  
  formInputs.forEach(input => {
    // Set initial state
    if (input.value.trim() !== '') {
      input.classList.add('has-value');
    }
    
    // Handle focus
    input.addEventListener('focus', () => {
      input.classList.add('focused');
    });
    
    // Handle blur
    input.addEventListener('blur', () => {
      if (input.value.trim() === '') {
        input.classList.remove('focused');
        input.classList.remove('has-value');
      } else {
        input.classList.add('has-value');
      }
    });
  });
  
  // Form submission
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Basic validation
    if (!name || !email || !subject || !message) {
      showNotification('Please fill in all required fields.', 'error');
      return;
    }
    
    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showNotification('Please enter a valid email address.', 'error');
      return;
    }
    
    // Show sending indicator
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
      // Show success message
      showNotification('Your message has been sent successfully! We will get back to you soon.', 'success');
      
      // Reset form
      contactForm.reset();
      formInputs.forEach(input => {
        input.classList.remove('focused', 'has-value');
      });
      
      // Restore button
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 1500);
  });
};

// Add 3D hover effect to contact card
export const addContactCardEffects = () => {
  const contactCard = document.querySelector('.contact-card-front');
  if (!contactCard) return;
  
  // Add subtle 3D effect when hovering
  contactCard.addEventListener('mousemove', (e) => {
    const cardRect = contactCard.getBoundingClientRect();
    const centerX = cardRect.left + cardRect.width / 2;
    const centerY = cardRect.top + cardRect.height / 2;
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    // Get distance from center in percent
    const percentX = (mouseX - centerX) / (cardRect.width / 2);
    const percentY = (mouseY - centerY) / (cardRect.height / 2);
    
    // Limit the tilt effect
    const tiltX = percentY * 2; // Reversed for natural feel
    const tiltY = -percentX * 2;
    
    contactCard.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-10px)`;
  });
  
  // Reset card position when mouse leaves
  contactCard.addEventListener('mouseleave', () => {
    contactCard.style.transform = '';
  });
};

// Initialize contact form functions
export const initContact = () => {
  initContactForm();
  addContactCardEffects();
};