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

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
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
  if (acceptBtn) acceptBtn.addEventListener('click', () => { localStorage.setItem('cookieConsent', 'accepted'); cookieBanner.classList.remove('active'); });
  if (declineBtn) declineBtn.addEventListener('click', () => { localStorage.setItem('cookieConsent', 'declined'); cookieBanner.classList.remove('active'); });
}

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
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  animatedElements.forEach(el => observer.observe(el));
}

const LANG_KEY = 'amazonShippingLanguage';
const COUNTRY_KEY = 'amazonShippingCountry';

const nonAfricanCountries = [
  'Afghanistan','Albania','Andorra','Antigua and Barbuda','Argentina','Armenia','Australia','Austria','Azerbaijan','Bahamas','Bahrain','Bangladesh','Barbados','Belarus','Belgium','Belize','Bhutan','Bolivia','Bosnia and Herzegovina','Brazil','Brunei','Bulgaria','Canada','Chile','China','Colombia','Costa Rica','Croatia','Cuba','Cyprus','Czech Republic','Denmark','Dominica','Dominican Republic','Ecuador','El Salvador','Estonia','Fiji','Finland','France','Georgia','Germany','Greece','Grenada','Guatemala','Guyana','Haiti','Honduras','Hungary','Iceland','India','Indonesia','Iran','Iraq','Ireland','Israel','Italy','Jamaica','Japan','Jordan','Kazakhstan','Kiribati','Kuwait','Kyrgyzstan','Laos','Latvia','Lebanon','Liechtenstein','Lithuania','Luxembourg','Madagascar?','Malta','Marshall Islands','Mexico','Micronesia','Moldova','Monaco','Mongolia','Montenegro','Myanmar','Nauru','Nepal','Netherlands','New Zealand','Nicaragua','North Korea','North Macedonia','Norway','Oman','Pakistan','Palau','Panama','Papua New Guinea','Paraguay','Peru','Philippines','Poland','Portugal','Qatar','Romania','Russia','Saint Kitts and Nevis','Saint Lucia','Saint Vincent and the Grenadines','Samoa','San Marino','Saudi Arabia','Serbia','Singapore','Slovakia','Slovenia','Solomon Islands','South Korea','Spain','Sri Lanka','Suriname','Sweden','Switzerland','Syria','Taiwan','Tajikistan','Thailand','Timor-Leste','Tonga','Trinidad and Tobago','Turkey','Turkmenistan','Tuvalu','Ukraine','United Arab Emirates','United Kingdom','United States','Uruguay','Uzbekistan','Vanuatu','Vatican City','Venezuela','Vietnam','Yemen'
].filter(c => c !== 'Madagascar?');

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
    countryLabel: 'Country', languageLabel: 'Language', continueButton: 'Continue', changePreferences: 'Change language',
    help: 'Help', login: 'Login', getStarted: 'Get started', createAccount: 'Create account', trackPackage: 'Track your package',
    heroTitle: 'Package delivery your customers will love.', heroSubtitle: 'Trusted 2-5 day ground shipping for orders placed on your website and other sales channels.',
    growBrand: 'Help grow your brand with Amazon Shipping.', helpCenter: 'Help Center', getHelp: '💬 Get Help', howCanWeHelp: 'How can we help you today?', emailSupport: 'Email support', customsHelp: 'Customs clearance help',
    trackingHeroTitle: '<span class="tracking-hero-title-accent">Amazon Shipping</span><br>package delivery.', trackingHeroSubtitle: 'Enter your tracking ID to follow your package's journey from a seller to your door.', trackingInputPlaceholder: 'Enter tracking ID', track: 'Track', howItWorks: 'How it works', faqs: 'FAQs', faqWhere: "Where's my package?", faqMissing: 'Why is my tracking information missing?', faqNotDelivered: 'Why was my package not delivered?',
    copyright: '© 1996-2026, Amazon.com, Inc. or its affiliates. All rights reserved.', siteTerms: 'Site terms', privacyNotice: 'Privacy notice',
    loadingTracking: 'Loading tracking details...', enterTrackingId: 'Please enter a tracking ID.', trackingUnavailable: 'Tracking unavailable', shipmentNotFound: 'Shipment not found.', connectionProblem: 'Connection problem', connectionProblemText: 'The tracking service could not be reached right now. Please wait a few seconds and try again.', trackingResult: 'Tracking Result', trackingSub: 'Your shipment is moving through the delivery network.', trackingIdLabel: 'Tracking ID', goodsLabel: 'Goods', goodsTypeLabel: 'Goods Type', currentLocationLabel: 'Current Location', originLabel: 'Origin', destinationLabel: 'Destination', customsStatusLabel: 'Customs Status', estimatedDeliveryLabel: 'Estimated Delivery', currentShippingProgress: 'Current Shipping progress', autoUpdateNote: 'Auto-updating tracking status every 30 seconds.', liveGlobalAirRoute: 'Live Global Air Route', customsClearanceUpdate: 'Customs Clearance Update', customsInformation: 'Customs Clearance Information', customsText1: 'This shipment is currently going through customs processing. Depending on destination requirements, the receiver may need to complete customs clearance steps and pay any applicable official duties, taxes, or charges before final release for delivery.', customsText2: 'Clearance requirements vary by country and shipment type. Please monitor the shipment status and ensure the recipient is ready to respond if customs payment is requested.', customsSupportTitle: 'Customs Clearance Support', customsSupportText: 'For customs clearance assistance, required documents, or shipment guidance, contact:', customsSupportNote: 'Support can provide clearance guidance. Pay customs only through official channels.', detailedTimeline: 'Detailed Shipment Timeline'
  },
  fr: { languagePreferenceTitle: 'Choisissez vos préférences', languagePreferenceText: 'Sélectionnez votre pays et votre langue préférée.', countryLabel: 'Pays', languageLabel: 'Langue', continueButton: 'Continuer', changePreferences: 'Changer la langue', help: 'Aide', login: 'Connexion', getStarted: 'Commencer', createAccount: 'Créer un compte', trackPackage: 'Suivre votre colis', heroTitle: 'Une livraison que vos clients vont adorer.', heroSubtitle: 'Expédition terrestre fiable en 2 à 5 jours pour les commandes passées sur votre site et vos autres canaux de vente.', growBrand: 'Développez votre marque avec Amazon Shipping.', helpCenter: 'Centre d'aide', getHelp: '💬 Obtenir de l'aide', howCanWeHelp: 'Comment pouvons-nous vous aider ?', emailSupport: 'Assistance e-mail', customsHelp: 'Aide au dédouanement', trackingHeroTitle: '<span class="tracking-hero-title-accent">Amazon Shipping</span><br>livraison de colis.', trackingHeroSubtitle: 'Entrez votre numéro de suivi pour suivre le parcours de votre colis du vendeur jusqu'à votre porte.', trackingInputPlaceholder: 'Entrez le numéro de suivi', track: 'Suivre', howItWorks: 'Comment ça marche', faqs: 'FAQ', faqWhere: 'Où est mon colis ?', faqMissing: 'Pourquoi mes informations de suivi manquent-elles ?', faqNotDelivered: 'Pourquoi mon colis n'a-t-il pas été livré ?', copyright: '© 1996-2026, Amazon.com, Inc. ou ses sociétés affiliées. Tous droits réservés.', siteTerms: 'Conditions du site', privacyNotice: 'Politique de confidentialité', loadingTracking: 'Chargement du suivi...', enterTrackingId: 'Veuillez saisir un numéro de suivi.', trackingUnavailable: 'Suivi indisponible', shipmentNotFound: 'Colis introuvable.', connectionProblem: 'Problème de connexion', connectionProblemText: 'Le service de suivi est momentanément indisponible. Réessayez dans quelques secondes.', trackingResult: 'Résultat du suivi', trackingSub: 'Votre envoi progresse dans le réseau de livraison.', trackingIdLabel: 'Numéro de suivi', goodsLabel: 'Marchandise', goodsTypeLabel: 'Type de marchandise', currentLocationLabel: 'Position actuelle', originLabel: 'Origine', destinationLabel: 'Destination', customsStatusLabel: 'Statut douanier', estimatedDeliveryLabel: 'Livraison estimée', currentShippingProgress: 'Progression actuelle', autoUpdateNote: 'Mise à jour automatique toutes les 30 secondes.', liveGlobalAirRoute: 'Itinéraire aérien mondial en direct', customsClearanceUpdate: 'Mise à jour du dédouanement', customsInformation: 'Informations sur le dédouanement', customsText1: 'Cet envoi est actuellement en cours de traitement douanier.', customsText2: 'Les exigences varient selon le pays et le type d'envoi.', customsSupportTitle: 'Assistance au dédouanement', customsSupportText: 'Pour l'assistance douanière, contactez :', customsSupportNote: 'Payez uniquement via les canaux officiels.', detailedTimeline: 'Chronologie détaillée' },
  es: { languagePreferenceTitle: 'Elige tus preferencias', languagePreferenceText: 'Selecciona tu país y tu idioma preferido.', countryLabel: 'País', languageLabel: 'Idioma', continueButton: 'Continuar', changePreferences: 'Cambiar idioma', help: 'Ayuda', login: 'Iniciar sesión', getStarted: 'Comenzar', createAccount: 'Crear cuenta', trackPackage: 'Rastrear paquete', heroTitle: 'La entrega que tus clientes amarán.', heroSubtitle: 'Envío terrestre confiable de 2 a 5 días para pedidos realizados en tu sitio web y otros canales.', growBrand: 'Haz crecer tu marca con Amazon Shipping.', helpCenter: 'Centro de ayuda', getHelp: '💬 Obtener ayuda', howCanWeHelp: '¿Cómo podemos ayudarte?', emailSupport: 'Soporte por correo', customsHelp: 'Ayuda de aduanas', trackingHeroTitle: '<span class="tracking-hero-title-accent">Amazon Shipping</span><br>entrega de paquetes.', trackingHeroSubtitle: 'Introduce tu código para seguir el recorrido de tu paquete.', trackingInputPlaceholder: 'Introduce el código', track: 'Rastrear', howItWorks: 'Cómo funciona', faqs: 'Preguntas frecuentes', faqWhere: '¿Dónde está mi paquete?', faqMissing: '¿Por qué falta mi información de seguimiento?', faqNotDelivered: '¿Por qué no se entregó mi paquete?', copyright: '© 1996-2026, Amazon.com, Inc. o sus afiliadas. Todos los derechos reservados.', siteTerms: 'Términos del sitio', privacyNotice: 'Aviso de privacidad', loadingTracking: 'Cargando seguimiento...', enterTrackingId: 'Introduce un código de seguimiento.', trackingUnavailable: 'Seguimiento no disponible', shipmentNotFound: 'Envío no encontrado.', connectionProblem: 'Problema de conexión', connectionProblemText: 'El servicio de seguimiento no está disponible en este momento.', trackingResult: 'Resultado del seguimiento', trackingSub: 'Tu envío se está moviendo por la red de entrega.', trackingIdLabel: 'Código', goodsLabel: 'Artículo', goodsTypeLabel: 'Tipo', currentLocationLabel: 'Ubicación actual', originLabel: 'Origen', destinationLabel: 'Destino', customsStatusLabel: 'Estado aduanero', estimatedDeliveryLabel: 'Entrega estimada', currentShippingProgress: 'Progreso actual', autoUpdateNote: 'Actualización automática cada 30 segundos.', liveGlobalAirRoute: 'Ruta aérea global en vivo', customsClearanceUpdate: 'Actualización de aduanas', customsInformation: 'Información de aduanas', customsText1: 'Este envío está pasando por el procesamiento aduanero.', customsText2: 'Los requisitos varían según el país y el tipo de envío.', customsSupportTitle: 'Soporte de aduanas', customsSupportText: 'Para ayuda con aduanas, contacte a:', customsSupportNote: 'Pague solo por canales oficiales.', detailedTimeline: 'Cronología detallada' },
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

function i18nGet(key) {
  const lang = localStorage.getItem(LANG_KEY) || 'en';
  const t = getTranslations(lang);
  return t[key] || translations.en[key] || key;
}
window.i18nGet = i18nGet;

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
  const changeBtn = document.getElementById('language-pref-toggle');
  if (changeBtn) changeBtn.textContent = t.changePreferences || 'Change language';
  const countryLabel = document.querySelector('.country-selector .country-name');
  const savedCountry = localStorage.getItem(COUNTRY_KEY);
  if (countryLabel && savedCountry) countryLabel.textContent = savedCountry;
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
    clearTimeout(timeout); timeout = setTimeout(later, wait);
  };
}
function throttle(func, limit) { let inThrottle; return function(...args) { if (!inThrottle) { func.apply(this, args); inThrottle = true; setTimeout(() => inThrottle = false, limit); } }; }
function formatDate(date, options = {}) { const defaultOptions = { year: 'numeric', month: 'long', day: 'numeric' }; return new Date(date).toLocaleDateString('en-US', { ...defaultOptions, ...options }); }
function isValidEmail(email) { const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; return re.test(email); }
function showNotification(message, type = 'info', duration = 3000) { const notification = document.createElement('div'); notification.className = `notification notification-${type}`; notification.textContent = message; document.body.appendChild(notification); requestAnimationFrame(() => notification.classList.add('show')); setTimeout(() => { notification.classList.remove('show'); setTimeout(() => notification.remove(), 300); }, duration); }
function ajaxRequest(url, options = {}) { const defaultOptions = { method: 'GET', headers: { 'Content-Type': 'application/json' } }; return fetch(url, { ...defaultOptions, ...options }).then(response => { if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`); return response.json(); }); }
window.AmazonShipping = { debounce, throttle, formatDate, isValidEmail, showNotification, ajaxRequest };
