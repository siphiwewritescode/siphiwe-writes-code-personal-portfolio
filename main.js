/* ============================================================
   SCROLL REVEAL — Intersection Observer
   ============================================================ */
(function () {
  'use strict';

  /* ── Reveal items ──────────────────────────────────────── */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target); // fire once
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach((el) => {
    revealObserver.observe(el);
  });

  /* ── Active nav link on scroll ─────────────────────────── */
  const sections = document.querySelectorAll('section[id], footer');
  const navLinks  = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((link) => {
            link.classList.toggle(
              'active',
              link.getAttribute('href') === `#${id}`
            );
          });
        }
      });
    },
    { threshold: 0.35 }
  );

  sections.forEach((s) => sectionObserver.observe(s));

  /* ── Skill pill stagger on card entry ──────────────────── */
  const pillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const pills = entry.target.querySelectorAll('.pill');
          pills.forEach((pill, i) => {
            pill.style.transitionDelay = `${i * 0.05}s`;
            pill.style.opacity = '0';
            pill.style.transform = 'scale(0.85)';
            pill.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            // Trigger next frame
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                pill.style.opacity = '1';
                pill.style.transform = 'scale(1)';
              });
            });
          });
          pillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll('.skill-card').forEach((card) => {
    pillObserver.observe(card);
  });

  /* ── Stat number count-up animation ───────────────────── */
  function countUp(el, target, suffix, duration) {
    const start  = performance.now();
    const isInt  = Number.isInteger(target);

    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased    = 1 - Math.pow(1 - progress, 3);
      const value    = eased * target;
      el.textContent = (isInt ? Math.floor(value) : value.toFixed(1)) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const numEl   = entry.target.querySelector('.stat-num');
          const text    = numEl.textContent.trim();
          const suffix  = text.replace(/[\d.]/g, ''); // e.g. "+"
          const value   = parseFloat(text);
          if (!isNaN(value)) countUp(numEl, value, suffix, 1200);
          statObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.8 }
  );

  document.querySelectorAll('.stat').forEach((stat) => {
    statObserver.observe(stat);
  });

  /* ── Scroll-progress glow on nav ──────────────────────── */
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 20;
    nav.style.background = scrolled
      ? 'rgba(8,12,16,0.92)'
      : 'rgba(8,12,16,0.72)';
  }, { passive: true });

  /* ── Timeline dot pulse on entry ─────────────────────── */
  const dotObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const dot = entry.target.querySelector('.tl-dot');
          if (dot) {
            dot.style.animation = 'none';
            dot.style.transform = 'scale(0)';
            dot.style.transition = 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)';
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                dot.style.transform = 'scale(1)';
              });
            });
          }
          dotObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  document.querySelectorAll('.tl-item').forEach((item) => {
    dotObserver.observe(item);
  });

  /* ── Contact form — Formspree AJAX submit ─────────────────── */
  const contactForm  = document.getElementById('contact-form');
  const submitBtn    = document.getElementById('submit-btn');
  const formSuccess  = document.getElementById('form-success');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      submitBtn.textContent = 'SENDING…';
      submitBtn.disabled = true;

      try {
        const res = await fetch(contactForm.action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { 'Accept': 'application/json' }
        });

        if (res.ok) {
          submitBtn.textContent = 'SENT';
          contactForm.querySelectorAll('input, textarea').forEach(el => el.disabled = true);
          contactForm.reset();
          formSuccess.style.display = '';
          formSuccess.classList.add('visible');
        } else {
          const data = await res.json();
          const msg  = data.errors ? data.errors.map(e => e.message).join(', ') : 'Something went wrong.';
          alert('Error: ' + msg);
          submitBtn.textContent = 'SEND MESSAGE';
          submitBtn.disabled = false;
        }
      } catch (_) {
        alert('Network error — please try again.');
        submitBtn.textContent = 'SEND MESSAGE';
        submitBtn.disabled = false;
      }
    });
  }

})();
