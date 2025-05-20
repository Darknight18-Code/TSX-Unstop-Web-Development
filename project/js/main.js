// Add to existing init function in main.js
document.addEventListener('DOMContentLoaded', function() {
  'use strict';
  
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
  
  // Fix progress bars animation
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
  
  progressBars.forEach(bar => observer.observe(bar));
});