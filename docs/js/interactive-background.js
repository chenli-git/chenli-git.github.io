// Interactive gradient background that follows mouse movement
document.addEventListener('DOMContentLoaded', function() {
  const body = document.body;
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  // Track mouse movement
  document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth animation using requestAnimationFrame
  function animateBackground() {
    // Smooth interpolation
    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    const xPercent = (targetX / window.innerWidth) * 100;
    const yPercent = (targetY / window.innerHeight) * 100;

    // Check if dark mode or light mode
    const isDarkMode = document.body.getAttribute('data-md-color-scheme') === 'slate';

    if (isDarkMode) {
      // Dark mode: subtle gradient movement
      body.style.background = `
        radial-gradient(circle at ${xPercent}% ${yPercent}%, 
          rgba(10, 132, 255, 0.15) 0%, 
          rgba(88, 86, 214, 0.1) 30%, 
          transparent 70%),
        #1a1a1a
      `;
    } else {
      // Light mode: colorful gradient movement
      body.style.background = `
        radial-gradient(circle at ${xPercent}% ${yPercent}%, 
          rgba(0, 122, 255, 0.12) 0%, 
          rgba(88, 86, 214, 0.08) 30%, 
          rgba(175, 82, 222, 0.05) 50%,
          transparent 70%),
        linear-gradient(135deg, 
          rgba(0, 122, 255, 0.03) 0%, 
          rgba(90, 200, 250, 0.05) 100%),
        #ffffff
      `;
    }

    requestAnimationFrame(animateBackground);
  }

  // Start animation
  animateBackground();

  // Update on theme change
  const observer = new MutationObserver(function() {
    // Reset to trigger animation update
    targetX = mouseX;
    targetY = mouseY;
  });

  observer.observe(body, {
    attributes: true,
    attributeFilter: ['data-md-color-scheme']
  });
});
