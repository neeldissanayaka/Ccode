/**
 * cCode Web Solutions - Modular Section Loader (Optional Dev Utility)
 * Allows dynamically loading section HTML partials into designated containers.
 */

async function loadSection(containerId, sectionFilePath) {
  const container = document.getElementById(containerId);
  if (!container) return;
  try {
    const response = await fetch(sectionFilePath);
    if (response.ok) {
      container.innerHTML = await response.text();
    }
  } catch (err) {
    console.warn(`Modular section ${sectionFilePath} loaded statically.`);
  }
}

window.cCodeSectionLoader = {
  loadSection,
  loadAll: async function() {
    const sections = [
      { id: 'header-root', file: 'sections/header.html' },
      { id: 'hero-root', file: 'sections/hero.html' },
      { id: 'services-root', file: 'sections/services.html' },
      { id: 'pricing-root', file: 'sections/pricing.html' },
      { id: 'calculator-root', file: 'sections/calculator.html' },
      { id: 'process-root', file: 'sections/process.html' },
      { id: 'faq-root', file: 'sections/faq.html' },
      { id: 'contact-root', file: 'sections/contact.html' },
      { id: 'footer-root', file: 'sections/footer.html' }
    ];
    for (const sec of sections) {
      await loadSection(sec.id, sec.file);
    }
  }
};
