// Icons
if (window.lucide) {
    window.lucide.createIcons();
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.9)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.8)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.6)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
    }
});

// Active link highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id') || '';
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (current && link.getAttribute('href')?.includes(current)) {
            link.classList.add('active');
        }
    });
});

// Cursor glow tracking for cards
const cards = document.querySelectorAll('.glass-card');
cards.forEach(card => {
    card.addEventListener('mousemove', event => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Mobile menu
const menuButton = document.querySelector('.mobile-menu-btn');
const navContainer = document.getElementById('navLinks');

if (menuButton && navContainer) {
    menuButton.addEventListener('click', () => {
        const isOpen = navContainer.classList.toggle('open');
        menuButton.setAttribute('aria-expanded', String(isOpen));
    });

    navContainer.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navContainer.classList.remove('open');
            menuButton.setAttribute('aria-expanded', 'false');
        });
    });
}

// Reveal animation observer
const revealTargets = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12 }
);

revealTargets.forEach(target => revealObserver.observe(target));

// ─── Language Toggle ──────────────────────────────────────────────────────────
let currentLang = localStorage.getItem('lang') || 'tr';

function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);

    // Update <html> lang attribute
    document.documentElement.lang = lang;

    // Update page <title>
    document.title = lang === 'en'
        ? 'ALGO IT | Profile & Portfolio'
        : 'MembaCo | Profil & Portföy';

    // Translate all elements with data-tr / data-en
    document.querySelectorAll('[data-tr][data-en]').forEach(el => {
        el.textContent = el.getAttribute(`data-${lang}`);
    });

    // Highlight active lang label in button
    document.querySelectorAll('.lang-label').forEach(label => {
        label.classList.toggle('active-lang', label.classList.contains(`lang-${lang}`));
    });
}

// Init on load
applyLanguage(currentLang);

const langToggleBtn = document.getElementById('langToggle');
if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
        applyLanguage(currentLang === 'tr' ? 'en' : 'tr');
    });
}
