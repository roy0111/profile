/* =========================================
   BIRAT SAHA – PORTFOLIO  |  main.js
========================================= */

// ── AOS Initialization ──────────────────
AOS.init({ once: true, offset: 80, duration: 700 });

// ── Navbar Scroll Effect ─────────────────
const mainNav = document.getElementById('mainNav');
const navLinks = document.querySelectorAll('.nav-link');

function updateNav() {
    if (window.scrollY > 60) {
        mainNav.classList.add('scrolled');
    } else {
        mainNav.classList.remove('scrolled');
    }
    // Highlight active nav link
    const sections = document.querySelectorAll('section[id]');
    let found = '';
    sections.forEach(sec => {
        const top = sec.offsetTop - 100;
        const bot = top + sec.offsetHeight;
        if (window.scrollY >= top && window.scrollY < bot) {
            found = sec.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.toggle('active',
            link.getAttribute('href') === `#${found}`
        );
    });
}

window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// ── Smooth scroll for nav links ──────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Close mobile menu if open
            const collapse = document.getElementById('navbarNav');
            if (collapse && collapse.classList.contains('show')) {
                bootstrap.Collapse.getInstance(collapse)?.hide();
            }
        }
    });
});

// ── Typewriter Effect ────────────────────
const phrases = [
    'Spring Boot Microservices.',
    'RAG-Based AI Services.',
    'Reactive APIs with WebFlux.',
    'React & Angular Frontends.',
    'Kafka Event Pipelines.',
    'Enterprise Java Systems.',
    'Cloud-Native Solutions.',
];
const typewriterEl = document.getElementById('typewriter');
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeTimeout;

function typeWrite() {
    const current = phrases[phraseIndex];
    const displayed = isDeleting
        ? current.slice(0, charIndex - 1)
        : current.slice(0, charIndex + 1);

    typewriterEl.textContent = displayed;
    typewriterEl.classList.add('cursor-blink');

    if (!isDeleting && charIndex === current.length) {
        typeTimeout = setTimeout(() => { isDeleting = true; typeWrite(); }, 1800);
        return;
    }
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeTimeout = setTimeout(typeWrite, 400);
        return;
    }

    charIndex += isDeleting ? -1 : 1;
    typeTimeout = setTimeout(typeWrite, isDeleting ? 60 : 90);
}
typeWrite();

// ── Counter Animation ───────────────────
function animateCounters() {
    document.querySelectorAll('.counter').forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 1800;
        const step = target / (duration / 16);
        let current = 0;

        const update = () => {
            current = Math.min(current + step, target);
            counter.textContent = Math.round(current) + (target === 100 ? '%' : '+');
            if (current < target) requestAnimationFrame(update);
            else counter.textContent = target + (target === 100 ? '%' : '+');
        };
        update();
    });
}

// Trigger counters when About section enters view
const aboutSection = document.getElementById('about');
if (aboutSection) {
    const counterObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    counterObserver.observe(aboutSection);
}

// ── Contact Form ─────────────────────────
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const submitBtn = document.getElementById('submitBtn');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!contactForm.checkValidity()) {
            contactForm.classList.add('was-validated');
            return;
        }

        const btnText = submitBtn.querySelector('.btn-text');
        submitBtn.disabled = true;
        btnText.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status"></span>Sending...';

        // Simulate sending (replace with real API call)
        await new Promise(resolve => setTimeout(resolve, 1600));

        submitBtn.disabled = false;
        btnText.innerHTML = '<i class="bi bi-send-fill me-2"></i>Send Message';
        formSuccess.classList.remove('d-none');
        contactForm.reset();
        contactForm.classList.remove('was-validated');

        setTimeout(() => formSuccess.classList.add('d-none'), 5000);
    });
}

// ── Skill Pills Hover Ripple ─────────────
document.querySelectorAll('.skill-pill').forEach(pill => {
    pill.addEventListener('mouseenter', () => {
        pill.style.transition = 'all 0.25s cubic-bezier(.4,2,.6,1)';
        pill.style.transform = 'scale(1.08)';
    });
    pill.addEventListener('mouseleave', () => {
        pill.style.transform = 'scale(1)';
    });
});

// ── Parallax Orbs on Mouse Move ──────────
const orb1 = document.querySelector('.orb-1');
const orb2 = document.querySelector('.orb-2');

window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    if (orb1) orb1.style.transform = `translate(${x}px, ${y}px) scale(1)`;
    if (orb2) orb2.style.transform = `translate(${-x}px, ${-y}px) scale(1)`;
}, { passive: true });
