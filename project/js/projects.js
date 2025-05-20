/**
 * Projects & Portfolio Functions
 * Author: John Doe
 * Version: 1.0
 */

// Setup project filtering
export const setupProjectFiltering = () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  if (!filterButtons.length || !portfolioItems.length) return;
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Get the filter value
      const filterValue = this.getAttribute('data-filter');
      
      // Filter portfolio items
      portfolioItems.forEach(item => {
        const category = item.getAttribute('data-category');
        
        if (filterValue === 'all' || category === filterValue) {
          // Show item with animation
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          // Hide item with animation
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
};

// Setup lightbox for project images
export const setupImageLightbox = () => {
  const projectImages = document.querySelectorAll('.project-card .card-img-top');
  
  projectImages.forEach(image => {
    image.style.cursor = 'pointer';
    
    image.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      // Create lightbox
      const lightbox = document.createElement('div');
      lightbox.className = 'lightbox';
      
      // Create container
      const container = document.createElement('div');
      container.className = 'lightbox-container';
      
      // Create image
      const img = document.createElement('img');
      img.src = this.src;
      img.alt = this.alt;
      img.style.maxHeight = '80vh';
      img.style.maxWidth = '90vw';
      img.style.borderRadius = '5px';
      
      // Create close button
      const closeBtn = document.createElement('button');
      closeBtn.className = 'lightbox-close';
      closeBtn.innerHTML = '&times;';
      
      // Create caption
      const caption = document.createElement('div');
      caption.style.marginTop = '10px';
      caption.style.color = 'white';
      caption.style.textAlign = 'center';
      caption.textContent = this.alt;
      
      // Assemble lightbox
      container.appendChild(img);
      container.appendChild(closeBtn);
      container.appendChild(caption);
      lightbox.appendChild(container);
      document.body.appendChild(lightbox);
      
      // Prevent background scrolling
      document.body.style.overflow = 'hidden';
      
      // Show lightbox with animation
      setTimeout(() => {
        lightbox.classList.add('show');
      }, 10);
      
      // Close on button click or outside click
      const closeLightbox = function() {
        lightbox.classList.remove('show');
        setTimeout(() => {
          document.body.removeChild(lightbox);
          document.body.style.overflow = '';
        }, 300);
      };
      
      closeBtn.addEventListener('click', closeLightbox);
      
      lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
          closeLightbox();
        }
      });
      
      // Close on ESC key
      document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
          closeLightbox();
          document.removeEventListener('keydown', escHandler);
        }
      });
    });
  });
};

// Setup hover effects for project cards
export const setupProjectHoverEffects = () => {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    // Setup hover effect for project card image wrapper
    const imgWrapper = card.querySelector('.project-card-img-wrapper');
    if (imgWrapper) {
      imgWrapper.addEventListener('mouseenter', () => {
        card.querySelector('.card-img-overlay').style.opacity = '1';
      });
      
      imgWrapper.addEventListener('mouseleave', () => {
        card.querySelector('.card-img-overlay').style.opacity = '0';
      });
    }
  });
};

// Initialize all project functions
export const initProjects = () => {
  setupProjectFiltering();
  setupImageLightbox();
  setupProjectHoverEffects();
};