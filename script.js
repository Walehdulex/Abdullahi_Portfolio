// ========================================
// Navigation Functionality
// ========================================

/**
 * Handle mobile navigation toggle
 */
const initMobileNav = () => {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');

    if (!navToggle || !navMenu) return;

    // Toggle mobile menu
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
};

/**
 * Add scroll effects to navigation bar
 */
const initNavbarScroll = () => {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    let lastScroll = 0;
    const scrollThreshold = 100;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add shadow when scrolled
        if (currentScroll > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
};

/**
 * Highlight active navigation link based on scroll position
 */
const initActiveNavLink = () => {
    const sections = document.querySelectorAll('.section, .hero');
    const navLinks = document.querySelectorAll('.nav__link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
};

// ========================================
// Smooth Scroll with Offset
// ========================================

/**
 * Smooth scroll to section with offset for fixed navbar
 */
const initSmoothScroll = () => {
    const links = document.querySelectorAll('a[href^="#"]');
    const navbarHeight = 80;

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            
            // Skip if it's just "#"
            if (targetId === '#') return;

            const targetSection = document.querySelector(targetId);
            if (!targetSection) return;

            e.preventDefault();

            const targetPosition = targetSection.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
};

// ========================================
// Intersection Observer for Scroll Animations
// ========================================

/**
 * Animate elements when they enter viewport
 */
const initScrollAnimations = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections and major elements
    const elementsToAnimate = document.querySelectorAll(`
        .section,
        .project-card,
        .skill-category,
        .timeline__item,
        .contact__card,
        .about__highlights
    `);

    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
};

/**
 * Stagger animation for project cards
 */
const initStaggerAnimation = () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    const skillCategories = document.querySelectorAll('.skill-category');
    
    skillCategories.forEach((category, index) => {
        category.style.transitionDelay = `${index * 0.1}s`;
    });
};

// ========================================
// Typing Effect for Hero Roles (Optional Enhancement)
// ========================================

/**
 * Add typing effect to hero roles
 * This is an optional enhancement - comment out if not desired
 */
const initTypingEffect = () => {
    const roles = document.querySelectorAll('.hero__role');
    if (roles.length === 0) return;

    roles.forEach((role, index) => {
        const text = role.textContent;
        role.textContent = '';
        role.style.opacity = '0';

        setTimeout(() => {
            role.style.opacity = '1';
            let charIndex = 0;

            const typeInterval = setInterval(() => {
                if (charIndex < text.length) {
                    role.textContent += text.charAt(charIndex);
                    charIndex++;
                } else {
                    clearInterval(typeInterval);
                }
            }, 50);
        }, index * 500);
    });
};

// ========================================
// Skill Tag Interaction
// ========================================

/**
 * Add click interaction to skill tags
 */
const initSkillTagInteraction = () => {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Toggle active state
            tag.classList.toggle('active');
            
            // Optional: Log selected skills (useful for analytics)
            if (tag.classList.contains('active')) {
                console.log(`Selected skill: ${tag.textContent}`);
            }
        });
    });
};

// ========================================
// Performance: Lazy Load Images (if you add images)
// ========================================

/**
 * Lazy load images for better performance
 */
const initLazyLoading = () => {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
};

// ========================================
// Copy Email to Clipboard
// ========================================

/**
 * Add copy to clipboard functionality for email
 */
const initCopyEmail = () => {
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    
    emailLinks.forEach(link => {
        // Add a copy button or handle right-click
        link.addEventListener('contextmenu', (e) => {
            const email = link.getAttribute('href').replace('mailto:', '');
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText(email).then(() => {
                    // Show temporary tooltip or notification
                    showNotification('Email copied to clipboard!');
                });
            }
        });
    });
};

/**
 * Show temporary notification
 */
const showNotification = (message) => {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background-color: var(--color-primary);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        animation: slideInUp 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
};

// ========================================
// Add Animation Keyframes Dynamically
// ========================================

const initAnimations = () => {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInUp {
            from {
                transform: translateY(100%);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }

        @keyframes fadeOut {
            from {
                opacity: 1;
            }
            to {
                opacity: 0;
            }
        }

        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
        }
    `;
    document.head.appendChild(style);
};

// ========================================
// Form Validation (if you add a contact form)
// ========================================

/**
 * Validate contact form before submission
 */
const initFormValidation = () => {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = form.querySelector('[name="name"]');
        const email = form.querySelector('[name="email"]');
        const message = form.querySelector('[name="message"]');
        
        let isValid = true;

        // Simple validation
        if (!name.value.trim()) {
            showError(name, 'Please enter your name');
            isValid = false;
        }

        if (!isValidEmail(email.value)) {
            showError(email, 'Please enter a valid email');
            isValid = false;
        }

        if (!message.value.trim()) {
            showError(message, 'Please enter a message');
            isValid = false;
        }

        if (isValid) {
            // Submit form or send via API
            showNotification('Message sent successfully!');
            form.reset();
        }
    });
};

const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const showError = (input, message) => {
    const formGroup = input.parentElement;
    const error = formGroup.querySelector('.error-message') || document.createElement('span');
    
    error.className = 'error-message';
    error.textContent = message;
    error.style.cssText = 'color: red; font-size: 0.875rem; margin-top: 0.25rem;';
    
    if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(error);
    }

    input.classList.add('error');
    
    // Remove error on input
    input.addEventListener('input', () => {
        input.classList.remove('error');
        if (error.parentElement) {
            error.remove();
        }
    }, { once: true });
};

// ========================================
// Initialize All Functions
// ========================================

/**
 * Main initialization function
 * Call this when DOM is ready
 */
const init = () => {
    // Core functionality
    initMobileNav();
    initNavbarScroll();
    initActiveNavLink();
    initSmoothScroll();
    
    // Animations
    initAnimations();
    initScrollAnimations();
    initStaggerAnimation();
    
    // Optional enhancements (comment out if not needed)
    // initTypingEffect();  // Uncomment for typing effect on hero roles
    initSkillTagInteraction();
    initLazyLoading();
    initCopyEmail();
    initFormValidation();

    // Log success
    console.log('Portfolio initialized successfully! 🚀');
};

// ========================================
// Wait for DOM to be ready
// ========================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ========================================
// Performance Monitoring (Optional)
// ========================================

/**
 * Log page performance metrics
 */
const logPerformance = () => {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                const connectTime = perfData.responseEnd - perfData.requestStart;
                
                console.log('Performance Metrics:');
                console.log(`Page Load Time: ${pageLoadTime}ms`);
                console.log(`Server Response Time: ${connectTime}ms`);
            }, 0);
        });
    }
};

// Uncomment to enable performance logging
// logPerformance();

// ========================================
// Export functions for testing (optional)
// ========================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        init,
        initMobileNav,
        initSmoothScroll,
        initScrollAnimations
    };
}