/* ===========================
   CUSTOM CURSOR
=========================== */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

function animateFollower() {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
}
animateFollower();

// Cursor scale on hover
document.querySelectorAll('a, button, .btn, .project-card, .skill-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(2)';
        cursor.style.background = 'rgba(124,58,237,0.4)';
        follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.background = '#7c3aed';
        follower.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

/* ===========================
   NAVBAR
=========================== */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

// Scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, { passive: true });

// Mobile toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active link on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 100;
    sections.forEach(sec => {
        if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            const active = document.querySelector(`.nav-link[href="#${sec.id}"]`);
            if (active) active.classList.add('active');
        }
    });
}, { passive: true });

/* ===========================
   SCROLL REVEAL
=========================== */
const reveals = document.querySelectorAll('.reveal, .skill-card, .project-card, .contact-link, .about-img-wrap, .about-text-col');

reveals.forEach(el => {
    if (!el.classList.contains('reveal')) {
        el.classList.add('reveal');
    }
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, 80);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ===========================
   STAGGERED REVEAL FOR GRIDS
=========================== */
function staggerReveal(selector) {
    const items = document.querySelectorAll(selector);
    const gridObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                items.forEach((item, i) => {
                    setTimeout(() => item.classList.add('visible'), i * 120);
                });
                gridObserver.disconnect();
            }
        });
    }, { threshold: 0.1 });
    if (items.length) gridObserver.observe(items[0].closest('section') || items[0]);
}

staggerReveal('.skill-card');
staggerReveal('.project-card');

/* ===========================
   SMOOTH SCROLL
=========================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

/* ===========================
   CONTACT FORM
=========================== */
const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const subject = form.subject.value.trim();
        const message = form.message.value.trim();

        if (!name || !email || !subject || !message) {
            showToast('Please fill in all fields.', 'error');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showToast('Please enter a valid email.', 'error');
            return;
        }

        const btn = form.querySelector('button[type="submit"]');
        btn.disabled = true;
        btn.innerHTML = '<span>Sending…</span> <i class="fas fa-spinner fa-spin"></i>';

        setTimeout(() => {
            showToast('Message sent! I\'ll be in touch soon.', 'success');
            form.reset();
            btn.disabled = false;
            btn.innerHTML = '<span>Send Message</span> <i class="fas fa-paper-plane"></i>';
        }, 1600);
    });
}

/* ===========================
   TOAST NOTIFICATION
=========================== */
function showToast(msg, type = 'info') {
    const old = document.querySelector('.toast');
    if (old) old.remove();

    const colors = { success: '#10b981', error: '#ef4444', info: '#7c3aed' };
    const icons = { success: 'fa-check-circle', error: 'fa-exclamation-circle', info: 'fa-info-circle' };

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fas ${icons[type]}"></i> ${msg}`;
    toast.style.cssText = `
        position: fixed; bottom: 30px; right: 30px;
        background: ${colors[type]};
        color: white;
        padding: 14px 22px;
        border-radius: 12px;
        font-family: 'DM Sans', sans-serif;
        font-size: 0.9rem;
        font-weight: 500;
        display: flex; align-items: center; gap: 10px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.4);
        z-index: 99999;
        transform: translateY(20px); opacity: 0;
        transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        max-width: 380px;
    `;
    document.body.appendChild(toast);
    requestAnimationFrame(() => {
        toast.style.transform = 'translateY(0)';
        toast.style.opacity = '1';
    });
    setTimeout(() => {
        toast.style.transform = 'translateY(20px)';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 350);
    }, 4500);
}

/* ===========================
   PAGE LOAD
=========================== */
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    requestAnimationFrame(() => { document.body.style.opacity = '1'; });
});
