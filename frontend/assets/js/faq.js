/**
 * FAQ JavaScript
 * Handles FAQ accordion functionality
 */

document.addEventListener('DOMContentLoaded', function() {
  initFAQ();
  initFAQSearch();
});

/**
 * Initialize FAQ Accordion
 */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const toggle = item.querySelector('.faq-toggle');
    
    if (!question || !answer) return;
    
    // Set initial height for smooth animation
    answer.style.maxHeight = '0';
    answer.style.overflow = 'hidden';
    answer.style.transition = 'max-height 0.3s ease, padding 0.3s ease';
    
    question.addEventListener('click', function() {
      const isActive = item.classList.contains('active');
      
      // Close all other items (optional - remove if you want multiple open)
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          closeFAQItem(otherItem);
        }
      });
      
      // Toggle current item
      if (isActive) {
        closeFAQItem(item);
      } else {
        openFAQItem(item);
      }
    });
  });
  
  // Open first item by default (optional)
  // if (faqItems.length > 0) {
  //   openFAQItem(faqItems[0]);
  // }
}

/**
 * Open FAQ Item
 */
function openFAQItem(item) {
  const answer = item.querySelector('.faq-answer');
  const toggle = item.querySelector('.faq-toggle');
  
  item.classList.add('active');
  
  if (answer) {
    answer.style.maxHeight = answer.scrollHeight + 'px';
    answer.style.paddingTop = '1rem';
    answer.style.paddingBottom = '1rem';
  }
  
  if (toggle) {
    toggle.style.transform = 'rotate(180deg)';
  }
}

/**
 * Close FAQ Item
 */
function closeFAQItem(item) {
  const answer = item.querySelector('.faq-answer');
  const toggle = item.querySelector('.faq-toggle');
  
  item.classList.remove('active');
  
  if (answer) {
    answer.style.maxHeight = '0';
    answer.style.paddingTop = '0';
    answer.style.paddingBottom = '0';
  }
  
  if (toggle) {
    toggle.style.transform = 'rotate(0deg)';
  }
}

/**
 * FAQ Search
 */
function initFAQSearch() {
  const searchInput = document.querySelector('.faq-search-input');
  const faqItems = document.querySelectorAll('.faq-item');
  const noResults = document.querySelector('.faq-no-results');
  
  if (!searchInput) return;
  
  searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase().trim();
    let hasResults = false;
    
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question-text')?.textContent.toLowerCase() || '';
      const answer = item.querySelector('.faq-answer')?.textContent.toLowerCase() || '';
      
      if (question.includes(query) || answer.includes(query)) {
        item.style.display = '';
        hasResults = true;
        
        // Highlight matching text
        if (query) {
          highlightText(item, query);
        } else {
          removeHighlight(item);
        }
      } else {
        item.style.display = 'none';
      }
    });
    
    // Show/hide no results message
    if (noResults) {
      noResults.style.display = hasResults ? 'none' : 'block';
    }
    
    // Show category headers with visible items
    updateCategoryVisibility();
  });
}

/**
 * Highlight matching text
 */
function highlightText(item, query) {
  const questionEl = item.querySelector('.faq-question-text');
  const answerEl = item.querySelector('.faq-answer');
  
  if (questionEl) {
    questionEl.innerHTML = highlightMatches(questionEl.textContent, query);
  }
  
  if (answerEl) {
    answerEl.innerHTML = highlightMatches(answerEl.textContent, query);
  }
}

/**
 * Remove text highlighting
 */
function removeHighlight(item) {
  const questionEl = item.querySelector('.faq-question-text');
  const answerEl = item.querySelector('.faq-answer');
  
  if (questionEl) {
    questionEl.textContent = questionEl.textContent;
  }
  
  if (answerEl) {
    answerEl.textContent = answerEl.textContent;
  }
}

/**
 * Highlight matches in text
 */
function highlightMatches(text, query) {
  const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

/**
 * Escape regex special characters
 */
function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Update category visibility based on visible items
 */
function updateCategoryVisibility() {
  const categories = document.querySelectorAll('.faq-category');
  
  categories.forEach(category => {
    const items = category.querySelectorAll('.faq-item');
    const hasVisibleItems = Array.from(items).some(item => item.style.display !== 'none');
    
    category.style.display = hasVisibleItems ? '' : 'none';
  });
}

/**
 * Load FAQ from JSON
 */
function loadFAQFromJSON(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      renderFAQ(data);
    })
    .catch(error => {
      console.error('Error loading FAQ:', error);
    });
}

/**
 * Render FAQ from data
 */
function renderFAQ(data) {
  const container = document.querySelector('.faq-container');
  if (!container) return;
  
  let html = '';
  
  data.categories.forEach(category => {
    html += `
      <div class="faq-category">
        <h3 class="faq-category-title">${category.name}</h3>
        <div class="faq-list">
    `;
    
    category.items.forEach(item => {
      html += `
        <div class="faq-item">
          <button class="faq-question">
            <span class="faq-question-text">${item.question}</span>
            <span class="faq-toggle">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </button>
          <div class="faq-answer">
            <p>${item.answer}</p>
          </div>
        </div>
      `;
    });
    
    html += `
        </div>
      </div>
    `;
  });
  
  container.innerHTML = html;
  
  // Re-initialize FAQ
  initFAQ();
}

/**
 * Expand All FAQs
 */
function expandAllFAQs() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => openFAQItem(item));
}

/**
 * Collapse All FAQs
 */
function collapseAllFAQs() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => closeFAQItem(item));
}
