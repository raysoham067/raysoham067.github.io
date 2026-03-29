/* ===========================
   CSS VARIABLES & RESET
=========================== */
:root {
    --bg: #09090f;
    --bg-2: #0f0f1a;
    --bg-card: #13131f;
    --border: rgba(255,255,255,0.07);
    --border-hover: rgba(255,255,255,0.15);
    --text: #e8e8f0;
    --text-muted: #7a7a9a;
    --accent: #7c3aed;
    --accent-2: #06b6d4;
    --accent-glow: rgba(124, 58, 237, 0.35);
    --accent-2-glow: rgba(6, 182, 212, 0.3);
    --white: #ffffff;
    --font-display: 'Syne', sans-serif;
    --font-body: 'DM Sans', sans-serif;
    --radius: 16px;
    --radius-lg: 24px;
    --transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

*, *::before, *::after {
    margin: 0; padding: 0; box-sizing: border-box;
}

html { scroll-behavior: smooth; }

body {
    font-family: var(--font-body);
    background: var(--bg);
    color: var(--text);
    line-height: 1.7;
    overflow-x: hidden;
    cursor: none;
}

a { text-decoration: none; color: inherit; }
img { max-width: 100%; display: block; }

.container {
    max-width: 1180px;
    margin: 0 auto;
    padding: 0 24px;
}

/* Noise overlay */
.noise {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 9999;
    opacity: 0.03;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* ===========================
   CUSTOM CURSOR
=========================== */
.cursor {
    width: 10px; height: 10px;
    background: var(--accent);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 99999;
    transform: translate(-50%, -50%);
    transition: transform 0.1s, width 0.2s, height 0.2s, background 0.2s;
    mix-blend-mode: screen;
}
.cursor-follower {
    width: 36px; height: 36px;
    border: 1.5px solid rgba(124,58,237,0.5);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 99998;
    transform: translate(-50%, -50%);
    transition: transform 0.12s ease, width 0.3s, height 0.3s;
}
body:hover .cursor { opacity: 1; }

/* ===========================
   NAVBAR
=========================== */
.navbar {
    position: fixed;
    top: 0; width: 100%;
    z-index: 1000;
    padding: 1.1rem 0;
    transition: all 0.4s ease;
}
.navbar.scrolled {
    background: rgba(9,9,15,0.9);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
}
.nav-container {
    max-width: 1180px;
    margin: 0 auto;
    padding: 0 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.nav-logo a {
    font-family: var(--font-display);
    font-size: 1.6rem;
    font-weight: 800;
    color: var(--white);
    letter-spacing: -1px;
}
.dot { color: var(--accent); }

.nav-menu {
    display: flex; list-style: none; gap: 2.5rem;
}
.nav-link {
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--text-muted);
    letter-spacing: 0.02em;
    position: relative;
    transition: color var(--transition);
}
.nav-link::after {
    content: '';
    position: absolute; bottom: -4px; left: 0;
    width: 0; height: 1.5px;
    background: var(--accent);
    transition: width var(--transition);
}
.nav-link:hover { color: var(--white); }
.nav-link:hover::after { width: 100%; }

.hamburger {
    display: none; flex-direction: column;
    cursor: pointer; gap: 6px;
}
.hamburger span {
    width: 24px; height: 2px;
    background: var(--text);
    transition: var(--transition);
    display: block;
}
.hamburger.active span:nth-child(1) { transform: rotate(45deg) translate(5px, 6px); }
.hamburger.active span:nth-child(2) { opacity: 0; }

/* ===========================
   HERO
=========================== */
.hero {
    min-height: 100vh;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    position: relative;
    padding: 100px 24px 60px;
    overflow: hidden;
}
.hero-bg {
    position: absolute; inset: 0;
    pointer-events: none; overflow: hidden;
}
.hero-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.45;
    animation: orbFloat 8s ease-in-out infinite;
}
.orb-1 { width: 500px; height: 500px; background: radial-gradient(circle, #7c3aed, transparent 70%); top: -120px; left: -100px; animation-delay: 0s; }
.orb-2 { width: 400px; height: 400px; background: radial-gradient(circle, #06b6d4, transparent 70%); bottom: -80px; right: -80px; animation-delay: -3s; }
.orb-3 { width: 300px; height: 300px; background: radial-gradient(circle, #a855f7, transparent 70%); top: 50%; left: 50%; transform: translate(-50%,-50%); animation-delay: -5s; opacity: 0.2; }

.grid-lines {
    position: absolute; inset: 0;
    background-image:
        linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
    background-size: 60px 60px;
}

@keyframes orbFloat {
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-30px) scale(1.05); }
}

.hero-container {
    max-width: 1180px;
    width: 100%;
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 5rem;
    align-items: center;
    position: relative; z-index: 1;
}

.hero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(124,58,237,0.12);
    border: 1px solid rgba(124,58,237,0.3);
    color: #c4b5fd;
    font-size: 0.8rem;
    font-weight: 500;
    padding: 6px 16px;
    border-radius: 100px;
    margin-bottom: 1.8rem;
    letter-spacing: 0.03em;
}
.badge-dot {
    width: 7px; height: 7px;
    background: #4ade80;
    border-radius: 50%;
    animation: pulse 2s infinite;
}
@keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.6; transform: scale(0.8); }
}

.hero-title {
    font-family: var(--font-display);
    font-size: clamp(3.5rem, 7vw, 6rem);
    font-weight: 800;
    line-height: 1;
    letter-spacing: -3px;
    margin-bottom: 1.2rem;
    color: var(--white);
}
.hero-title .line { display: block; }
.name-line { color: var(--white); }
.accent { color: var(--accent); }

.hero-subtitle {
    font-family: var(--font-display);
    font-size: clamp(1.1rem, 2.5vw, 1.5rem);
    font-weight: 400;
    color: var(--text-muted);
    margin-bottom: 1.5rem;
    letter-spacing: -0.5px;
}
.amp { color: var(--accent-2); }

.hero-description {
    font-size: 1.05rem;
    color: var(--text-muted);
    max-width: 500px;
    margin-bottom: 2.5rem;
    line-height: 1.8;
}

.hero-buttons {
    display: flex; gap: 1rem; flex-wrap: wrap;
    margin-bottom: 3rem;
}

.btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 12px 26px;
    border-radius: 100px;
    font-family: var(--font-body);
    font-size: 0.9rem;
    font-weight: 500;
    border: none;
    cursor: pointer;
    transition: all var(--transition);
    position: relative;
    overflow: hidden;
}
.btn::before {
    content: ''; position: absolute; inset: 0;
    background: rgba(255,255,255,0.08);
    opacity: 0; transition: opacity var(--transition);
}
.btn:hover::before { opacity: 1; }

.btn-primary {
    background: var(--accent);
    color: white;
    box-shadow: 0 0 30px var(--accent-glow);
}
.btn-primary:hover { transform: translateY(-3px); box-shadow: 0 8px 40px var(--accent-glow); }

.btn-ghost {
    background: transparent;
    color: var(--text);
    border: 1px solid var(--border-hover);
}
.btn-ghost:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-3px); }

.btn-outline {
    background: transparent;
    color: var(--text-muted);
    border: 1px solid var(--border);
    font-size: 0.85rem;
    padding: 10px 20px;
}
.btn-outline:hover { color: var(--white); border-color: var(--border-hover); }

.btn-full { width: 100%; justify-content: center; border-radius: var(--radius); }

.hero-stats {
    display: flex; align-items: center; gap: 2rem;
}
.stat-item { display: flex; flex-direction: column; }
.stat-num {
    font-family: var(--font-display);
    font-size: 2rem;
    font-weight: 800;
    color: var(--white);
    line-height: 1;
}
.stat-label { font-size: 0.78rem; color: var(--text-muted); margin-top: 4px; }
.stat-divider { width: 1px; height: 40px; background: var(--border); }

/* Profile */
.hero-image { display: flex; justify-content: center; align-items: center; }
.profile-ring { position: relative; width: 340px; height: 340px; }

.profile-picture {
    width: 300px; height: 300px;
    border-radius: 50%; overflow: hidden;
    position: absolute; top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    border: 3px solid rgba(124,58,237,0.4);
    box-shadow: 0 0 60px rgba(124,58,237,0.3);
    z-index: 2;
}
.profile-img { width: 100%; height: 100%; object-fit: cover; }

.ring {
    position: absolute; border-radius: 50%;
    top: 50%; left: 50%; transform: translate(-50%, -50%);
    animation: ringRotate 12s linear infinite;
}
.ring-1 {
    width: 340px; height: 340px;
    border: 1.5px dashed rgba(124,58,237,0.3);
}
.ring-2 {
    width: 380px; height: 380px;
    border: 1px dashed rgba(6,182,212,0.2);
    animation-direction: reverse; animation-duration: 18s;
}
@keyframes ringRotate { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }

.floating-badge {
    position: absolute;
    background: rgba(15,15,26,0.9);
    border: 1px solid var(--border);
    color: var(--text);
    font-size: 0.78rem;
    font-weight: 500;
    padding: 6px 14px;
    border-radius: 100px;
    display: flex; align-items: center; gap: 6px;
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    animation: floatBadge 4s ease-in-out infinite;
    z-index: 3;
}
.badge-react { top: 10px; right: 0; animation-delay: 0s; }
.badge-react i { color: #61dafb; }
.badge-python { bottom: 30px; left: 0; animation-delay: -2s; }
.badge-python i { color: #fbbf24; }
.badge-node { top: 50%; right: -20px; animation-delay: -1s; }
.badge-node i { color: #86efac; }

@keyframes floatBadge {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
}

.scroll-hint {
    position: absolute; bottom: 2rem; left: 50%;
    transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 10px;
    color: var(--text-muted); font-size: 0.75rem; letter-spacing: 0.1em;
    text-transform: uppercase;
    z-index: 1;
    animation: scrollBounce 2s ease-in-out infinite;
}
.scroll-line {
    width: 1px; height: 50px;
    background: linear-gradient(to bottom, var(--accent), transparent);
}
@keyframes scrollBounce {
    0%, 100% { transform: translateX(-50%) translateY(0); }
    50% { transform: translateX(-50%) translateY(8px); }
}

/* ===========================
   SECTION COMMON
=========================== */
.section-header { margin-bottom: 5rem; }
.section-tag {
    display: inline-block;
    font-size: 0.78rem;
    font-weight: 500;
    color: var(--accent);
    letter-spacing: 0.15em;
    text-transform: uppercase;
    margin-bottom: 1.2rem;
    background: rgba(124,58,237,0.1);
    padding: 4px 14px;
    border-radius: 100px;
    border: 1px solid rgba(124,58,237,0.2);
}
.section-title {
    font-family: var(--font-display);
    font-size: clamp(2.2rem, 4vw, 3.5rem);
    font-weight: 800;
    color: var(--white);
    line-height: 1.05;
    letter-spacing: -2px;
}

/* ===========================
   ABOUT
=========================== */
.about {
    padding: 130px 0;
    background: var(--bg-2);
    border-top: 1px solid var(--border);
}
.about-content {
    display: grid;
    grid-template-columns: 1fr 1.4fr;
    gap: 6rem; align-items: center;
}
.about-img-wrap {
    position: relative;
}
.about-img {
    width: 100%; border-radius: var(--radius-lg);
    aspect-ratio: 4/5; object-fit: cover;
    border: 1px solid var(--border);
}
.img-backdrop {
    position: absolute;
    inset: 12px -12px -12px 12px;
    border-radius: var(--radius-lg);
    background: linear-gradient(135deg, var(--accent), var(--accent-2));
    z-index: -1; opacity: 0.3;
}
.img-tag {
    position: absolute; bottom: 20px; left: 20px;
    background: rgba(9,9,15,0.85);
    border: 1px solid var(--border);
    color: var(--text-muted);
    font-size: 0.8rem; padding: 8px 16px;
    border-radius: 100px;
    backdrop-filter: blur(12px);
    display: flex; align-items: center; gap: 6px;
}
.img-tag i { color: var(--accent); }

.about-lead {
    font-size: 1.2rem;
    color: var(--text);
    margin-bottom: 1.5rem;
    line-height: 1.7;
}
.about-text-col p:not(.about-lead) {
    color: var(--text-muted);
    margin-bottom: 2rem;
    line-height: 1.8;
}
.about-cta { display: flex; gap: 1rem; flex-wrap: wrap; }
.social-pill {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    color: var(--text-muted);
    font-size: 0.88rem;
    padding: 10px 20px;
    border-radius: 100px;
    transition: all var(--transition);
}
.social-pill:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-2px); }

/* ===========================
   SKILLS
=========================== */
.skills {
    padding: 130px 0;
    background: var(--bg);
    border-top: 1px solid var(--border);
}
.skills-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
}
.skill-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 2.5rem;
    transition: all var(--transition);
    position: relative; overflow: hidden;
}
.skill-card::before {
    content: ''; position: absolute;
    top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, var(--accent), transparent);
    opacity: 0; transition: opacity var(--transition);
}
.skill-card:hover { border-color: var(--border-hover); transform: translateY(-6px); box-shadow: 0 20px 50px rgba(0,0,0,0.4); }
.skill-card:hover::before { opacity: 1; }
.skill-card--accent::before { background: linear-gradient(90deg, var(--accent-2), var(--accent)); opacity: 1; }

.skill-card-header {
    display: flex; align-items: center; gap: 1rem;
    margin-bottom: 2rem;
}
.skill-icon-wrap {
    width: 42px; height: 42px;
    background: rgba(124,58,237,0.15);
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.1rem; color: var(--accent);
}
.skill-card--accent .skill-icon-wrap {
    background: rgba(6,182,212,0.15); color: var(--accent-2);
}
.skill-card h3 {
    font-family: var(--font-display);
    font-size: 1rem;
    font-weight: 700;
    color: var(--white);
    letter-spacing: -0.3px;
}

.skill-list { list-style: none; display: flex; flex-direction: column; gap: 0.9rem; }
.skill-list li {
    display: flex; align-items: center; gap: 10px;
    color: var(--text-muted); font-size: 0.92rem;
    padding: 10px 14px;
    background: rgba(255,255,255,0.03);
    border-radius: 10px;
    border: 1px solid var(--border);
    transition: all var(--transition);
}
.skill-list li:hover { color: var(--text); border-color: var(--border-hover); background: rgba(255,255,255,0.05); }
.skill-list li i { color: var(--accent); font-size: 1rem; width: 18px; text-align: center; }
.skill-card--accent .skill-list li i { color: var(--accent-2); }

/* ===========================
   PROJECTS
=========================== */
.projects {
    padding: 130px 0;
    background: var(--bg-2);
    border-top: 1px solid var(--border);
}
.projects-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
}
.project-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 2rem;
    transition: all var(--transition);
    position: relative; overflow: hidden;
    display: flex; flex-direction: column;
}
.project-card::after {
    content: ''; position: absolute;
    bottom: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, var(--accent), var(--accent-2));
    opacity: 0; transition: opacity var(--transition);
}
.project-card:hover { border-color: var(--border-hover); transform: translateY(-8px); box-shadow: 0 25px 60px rgba(0,0,0,0.5); }
.project-card:hover::after { opacity: 1; }
.project-card--featured {
    background: linear-gradient(135deg, rgba(124,58,237,0.08), rgba(6,182,212,0.05));
    border-color: rgba(124,58,237,0.2);
}
.project-card--featured::after { opacity: 0.6; }

.project-header {
    display: flex; justify-content: space-between; align-items: center;
    margin-bottom: 1.5rem;
}
.project-icon {
    width: 50px; height: 50px;
    background: linear-gradient(135deg, var(--accent), var(--accent-2));
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.4rem; color: white;
}
.project-links-top { display: flex; gap: 10px; }
.project-links-top a {
    color: var(--text-muted); font-size: 1rem;
    width: 36px; height: 36px;
    display: flex; align-items: center; justify-content: center;
    border-radius: 8px;
    background: rgba(255,255,255,0.04);
    border: 1px solid var(--border);
    transition: all var(--transition);
}
.project-links-top a:hover { color: var(--accent); border-color: rgba(124,58,237,0.3); }

.project-card h3 {
    font-family: var(--font-display);
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--white);
    margin-bottom: 0.8rem;
    letter-spacing: -0.5px;
}
.project-card p {
    color: var(--text-muted); font-size: 0.9rem;
    line-height: 1.7; flex: 1;
    margin-bottom: 1.5rem;
}
.project-tech {
    display: flex; flex-wrap: wrap; gap: 0.5rem;
}
.project-tech span {
    background: rgba(124,58,237,0.1);
    color: #c4b5fd;
    border: 1px solid rgba(124,58,237,0.2);
    padding: 4px 12px;
    border-radius: 100px;
    font-size: 0.75rem; font-weight: 500;
}

/* ===========================
   CONTACT
=========================== */
.contact {
    padding: 130px 0;
    background: var(--bg);
    border-top: 1px solid var(--border);
}
.contact-content {
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 6rem; align-items: start;
}
.contact-lead {
    color: var(--text-muted); font-size: 1.05rem;
    line-height: 1.8; margin-bottom: 2.5rem;
}
.contact-links { display: flex; flex-direction: column; gap: 1rem; }
.contact-link {
    display: flex; align-items: center; gap: 1.2rem;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 1.2rem 1.5rem;
    transition: all var(--transition);
}
.contact-link:hover { border-color: var(--border-hover); transform: translateX(6px); }
.contact-link-icon {
    width: 44px; height: 44px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.2rem; flex-shrink: 0;
}
.contact-link-icon.whatsapp { background: rgba(37,211,102,0.12); color: #25D366; }
.contact-link-icon.gmail { background: rgba(234,67,53,0.12); color: #EA4335; }
.contact-link-icon.phone { background: rgba(6,182,212,0.12); color: var(--accent-2); }
.contact-link > div { flex: 1; }
.contact-link-label { display: block; font-size: 0.75rem; color: var(--text-muted); margin-bottom: 2px; }
.contact-link-val { display: block; font-size: 0.9rem; color: var(--text); font-weight: 500; }
.contact-arrow { color: var(--text-muted); font-size: 0.8rem; transition: transform var(--transition); }
.contact-link:hover .contact-arrow { transform: translateX(4px); color: var(--accent); }

/* Contact Form */
.contact-form {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 2.5rem;
}
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.2rem; }
.form-group { margin-bottom: 1.4rem; }
.form-group:last-child { margin-bottom: 0; }
.form-group label {
    display: block; font-size: 0.8rem;
    color: var(--text-muted); font-weight: 500;
    margin-bottom: 8px; letter-spacing: 0.02em;
}
.form-group input,
.form-group textarea {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 12px 16px;
    color: var(--text);
    font-family: var(--font-body);
    font-size: 0.9rem;
    transition: border-color var(--transition), box-shadow var(--transition);
    resize: none;
}
.form-group input::placeholder,
.form-group textarea::placeholder { color: #3d3d5c; }
.form-group input:focus,
.form-group textarea:focus {
    outline: none;
    border-color: rgba(124,58,237,0.5);
    box-shadow: 0 0 0 3px rgba(124,58,237,0.08);
}

/* ===========================
   FOOTER
=========================== */
.footer {
    border-top: 1px solid var(--border);
    padding: 2.5rem 0;
    background: var(--bg);
}
.footer-content {
    display: flex; justify-content: space-between; align-items: center;
    flex-wrap: wrap; gap: 1rem;
}
.footer-logo {
    font-family: var(--font-display);
    font-size: 1.4rem; font-weight: 800;
    color: var(--white);
}
.footer p { color: var(--text-muted); font-size: 0.85rem; }
.footer-links { display: flex; gap: 1.2rem; }
.footer-links a {
    color: var(--text-muted); font-size: 1.1rem;
    transition: color var(--transition);
}
.footer-links a:hover { color: var(--accent); }

/* ===========================
   SCROLL REVEAL
=========================== */
.reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.7s ease, transform 0.7s ease;
}
.reveal.visible {
    opacity: 1;
    transform: translateY(0);
}

/* ===========================
   RESPONSIVE
=========================== */
@media (max-width: 1024px) {
    .skills-grid, .projects-grid { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 768px) {
    .hamburger { display: flex; }
    .nav-menu {
        position: fixed; top: 65px; left: -100%; width: 100%;
        flex-direction: column; background: rgba(9,9,15,0.97);
        backdrop-filter: blur(20px);
        padding: 2rem; gap: 1.5rem;
        transition: left 0.4s ease;
        border-bottom: 1px solid var(--border);
    }
    .nav-menu.active { left: 0; }

    .hero-container { grid-template-columns: 1fr; text-align: center; gap: 3rem; }
    .hero-description { margin: 0 auto 2.5rem; }
    .hero-buttons { justify-content: center; }
    .hero-stats { justify-content: center; }
    .hero-image { order: -1; }
    .profile-ring { width: 260px; height: 260px; }
    .profile-picture { width: 220px; height: 220px; }
    .ring-1 { width: 260px; height: 260px; }
    .ring-2 { width: 290px; height: 290px; }
    .badge-node { display: none; }

    .about-content { grid-template-columns: 1fr; gap: 3rem; }
    .skills-grid, .projects-grid { grid-template-columns: 1fr; }
    .contact-content { grid-template-columns: 1fr; gap: 3rem; }
    .form-row { grid-template-columns: 1fr; }
    .footer-content { justify-content: center; text-align: center; flex-direction: column; }

    body { cursor: auto; }
    .cursor, .cursor-follower { display: none; }
}
