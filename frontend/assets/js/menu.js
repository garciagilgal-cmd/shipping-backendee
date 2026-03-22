/**
 * Menu and Navigation JavaScript
 * Handles dropdown menus, mobile navigation, and country selector
 */

document.addEventListener('DOMContentLoaded', function() {
  initCountrySelector();
  initStickyHeader();
  initMegaMenu();
});

/**
 * Country Selector
 */
function initCountrySelector() {
  const countrySelector = document.querySelector('.country-selector');
  const countryBtn = document.querySelector('.country-selector-btn');
  const countryOptions = document.querySelectorAll('.country-option');
  
  if (!countrySelector || !countryBtn) return;
  
  // Toggle dropdown
  countryBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    countrySelector.classList.toggle('active');
  });
  
  // Close dropdown when clicking outside
  document.addEventListener('click', function(e) {
    if (!countrySelector.contains(e.target)) {
      countrySelector.classList.remove('active');
    }
  });
  
  // Handle country selection
  countryOptions.forEach(option => {
    option.addEventListener('click', function(e) {
      e.preventDefault();
      
      const country = this.dataset.country;
      const flag = this.querySelector('.country-flag').src;
      const name = this.querySelector('.country-name').textContent;
      
      // Update button
      const btnFlag = countryBtn.querySelector('.country-flag');
      const btnName = countryBtn.querySelector('.country-name');
      
      if (btnFlag) btnFlag.src = flag;
      if (btnName) btnName.textContent = name;
      
      // Update active state
      countryOptions.forEach(opt => opt.classList.remove('active'));
      this.classList.add('active');
      
      // Close dropdown
      countrySelector.classList.remove('active');
      
      // Store selection
      localStorage.setItem('selectedCountry', country);
      
      // Trigger change event
      document.dispatchEvent(new CustomEvent('countryChanged', {
        detail: { country, name }
      }));
    });
  });
  
  // Restore saved country
  const savedCountry = localStorage.getItem('selectedCountry');
  if (savedCountry) {
    const savedOption = document.querySelector(`.country-option[data-country="${savedCountry}"]`);
    if (savedOption) {
      savedOption.click();
    }
  }
}

/**
 * Sticky Header
 */
function initStickyHeader() {
  const header = document.querySelector('.main-header');
  const topBar = document.querySelector('.top-bar');
  
  if (!header) return;
  
  let lastScrollY = window.scrollY;
  let ticking = false;
  
  const updateHeader = () => {
    const scrollY = window.scrollY;
    const topBarHeight = topBar ? topBar.offsetHeight : 0;
    
    // Add/remove sticky class
    if (scrollY > topBarHeight) {
      header.classList.add('sticky');
      document.body.style.paddingTop = header.offsetHeight + 'px';
    } else {
      header.classList.remove('sticky');
      document.body.style.paddingTop = '';
    }
    
    // Hide/show on scroll direction
    if (scrollY > lastScrollY && scrollY > 200) {
      header.classList.add('hidden');
    } else {
      header.classList.remove('hidden');
    }
    
    lastScrollY = scrollY;
    ticking = false;
  };
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });
}

/**
 * Mega Menu (for desktop dropdowns)
 */
function initMegaMenu() {
  const navItems = document.querySelectorAll('.nav-item.has-dropdown');
  
  navItems.forEach(item => {
    const dropdown = item.querySelector('.dropdown-menu');
    if (!dropdown) return;
    
    // Handle hover for desktop
    item.addEventListener('mouseenter', function() {
      if (window.innerWidth > 1024) {
        dropdown.style.opacity = '1';
        dropdown.style.visibility = 'visible';
        dropdown.style.transform = 'translateY(0)';
      }
    });
    
    item.addEventListener('mouseleave', function() {
      if (window.innerWidth > 1024) {
        dropdown.style.opacity = '';
        dropdown.style.visibility = '';
        dropdown.style.transform = '';
      }
    });
    
    // Handle click for touch devices
    const link = item.querySelector('.nav-link');
    if (link) {
      link.addEventListener('click', function(e) {
        if (window.innerWidth <= 1024) {
          e.preventDefault();
          dropdown.classList.toggle('active');
        }
      });
    }
  });
}

/**
 * Mobile Menu Accordion
 */
function initMobileAccordion() {
  const accordionToggles = document.querySelectorAll('.mobile-accordion-toggle');
  
  accordionToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      const content = this.nextElementSibling;
      const isActive = this.classList.contains('active');
      
      // Close all other accordions
      accordionToggles.forEach(otherToggle => {
        if (otherToggle !== toggle) {
          otherToggle.classList.remove('active');
          otherToggle.nextElementSibling?.classList.remove('active');
        }
      });
      
      // Toggle current
      this.classList.toggle('active');
      if (content) {
        content.classList.toggle('active');
      }
    });
  });
}

/**
 * Navigation Search
 */
function initNavSearch() {
  const searchToggle = document.querySelector('.search-toggle');
  const searchOverlay = document.querySelector('.search-overlay');
  const searchClose = document.querySelector('.search-close');
  const searchInput = document.querySelector('.search-overlay-input');
  
  if (!searchToggle || !searchOverlay) return;
  
  searchToggle.addEventListener('click', function() {
    searchOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => searchInput?.focus(), 100);
  });
  
  const closeSearch = () => {
    searchOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };
  
  if (searchClose) {
    searchClose.addEventListener('click', closeSearch);
  }
  
  // Close on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
      closeSearch();
    }
  });
  
  // Close on backdrop click
  searchOverlay.addEventListener('click', function(e) {
    if (e.target === searchOverlay) {
      closeSearch();
    }
  });
}

/**
 * Breadcrumb Navigation
 */
function initBreadcrumbs() {
  const breadcrumbs = document.querySelector('.breadcrumbs');
  if (!breadcrumbs) return;
  
  const breadcrumbLinks = breadcrumbs.querySelectorAll('a');
  
  breadcrumbLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Add loading state if needed
      this.classList.add('loading');
    });
  });
}

/**
 * Scroll to Section from URL Hash
 */
function scrollToHash() {
  const hash = window.location.hash;
  if (hash) {
    const target = document.querySelector(hash);
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  }
}

// Run on page load
scrollToHash();

// Run on hash change
window.addEventListener('hashchange', scrollToHash);
