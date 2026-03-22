/**
 * Amazon Shipping Replica - Main JavaScript
 * Handles core functionality and initialization
 */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all modules
  initMobileMenu();
  initDropdowns();
  initSmoothScroll();
  initCookieBanner();
  initAnimations();
});

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const menuClose = document.querySelector('.mobile-menu-close');
  
  if (!menuToggle || !mobileMenu) return;
  
  menuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  });
  
  if (menuClose) {
    menuClose.addEventListener('click', function() {
      menuToggle.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
  
  // Close menu when clicking outside
  mobileMenu.addEventListener('click', function(e) {
    if (e.target === mobileMenu) {
      menuToggle.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

/**
 * Dropdown Menus
 */
function initDropdowns() {
  const dropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
  
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      const dropdown = this.nextElementSibling;
      if (dropdown) {
        this.classList.toggle('active');
        dropdown.classList.toggle('active');
      }
    });
  });
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/**
 * Cookie Banner
 */
function initCookieBanner() {
  const cookieBanner = document.querySelector('.cookie-banner');
  const acceptBtn = document.querySelector('.cookie-btn-primary');
  const declineBtn = document.querySelector('.cookie-btn-secondary');
  
  if (!cookieBanner) return;
  
  // Check if user has already made a choice
  const cookieChoice = localStorage.getItem('cookieConsent');
  
  if (!cookieChoice) {
    // Show banner after a short delay
    setTimeout(() => {
      cookieBanner.classList.add('active');
    }, 1000);
  }
  
  if (acceptBtn) {
    acceptBtn.addEventListener('click', function() {
      localStorage.setItem('cookieConsent', 'accepted');
      cookieBanner.classList.remove('active');
    });
  }
  
  if (declineBtn) {
    declineBtn.addEventListener('click', function() {
      localStorage.setItem('cookieConsent', 'declined');
      cookieBanner.classList.remove('active');
    });
  }
}

/**
 * Scroll Animations
 */
function initAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  if (!animatedElements.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  animatedElements.forEach(el => observer.observe(el));
}

/**
 * Utility Functions
 */

// Debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Format date
function formatDate(date, options = {}) {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  return new Date(date).toLocaleDateString('en-US', { ...defaultOptions, ...options });
}

// Validate email
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Show notification
function showNotification(message, type = 'info', duration = 3000) {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  // Trigger animation
  requestAnimationFrame(() => {
    notification.classList.add('show');
  });
  
  // Remove after duration
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, duration);
}

// AJAX request helper
function ajaxRequest(url, options = {}) {
  const defaultOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  
  return fetch(url, { ...defaultOptions, ...options })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    });
}

// Export functions for use in other modules
window.AmazonShipping = {
  debounce,
  throttle,
  formatDate,
  isValidEmail,
  showNotification,
  ajaxRequest
};
