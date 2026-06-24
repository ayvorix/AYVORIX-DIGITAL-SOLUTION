/**
 * AYVORIX - Portfolio Category Filtering
 * Orchestrates filtering grids with smooth fade-in-out layout updates.
 */

document.addEventListener('DOMContentLoaded', () => {
  const filtersContainer = document.querySelector('.portfolio-filters');
  if (!filtersContainer) return; // Only execute if filter controls exist

  const filterBtns = filtersContainer.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      
      // 1. Remove active class from all buttons and apply to target
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      // 2. Animate and filter project card layout
      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');

        // Apply visual fade transition
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95) translateY(10px)';

        setTimeout(() => {
          if (filterValue === 'all' || categories.includes(filterValue)) {
            card.style.display = 'flex';
            
            // Re-trigger visual layout entry
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1) translateY(0)';
            }, 50);
          } else {
            card.style.display = 'none';
          }
        }, 300); // matches fade delay
      });
    });
  });
});
