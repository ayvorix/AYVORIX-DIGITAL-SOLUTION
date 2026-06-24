/**
 * AYVORIX - Scroll Animations & Reveals
 * Uses the high-performance IntersectionObserver API to orchestrate viewport entries.
 */

document.addEventListener('DOMContentLoaded', () => {
  const revealElements = document.querySelectorAll('.reveal-fade-up');

  // 1. Intersection Observer options
  const observerOptions = {
    root: null, // use the viewport
    rootMargin: '0px 0px -80px 0px', // trigger slightly before entering the full screen
    threshold: 0.1 // trigger when 10% of element is visible
  };

  // 2. Intersection Observer callback
  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add active class to fire CSS transition
        entry.target.classList.add('active');
        // Unobserve after running once (makes it clean and saves resources)
        observer.unobserve(entry.target);
      }
    });
  };

  // 3. Initialize Observer
  const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);

  // 4. Attach observer to targets
  revealElements.forEach(el => {
    scrollObserver.observe(el);
  });

  // 5. Magnetic CTA buttons effect (subtle luxury mouse hover micro-movement)
  const magneticButtons = document.querySelectorAll('.btn-magnetic');
  
  magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const position = btn.getBoundingClientRect();
      const x = e.clientX - position.left - position.width / 2;
      const y = e.clientY - position.top - position.height / 2;
      
      // Shift button slightly towards mouse cursor (max 8px translation)
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      // Revert position smoothly
      btn.style.transform = 'translate(0px, 0px)';
    });
  });

  // 6. Statistics Counter Animation
  const statNumbers = document.querySelectorAll('.stat-number');
  
  if (statNumbers.length > 0) {
    const countUp = (el) => {
      const target = parseInt(el.getAttribute('data-target'), 10) || 0;
      const suffix = el.getAttribute('data-suffix') || '';
      const duration = 2000;
      const frameRate = 1000 / 60;
      const totalFrames = Math.round(duration / frameRate);
      let frame = 0;
      
      const animate = () => {
        frame++;
        const progress = frame / totalFrames;
        const easeOutProgress = progress * (2 - progress);
        const currentCount = Math.round(easeOutProgress * target);
        
        el.textContent = currentCount + suffix;
        
        if (frame < totalFrames) {
          requestAnimationFrame(animate);
        } else {
          el.textContent = target + suffix;
        }
      };
      
      requestAnimationFrame(animate);
    };

    const statsObserverOptions = {
      threshold: 0.5
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          countUp(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, statsObserverOptions);

    statNumbers.forEach(stat => {
      statsObserver.observe(stat);
    });
  }

  // 7. Mouse-Tracking Glow Card Effect
  const glowCards = document.querySelectorAll('.service-card, .portfolio-card, .pricing-card');
  glowCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--y', `${y}px`);
    });
  });
});
