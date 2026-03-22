/**
 * Animations JavaScript
 * Handles scroll animations and visual effects
 */

document.addEventListener('DOMContentLoaded', function() {
  initScrollAnimations();
  initCounterAnimations();
  initParallax();
  initProgressBars();
});

/**
 * Scroll Animations using Intersection Observer
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    '.animate-fade-in, .animate-slide-up, .animate-slide-down, .animate-slide-left, .animate-slide-right, .animate-scale'
  );
  
  if (animatedElements.length === 0) return;
  
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        
        // Add stagger delay for child elements
        const staggerChildren = entry.target.querySelectorAll('.stagger-child');
        staggerChildren.forEach((child, index) => {
          child.style.animationDelay = `${index * 0.1}s`;
          child.classList.add('animated');
        });
        
        // Unobserve after animation
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  animatedElements.forEach(el => observer.observe(el));
}

/**
 * Counter Animation
 */
function initCounterAnimations() {
  const counters = document.querySelectorAll('.counter');
  
  if (counters.length === 0) return;
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  counters.forEach(counter => observer.observe(counter));
}

/**
 * Animate Counter
 */
function animateCounter(counter) {
  const target = parseInt(counter.dataset.target, 10);
  const duration = parseInt(counter.dataset.duration, 10) || 2000;
  const suffix = counter.dataset.suffix || '';
  const prefix = counter.dataset.prefix || '';
  
  if (isNaN(target)) return;
  
  const startTime = performance.now();
  const startValue = 0;
  
  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function (ease-out)
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const currentValue = Math.floor(startValue + (target - startValue) * easeOut);
    
    counter.textContent = prefix + formatNumber(currentValue) + suffix;
    
    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      counter.textContent = prefix + formatNumber(target) + suffix;
    }
  }
  
  requestAnimationFrame(updateCounter);
}

/**
 * Format Number with Commas
 */
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Parallax Effect
 */
function initParallax() {
  const parallaxElements = document.querySelectorAll('.parallax');
  
  if (parallaxElements.length === 0) return;
  
  let ticking = false;
  
  function updateParallax() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    
    parallaxElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const speed = parseFloat(el.dataset.speed) || 0.5;
      
      // Only animate when element is in view
      if (rect.top < windowHeight && rect.bottom > 0) {
        const offset = (scrollY - el.offsetTop) * speed;
        el.style.transform = `translateY(${offset}px)`;
      }
    });
    
    ticking = false;
  }
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
}

/**
 * Progress Bar Animation
 */
function initProgressBars() {
  const progressBars = document.querySelectorAll('.progress-bar');
  
  if (progressBars.length === 0) return;
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const progress = bar.dataset.progress || 0;
        
        setTimeout(() => {
          bar.style.width = `${progress}%`;
        }, 200);
        
        observer.unobserve(bar);
      }
    });
  }, observerOptions);
  
  progressBars.forEach(bar => observer.observe(bar));
}

/**
 * Reveal on Scroll (simple version)
 */
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  
  reveals.forEach(element => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < windowHeight - elementVisible) {
      element.classList.add('active');
    }
  });
}

// Run on scroll
window.addEventListener('scroll', revealOnScroll, { passive: true });

// Run on load
revealOnScroll();

/**
 * Typewriter Effect
 */
function typewriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

/**
 * Shake Animation
 */
function shakeElement(element) {
  element.classList.add('shake');
  setTimeout(() => {
    element.classList.remove('shake');
  }, 500);
}

/**
 * Pulse Animation
 */
function pulseElement(element) {
  element.classList.add('pulse');
  setTimeout(() => {
    element.classList.remove('pulse');
  }, 1000);
}

/**
 * Fade In Up Animation
 */
function fadeInUp(element, delay = 0) {
  element.style.opacity = '0';
  element.style.transform = 'translateY(20px)';
  element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  
  setTimeout(() => {
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
  }, delay);
}

/**
 * Stagger Animation for List Items
 */
function staggerAnimation(container, childSelector, animationClass) {
  const children = container.querySelectorAll(childSelector);
  
  children.forEach((child, index) => {
    setTimeout(() => {
      child.classList.add(animationClass);
    }, index * 100);
  });
}

/**
 * Lottie Animation Loader
 */
function loadLottieAnimation(container, path, loop = true, autoplay = true) {
  if (typeof lottie === 'undefined') {
    console.warn('Lottie library not loaded');
    return;
  }
  
  return lottie.loadAnimation({
    container: container,
    renderer: 'svg',
    loop: loop,
    autoplay: autoplay,
    path: path
  });
}

/**
 * Scroll to Element with Offset
 */
function scrollToElement(element, offset = 80) {
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.scrollY - offset;
  
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
}

/**
 * Lazy Load Images
 */
function initLazyLoad() {
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  if (lazyImages.length === 0) return;
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px 0px'
  });
  
  lazyImages.forEach(img => imageObserver.observe(img));
}

// Initialize lazy load
document.addEventListener('DOMContentLoaded', initLazyLoad);
