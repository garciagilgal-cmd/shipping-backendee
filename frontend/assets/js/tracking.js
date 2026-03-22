/**
 * Tracking Page JavaScript
 * Handles package tracking functionality
 */

document.addEventListener('DOMContentLoaded', function() {
  initTrackingForm();
  initTrackingHistory();
  loadTrackingSampleData();
});

/**
 * Tracking Form
 */
function initTrackingForm() {
  const trackingForm = document.querySelector('.tracking-form');
  const trackingFormLarge = document.querySelector('.tracking-form-large');
  
  const form = trackingForm || trackingFormLarge;
  if (!form) return;
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const input = form.querySelector('input[type="text"]');
    const trackingId = input?.value.trim();
    
    if (!trackingId) {
      showTrackingError('Please enter a tracking ID');
      return;
    }
    
    // Validate tracking ID format
    if (!isValidTrackingId(trackingId)) {
      showTrackingError('Please enter a valid tracking ID');
      return;
    }
    
    // Track package
    trackPackage(trackingId);
    
    // Save to history
    addToTrackingHistory(trackingId);
  });
}

/**
 * Validate Tracking ID
 */
function isValidTrackingId(trackingId) {
  // Basic validation - at least 8 alphanumeric characters
  return /^[A-Z0-9]{8,}$/i.test(trackingId);
}

/**
 * Track Package
 */
function trackPackage(trackingId) {
  const resultsContainer = document.querySelector('.tracking-results-content');
  
  // Show loading state
  if (resultsContainer) {
    resultsContainer.innerHTML = `
      <div class="tracking-loading">
        <div class="spinner"></div>
        <p>Tracking your package...</p>
      </div>
    `;
  }
  
  // Simulate API call
  setTimeout(() => {
    const trackingData = getTrackingData(trackingId);
    
    if (trackingData) {
      displayTrackingResults(trackingData);
    } else {
      showTrackingError('Tracking information not found. Please check your tracking ID and try again.');
    }
  }, 1500);
}

/**
 * Get Tracking Data (simulated)
 */
function getTrackingData(trackingId) {
  // Sample tracking data - in production, this would come from an API
  const sampleData = {
    '1Z999AA10123456784': {
      id: '1Z999AA10123456784',
      status: 'delivered',
      statusText: 'Delivered',
      estimatedDelivery: null,
      origin: 'Seattle, WA',
      destination: 'New York, NY',
      weight: '2.5 lbs',
      service: 'Ground',
      events: [
        {
          status: 'Delivered',
          location: 'New York, NY',
          date: new Date(Date.now() - 86400000),
          completed: true
        },
        {
          status: 'Out for Delivery',
          location: 'New York, NY',
          date: new Date(Date.now() - 90000000),
          completed: true
        },
        {
          status: 'Arrived at Facility',
          location: 'New York, NY',
          date: new Date(Date.now() - 172800000),
          completed: true
        },
        {
          status: 'Departed Facility',
          location: 'Chicago, IL',
          date: new Date(Date.now() - 259200000),
          completed: true
        },
        {
          status: 'Picked Up',
          location: 'Seattle, WA',
          date: new Date(Date.now() - 345600000),
          completed: true
        }
      ]
    },
    '1Z888BB20234567895': {
      id: '1Z888BB20234567895',
      status: 'in-transit',
      statusText: 'In Transit',
      estimatedDelivery: new Date(Date.now() + 86400000),
      origin: 'Los Angeles, CA',
      destination: 'Miami, FL',
      weight: '1.8 lbs',
      service: 'Express',
      events: [
        {
          status: 'In Transit',
          location: 'Dallas, TX',
          date: new Date(Date.now() - 43200000),
          completed: true
        },
        {
          status: 'Departed Facility',
          location: 'Los Angeles, CA',
          date: new Date(Date.now() - 129600000),
          completed: true
        },
        {
          status: 'Picked Up',
          location: 'Los Angeles, CA',
          date: new Date(Date.now() - 172800000),
          completed: true
        }
      ]
    }
  };
  
  // Return sample data if tracking ID matches, otherwise generate random data
  if (sampleData[trackingId]) {
    return sampleData[trackingId];
  }
  
  // Generate random tracking data for demo
  if (trackingId.length >= 8) {
    return generateRandomTrackingData(trackingId);
  }
  
  return null;
}

/**
 * Generate Random Tracking Data (for demo)
 */
function generateRandomTrackingData(trackingId) {
  const statuses = ['in-transit', 'delivered', 'pending'];
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  
  return {
    id: trackingId.toUpperCase(),
    status: status,
    statusText: status === 'delivered' ? 'Delivered' : status === 'in-transit' ? 'In Transit' : 'Pending',
    estimatedDelivery: status === 'delivered' ? null : new Date(Date.now() + 86400000 * 2),
    origin: 'Origin City',
    destination: 'Destination City',
    weight: (Math.random() * 10 + 0.5).toFixed(1) + ' lbs',
    service: 'Ground',
    events: [
      {
        status: status === 'delivered' ? 'Delivered' : 'In Transit',
        location: 'Current Location',
        date: new Date(),
        completed: true
      },
      {
        status: 'Picked Up',
        location: 'Origin Facility',
        date: new Date(Date.now() - 172800000),
        completed: true
      }
    ]
  };
}

/**
 * Display Tracking Results
 */
function displayTrackingResults(data) {
  const resultsContainer = document.querySelector('.tracking-results-content');
  if (!resultsContainer) return;
  
  const statusClass = data.status;
  const estimatedDelivery = data.estimatedDelivery 
    ? formatDate(data.estimatedDelivery, { month: 'short', day: 'numeric' })
    : 'Delivered';
  
  let eventsHtml = '';
  data.events.forEach((event, index) => {
    const isFirst = index === 0;
    eventsHtml += `
      <div class="timeline-item ${isFirst ? 'active' : ''}">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <div class="timeline-status">${event.status}</div>
          <div class="timeline-location">${event.location}</div>
          <div class="timeline-date">${formatDate(event.date, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
        </div>
      </div>
    `;
  });
  
  resultsContainer.innerHTML = `
    <div class="tracking-results-header">
      <h2 class="tracking-results-title">Tracking ID: <span class="tracking-id">${data.id}</span></h2>
      <span class="tracking-status-badge ${statusClass}">${data.statusText}</span>
    </div>
    
    <div class="tracking-timeline">
      ${eventsHtml}
    </div>
    
    <div class="tracking-package-info">
      <h3 class="package-info-title">Package Details</h3>
      <div class="package-info-grid">
        <div class="package-info-item">
          <span class="package-info-label">From</span>
          <span class="package-info-value">${data.origin}</span>
        </div>
        <div class="package-info-item">
          <span class="package-info-label">To</span>
          <span class="package-info-value">${data.destination}</span>
        </div>
        <div class="package-info-item">
          <span class="package-info-label">Weight</span>
          <span class="package-info-value">${data.weight}</span>
        </div>
        <div class="package-info-item">
          <span class="package-info-label">Service</span>
          <span class="package-info-value">${data.service}</span>
        </div>
        <div class="package-info-item">
          <span class="package-info-label">${data.status === 'delivered' ? 'Delivered' : 'Estimated Delivery'}</span>
          <span class="package-info-value">${estimatedDelivery}</span>
        </div>
      </div>
    </div>
  `;
}

/**
 * Show Tracking Error
 */
function showTrackingError(message) {
  const resultsContainer = document.querySelector('.tracking-results-content');
  if (!resultsContainer) {
    alert(message);
    return;
  }
  
  resultsContainer.innerHTML = `
    <div class="tracking-error">
      <div class="tracking-error-icon">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 class="tracking-error-title">Tracking Not Found</h3>
      <p class="tracking-error-text">${message}</p>
      <button class="btn btn-primary" onclick="clearTrackingResults()">Try Again</button>
    </div>
  `;
}

/**
 * Clear Tracking Results
 */
function clearTrackingResults() {
  const resultsContainer = document.querySelector('.tracking-results-content');
  if (resultsContainer) {
    resultsContainer.innerHTML = '';
  }
  
  const input = document.querySelector('.tracking-input, .tracking-input-large');
  if (input) {
    input.value = '';
    input.focus();
  }
}

/**
 * Tracking History
 */
function initTrackingHistory() {
  const historyContainer = document.querySelector('.tracking-history');
  if (!historyContainer) return;
  
  displayTrackingHistory();
}

/**
 * Add to Tracking History
 */
function addToTrackingHistory(trackingId) {
  let history = JSON.parse(localStorage.getItem('trackingHistory') || '[]');
  
  // Remove if already exists
  history = history.filter(id => id !== trackingId);
  
  // Add to beginning
  history.unshift(trackingId);
  
  // Keep only last 5
  history = history.slice(0, 5);
  
  localStorage.setItem('trackingHistory', JSON.stringify(history));
}

/**
 * Display Tracking History
 */
function displayTrackingHistory() {
  const historyContainer = document.querySelector('.tracking-history-list');
  if (!historyContainer) return;
  
  const history = JSON.parse(localStorage.getItem('trackingHistory') || '[]');
  
  if (history.length === 0) {
    historyContainer.innerHTML = '<p class="tracking-history-empty">No recent tracking history</p>';
    return;
  }
  
  historyContainer.innerHTML = history.map(id => `
    <button class="tracking-history-item" onclick="trackPackage('${id}')">
      <span class="tracking-history-id">${id}</span>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  `).join('');
}

/**
 * Load Tracking Sample Data
 */
function loadTrackingSampleData() {
  // Pre-load sample data for demo purposes
  window.trackingSampleData = {
    '1Z999AA10123456784': true,
    '1Z888BB20234567895': true
  };
}

/**
 * Format Date Helper
 */
function formatDate(date, options = {}) {
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  return new Date(date).toLocaleDateString('en-US', { ...defaultOptions, ...options });
}
