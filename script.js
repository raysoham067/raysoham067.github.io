'use strict';

/* ── NAVBAR ── */
const navbar  = document.getElementById('navbar');
const burger  = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
const allNl   = document.querySelectorAll('.nl');

// Sticky style on scroll
window.addEventListener('scroll', () => {
  navbar.classList.toggle('stuck', window.scrollY > 50);
  highlightActiveLink();
}, { passive: true });

// Burger toggle
burger.addEventListener('click', () => {
  const isOpen = burger.classList.toggle('open');
  navLinks.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close menu on link click
allNl.forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// Highlight active section link
function highlightActiveLink() {
  const scrollY = window.scrollY + 100;
  document.querySelectorAll('section[id]').forEach(sec => {
    const top    = sec.offsetTop;
    const bottom = top + sec.offsetHeight;
    const link   = document.querySelector(`.nl[href="#${sec.id}"]`);
    if (link) link.classList.toggle('active', scrollY >= top && scrollY < bottom);
  });
}

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const id = anchor.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── SCROLL REVEAL ── */
const revealEls = document.querySelectorAll(
  '.hero-eyebrow, .hero-h1, .hero-role, .hero-desc, .hero-actions, .hero-stats, .hero-photo,' +
  ' .about-img-wrap, .about-body,' +
  ' .skill-card, .proj-card,' +
  ' .contact-info, .contact-form,' +
  ' .sec-tag, .sec-title'
);

revealEls.forEach(el => el.setAttribute('data-reveal', ''));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const delay = parseInt(entry.target.dataset.delay || 0, 10);
    setTimeout(() => entry.target.classList.add('visible'), delay);
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

/* ── CONTACT FORM ── */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();

    const name    = form.name.value.trim();
    const email   = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !subject || !message) {
      showToast('Please fill in all fields.', 'error');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }

    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = 'Sending… <i class="fas fa-spinner fa-spin"></i>';

    // Simulate send — replace with real backend call if needed
    setTimeout(() => {
      showToast("Message sent! I'll get back to you soon.", 'success');
      form.reset();
      btn.disabled = false;
      btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
    }, 1500);
  });
}

/* ── TOAST ── */
function showToast(msg, type = 'info') {
  const toast = document.getElementById('toast');
  const icon  = type === 'success'
    ? '<i class="fas fa-check-circle"></i>'
    : '<i class="fas fa-exclamation-circle"></i>';

  toast.className = `toast ${type}`;
  toast.innerHTML = `${icon} ${msg}`;
  toast.classList.add('show');

  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 4500);
}
