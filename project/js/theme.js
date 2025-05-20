export const initializeTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  const navbar = document.querySelector('.navbar');
  
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    if (themeToggle) themeToggle.checked = true;
    if (navbar) {
      navbar.classList.remove('navbar-light', 'bg-light');
      navbar.classList.add('navbar-dark', 'bg-dark');
    }
  } else {
    body.classList.remove('dark-mode');
    if (themeToggle) themeToggle.checked = false;
    if (navbar) {
      navbar.classList.remove('navbar-dark', 'bg-dark');
      navbar.classList.add('navbar-light', 'bg-light');
    }
  }
};

// Theme toggle functionality
export const setupThemeToggle = () => {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;
  
  themeToggle.addEventListener('change', function() {
    toggleTheme();
  });
  
  // Also listen for clicks on the label for better mobile experience
  const themeToggleLabel = document.querySelector('label[for="themeToggle"]');
  if (themeToggleLabel) {
    themeToggleLabel.addEventListener('click', function(e) {
      // Prevent this from firing twice when clicking directly on the checkbox
      if (e.target !== themeToggle) {
        e.preventDefault();
        toggleTheme();
      }
    });
  }
};

// Toggle theme function
export const toggleTheme = () => {
  const body = document.body;
  const themeToggle = document.getElementById('themeToggle');
  const navbar = document.querySelector('.navbar');
  
  body.classList.toggle('dark-mode');
  const isDarkMode = body.classList.contains('dark-mode');
  
  // Update checkbox state
  if (themeToggle) themeToggle.checked = isDarkMode;
  
  // Update navbar classes
  if (navbar) {
    if (isDarkMode) {
      navbar.classList.remove('navbar-light', 'bg-light');
      navbar.classList.add('navbar-dark', 'bg-dark');
    } else {
      navbar.classList.remove('navbar-dark', 'bg-dark');
      navbar.classList.add('navbar-light', 'bg-light');
    }
  }
  
  // Save preference to localStorage
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  
  // Refresh AOS animations
  if (typeof AOS !== 'undefined') {
    setTimeout(() => AOS.refresh(), 200);
  }
};

// Initialize theme settings
export const initTheme = () => {
  initializeTheme();
  setupThemeToggle();
};