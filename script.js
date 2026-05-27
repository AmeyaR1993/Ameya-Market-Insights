(function () {
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('ami-enhanced');
  document.body.classList.add('ami-motion-ready');

  const onScroll = () => {
    document.body.classList.toggle('ami-scrolled', window.scrollY > 24);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const revealTargets = document.querySelectorAll([
    '.section', '.showcase-section', '.feature-showcase', '.wealth-wide-image', '.wealth-cta',
    '.why-matters', '.plans-section', '.advisor-section', '.equity-section', '.equity-cta',
    '.certification-section', '.business-section', '.policy-container', '.card', '.product-card',
    '.pricing-preview-card', '.why-card', '.plan-card', '.premium-price-card', '.advisor-card'
  ].join(','));

  revealTargets.forEach((el) => el.classList.add('ami-reveal'));

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('ami-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealTargets.forEach((el) => observer.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add('ami-visible'));
  }

  if (!prefersReducedMotion) {
    const tiltTargets = document.querySelectorAll('.dashboard-card, .hero-card');
    tiltTargets.forEach((card) => {
      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.setProperty('--ami-rotate-x', `${(-y * 5).toFixed(2)}deg`);
        card.style.setProperty('--ami-rotate-y', `${(x * 6).toFixed(2)}deg`);
        card.style.setProperty('--ami-tilt-x', `${(x * 4).toFixed(2)}px`);
        card.style.setProperty('--ami-tilt-y', `${(y * 4).toFixed(2)}px`);
      });
      card.addEventListener('pointerleave', () => {
        card.style.removeProperty('--ami-rotate-x');
        card.style.removeProperty('--ami-rotate-y');
        card.style.removeProperty('--ami-tilt-x');
        card.style.removeProperty('--ami-tilt-y');
      });
    });
  }
})();
