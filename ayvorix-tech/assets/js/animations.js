/**
 * AYVORIX - Scroll Animations & Reveals
 * Orchestrates premium custom cursor movements, background particle animations,
 * service card expansions, case study modals, and stat count-up triggers.
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. VIEWPORT REVEAL ANIMATIONS (IntersectionObserver) ---
  const revealElements = document.querySelectorAll('.reveal-fade-up');
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
  };

  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  };

  const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);
  revealElements.forEach(el => {
    scrollObserver.observe(el);
  });

  // --- 2. MAGNETIC CTA BUTTONS EFFECT ---
  const magneticButtons = document.querySelectorAll('.btn-magnetic');
  magneticButtons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const position = btn.getBoundingClientRect();
      const x = e.clientX - position.left - position.width / 2;
      const y = e.clientY - position.top - position.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });

  // --- 3. PREMIUM STATISTICS COUNTER ANIMATION ---
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length > 0) {
    const countUp = (el) => {
      const target = parseInt(el.getAttribute('data-target'), 10) || 0;
      const suffix = el.getAttribute('data-suffix') || '';
      const duration = 2200;
      const startTime = performance.now();

      const animate = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        // Apple-style easeOutQuart transition curve
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        const currentCount = Math.round(easeProgress * target);

        el.textContent = currentCount.toLocaleString() + suffix;

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          el.textContent = target.toLocaleString() + suffix;
        }
      };

      requestAnimationFrame(animate);
    };

    const statsObserverOptions = {
      threshold: 0.2
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
  // --- 4. MOUSE-TRACKING GLOW & 3D TILT EFFECT ---
  const glowCards = document.querySelectorAll('.service-card, .portfolio-card, .pricing-card, .tech-category-card, .tech-stack-item, .why-card');
  glowCards.forEach(card => {
    card.style.transition = 'transform 0.15s ease-out, box-shadow var(--transition-normal), border-color var(--transition-normal)';
    
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const xc = rect.width / 2;
      const yc = rect.height / 2;
      const dx = (x - xc) / xc; 
      const dy = (y - yc) / yc; 
      
      const rotateY = dx * 8; // max 8 degrees
      const rotateX = -dy * 8; // max 8 degrees
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--y', `${y}px`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.5s ease, box-shadow var(--transition-normal), border-color var(--transition-normal)';
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

  const simpleGlowCards = document.querySelectorAll('.case-study-meta-box');
  simpleGlowCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--y', `${y}px`);
    });
  });

  // --- 5. CUSTOM CURSOR SETUP (Desktops Only) ---
  const setupCustomCursor = () => {
    if (window.innerWidth < 1024) return;
    
    // Check if custom cursor elements already exist to avoid duplicates
    if (document.querySelector('.custom-cursor')) return;

    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    const dot = document.createElement('div');
    dot.className = 'custom-cursor-dot';
    document.body.appendChild(cursor);
    document.body.appendChild(dot);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const updateCursor = () => {
      // Smooth lerp movement
      cursorX += (mouseX - cursorX) * 0.12;
      cursorY += (mouseY - cursorY) * 0.12;
      dotX += (mouseX - dotX) * 0.22;
      dotY += (mouseY - dotY) * 0.22;

      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;
      dot.style.left = `${dotX}px`;
      dot.style.top = `${dotY}px`;

      requestAnimationFrame(updateCursor);
    };
    
    requestAnimationFrame(updateCursor);

    // Watch for hovering states dynamically
    const updateHoverListeners = () => {
      const interactives = document.querySelectorAll('a, button, .service-card, .portfolio-card, .pricing-card, .faq-trigger, .btn-magnetic, .scroll-indicator, .filter-btn');
      interactives.forEach(el => {
        // remove old to prevent stacking
        el.removeEventListener('mouseenter', addHover);
        el.removeEventListener('mouseleave', removeHover);
        
        el.addEventListener('mouseenter', addHover);
        el.addEventListener('mouseleave', removeHover);
      });
    };

    function addHover() {
      cursor.classList.add('is-hovering');
    }
    function removeHover() {
      cursor.classList.remove('is-hovering');
    }

    updateHoverListeners();

    // Re-bind when DOM updates or filter is clicked
    document.addEventListener('click', () => {
      setTimeout(updateHoverListeners, 100);
    });
  };

  setupCustomCursor();

  // --- 6. HERO CANVAS ANIMATED PARTICLES ---
  const setupHeroCanvas = () => {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles = [];
    const particleCount = 45;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2 + 1
      });
    }

    const animateParticles = () => {
      if (!document.getElementById('hero-canvas')) return; // exit loop if navigated away
      ctx.clearRect(0, 0, width, height);

      // Check current theme colors for drawing
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      ctx.fillStyle = isDark ? 'rgba(148, 163, 184, 0.15)' : 'rgba(86, 110, 127, 0.12)';
      ctx.strokeStyle = isDark ? 'rgba(30, 41, 59, 0.3)' : 'rgba(226, 234, 240, 0.4)';

      // Move particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw connection mesh lines
      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.lineWidth = (1 - dist / 110) * 0.65;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animateParticles);
    };

    requestAnimationFrame(animateParticles);
  };

  setupHeroCanvas();

  // --- 7. SCROLL DOWN INDICATOR INTERACTION ---
  const setupScrollIndicator = () => {
    const indicator = document.querySelector('.scroll-indicator');
    if (!indicator) return;

    indicator.addEventListener('click', () => {
      const nextSection = document.querySelector('.trusted-section') || document.querySelector('#services');
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  };

  setupScrollIndicator();

  // --- 8. SERVICE CARDS INTERACTIVE EXPANSION ---
  const setupServiceExpansion = () => {
    const cards = document.querySelectorAll('.service-card');
    cards.forEach(card => {
      const link = card.querySelector('.service-card-link');
      if (!link) return;

      link.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const isExpanded = card.classList.contains('is-expanded');

        // Close any other open service cards
        document.querySelectorAll('.service-card.is-expanded').forEach(c => {
          if (c !== card) {
            c.classList.remove('is-expanded');
            const l = c.querySelector('.service-card-link');
            if (l) {
              l.innerHTML = 'Learn More <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>';
            }
          }
        });

        if (isExpanded) {
          card.classList.remove('is-expanded');
          link.innerHTML = 'Learn More <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>';
        } else {
          card.classList.add('is-expanded');
          link.innerHTML = 'Show Less <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>';
        }
      });
    });
  };

  setupServiceExpansion();

  // --- 9. CASE STUDY MODAL MANAGEMENT ---
  const caseStudiesData = {
    "birthday": {
      title: "Birthday Surprise",
      category: "AY Moments™",
      img: "assets/images/portfolio/birthday.png",
      problem: "Standard digital invitations and greeting cards feel generic, static, and fail to evoke strong emotional responses or preserve memory lane journeys.",
      solution: "Developed an immersive, cinematic digital narrative combining scroll-driven memories, high-fidelity sound design, personalized visual chapters, and custom interactive modules.",
      technologies: ["HTML5", "CSS3 Animations", "Audio Synthesis", "GSAP Concepts", "Vercel"],
      features: ["Cinematic Timeline", "Audio Atmosphere", "Memory Map"],
      challenge: "Optimizing heavy image files and audio assets to download instantaneously on slow 3G connections.",
      outcome: "Delivered a touching surprise that generated high emotional engagement, loading under 0.8s globally and creating a lasting digital keepsake.",
      link: "https://birthday-suprise-chi.vercel.app/"
    },
    "wedding": {
      title: "Wedding Surprise",
      category: "AY Moments™",
      img: "assets/images/portfolio/wedding.png",
      problem: "Physical invitations lack interactivity and struggle to recount the couple's relationship timeline, which leaves guests disconnected from the couple's journey.",
      solution: "Designed a bespoke digital wedding invitation ecosystem featuring romantic audio cues, timeline milestones, interactive RSVPs, and smooth page transitions.",
      technologies: ["Modern HTML5", "Canvas Particles", "CSS Grid/Flexbox", "Audio API", "Vercel"],
      features: ["RSVP Database Tracker", "Romantic Soundscape", "Story Timeline"],
      challenge: "Preventing backdrop-filter lag on low-end mobile devices during complex parallax scrolling.",
      outcome: "Replaced traditional wedding RSVPs with a seamless, highly engaging web app that lowered response latency and generated rave reviews from guests.",
      link: "https://wedding-suprise.vercel.app/"
    },
    "anniversary": {
      title: "Parents Anniversary",
      category: "AY Moments™",
      img: "assets/images/portfolio/anniversary.png",
      problem: "Preserving multi-decade family history, photos, and letters in a fragile physical album makes them inaccessible and subject to decay.",
      solution: "Built a high-performance digital history timeline containing scroll-guided photo transitions, letters from friends, and dynamic memory maps.",
      technologies: ["HTML5", "CSS Variables", "Scroll-Observer API", "Local Storage", "Vercel"],
      features: ["Scroll-Guided Chapters", "Virtual Guestbook", "Media Archive"],
      challenge: "Supporting older browser compatibility for older family members while maintaining modern CSS transforms.",
      outcome: "Brought three generations of family members together online, providing a beautiful, permanent digital archive of key life milestones.",
      link: "https://parent-anniversary-xi.vercel.app/"
    },
    "friendship": {
      title: "Friendship Memories",
      category: "AY Moments™",
      img: "assets/images/portfolio/friendship.png",
      problem: "Best friends sharing memories across messaging apps often lose track of their core shared moments, inside jokes, and travel journals.",
      solution: "Engineered a gamified, interactive portal of memories using virtual polaroids, sound effects, and digital scrapbook mechanics.",
      technologies: ["HTML5 Canvas", "Vanilla JS (Drag/Drop)", "CSS Keyframes", "Vercel"],
      features: ["Interactive polaroids", "Drag-and-drop mechanics", "Audio triggers"],
      challenge: "Rendering high-density canvas grids at 60 FPS without memory leaks or CPU thermal spikes.",
      outcome: "Created a unique friendship tribute characterized by high repeat visits and smooth performance on mobile and desktop.",
      link: "https://friendship-memories.vercel.app/"
    },
    "coffee": {
      title: "AY Stack Coffee",
      category: "Business Websites",
      img: "assets/images/portfolio/coffee.png",
      problem: "E-commerce coffee brands suffer from high bounce rates due to slow load times and uninspired layouts that fail to convey sensory brand details.",
      solution: "Built a visually stunning, ultra-fast landing page with parallax coffee packaging reveals, sensory hover grids, and frictionless checkout flows.",
      technologies: ["Semantic HTML5", "CSS Variables", "Intersection Observer", "JS Optimization", "Vercel"],
      features: ["Parallax reveals", "Sensory hover grids", "Frictionless checkout"],
      challenge: "Ensuring cross-browser layout consistency for skewed glass reflections.",
      outcome: "Boosted conversions by 35% with sub-second page rendering, achieving a 99/100 Lighthouse Performance score.",
      link: "https://ay-stack-coffe.vercel.app/"
    },
    "gym": {
      title: "Premium Gym Website",
      category: "Business Websites",
      img: "assets/images/portfolio/gym.png",
      problem: "Standard gym sites use template layouts that fail to motivate users or present class schedules dynamically.",
      solution: "Designed a premium modern gym experience incorporating program calculators, class schedules, and interactive membership flows.",
      technologies: ["React", "Tailwind CSS", "Framer Motion", "Node.js", "Express"],
      features: ["Program selector", "Class scheduler", "Membership portal"],
      challenge: "Integrating real-time booking status indicators with zero layout shifting during content loads.",
      outcome: "Proposed solution features luxury dark styling and fluid layouts to drive high membership conversion rates.",
      link: "#"
    },
    "restaurant": {
      title: "Luxury Restaurant Website",
      category: "Business Websites",
      img: "assets/images/portfolio/restaurant.png",
      problem: "Fine-dining sites frequently feature rigid PDF menus and slow interfaces that fail to capture the culinary atmosphere.",
      solution: "Engineered an editorial digital dining platform with dynamic sensory menu reveals and reservation API integrations.",
      technologies: ["Next.js", "PostgreSQL", "Tailwind CSS", "Prisma", "Vercel"],
      features: ["Sensory menu reveal", "Table reservation API", "Location navigation"],
      challenge: "Designing a premium menu presentation that is accessible to screen readers.",
      outcome: "Provides fine-dining guests with a seamless preview and reservation flow to capture brand luxury.",
      link: "#"
    },
    "spiderman": {
      title: "Spider Man 3D Landing",
      category: "3D Experiences",
      img: "assets/images/portfolio/spiderman.png",
      problem: "Static fan pages fail to engage audiences or convey the action-oriented cinematic scale of modern superhero media.",
      solution: "Built a immersive, futuristic tech-suit dashboard using responsive CSS grids and glowing WebGL vector paths.",
      technologies: ["Three.js", "WebGL", "GSAP", "Vite", "Vercel"],
      features: ["3D suit viewport", "Arachnid grid particles", "Interactive soundboard"],
      challenge: "Reducing WebGL drawing calls to maintain 60 FPS on high-refresh-rate mobile viewports.",
      outcome: "Achieved a 60 FPS fluid rendering cycle with active mouse movement trackers and dynamic hover responses.",
      link: "https://spider-man-lovat.vercel.app/"
    },
    "monster": {
      title: "Monster Key Chain",
      category: "3D Experiences",
      img: "assets/images/portfolio/monster.png",
      problem: "Traditional flat image catalogs fail to represent the materials, angles, and textures of custom physical keychains.",
      solution: "Engineered an interactive WebGL showcase with touch rotation control gestures and a live spotlight shader environment.",
      technologies: ["Three.js", "WebGL Shaders", "GSAP", "Vercel"],
      features: ["Spotlight shader environment", "Touch rotation gestures", "Material customization"],
      challenge: "Authoring responsive fallback shaders when WebGL 2.0 is disabled by the client browser.",
      outcome: "Delivered a buttery-smooth 3D viewer allowing users to customization colors and examine high-fidelity texture reflections in real-time.",
      link: "https://monster-key-chain.vercel.app/"
    }
  };

  const setupCaseStudyModal = () => {
    const modal = document.querySelector('.case-study-modal');
    if (!modal) return;

    const closeBtn = modal.querySelector('.case-study-close-btn');
    const overlay = modal.querySelector('.case-study-overlay');
    const detailButtons = document.querySelectorAll('.portfolio-btn-detail');

    const openModal = (id) => {
      const data = caseStudiesData[id];
      if (!data) return;

      const isSubpage = window.location.pathname.includes('/pages/');
      const imgPath = isSubpage ? `../${data.img}` : data.img;

      modal.querySelector('.case-study-header-title').textContent = data.title;
      modal.querySelector('.case-study-media-wrapper img').src = imgPath;
      modal.querySelector('.case-study-media-wrapper img').alt = data.title;
      modal.querySelector('.case-study-category').textContent = data.category;
      modal.querySelector('.case-study-problem').textContent = data.problem;
      modal.querySelector('.case-study-solution').textContent = data.solution;
      modal.querySelector('.case-study-outcome').textContent = data.outcome;
      
      const liveBtn = modal.querySelector('.case-study-live-demo-link');
      if (liveBtn) {
        if (data.link && data.link !== '#') {
          liveBtn.href = data.link;
          liveBtn.style.display = 'inline-flex';
        } else {
          liveBtn.style.display = 'none';
        }
      }

      // Populate Features
      const featuresContainer = modal.querySelector('.case-study-features');
      if (featuresContainer) {
        featuresContainer.innerHTML = '';
        if (data.features && data.features.length > 0) {
          data.features.forEach(feat => {
            const li = document.createElement('li');
            li.textContent = feat;
            li.style.color = 'var(--text-secondary)';
            li.style.fontSize = '0.9375rem';
            li.style.marginBottom = 'var(--space-1)';
            featuresContainer.appendChild(li);
          });
        }
      }

      // Populate Challenge
      const challengeEl = modal.querySelector('.case-study-challenge');
      if (challengeEl) {
        challengeEl.textContent = data.challenge || '';
      }

      const techContainer = modal.querySelector('.tech-badge-container');
      techContainer.innerHTML = '';
      data.technologies.forEach(tech => {
        const badge = document.createElement('span');
        badge.className = 'tech-badge';
        badge.textContent = tech;
        techContainer.appendChild(badge);
      });

      modal.classList.add('is-active');
      document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
      modal.classList.remove('is-active');
      document.body.style.overflow = '';
    };

    detailButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const projectKey = btn.getAttribute('data-project');
        openModal(projectKey);
      });
    });

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  };

  setupCaseStudyModal();
});
