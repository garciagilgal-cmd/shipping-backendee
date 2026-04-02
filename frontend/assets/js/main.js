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
  initLanguagePreferences();
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


/**
 * Country and Language Preferences
 */
function initLanguagePreferences() {
  const translations = {
    en: {
      common: {
        help: 'Help',
        login: 'Login',
        signIn: 'Sign in',
        createAccount: 'Create account',
        getStarted: 'Get started',
        trackPackage: 'Track your package'
      },
      nav: {
        about: 'About us',
        features: 'Features',
        business: 'Business size',
        integrations: 'Integrations',
        resources: 'Resources'
      },
      home: {
        heroTitle: 'Package delivery your customers will love.',
        heroSubtitle: 'Trusted 2-5 day ground shipping for orders placed on your website and other sales channels.',
        intro: "Transform your brand with help from Amazon's delivery network. Gain a new kind of advantage—one that streamlines your business operations and delivers exceptional experiences for your customers."
      },
      tracking: {
        heroTitleAccent: 'Amazon Shipping',
        heroTitleSuffix: 'package delivery.',
        heroSubtitle: "Enter your tracking ID to follow your package's journey from a seller to your door.",
        trackButton: 'Track',
        resultTitle: 'Tracking Result',
        resultSub: 'Your shipment is moving through the delivery network.',
        progressTitle: 'Current Shipping progress',
        autoUpdate: 'Auto-updating tracking status every 30 seconds.',
        mapTitle: 'Live Global Air Route',
        routeProgress: 'Air Route Progress',
        routeProgressText: 'This shipment is moving along an international air route. The aircraft indicator circles the world map to visually represent active movement toward the destination.',
        currentStage: 'Current Stage',
        timelineTitle: 'Detailed Shipment Timeline'
      },
      modal: {
        title: 'Choose your preferences',
        text: 'Select your country and preferred language to personalize the site.',
        country: 'Country',
        language: 'Language',
        continueBtn: 'Continue'
      }
    },
    fr: {
      common: {
        help: 'Aide', login: 'Connexion', signIn: 'Se connecter', createAccount: 'Créer un compte', getStarted: 'Commencer', trackPackage: 'Suivre votre colis'
      },
      nav: { about: 'À propos', features: 'Fonctionnalités', business: 'Taille de l’entreprise', integrations: 'Intégrations', resources: 'Ressources' },
      home: {
        heroTitle: 'Une livraison que vos clients vont adorer.',
        heroSubtitle: 'Livraison terrestre fiable en 2 à 5 jours pour les commandes passées sur votre site et d’autres canaux.',
        intro: 'Transformez votre marque grâce au réseau de livraison Amazon. Gagnez un nouvel avantage qui simplifie vos opérations et offre une excellente expérience à vos clients.'
      },
      tracking: {
        heroTitleAccent: 'Amazon Shipping', heroTitleSuffix: 'livraison de colis.', heroSubtitle: 'Entrez votre numéro de suivi pour suivre le parcours de votre colis du vendeur jusqu’à votre porte.', trackButton: 'Suivre', resultTitle: 'Résultat du suivi', resultSub: 'Votre envoi progresse dans le réseau de livraison.', progressTitle: 'Progression actuelle', autoUpdate: 'Mise à jour automatique du suivi toutes les 30 secondes.', mapTitle: 'Itinéraire aérien mondial en direct', routeProgress: 'Progression du trajet', routeProgressText: 'Cet envoi suit un trajet aérien international. L’indicateur d’avion représente visuellement son mouvement vers la destination.', currentStage: 'Étape actuelle', timelineTitle: 'Historique détaillé de l’envoi'
      },
      modal: { title: 'Choisissez vos préférences', text: 'Sélectionnez votre pays et votre langue pour personnaliser le site.', country: 'Pays', language: 'Langue', continueBtn: 'Continuer' }
    },
    es: {
      common: {
        help: 'Ayuda', login: 'Iniciar sesión', signIn: 'Entrar', createAccount: 'Crear cuenta', getStarted: 'Comenzar', trackPackage: 'Rastrear tu paquete'
      },
      nav: { about: 'Sobre nosotros', features: 'Funciones', business: 'Tamaño del negocio', integrations: 'Integraciones', resources: 'Recursos' },
      home: {
        heroTitle: 'Entrega de paquetes que tus clientes van a amar.',
        heroSubtitle: 'Envío terrestre confiable de 2 a 5 días para pedidos realizados en tu sitio web y otros canales.',
        intro: 'Transforma tu marca con la ayuda de la red de entrega de Amazon. Obtén una ventaja que simplifica tus operaciones y ofrece experiencias excepcionales a tus clientes.'
      },
      tracking: {
        heroTitleAccent: 'Amazon Shipping', heroTitleSuffix: 'entrega de paquetes.', heroSubtitle: 'Introduce tu número de seguimiento para seguir el recorrido de tu paquete desde el vendedor hasta tu puerta.', trackButton: 'Rastrear', resultTitle: 'Resultado del seguimiento', resultSub: 'Tu envío se está moviendo por la red de entrega.', progressTitle: 'Progreso actual del envío', autoUpdate: 'Actualización automática del estado cada 30 segundos.', mapTitle: 'Ruta aérea global en vivo', routeProgress: 'Progreso de la ruta', routeProgressText: 'Este envío se mueve por una ruta aérea internacional. El avión representa visualmente el movimiento hacia el destino.', currentStage: 'Etapa actual', timelineTitle: 'Cronología detallada del envío'
      },
      modal: { title: 'Elige tus preferencias', text: 'Selecciona tu país y tu idioma para personalizar el sitio.', country: 'País', language: 'Idioma', continueBtn: 'Continuar' }
    }
  };

  const countries = [
    { code: 'US', label: 'United States' },
    { code: 'NG', label: 'Nigeria' },
    { code: 'UK', label: 'United Kingdom' },
    { code: 'FR', label: 'France' },
    { code: 'ES', label: 'Spain' }
  ];

  function get(obj, path) {
    return path.split('.').reduce((acc, key) => acc && acc[key], obj);
  }

  function applyLanguage(lang) {
    const dictionary = translations[lang] || translations.en;
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const value = get(dictionary, el.dataset.i18n);
      if (value) el.textContent = value;
    });
  }

  function applyCountry(country) {
    const countryName = document.querySelector('.country-selector-btn .country-name');
    if (countryName) countryName.textContent = country;
    document.body.dataset.country = country;
  }

  window.applyStoredLanguagePreferences = function() {
    const lang = localStorage.getItem('siteLanguage') || 'en';
    const country = localStorage.getItem('siteCountry') || 'US';
    applyLanguage(lang);
    applyCountry(country);
  };

  const modal = document.createElement('div');
  modal.className = 'site-pref-modal';
  modal.innerHTML = `
    <div class="site-pref-modal__card">
      <h2 class="site-pref-modal__title"></h2>
      <p class="site-pref-modal__text"></p>
      <label class="site-pref-modal__label" for="site-country-select"></label>
      <select id="site-country-select" class="site-pref-modal__input">
        ${countries.map(c => `<option value="${c.code}">${c.label}</option>`).join('')}
      </select>
      <label class="site-pref-modal__label" for="site-language-select"></label>
      <select id="site-language-select" class="site-pref-modal__input">
        <option value="en">English</option>
        <option value="fr">Français</option>
        <option value="es">Español</option>
      </select>
      <button type="button" class="site-pref-modal__button"></button>
    </div>`;

  const style = document.createElement('style');
  style.textContent = `
    .site-pref-modal{position:fixed;inset:0;background:rgba(15,23,42,.55);display:none;align-items:center;justify-content:center;z-index:99999;padding:20px}.site-pref-modal.is-open{display:flex}.site-pref-modal__card{width:min(460px,100%);background:#fff;border-radius:18px;padding:24px;box-shadow:0 20px 60px rgba(0,0,0,.22)}.site-pref-modal__title{margin:0 0 8px;font-size:28px}.site-pref-modal__text{margin:0 0 18px;color:#64748b;line-height:1.6}.site-pref-modal__label{display:block;margin:14px 0 6px;font-weight:700}.site-pref-modal__input{width:100%;padding:12px 14px;border:1px solid #d1d5db;border-radius:12px;font-size:16px}.site-pref-modal__button{width:100%;margin-top:18px;padding:14px 16px;border:none;border-radius:14px;background:#0073bb;color:#fff;font-size:16px;font-weight:700;cursor:pointer}
  `;
  document.head.appendChild(style);
  document.body.appendChild(modal);

  const title = modal.querySelector('.site-pref-modal__title');
  const text = modal.querySelector('.site-pref-modal__text');
  const countryLabel = modal.querySelectorAll('.site-pref-modal__label')[0];
  const languageLabel = modal.querySelectorAll('.site-pref-modal__label')[1];
  const countrySelect = modal.querySelector('#site-country-select');
  const languageSelect = modal.querySelector('#site-language-select');
  const continueButton = modal.querySelector('.site-pref-modal__button');

  function renderModalText(lang) {
    const dictionary = translations[lang] || translations.en;
    title.textContent = dictionary.modal.title;
    text.textContent = dictionary.modal.text;
    countryLabel.textContent = dictionary.modal.country;
    languageLabel.textContent = dictionary.modal.language;
    continueButton.textContent = dictionary.modal.continueBtn;
  }

  languageSelect.addEventListener('change', () => renderModalText(languageSelect.value));

  continueButton.addEventListener('click', () => {
    localStorage.setItem('siteCountry', countrySelect.value);
    localStorage.setItem('siteLanguage', languageSelect.value);
    modal.classList.remove('is-open');
    applyLanguage(languageSelect.value);
    applyCountry(countrySelect.value);
  });

  document.querySelectorAll('.country-option').forEach((option) => {
    option.addEventListener('click', (event) => {
      event.preventDefault();
      const code = option.dataset.country;
      localStorage.setItem('siteCountry', code);
      applyCountry(code);
    });
  });

  const savedLang = localStorage.getItem('siteLanguage');
  const savedCountry = localStorage.getItem('siteCountry');
  if (!savedLang || !savedCountry) {
    renderModalText('en');
    modal.classList.add('is-open');
  } else {
    languageSelect.value = savedLang;
    countrySelect.value = savedCountry;
    window.applyStoredLanguagePreferences();
  }
}
