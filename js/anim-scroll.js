document.addEventListener("DOMContentLoaded", () => {
  const fadeElements = $$('.fade-in');
  if (!("IntersectionObserver" in window) || !fadeElements.length) return;

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });

  fadeElements.forEach(el => io.observe(el));
});
