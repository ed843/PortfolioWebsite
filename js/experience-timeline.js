// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  
  // Observe all timeline items
  document.querySelectorAll('.timeline-item').forEach(item => {
    observer.observe(item);
  });
  
  // Add hover effects for timeline dots
  document.querySelectorAll('.timeline-item').forEach(item => {
    const dot = item.querySelector('.timeline-dot');
    
    item.addEventListener('mouseenter', () => {
      dot.style.transform = 'translate(-50%, 0) scale(1.5)';
      dot.style.boxShadow = '0 0 0 8px rgba(var(--accent-rgb), 0.1)';
    });
    
    item.addEventListener('mouseleave', () => {
      dot.style.transform = 'translate(-50%, 0) scale(1)';
      dot.style.boxShadow = '0 0 0 4px rgba(var(--accent-rgb), 0.2)';
    });
  });

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  