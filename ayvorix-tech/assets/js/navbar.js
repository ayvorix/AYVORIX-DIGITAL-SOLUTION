/**
 * AYVORIX - Navigation & Header Logic
 * Manages mobile drawer menus, glassmorphism scroll styling, and active link states.
 */

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header-nav');
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const body = document.body;

  // 1. Shrink header and apply shadow on scroll
  const handleScroll = () => {
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Init on load

  // 2. Mobile Hamburger Toggle Menu
  const toggleMobileMenu = () => {
    if (!mobileNav) return;
    const isOpen = mobileNav.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  const openMenu = () => {
    if (hamburger) hamburger.classList.add('open');
    if (mobileNav) mobileNav.classList.add('open');
    if (hamburger) hamburger.setAttribute('aria-expanded', 'true');
    body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeMenu = () => {
    if (hamburger) hamburger.classList.remove('open');
    if (mobileNav) mobileNav.classList.remove('open');
    if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
    body.style.overflow = ''; // Restore scrolling
  };

  if (hamburger) {
    hamburger.addEventListener('click', toggleMobileMenu);
  }

  // Close menu on mobile nav link click
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close menu on Escape key press (A11y)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('open')) {
      closeMenu();
      if (hamburger) hamburger.focus();
    }
  });

  // 3. Set Active Navigation Link based on current page
  const currentPath = window.location.pathname;
  const setLinkActive = (links) => {
    links.forEach(link => {
      const href = link.getAttribute('href');
      // Normalize link href
      const normalizedHref = href.startsWith('../') ? href.replace('../', '') : href;
      const normalizedPath = currentPath.endsWith('/') ? currentPath + 'index.html' : currentPath;

      if (normalizedPath.includes(normalizedHref) && normalizedHref !== '') {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else if (normalizedPath.endsWith('index.html') && normalizedHref === 'index.html') {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else if ((normalizedPath === '/' || normalizedPath.endsWith('/ayvorix-tech/')) && normalizedHref === 'index.html') {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });
  };

  const desktopLinks = document.querySelectorAll('.nav-link');
  setLinkActive(desktopLinks);
  setLinkActive(mobileLinks);
});
/**
 * Utility for smoother viewport scaling adjustments
 */
window.addEventListener('resize', () => {
  if (window.innerWidth >= 1024) {
    const mobileNav = document.querySelector('.mobile-nav');
    const hamburger = document.querySelector('.hamburger');
    if (mobileNav && mobileNav.classList.contains('open')) {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    }
  }
});
