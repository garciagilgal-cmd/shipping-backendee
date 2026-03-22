/**
 * Slider/Carousel JavaScript
 * Handles testimonial and content sliders
 */

document.addEventListener('DOMContentLoaded', function() {
  initTestimonialSlider();
  initLogoSlider();
  initHeroSlider();
});

/**
 * Testimonial Slider
 */
function initTestimonialSlider() {
  const slider = document.querySelector('.testimonial-slider');
  if (!slider) return;
  
  const track = slider.querySelector('.slider-track');
  const slides = slider.querySelectorAll('.testimonial-slide');
  const prevBtn = slider.querySelector('.slider-prev');
  const nextBtn = slider.querySelector('.slider-next');
  const dots = slider.querySelectorAll('.slider-dot');
  
  if (!track || slides.length === 0) return;
  
  let currentSlide = 0;
  let autoplayInterval;
  
  // Initialize
  updateSlider();
  startAutoplay();
  
  // Event listeners
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      goToSlide(currentSlide - 1);
      resetAutoplay();
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      goToSlide(currentSlide + 1);
      resetAutoplay();
    });
  }
  
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      goToSlide(index);
      resetAutoplay();
    });
  });
  
  // Pause on hover
  slider.addEventListener('mouseenter', stopAutoplay);
  slider.addEventListener('mouseleave', startAutoplay);
  
  // Touch/swipe support
  let touchStartX = 0;
  let touchEndX = 0;
  
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  
  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });
  
  function handleSwipe() {
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToSlide(currentSlide + 1);
      } else {
        goToSlide(currentSlide - 1);
      }
      resetAutoplay();
    }
  }
  
  function goToSlide(index) {
    // Handle wrapping
    if (index < 0) {
      index = slides.length - 1;
    } else if (index >= slides.length) {
      index = 0;
    }
    
    currentSlide = index;
    updateSlider();
  }
  
  function updateSlider() {
    // Update track position
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update slides
    slides.forEach((slide, index) => {
      slide.classList.toggle('active', index === currentSlide);
    });
    
    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
    
    // Update buttons
    if (prevBtn) {
      prevBtn.disabled = currentSlide === 0;
    }
    if (nextBtn) {
      nextBtn.disabled = currentSlide === slides.length - 1;
    }
  }
  
  function startAutoplay() {
    if (slider.dataset.autoplay === 'false') return;
    
    stopAutoplay();
    autoplayInterval = setInterval(() => {
      goToSlide(currentSlide + 1);
    }, 5000);
  }
  
  function stopAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
    }
  }
  
  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }
}

/**
 * Logo Slider (for partner logos)
 */
function initLogoSlider() {
  const slider = document.querySelector('.logo-slider');
  if (!slider) return;
  
  const track = slider.querySelector('.logo-track');
  const logos = slider.querySelectorAll('.logo-item');
  
  if (!track || logos.length === 0) return;
  
  // Clone logos for infinite scroll
  logos.forEach(logo => {
    const clone = logo.cloneNode(true);
    track.appendChild(clone);
  });
  
  // Animate
  let position = 0;
  const speed = 1; // pixels per frame
  
  function animate() {
    position -= speed;
    
    // Reset when half way (original logos)
    const halfWidth = track.scrollWidth / 2;
    if (Math.abs(position) >= halfWidth) {
      position = 0;
    }
    
    track.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(animate);
  }
  
  // Start animation
  animate();
  
  // Pause on hover
  slider.addEventListener('mouseenter', () => {
    track.style.animationPlayState = 'paused';
  });
  
  slider.addEventListener('mouseleave', () => {
    track.style.animationPlayState = 'running';
  });
}

/**
 * Hero Slider
 */
function initHeroSlider() {
  const slider = document.querySelector('.hero-slider');
  if (!slider) return;
  
  const slides = slider.querySelectorAll('.hero-slide');
  const dots = slider.querySelectorAll('.hero-dot');
  const prevBtn = slider.querySelector('.hero-prev');
  const nextBtn = slider.querySelector('.hero-next');
  
  if (slides.length === 0) return;
  
  let currentSlide = 0;
  let autoplayInterval;
  
  // Initialize
  updateHeroSlider();
  startAutoplay();
  
  // Event listeners
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      goToSlide(currentSlide - 1);
      resetAutoplay();
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      goToSlide(currentSlide + 1);
      resetAutoplay();
    });
  }
  
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      goToSlide(index);
      resetAutoplay();
    });
  });
  
  function goToSlide(index) {
    if (index < 0) {
      index = slides.length - 1;
    } else if (index >= slides.length) {
      index = 0;
    }
    
    currentSlide = index;
    updateHeroSlider();
  }
  
  function updateHeroSlider() {
    slides.forEach((slide, index) => {
      slide.classList.toggle('active', index === currentSlide);
    });
    
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentSlide);
    });
  }
  
  function startAutoplay() {
    stopAutoplay();
    autoplayInterval = setInterval(() => {
      goToSlide(currentSlide + 1);
    }, 6000);
  }
  
  function stopAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
    }
  }
  
  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }
}

/**
 * Simple Fade Slider
 */
function initFadeSlider(container) {
  const slides = container.querySelectorAll('.fade-slide');
  if (slides.length === 0) return;
  
  let currentSlide = 0;
  
  setInterval(() => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }, 4000);
}

/**
 * Gallery Slider
 */
function initGallerySlider() {
  const gallery = document.querySelector('.gallery-slider');
  if (!gallery) return;
  
  const mainImage = gallery.querySelector('.gallery-main img');
  const thumbs = gallery.querySelectorAll('.gallery-thumb');
  
  if (!mainImage || thumbs.length === 0) return;
  
  thumbs.forEach(thumb => {
    thumb.addEventListener('click', function() {
      const src = this.dataset.src;
      if (src) {
        mainImage.src = src;
        thumbs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });
}
