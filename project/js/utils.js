// Add to existing utils.js
export const calculateScrollProgress = () => {
  const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = window.pageYOffset;
  return Math.min(Math.round((scrolled / windowHeight) * 100), 100);
};

export const updateProgressCircle = () => {
  const progress = calculateScrollProgress();
  const circle = document.querySelector('.progress-circle');
  if (circle) {
    circle.style.setProperty('--progress', `${progress}%`);
    circle.setAttribute('data-progress', progress);
  }
};