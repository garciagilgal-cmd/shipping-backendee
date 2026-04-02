
/**
 * Amazon Shipping Replica - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
  initMobileMenu();
  initDropdowns();
  initSmoothScroll();
  initCookieBanner();
  initAnimations();
  initLanguagePreferences();
});

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

  mobileMenu.addEventListener('click', function(e) {
    if (e.target === mobileMenu) {
      menuToggle.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

function initDropdowns() {
  document.querySelectorAll('.mobile-dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', function() {
      const dropdown = this.nextElementSibling;
      if (!dropdown) return;
      this.classList.toggle('active');
      dropdown.classList.toggle('active');
    });
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

function initCookieBanner() {
  const cookieBanner = document.querySelector('.cookie-banner');
  const acceptBtn = document.querySelector('.cookie-btn-primary');
  const declineBtn = document.querySelector('.cookie-btn-secondary');
  if (!cookieBanner) return;

  const cookieChoice = localStorage.getItem('cookieConsent');
  if (!cookieChoice) {
    setTimeout(() => cookieBanner.classList.add('active'), 1000);
  }
  if (acceptBtn) acceptBtn.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'accepted');
    cookieBanner.classList.remove('active');
  });
  if (declineBtn) declineBtn.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'declined');
    cookieBanner.classList.remove('active');
  });
}

function initAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  if (!animatedElements.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  animatedElements.forEach(el => observer.observe(el));
}

const LANG_KEY = 'amazonShippingLanguage';
const COUNTRY_KEY = 'amazonShippingCountry';

const nonAfricanCountries = [
  'Afghanistan','Albania','Andorra','Antigua and Barbuda','Argentina','Armenia','Australia','Austria','Azerbaijan','Bahamas','Bahrain','Bangladesh','Barbados','Belarus','Belgium','Belize','Bhutan','Bolivia','Bosnia and Herzegovina','Brazil','Brunei','Bulgaria','Canada','Chile','China','Colombia','Costa Rica','Croatia','Cuba','Cyprus','Czech Republic','Denmark','Dominica','Dominican Republic','Ecuador','El Salvador','Estonia','Fiji','Finland','France','Georgia','Germany','Greece','Grenada','Guatemala','Guyana','Haiti','Honduras','Hungary','Iceland','India','Indonesia','Iran','Iraq','Ireland','Israel','Italy','Jamaica','Japan','Jordan','Kazakhstan','Kiribati','Kuwait','Kyrgyzstan','Laos','Latvia','Lebanon','Liechtenstein','Lithuania','Luxembourg','Malta','Marshall Islands','Mexico','Micronesia','Moldova','Monaco','Mongolia','Montenegro','Myanmar','Nauru','Nepal','Netherlands','New Zealand','Nicaragua','North Korea','North Macedonia','Norway','Oman','Pakistan','Palau','Panama','Papua New Guinea','Paraguay','Peru','Philippines','Poland','Portugal','Qatar','Romania','Russia','Saint Kitts and Nevis','Saint Lucia','Saint Vincent and the Grenadines','Samoa','San Marino','Saudi Arabia','Serbia','Singapore','Slovakia','Slovenia','Solomon Islands','South Korea','Spain','Sri Lanka','Suriname','Sweden','Switzerland','Syria','Taiwan','Tajikistan','Thailand','Timor-Leste','Tonga','Trinidad and Tobago','Turkey','Turkmenistan','Tuvalu','Ukraine','United Arab Emirates','United Kingdom','United States','Uruguay','Uzbekistan','Vanuatu','Vatican City','Venezuela','Vietnam','Yemen'
];

const languageOptions = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'es', name: 'Español' },
  { code: 'de', name: 'Deutsch' },
  { code: 'it', name: 'Italiano' },
  { code: 'pt', name: 'Português' },
  { code: 'ru', name: 'Русский' },
  { code: 'ar', name: 'العربية' },
  { code: 'zh', name: '中文' },
  { code: 'ja', name: '日本語' }
];

const translations = {
  en: {
    languagePreferenceTitle: 'Choose your preferences',
    languagePreferenceText: 'Select your country and preferred language.',
    countryLabel: 'Country',
    languageLabel: 'Language',
    continueButton: 'Continue',
    changePreferences: 'Change language',
    getStarted: 'Get started',
    createAccount: 'Create account',
    heroTitle: 'Package delivery your customers will love.',
    trackingHeroTitle: '<span class="tracking-hero-title-accent">Amazon Shipping</span><br>package delivery.',
    trackingHeroSubtitle: "Enter your tracking ID to follow your package's journey from a seller to your door.",
    trackingInputPlaceholder: 'Enter tracking ID',
    track: 'Track',
    howItWorks: 'How it works',
    faqs: 'FAQs',
    faqWhere: "Where's my package?",
    faqMissing: 'Why is my tracking information missing?',
    faqNotDelivered: 'Why was my package not delivered?',
    copyright: '© 1996-2026, Amazon.com, Inc. or its affiliates. All rights reserved.',
    siteTerms: 'Site terms',
    privacyNotice: 'Privacy notice',
    trackPackage: 'Track your package',
    helpCenter: 'Help center',
    emailSupport: 'Email support',
    customsHelp: 'Customs clearance help',
    getHelp: '💬 Get Help',
    howCanWeHelp: 'How can we help you today?'
  },
  fr: {
    languagePreferenceTitle: 'Choisissez vos préférences', languagePreferenceText: 'Sélectionnez votre pays et votre langue préférée.', countryLabel: 'Pays', languageLabel: 'Langue', continueButton: 'Continuer', changePreferences: 'Changer la langue', getStarted: 'Commencer', createAccount: 'Créer un compte', heroTitle: 'Une livraison que vos clients vont adorer.', trackingHeroTitle: '<span class="tracking-hero-title-accent">Amazon Shipping</span><br>livraison de colis.', trackingHeroSubtitle: "Entrez votre numéro de suivi pour suivre le parcours de votre colis du vendeur jusqu'à votre porte.", trackingInputPlaceholder: 'Entrez le numéro de suivi', track: 'Suivre', howItWorks: 'Comment ça marche', faqs: 'FAQ', faqWhere: 'Où est mon colis ?', faqMissing: 'Pourquoi mes informations de suivi manquent-elles ?', faqNotDelivered: "Pourquoi mon colis n'a-t-il pas été livré ?", copyright: '© 1996-2026, Amazon.com, Inc. ou ses sociétés affiliées. Tous droits réservés.', siteTerms: 'Conditions du site', privacyNotice: 'Politique de confidentialité', trackPackage: 'Suivre votre colis', helpCenter: "Centre d'aide", emailSupport: 'Assistance e-mail', customsHelp: 'Aide au dédouanement', getHelp: '💬 Obtenir de l’aide', howCanWeHelp: 'Comment pouvons-nous vous aider ?'
  },
  es: {
    languagePreferenceTitle: 'Elige tus preferencias', languagePreferenceText: 'Selecciona tu país y tu idioma preferido.', countryLabel: 'País', languageLabel: 'Idioma', continueButton: 'Continuar', changePreferences: 'Cambiar idioma', getStarted: 'Comenzar', createAccount: 'Crear cuenta', heroTitle: 'La entrega que tus clientes amarán.', trackingHeroTitle: '<span class="tracking-hero-title-accent">Amazon Shipping</span><br>entrega de paquetes.', trackingHeroSubtitle: 'Introduce tu código para seguir el recorrido de tu paquete.', trackingInputPlaceholder: 'Introduce el código', track: 'Rastrear', howItWorks: 'Cómo funciona', faqs: 'Preguntas frecuentes', faqWhere: '¿Dónde está mi paquete?', faqMissing: '¿Por qué falta mi información de seguimiento?', faqNotDelivered: '¿Por qué no se entregó mi paquete?', copyright: '© 1996-2026, Amazon.com, Inc. o sus afiliadas. Todos los derechos reservados.', siteTerms: 'Términos del sitio', privacyNotice: 'Aviso de privacidad', trackPackage: 'Rastrear paquete', helpCenter: 'Centro de ayuda', emailSupport: 'Soporte por correo', customsHelp: 'Ayuda de aduanas', getHelp: '💬 Obtener ayuda', howCanWeHelp: '¿Cómo podemos ayudarte?'
  },
  de: { languagePreferenceTitle: 'Wählen Sie Ihre Einstellungen', languagePreferenceText: 'Wählen Sie Land und Sprache.', countryLabel: 'Land', languageLabel: 'Sprache', continueButton: 'Weiter', changePreferences: 'Sprache ändern' },
  it: { languagePreferenceTitle: 'Scegli le tue preferenze', languagePreferenceText: 'Seleziona paese e lingua.', countryLabel: 'Paese', languageLabel: 'Lingua', continueButton: 'Continua', changePreferences: 'Cambia lingua' },
  pt: { languagePreferenceTitle: 'Escolha suas preferências', languagePreferenceText: 'Selecione seu país e idioma.', countryLabel: 'País', languageLabel: 'Idioma', continueButton: 'Continuar', changePreferences: 'Mudar idioma' },
  ru: { languagePreferenceTitle: 'Выберите настройки', languagePreferenceText: 'Выберите страну и язык.', countryLabel: 'Страна', languageLabel: 'Язык', continueButton: 'Продолжить', changePreferences: 'Изменить язык' },
  ar: { languagePreferenceTitle: 'اختر تفضيلاتك', languagePreferenceText: 'اختر البلد واللغة المفضلة.', countryLabel: 'البلد', languageLabel: 'اللغة', continueButton: 'متابعة', changePreferences: 'تغيير اللغة' },
  zh: { languagePreferenceTitle: '选择您的偏好', languagePreferenceText: '请选择国家和语言。', countryLabel: '国家', languageLabel: '语言', continueButton: '继续', changePreferences: '更改语言' },
  ja: { languagePreferenceTitle: '設定を選択してください', languagePreferenceText: '国と言語を選択してください。', countryLabel: '国', languageLabel: '言語', continueButton: '続行', changePreferences: '言語を変更' }
};

function getTranslations(lang) {
  return { ...translations.en, ...(translations[lang] || {}) };
}

function applyTranslations(lang) {
  const t = getTranslations(lang);
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) el.textContent = t[key];
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (t[key]) el.innerHTML = t[key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (t[key]) el.setAttribute('placeholder', t[key]);
  });
}

function buildLanguageModal() {
  if (document.getElementById('language-pref-modal')) return;
  const savedLang = localStorage.getItem(LANG_KEY) || 'en';
  const t = getTranslations(savedLang);
  const modal = document.createElement('div');
  modal.id = 'language-pref-modal';
  modal.innerHTML = `
    <div class="lang-pref-backdrop"></div>
    <div class="lang-pref-dialog" role="dialog" aria-modal="true" aria-labelledby="lang-pref-title">
      <button type="button" id="language-pref-toggle" class="lang-pref-toggle-btn">${t.changePreferences || 'Change language'}</button>
      <div class="lang-pref-card">
        <h2 id="lang-pref-title">${t.languagePreferenceTitle}</h2>
        <p>${t.languagePreferenceText}</p>
        <label for="language-pref-country">${t.countryLabel}</label>
        <select id="language-pref-country">${nonAfricanCountries.map(c => `<option value="${c}">${c}</option>`).join('')}</select>
        <label for="language-pref-language">${t.languageLabel}</label>
        <select id="language-pref-language">${languageOptions.map(l => `<option value="${l.code}">${l.name}</option>`).join('')}</select>
        <div class="lang-pref-actions">
          <button type="button" id="language-pref-save">${t.continueButton}</button>
        </div>
      </div>
    </div>`;
  document.body.appendChild(modal);

  const style = document.createElement('style');
  style.textContent = `
    #language-pref-modal { position: fixed; inset: 0; z-index: 100000; display: none; }
    #language-pref-modal.show { display: block; }
    .lang-pref-backdrop { position:absolute; inset:0; background: rgba(15,23,42,0.55); }
    .lang-pref-dialog { position:relative; width:min(92vw, 480px); margin: 8vh auto; }
    .lang-pref-card { background:#fff; border-radius:18px; padding:24px; box-shadow:0 20px 50px rgba(0,0,0,.2); font-family:Arial,sans-serif; }
    .lang-pref-card h2 { margin:0 0 8px; font-size:28px; }
    .lang-pref-card p { margin:0 0 18px; color:#64748b; }
    .lang-pref-card label { display:block; font-weight:700; margin:14px 0 6px; }
    .lang-pref-card select, .lang-pref-card button { width:100%; padding:12px 14px; border-radius:12px; font-size:16px; }
    .lang-pref-card select { border:1px solid #cbd5e1; }
    .lang-pref-card button { border:none; background:#0073bb; color:#fff; font-weight:700; cursor:pointer; }
    .lang-pref-actions { margin-top:18px; }
    .lang-pref-toggle-btn { position:absolute; right:0; top:-54px; background:#fff; border:1px solid #cbd5e1; border-radius:999px; padding:10px 14px; cursor:pointer; }
    @media (max-width: 640px) { .lang-pref-dialog { margin: 6vh auto; } .lang-pref-toggle-btn { top:auto; bottom:-60px; left:50%; right:auto; transform:translateX(-50%); } }
  `;
  document.head.appendChild(style);

  const selectCountry = modal.querySelector('#language-pref-country');
  const selectLanguage = modal.querySelector('#language-pref-language');
  const saveBtn = modal.querySelector('#language-pref-save');
  const toggleBtn = modal.querySelector('#language-pref-toggle');
  const backdrop = modal.querySelector('.lang-pref-backdrop');

  const savedCountry = localStorage.getItem(COUNTRY_KEY) || 'United States';
  selectCountry.value = nonAfricanCountries.includes(savedCountry) ? savedCountry : 'United States';
  selectLanguage.value = savedLang;

  function closeModal() { modal.classList.remove('show'); }
  function openModal() { modal.classList.add('show'); }

  saveBtn.addEventListener('click', () => {
    localStorage.setItem(COUNTRY_KEY, selectCountry.value);
    localStorage.setItem(LANG_KEY, selectLanguage.value);
    applyTranslations(selectLanguage.value);
    closeModal();
  });
  toggleBtn.addEventListener('click', openModal);
  backdrop.addEventListener('click', closeModal);

  if (!localStorage.getItem(LANG_KEY) || !localStorage.getItem(COUNTRY_KEY)) {
    openModal();
  }
}

function initLanguagePreferences() {
  buildLanguageModal();
  applyTranslations(localStorage.getItem(LANG_KEY) || 'en');
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => { clearTimeout(timeout); func(...args); };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

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

function formatDate(date, options = {}) {
  const defaultOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('en-US', { ...defaultOptions, ...options });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showNotification(message, type = 'info', duration = 3000) {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);
  requestAnimationFrame(() => notification.classList.add('show'));
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, duration);
}

function ajaxRequest(url, options = {}) {
  const defaultOptions = { method: 'GET', headers: { 'Content-Type': 'application/json' } };
  return fetch(url, { ...defaultOptions, ...options }).then(response => {
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  });
}

window.AmazonShipping = { debounce, throttle, formatDate, isValidEmail, showNotification, ajaxRequest };
