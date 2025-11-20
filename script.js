/**
 * CINEREO LANDING PAGE - INTERACTIONS
 * Smooth animations, scroll effects, form handling
 */

// ===== SMOOTH SCROLL ANIMATIONS =====
document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all elements with fade-in-scroll class
    const fadeElements = document.querySelectorAll('.fade-in-scroll');
    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 20;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== FORM HANDLING =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const businessLink = document.getElementById('business-link').value.trim();
            const whatsapp = document.getElementById('whatsapp').value.trim();
            const businessName = document.getElementById('business-name').value.trim();

            // Validate inputs
            if (!businessLink || !whatsapp || !businessName) {
                alert('Per favore, compila tutti i campi.');
                return;
            }

            // Clean WhatsApp number (remove spaces, dashes, etc.)
            const cleanWhatsApp = whatsapp.replace(/[^\d+]/g, '');

            // Create WhatsApp message
            const message = `Ciao! Vorrei richiedere un concept per il mio business.

📱 Nome attività: ${businessName}
🔗 Link profilo: ${businessLink}
📞 WhatsApp: ${cleanWhatsApp}

Attendo vostre notizie!`;

            // Encode message for URL
            const encodedMessage = encodeURIComponent(message);

            // Cinereo WhatsApp number
            const cinereoWhatsApp = '393270972329';

            // Create WhatsApp link
            const whatsappURL = `https://wa.me/${cinereoWhatsApp}?text=${encodedMessage}`;

            // Open WhatsApp in new tab
            window.open(whatsappURL, '_blank');

            // Show success message
            showSuccessMessage();

            // Reset form
            contactForm.reset();
        });
    }

    // ===== SUCCESS MESSAGE =====
    function showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #ffffff;
            color: #0a0a0a;
            padding: 2rem 3rem;
            border: 2px solid #0a0a0a;
            z-index: 10000;
            text-align: center;
            font-weight: 600;
            font-size: 1.125rem;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        `;
        successDiv.innerHTML = `
            <div style="margin-bottom: 1rem; font-size: 2rem;">✓</div>
            <div>Richiesta inviata!</div>
            <div style="font-size: 0.9rem; margin-top: 0.5rem; font-weight: 400; color: #666;">
                Ti contatteremo presto su WhatsApp
            </div>
        `;

        document.body.appendChild(successDiv);

        // Remove after 3 seconds
        setTimeout(() => {
            successDiv.style.opacity = '0';
            successDiv.style.transition = 'opacity 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(successDiv);
            }, 300);
        }, 3000);
    }

    // ===== PARALLAX EFFECT ON HERO =====
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            if (scrolled < window.innerHeight) {
                heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        });
    }

    // ===== ADD ACTIVE STATE TO CTA BUTTONS =====
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
        });
        button.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // ===== LAZY LOADING FOR IMAGES (if any are added later) =====
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ===== MOBILE MENU (if needed later) =====
    // Reserved for future mobile navigation

    // ===== PERFORMANCE: Debounce scroll events =====
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(function() {
            // Additional scroll-based animations can go here
        });
    }, { passive: true });

    // ===== PREVENT FORM DOUBLE SUBMISSION =====
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        let isSubmitting = false;
        form.addEventListener('submit', function(e) {
            if (isSubmitting) {
                e.preventDefault();
                return false;
            }
            isSubmitting = true;
            setTimeout(() => {
                isSubmitting = false;
            }, 2000);
        });
    });

    // ===== ACCESSIBILITY: Focus styles =====
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-nav');
    });

    // ===== CONSOLE BRANDING =====
    console.log('%c🎯 CINEREO', 'font-size: 20px; font-weight: bold; color: #ffffff; background: #0a0a0a; padding: 10px;');
    console.log('%cDigital presence for the AI era', 'font-size: 12px; color: #666;');
    console.log('%cwww.cinereo.it', 'font-size: 12px; color: #ffffff;');
});

// ===== PERFORMANCE MONITORING =====
window.addEventListener('load', function() {
    // Log page load time
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
});

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('Error caught:', e.error);
    // In production, you could send this to an error tracking service
});

// ===== UTILITY FUNCTIONS =====

/**
 * Validate Italian phone number
 */
function validateItalianPhone(phone) {
    const cleaned = phone.replace(/[^\d+]/g, '');
    return /^(\+39)?3\d{8,9}$/.test(cleaned);
}

/**
 * Validate URL
 */
function validateURL(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

/**
 * Format currency
 */
function formatCurrency(amount) {
    return new Intl.NumberFormat('it-IT', {
        style: 'currency',
        currency: 'EUR'
    }).format(amount);
}

// Export functions for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateItalianPhone,
        validateURL,
        formatCurrency
    };
}
