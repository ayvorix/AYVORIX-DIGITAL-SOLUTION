/**
 * AYVORIX - Theme Handler (Light/Dark Mode)
 * Ensures zero flash of light-theme on load and handles localStorage persistence.
 */

(function () {
  const STORAGE_KEY = 'ayvorix-theme';
  const htmlEl = document.documentElement;

  // 1. Get saved theme or browser preference
  const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    if (savedTheme) {
      return savedTheme;
    }
    const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return userPrefersDark ? 'dark' : 'light';
  };

  // 2. Set theme attribute early
  const activeTheme = getPreferredTheme();
  htmlEl.setAttribute('data-theme', activeTheme);

  // 3. Setup toggle listeners on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', () => {
    const toggleButtons = document.querySelectorAll('.theme-toggle-btn');
    
    // Function to apply theme changes
    const applyTheme = (theme) => {
      htmlEl.setAttribute('data-theme', theme);
      localStorage.setItem(STORAGE_KEY, theme);
      
      // Update aria labels for accessibility
      toggleButtons.forEach(btn => {
        btn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
      });
    };

    // Add click events to all buttons (desktop & mobile if duplicated)
    toggleButtons.forEach(btn => {
      btn.setAttribute('aria-label', `Switch to ${activeTheme === 'dark' ? 'light' : 'dark'} mode`);
      
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const currentTheme = htmlEl.getAttribute('data-theme');
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
      });
    });
  });
})();
