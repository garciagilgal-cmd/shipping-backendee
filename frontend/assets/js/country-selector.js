/**
 * Country Selector JavaScript
 * Handles country selection and localization
 */

document.addEventListener('DOMContentLoaded', function() {
  initCountrySelector();
  loadCountryData();
});

/**
 * Country Data
 */
const countryData = {
  US: {
    name: 'United States',
    flag: '🇺🇸',
    currency: 'USD',
    language: 'en',
    phoneCode: '+1',
    format: 'en-US'
  },
  UK: {
    name: 'United Kingdom',
    flag: '🇬🇧',
    currency: 'GBP',
    language: 'en',
    phoneCode: '+44',
    format: 'en-GB'
  },
  FR: {
    name: 'France',
    flag: '🇫🇷',
    currency: 'EUR',
    language: 'fr',
    phoneCode: '+33',
    format: 'fr-FR'
  },
  DE: {
    name: 'Germany',
    flag: '🇩🇪',
    currency: 'EUR',
    language: 'de',
    phoneCode: '+49',
    format: 'de-DE'
  },
  IT: {
    name: 'Italy',
    flag: '🇮🇹',
    currency: 'EUR',
    language: 'it',
    phoneCode: '+39',
    format: 'it-IT'
  },
  ES: {
    name: 'Spain',
    flag: '🇪🇸',
    currency: 'EUR',
    language: 'es',
    phoneCode: '+34',
    format: 'es-ES'
  },
  IN: {
    name: 'India',
    flag: '🇮🇳',
    currency: 'INR',
    language: 'en',
    phoneCode: '+91',
    format: 'en-IN'
  },
  CA: {
    name: 'Canada',
    flag: '🇨🇦',
    currency: 'CAD',
    language: 'en',
    phoneCode: '+1',
    format: 'en-CA'
  },
  AU: {
    name: 'Australia',
    flag: '🇦🇺',
    currency: 'AUD',
    language: 'en',
    phoneCode: '+61',
    format: 'en-AU'
  },
  JP: {
    name: 'Japan',
    flag: '🇯🇵',
    currency: 'JPY',
    language: 'ja',
    phoneCode: '+81',
    format: 'ja-JP'
  }
};

/**
 * Initialize Country Selector
 */
function initCountrySelector() {
  const selectors = document.querySelectorAll('.country-selector');
  
  selectors.forEach(selector => {
    const btn = selector.querySelector('.country-selector-btn');
    const dropdown = selector.querySelector('.country-dropdown');
    const options = selector.querySelectorAll('.country-option');
    
    if (!btn) return;
    
    // Toggle dropdown
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      closeAllCountrySelectors();
      selector.classList.toggle('active');
    });
    
    // Handle option selection
    options.forEach(option => {
      option.addEventListener('click', function(e) {
        e.preventDefault();
        
        const countryCode = this.dataset.country;
        selectCountry(selector, countryCode);
      });
    });
  });
  
  // Close dropdowns when clicking outside
  document.addEventListener('click', function() {
    closeAllCountrySelectors();
  });
}

/**
 * Close All Country Selectors
 */
function closeAllCountrySelectors() {
  const selectors = document.querySelectorAll('.country-selector');
  selectors.forEach(selector => {
    selector.classList.remove('active');
  });
}

/**
 * Select Country
 */
function selectCountry(selector, countryCode) {
  const country = countryData[countryCode];
  if (!country) return;
  
  const btn = selector.querySelector('.country-selector-btn');
  const btnFlag = btn.querySelector('.country-flag');
  const btnName = btn.querySelector('.country-name');
  const options = selector.querySelectorAll('.country-option');
  
  // Update button
  if (btnFlag) btnFlag.textContent = country.flag;
  if (btnName) btnName.textContent = countryCode;
  
  // Update active state
  options.forEach(opt => {
    opt.classList.toggle('active', opt.dataset.country === countryCode);
  });
  
  // Close dropdown
  selector.classList.remove('active');
  
  // Store selection
  localStorage.setItem('selectedCountry', countryCode);
  
  // Update page content
  updatePageForCountry(countryCode);
  
  // Dispatch event
  document.dispatchEvent(new CustomEvent('countrySelected', {
    detail: { countryCode, country }
  }));
}

/**
 * Update Page Content for Country
 */
function updatePageForCountry(countryCode) {
  const country = countryData[countryCode];
  if (!country) return;
  
  // Update currency displays
  document.querySelectorAll('[data-currency]').forEach(el => {
    const amount = el.dataset.amount;
    if (amount) {
      el.textContent = formatCurrency(amount, country.currency, country.format);
    }
  });
  
  // Update phone number placeholders
  document.querySelectorAll('[data-phone-placeholder]').forEach(el => {
    el.placeholder = `${country.phoneCode} xxx xxx xxxx`;
  });
  
  // Update date formats
  document.querySelectorAll('[data-date]').forEach(el => {
    const date = el.dataset.date;
    if (date) {
      el.textContent = formatDate(date, country.format);
    }
  });
}

/**
 * Format Currency
 */
function formatCurrency(amount, currency, locale) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency
  }).format(amount);
}

/**
 * Format Date
 */
function formatDate(date, locale) {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date));
}

/**
 * Load Country Data from JSON
 */
function loadCountryData() {
  // Try to load from localStorage first
  const savedCountry = localStorage.getItem('selectedCountry');
  
  if (savedCountry && countryData[savedCountry]) {
    // Apply saved country
    document.querySelectorAll('.country-selector').forEach(selector => {
      selectCountry(selector, savedCountry);
    });
  } else {
    // Try to detect country from browser
    detectCountry();
  }
  
  // Load from JSON file if available
  fetch('data/countries.json')
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Countries data not found');
    })
    .then(data => {
      // Merge with existing data
      Object.assign(countryData, data);
    })
    .catch(error => {
      // Silently fail - use default data
      console.log('Using default country data');
    });
}

/**
 * Detect Country from Browser
 */
function detectCountry() {
  const userLang = navigator.language || navigator.userLanguage;
  const langMap = {
    'en-US': 'US',
    'en-GB': 'UK',
    'en-CA': 'CA',
    'en-AU': 'AU',
    'fr-FR': 'FR',
    'fr-CA': 'CA',
    'de-DE': 'DE',
    'de-AT': 'DE',
    'it-IT': 'IT',
    'es-ES': 'ES',
    'es-MX': 'US',
    'ja-JP': 'JP',
    'en-IN': 'IN'
  };
  
  const detectedCountry = langMap[userLang] || 'US';
  
  document.querySelectorAll('.country-selector').forEach(selector => {
    selectCountry(selector, detectedCountry);
  });
}

/**
 * Get Current Country
 */
function getCurrentCountry() {
  const countryCode = localStorage.getItem('selectedCountry') || 'US';
  return countryData[countryCode];
}

/**
 * Get Country by Code
 */
function getCountry(code) {
  return countryData[code];
}

/**
 * Get All Countries
 */
function getAllCountries() {
  return Object.entries(countryData).map(([code, data]) => ({
    code,
    ...data
  }));
}

// Export functions
window.CountrySelector = {
  selectCountry,
  updatePageForCountry,
  formatCurrency,
  formatDate,
  getCurrentCountry,
  getCountry,
  getAllCountries,
  countryData
};
