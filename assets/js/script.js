/**
 * cCode Web Solutions - Master JavaScript Engine
 * Features:
 * 1. Ambient Pure Purple Mouse Glow Follower (Compact 240px Spotlight)
 * 2. Wide-Angle Hero Section 3D Card Pointer Reactivity
 * 3. AOS (Animate On Scroll) Entrance Animation Engine
 * 4. Calibrated Section-by-Section Wheel Transition Engine
 * 5. Side Dot & Navbar Real-Time Observer
 * 6. Theme Toggle, Typewriter Animation, 3D Card Tilt, Counter Animations,
 *    FAQ Accordion, and Web3Forms AJAX Submissions.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 0. AOS (Animate On Scroll) Engine (Two-Way Up & Down Animations)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 650,
      easing: 'ease-out-cubic',
      once: false,
      mirror: true,
      offset: 35
    });
  }

  // 1. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');

  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
      mobileMenuBtn.classList.toggle('active');
      mainNav.classList.toggle('open');
      document.body.classList.toggle('no-scroll', !isExpanded);
    });

    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.classList.remove('active');
        mainNav.classList.remove('open');
        document.body.classList.remove('no-scroll');
      });
    });
  }

  // 2. Ambient Pure Purple Mouse Glow Follower Engine (Compact 240px)
  const cursorGlow = document.getElementById('cursorGlow');
  if (cursorGlow && window.innerWidth >= 992) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let glowX = mouseX;
    let glowY = mouseY;
    let isMoving = false;

    window.addEventListener('pointermove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isMoving) {
        cursorGlow.classList.add('is-active');
        isMoving = true;
      }
    });

    window.addEventListener('pointerleave', () => {
      cursorGlow.classList.remove('is-active');
      isMoving = false;
    });

    // Smooth Lerp Animation Frame
    function animateGlow() {
      glowX += (mouseX - glowX) * 0.15;
      glowY += (mouseY - glowY) * 0.15;
      cursorGlow.style.left = `${glowX}px`;
      cursorGlow.style.top = `${glowY}px`;
      requestAnimationFrame(animateGlow);
    }
    requestAnimationFrame(animateGlow);

    // Cleanly fade out cursor glow on buttons/CTAs/inputs to keep text and gradients 100% crisp
    const btnSelectors = 'button, .btn, a.btn, a.btn-icon-wa, a.floating-action-wa, .theme-toggle-btn, .mobile-menu-btn, input, select, textarea';
    document.querySelectorAll(btnSelectors).forEach(btn => {
      btn.addEventListener('pointerenter', () => cursorGlow.classList.add('is-btn-hovered'));
      btn.addEventListener('pointerleave', () => cursorGlow.classList.remove('is-btn-hovered'));
    });
  }

  // 4. Wide-Angle Hero Section 3D Card & Ambient Glow Mesh Reactivity
  const heroSection = document.getElementById('home');
  const heroCard = document.querySelector('.hero-image-card');
  const heroMesh = document.querySelector('.hero-glow-mesh');

  if (heroSection && heroCard) {
    heroSection.addEventListener('pointermove', (e) => {
      if (window.innerWidth < 992) return;
      const rect = heroSection.getBoundingClientRect();
      const relX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const relY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

      const rotateY = relX * 12;
      const rotateX = -relY * 10;

      heroCard.style.transform = `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
      
      const sheenX = ((relX + 1) / 2 * 100).toFixed(1);
      const sheenY = ((relY + 1) / 2 * 100).toFixed(1);
      heroCard.style.setProperty('--sheen-x', `${sheenX}%`);
      heroCard.style.setProperty('--sheen-y', `${sheenY}%`);

      if (heroMesh) {
        heroMesh.style.transform = `translate3d(${(-relX * 24).toFixed(1)}px, ${(-relY * 18).toFixed(1)}px, 0)`;
      }
    });

    heroSection.addEventListener('pointerleave', () => {
      heroCard.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0)';
      heroCard.style.setProperty('--sheen-x', '50%');
      heroCard.style.setProperty('--sheen-y', '50%');
      if (heroMesh) {
        heroMesh.style.transform = 'translate3d(0, 0, 0)';
      }
    });
  }

  // 4b. Ambient Section Glow Mesh Parallax for all other sections
  document.querySelectorAll('section:not(#home)').forEach(sec => {
    const mesh = sec.querySelector('.section-glow-mesh');
    if (!mesh) return;
    sec.addEventListener('pointermove', (e) => {
      if (window.innerWidth < 992) return;
      const rect = sec.getBoundingClientRect();
      const relX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const relY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      mesh.style.transform = `translate3d(${(-relX * 18).toFixed(1)}px, ${(-relY * 14).toFixed(1)}px, 0)`;
    });
    sec.addEventListener('pointerleave', () => {
      mesh.style.transform = 'translate3d(0, 0, 0)';
    });
  });

  // 5. Calibrated Section-by-Section Wheel Transition Controller
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const navLinks = document.querySelectorAll('.main-nav .nav-link');
  const dotLinks = document.querySelectorAll('.section-dot-nav .dot-item');
  let isNavigating = false;
  let lastScrollTime = 0;

  function updateActiveIndicators(id) {
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
    dotLinks.forEach(dot => {
      dot.classList.toggle('active', dot.getAttribute('data-section') === id);
    });

    // Completely remove any '#' hash from the browser address bar at all times
    try {
      if (window.location.hash) {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    } catch (e) {}
  }

  function getClosestSectionIndex() {
    const scrollY = window.scrollY;
    let closestIdx = 0;
    let minDiff = Infinity;
    sections.forEach((sec, idx) => {
      const diff = Math.abs(sec.offsetTop - scrollY);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = idx;
      }
    });
    return closestIdx;
  }

  function goToSection(index) {
    if (index < 0 || index >= sections.length) return;
    isNavigating = true;
    lastScrollTime = Date.now();
    const targetSection = sections[index];
    const targetId = targetSection.getAttribute('id');

    updateActiveIndicators(targetId);

    window.scrollTo({
      top: targetSection.offsetTop,
      behavior: 'smooth'
    });

    setTimeout(() => {
      isNavigating = false;
      if (typeof AOS !== 'undefined') AOS.refresh();
    }, 480);
  }

  function goToFooter() {
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    isNavigating = true;
    lastScrollTime = Date.now();
    updateActiveIndicators('contact');

    window.scrollTo({
      top: maxScroll,
      behavior: 'smooth'
    });

    setTimeout(() => {
      isNavigating = false;
      if (typeof AOS !== 'undefined') AOS.refresh();
    }, 480);
  }

  // Helper: check if user is actively typing in text fields
  function isUserTyping() {
    const active = document.activeElement;
    if (!active) return false;
    if (active.tagName === 'TEXTAREA') return true;
    if (active.tagName === 'INPUT') {
      const textTypes = ['text', 'email', 'tel', 'password', 'search', 'number', 'url'];
      return textTypes.includes(active.type);
    }
    return false;
  }

  // Wheel Event Listener (Exactly One Section per Deliberate Gesture, Full Footer Reveal)
  window.addEventListener('wheel', (e) => {
    if (window.innerWidth < 992) return;
    if (isUserTyping()) return;

    const now = Date.now();
    if (isNavigating || (now - lastScrollTime < 480)) {
      e.preventDefault();
      return;
    }

    const threshold = 18;
    const lastSection = sections[sections.length - 1];
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    if (e.deltaY > threshold) {
      // Downward Scroll
      const currentIdx = getClosestSectionIndex();
      if (currentIdx < sections.length - 1) {
        e.preventDefault();
        goToSection(currentIdx + 1);
      } else if (lastSection && window.scrollY < maxScroll - 20) {
        // From Contact section to full Footer in one single smooth scroll
        e.preventDefault();
        goToFooter();
      }
    } else if (e.deltaY < -threshold) {
      // Upward Scroll
      e.preventDefault();
      if (lastSection && window.scrollY > lastSection.offsetTop + 35) {
        // From Footer back to Contact section in one single smooth scroll
        goToSection(sections.length - 1);
      } else {
        const currentIdx = getClosestSectionIndex();
        if (currentIdx > 0) {
          goToSection(currentIdx - 1);
        } else {
          goToSection(0);
        }
      }
    }
  }, { passive: false });

  // Keyboard Keys Section Navigation
  window.addEventListener('keydown', (e) => {
    if (isUserTyping()) return;
    const currentIdx = getClosestSectionIndex();
    const lastSection = sections[sections.length - 1];
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    if (['ArrowDown', 'PageDown'].includes(e.key)) {
      if (currentIdx < sections.length - 1) {
        e.preventDefault();
        goToSection(currentIdx + 1);
      } else if (lastSection && window.scrollY < maxScroll - 20) {
        e.preventDefault();
        goToFooter();
      }
    } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
      e.preventDefault();
      if (lastSection && window.scrollY > lastSection.offsetTop + 35) {
        goToSection(sections.length - 1);
      } else if (currentIdx > 0) {
        goToSection(currentIdx - 1);
      } else {
        goToSection(0);
      }
    }
  });

  // Handle all internal hash links (Brand Logo, Nav, CTA buttons, Footer links)
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const targetSec = document.querySelector(href);
      if (targetSec) {
        const idx = sections.indexOf(targetSec);
        if (idx !== -1) {
          e.preventDefault();
          goToSection(idx);
        }
      }
    });
  });

  // Real-time Active Indicator Observer
  const navObserver = new IntersectionObserver((entries) => {
    if (isNavigating) return;
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        updateActiveIndicators(id);
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(sec => navObserver.observe(sec));

  // Clean any '#' hash from address bar completely on page load
  if (window.location.hash) {
    try {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    } catch (e) {}
  }

  // 6. Hero Looping Typewriter Effect
  const typewriterWordEl = document.getElementById('heroTypewriterWord');
  if (typewriterWordEl) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      const words = ['Growth.', 'Speed.', 'Results.', 'Success.', 'Scale.'];
      let wordIdx = 0;
      let charIdx = 0;
      let isDeleting = false;

      function typeLoop() {
        const currentWord = words[wordIdx];
        if (!isDeleting) {
          charIdx++;
          typewriterWordEl.textContent = currentWord.slice(0, charIdx);
          if (charIdx === currentWord.length) {
            isDeleting = true;
            setTimeout(typeLoop, 2000);
            return;
          }
          setTimeout(typeLoop, 90);
        } else {
          charIdx--;
          typewriterWordEl.textContent = currentWord.slice(0, charIdx);
          if (charIdx === 0) {
            isDeleting = false;
            wordIdx = (wordIdx + 1) % words.length;
            setTimeout(typeLoop, 400);
            return;
          }
          setTimeout(typeLoop, 45);
        }
      }
      typeLoop();
    }
  }

  // 7. Interactive Cards (Clean & Pure CSS-driven)

  // 8. Animated Count-Up Numbers
  const countElements = document.querySelectorAll('.count-up');
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        countElements.forEach(el => {
          const target = parseInt(el.getAttribute('data-target'), 10) || 0;
          const suffix = el.getAttribute('data-suffix') || '';
          const duration = 1200;
          const startTime = performance.now();

          function updateCount(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.round(target * easeProgress);
            el.textContent = `${currentVal}${suffix}`;

            if (progress < 1) {
              requestAnimationFrame(updateCount);
            } else {
              el.textContent = `${target}${suffix}`;
            }
          }
          requestAnimationFrame(updateCount);
        });
        countObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const metricsWrap = document.querySelector('.hero-metrics');
  if (metricsWrap) countObserver.observe(metricsWrap);

  // 9. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(other => {
          other.classList.remove('active');
          other.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
        });
        if (!isActive) {
          item.classList.add('active');
          questionBtn.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  // 10. Web3Forms AJAX Contact Submission
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatusMsg');
  const submitBtn = document.getElementById('formSubmitBtn');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const json = JSON.stringify(Object.fromEntries(formData));

      formStatus.textContent = "Sending your inquiry...";
      formStatus.className = "form-status-feedback pending";
      if (submitBtn) submitBtn.disabled = true;

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: json
      })
      .then(async (response) => {
        let resJson = await response.json();
        if (response.status === 200) {
          formStatus.textContent = "Thank you! Your message was sent successfully. We will reach out shortly!";
          formStatus.className = "form-status-feedback success";
          contactForm.reset();
        } else {
          formStatus.textContent = resJson.message || "Failed to send message.";
          formStatus.className = "form-status-feedback error";
        }
      })
      .catch(error => {
        formStatus.textContent = "Network error. Please chat directly on WhatsApp!";
        formStatus.className = "form-status-feedback error";
      })
      .finally(() => {
        if (submitBtn) submitBtn.disabled = false;
      });
    });
  }

  // 11. Dynamic Year Update
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
