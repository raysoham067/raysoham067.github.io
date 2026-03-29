// ===== Mobile Navigation Toggle =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
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
}

// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        const targetID = anchor.getAttribute('href');
        const target = document.querySelector(targetID);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== Navbar Scroll Effect =====
(() => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    let ticking = false;
    const baseBg = 'rgba(15, 23, 42, 0.8)';
    const scrolledBg = 'rgba(15, 23, 42, 0.95)';
    
    function updateNavbar() {
        const scrolled = window.scrollY > 80;
        navbar.style.background = scrolled ? scrolledBg : baseBg;
        navbar.style.boxShadow = scrolled ? '0 4px 20px rgba(0,0,0,0.2)' : 'none';
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }, { passive: true });
})();

// ===== Contact Form =====
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async e => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const name = formData.get('name')?.trim();
        const email = formData.get('email')?.trim();
        const subject = formData.get('subject')?.trim();
        const message = formData.get('message')?.trim();

        if (!name || !email || !subject || !message)
            return showNotification('Please fill in all fields.', 'error');

        if (!isValidEmail(email))
            return showNotification('Please enter a valid email address.', 'error');

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate form sending
        setTimeout(() => {
            contactForm.reset();
            showNotification('Message sent successfully! I’ll get back to you soon.', 'success');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1200);
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ===== Notifications =====
function showNotification(message, type = 'info') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const colors = {
        success: '#10b981',
        error: '#ef4444',
        info: '#3b82f6'
    };

    const notif = document.createElement('div');
    notif.className = `notification notification-${type}`;
    notif.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    notif.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type] || '#3b82f6'};
        color: #fff;
        padding: 14px 20px;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.25);
        z-index: 9999;
        opacity: 0;
        transform: translateY(-10px);
        transition: all 0.3s ease;
    `;

    document.body.appendChild(notif);
    setTimeout(() => {
        notif.style.opacity = '1';
        notif.style.transform = 'translateY(0)';
    }, 50);

    setTimeout(() => removeNotification(notif), 4500);

    notif.querySelector('.notification-close').addEventListener('click', () => removeNotification(notif));
}

function removeNotification(notif) {
    notif.style.opacity = '0';
    notif.style.transform = 'translateY(-10px)';
    setTimeout(() => notif.remove(), 300);
}

// ===== Fade-In Animation on Scroll =====
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -40px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const animatedEls = document.querySelectorAll('.skill-category, .project-card, .stat');
    animatedEls.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
});

// ===== Typing Effect for Hero Title =====
function typeWriter(element, text, speed = 60) {
    let i = 0;
    element.textContent = '';
    (function typing() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    })();
}

document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        typeWriter(heroTitle, text, 45);
    }
});

// ===== Page Loading Animation =====
window.addEventListener('load', () => document.body.classList.add('loaded'));

// ===== Inject Minor CSS Enhancements =====
const style = document.createElement('style');
style.textContent = `
    body:not(.loaded) {
        overflow: hidden;
    }

    .hero-content {
        opacity: 0;
        transform: translateY(25px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }

    body.loaded .hero-content {
        opacity: 1;
        transform: translateY(0);
    }

    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }

    .notification-close {
        background: none;
        border: none;
        color: #fff;
        font-size: 1.4rem;
        cursor: pointer;
        line-height: 1;
    }

    .btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
`;
document.head.appendChild(style);
