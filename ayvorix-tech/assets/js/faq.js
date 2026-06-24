/**
 * AYVORIX - FAQ Accordion Handler
 * Provides dynamic scrollHeight expansion for butter-smooth sliding transitions.
 */

document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    if (!trigger || !content) return;

    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      
      const isActive = item.classList.contains('active');
      
      // Close all other FAQ items in accordion fashion
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          const otherContent = otherItem.querySelector('.faq-content');
          otherContent.style.maxHeight = '0px';
          otherItem.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current item
      if (isActive) {
        item.classList.remove('active');
        content.style.maxHeight = '0px';
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
        trigger.setAttribute('aria-expanded', 'true');
      }
    });

    // Update max-height dynamically on resize if active
    window.addEventListener('resize', () => {
      if (item.classList.contains('active')) {
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
});
