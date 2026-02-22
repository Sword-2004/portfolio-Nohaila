// ===================================
// SMOOTH SCROLL TO SECTION
// ===================================

function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// ===================================
// SCROLL PROGRESS INDICATOR
// ===================================

window.addEventListener('scroll', () => {
    const scrollProgress = document.querySelector('.scroll-progress');
    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    scrollProgress.style.width = scrollPercentage + '%';
});

// ===================================
// DARK MODE TOGGLE
// ===================================

const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    const isDarkMode = document.body.classList.contains('dark-mode');
    themeToggle.textContent = isDarkMode ? '☀️' : '🌙';
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
});

// ===================================
// INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with animation classes
document.querySelectorAll('.fade-in-section, .reveal-text').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    observer.observe(el);
});

// ===================================
// ACTIVE NAV LINK ON SCROLL
// ===================================

const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--accent)';
        } else {
            link.style.color = 'var(--text-dark)';
        }
    });
});

// ===================================
// LAZY LOADING IMAGES
// ===================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px'
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// MAGNETIC BUTTON EFFECT
// ===================================

const buttons = document.querySelectorAll('.btn, .social-link, .view-btn');

buttons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.02)`;
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0) scale(1)';
    });
});

// ===================================
// PARALLAX EFFECT
// ===================================

const hero = document.querySelector('.hero');

if (hero) {
    const blurShapes = document.querySelectorAll('.blur-shape');
    let parallaxTimeout;
    
    window.addEventListener('mousemove', (e) => {
        clearTimeout(parallaxTimeout);
        
        parallaxTimeout = setTimeout(() => {
            const xPos = (e.clientX / window.innerWidth) * 30;
            const yPos = (e.clientY / window.innerHeight) * 30;

            blurShapes.forEach((shape, index) => {
                const speed = (index + 1) * 8;
                const x = xPos * speed * 0.5;
                const y = yPos * speed * 0.5;
                shape.style.transform = `translate(${x}px, ${y}px) scale(1)`;
            });
        }, 0);
    });
    
    // Reset on mouse leave
    window.addEventListener('mouseleave', () => {
        blurShapes.forEach(shape => {
            shape.style.transform = 'translate(0, 0) scale(1)';
        });
    });
}

// ===================================
// SMOOTH NAVBAR BLUR ON SCROLL
// ===================================

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.backdropFilter = 'blur(15px)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.boxShadow = 'none';
    }
});

// ===================================
// PREVENT LINK CLICKS ON PLACEHOLDER LINKS
// ===================================

document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
    });
});

// ===================================
// ADD STAGGER ANIMATION TO SKILL PILLS
// ===================================

const skillPills = document.querySelectorAll('.skill-pill');

skillPills.forEach((pill, index) => {
    pill.style.animation = `fade-in-up 0.6s ease-out ${index * 0.1}s both`;
});

// ===================================
// ADD STAGGER ANIMATION TO PROJECT CARDS
// ===================================

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach((card, index) => {
    card.style.animation = `fade-in-up 0.6s ease-out ${index * 0.15}s both`;
});

// ===================================
// HERO SECTION ANIMATIONS ON LOAD
// ===================================

window.addEventListener('load', () => {
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description, .hero-buttons');
    
    heroElements.forEach((el, index) => {
        el.style.animation = `fade-in-up 0.8s ease-out ${index * 0.15}s both`;
    });
});

// ===================================
// ENHANCED FORM INTERACTIONS (Optional)
// ===================================

// Add input focus effects
const inputs = document.querySelectorAll('input, textarea');

inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.style.borderColor = 'var(--accent)';
        this.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
    });

    input.addEventListener('blur', function() {
        this.style.borderColor = 'var(--border-light)';
        this.style.boxShadow = 'none';
    });
});

// ===================================
// SCROLL SNAP BEHAVIOR
// ===================================

document.documentElement.style.scrollBehavior = 'smooth';

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

// Throttle scroll events for better performance
let ticking = false;

const throttledScroll = () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Scroll logic here
            ticking = false;
        });
        ticking = true;
    }
};

window.addEventListener('scroll', throttledScroll, { passive: true });

// ===================================
// CUSTOM CURSOR (Optional)
// ===================================

const customCursor = document.createElement('div');
customCursor.className = 'custom-cursor';
customCursor.style.cssText = `
    position: fixed;
    width: 10px;
    height: 10px;
    background: var(--accent);
    border-radius: 50%;
    pointer-events: none;
    z-index: 1000;
    display: none;
    box-shadow: 0 0 15px rgba(59, 130, 246, 0.6);
    transition: opacity 0.3s ease;
`;

document.body.appendChild(customCursor);

document.addEventListener('mousemove', (e) => {
    customCursor.style.left = (e.clientX - 5) + 'px';
    customCursor.style.top = (e.clientY - 5) + 'px';
    customCursor.style.display = 'block';
});

document.addEventListener('mouseenter', () => {
    customCursor.style.display = 'block';
});

document.addEventListener('mouseleave', () => {
    customCursor.style.display = 'none';
});

// Hide custom cursor over interactive elements
const interactiveElements = document.querySelectorAll('button, a, input, textarea');

interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        customCursor.style.opacity = '0.5';
        customCursor.style.transform = 'scale(1.5)';
    });

    element.addEventListener('mouseleave', () => {
        customCursor.style.opacity = '1';
        customCursor.style.transform = 'scale(1)';
    });
});

// ===================================
// HAMBURGER MENU TOGGLE
// ===================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ===================================
// INITIALIZE ON DOCUMENT READY
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Add any additional initialization here
    console.log('Portfolio website loaded successfully');
});
