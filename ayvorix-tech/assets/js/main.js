/**
 * AYVORIX - Main JS Coordinator & Component Handler
 * Configures contact form validation, pricing toggle controls, and footer forms.
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. CONTACT FORM VALIDATION ---
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');

    // Create error elements utility
    const showError = (input, message) => {
      const parent = input.parentElement;
      let errorDiv = parent.querySelector('.error-message');
      
      if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = 'var(--error)';
        errorDiv.style.fontSize = '0.8125rem';
        errorDiv.style.marginTop = 'var(--space-1)';
        parent.appendChild(errorDiv);
      }
      
      errorDiv.textContent = message;
      input.style.borderColor = 'var(--error)';
    };

    const clearError = (input) => {
      const parent = input.parentElement;
      const errorDiv = parent.querySelector('.error-message');
      if (errorDiv) {
        errorDiv.remove();
      }
      input.style.borderColor = '';
    };

    // Live validation check helpers
    const validateEmail = (email) => {
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return regex.test(email);
    };

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate Name
      if (nameInput) {
        if (nameInput.value.trim().length < 2) {
          showError(nameInput, 'Name must be at least 2 characters.');
          isValid = false;
        } else {
          clearError(nameInput);
        }
      }

      // Validate Email
      if (emailInput) {
        if (!validateEmail(emailInput.value.trim())) {
          showError(emailInput, 'Please enter a valid email address.');
          isValid = false;
        } else {
          clearError(emailInput);
        }
      }

      // Validate Message
      if (messageInput) {
        if (messageInput.value.trim().length < 10) {
          showError(messageInput, 'Message must be at least 10 characters.');
          isValid = false;
        } else {
          clearError(messageInput);
        }
      }

      if (isValid) {
        // Mock successful form submit response
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending Message...';

        setTimeout(() => {
          submitBtn.style.backgroundColor = 'var(--success)';
          submitBtn.textContent = 'Message Sent Successfully!';
          contactForm.reset();

          setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.style.backgroundColor = '';
            submitBtn.textContent = originalText;
          }, 3000);
        }, 1500);
      }
    });
  }

  // --- 2. BILLING TOGGLE (PRICING GRID) ---
  // Unused subscription billing toggling removed. Pricing uses stable project starting rates.

  // --- 3. FOOTER NEWSLETTER VALIDATION ---
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.newsletter-input');
      const email = input.value.trim();
      
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        input.style.borderColor = 'var(--error)';
        return;
      }

      input.style.borderColor = 'var(--success)';
      const btn = form.querySelector('button');
      const originalText = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Subscribed!';
      
      setTimeout(() => {
        form.reset();
        input.style.borderColor = '';
        btn.disabled = false;
        btn.textContent = originalText;
      }, 3000);
    });
  });

  // --- 4. PREMIUM PAGE LOADER ---
  const handleLoader = () => {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.classList.add('fade-out');
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500); // matches CSS fade duration
    }
  };
  
  window.addEventListener('load', handleLoader);
  setTimeout(handleLoader, 3000); // fallback safety

  // --- 5. LUXURY TESTIMONIAL CAROUSEL ---
  const setupTestimonialCarousel = () => {
    const wrapper = document.querySelector('.testimonial-carousel-wrapper');
    if (!wrapper) return;

    const carousel = wrapper.querySelector('.testimonial-carousel');
    const slides = wrapper.querySelectorAll('.testimonial-slide');
    const prevBtn = wrapper.querySelector('.testimonial-nav-btn.prev');
    const nextBtn = wrapper.querySelector('.testimonial-nav-btn.next');
    const dotsContainer = wrapper.querySelector('.testimonial-dots');

    if (!carousel || slides.length === 0) return;

    let currentIndex = 0;
    let autoPlayInterval = null;

    // Build dots indicators
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `testimonial-dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => {
          goToSlide(index);
          resetAutoPlay();
        });
        dotsContainer.appendChild(dot);
      });
    }

    const dots = dotsContainer ? dotsContainer.querySelectorAll('.testimonial-dot') : [];

    const updateCarousel = () => {
      carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
      
      slides.forEach((slide, index) => {
        if (index === currentIndex) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });

      if (dots.length > 0) {
        dots.forEach((dot, index) => {
          if (index === currentIndex) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });
      }
    };

    const goToSlide = (index) => {
      currentIndex = index;
      updateCarousel();
    };

    const nextSlide = () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel();
    };

    const prevSlide = () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateCarousel();
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        prevSlide();
        resetAutoPlay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        nextSlide();
        resetAutoPlay();
      });
    }

    const startAutoPlay = () => {
      autoPlayInterval = setInterval(nextSlide, 7000); // 7 seconds slide
    };

    const resetAutoPlay = () => {
      clearInterval(autoPlayInterval);
      startAutoPlay();
    };

    // Set first slide as active explicitly
    slides[0].classList.add('active');
    
    startAutoPlay();
  };

  setupTestimonialCarousel();
});
