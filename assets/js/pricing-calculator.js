/**
 * cCode Web Solutions - Interactive Project Cost Calculator
 */

document.addEventListener('DOMContentLoaded', () => {
  const typeRadios = document.querySelectorAll('input[name="calcType"]');
  const pagesRange = document.getElementById('calcPagesRange');
  const pagesBadge = document.getElementById('calcPagesBadge');
  const totalAmountEl = document.getElementById('calcTotalAmount');
  const tierNameEl = document.getElementById('summaryTierName');
  const pagesCountEl = document.getElementById('summaryPagesCount');
  const deliveryTimeEl = document.getElementById('summaryDeliveryTime');
  const waBtn = document.getElementById('calcWhatsAppBtn');

  // Checkbox add-ons
  const checkPayment = document.getElementById('checkPayment');
  const checkCMS = document.getElementById('checkCMS');
  const checkSEO = document.getElementById('checkSEO');
  const checkSpeed = document.getElementById('checkSpeed');
  const checkDomain = document.getElementById('checkDomain');

  if (!pagesRange || !totalAmountEl) return;

  const basePrices = {
    landing: { name: 'Starter Package (1-5 Pages)', base: 39900, pageRate: 3500, delivery: '3 - 5 Days' },
    business: { name: 'Business Package', base: 69900, pageRate: 5000, delivery: '5 - 8 Days' },
    ecommerce: { name: 'E-Commerce Online Store', base: 149900, pageRate: 6500, delivery: '10 - 14 Days' },
    custom: { name: 'Custom Web Application', base: 249900, pageRate: 8500, delivery: '14 - 21 Days' }
  };

  function calculateEstimate() {
    // 1. Get Selected Type
    let selectedType = 'landing';
    typeRadios.forEach(radio => {
      if (radio.checked) selectedType = radio.value;
      const pill = radio.closest('.calc-pill');
      if (pill) pill.classList.toggle('active', radio.checked);
    });

    const tier = basePrices[selectedType] || basePrices.landing;
    const pages = parseInt(pagesRange.value, 10);

    // Update range badge
    pagesBadge.textContent = `${pages} ${pages === 1 ? 'Page' : 'Pages'}`;

    // Base price + extra page costs if exceeding minimum
    let base = tier.base;
    let extraPages = 0;
    if (selectedType === 'landing' && pages > 5) extraPages = pages - 5;
    if (selectedType === 'business' && pages > 8) extraPages = pages - 8;
    if (selectedType === 'ecommerce' && pages > 12) extraPages = pages - 12;
    if (selectedType === 'custom' && pages > 15) extraPages = pages - 15;

    let total = base + (extraPages * tier.pageRate);

    // Add selected add-ons
    const addOns = [];
    if (checkPayment && checkPayment.checked) { total += parseInt(checkPayment.value, 10); addOns.push('Payment Gateway'); }
    if (checkCMS && checkCMS.checked) { total += parseInt(checkCMS.value, 10); addOns.push('CMS Management'); }
    if (checkSEO && checkSEO.checked) { total += parseInt(checkSEO.value, 10); addOns.push('Advanced SEO'); }
    if (checkSpeed && checkSpeed.checked) { total += parseInt(checkSpeed.value, 10); addOns.push('Speed Boost'); }
    if (checkDomain && checkDomain.checked) { total += parseInt(checkDomain.value, 10); addOns.push('Domain & Hosting'); }

    // Format currency string (e.g. 39,900)
    totalAmountEl.textContent = total.toLocaleString('en-US');
    if (tierNameEl) tierNameEl.textContent = tier.name;
    if (pagesCountEl) pagesCountEl.textContent = `${pages} Pages / Sections`;
    if (deliveryTimeEl) deliveryTimeEl.textContent = tier.delivery;

    // Generate Pre-filled WhatsApp Message Link
    const waText = encodeURIComponent(
      `Hi cCode Web Solutions! 👋\nI used your Website Price Estimator:\n\n` +
      `📌 Type: ${tier.name}\n` +
      `📄 Scope: ${pages} Pages\n` +
      `⚡ Features: ${addOns.length > 0 ? addOns.join(', ') : 'Standard'}\n` +
      `💰 Estimated Total: Rs. ${total.toLocaleString('en-US')}\n\n` +
      `I'd like to discuss getting started with this project!`
    );

    if (waBtn) {
      waBtn.href = `https://wa.me/94759615618?text=${waText}`;
    }
  }

  // Attach event listeners
  typeRadios.forEach(radio => radio.addEventListener('change', calculateEstimate));
  pagesRange.addEventListener('input', calculateEstimate);
  pagesRange.addEventListener('pointerup', () => pagesRange.blur());
  pagesRange.addEventListener('touchend', () => pagesRange.blur());
  pagesRange.addEventListener('change', () => {
    calculateEstimate();
    pagesRange.blur();
  });
  [checkPayment, checkCMS, checkSEO, checkSpeed, checkDomain].forEach(el => {
    if (el) el.addEventListener('change', calculateEstimate);
  });

  // Initial Calculation
  calculateEstimate();
});
