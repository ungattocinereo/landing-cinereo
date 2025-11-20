/**
 * CINEREO LANDING PAGE - INTERACTIONS
 * Smooth animations, scroll effects, form handling, theme switching
 */

// ===== THEME SWITCHING =====
(function() {
    // Get saved theme or default to 'dark'
    const savedTheme = localStorage.getItem('cinereo-theme') || 'dark';

    // Apply theme immediately to prevent flash
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (document.body) {
        document.body.setAttribute('data-theme', savedTheme);
    }
})();

// ===== SMOOTH SCROLL ANIMATIONS & INTERACTION =====
document.addEventListener('DOMContentLoaded', function() {
    // ===== THEME SWITCHER LOGIC =====
    const themeButtons = document.querySelectorAll('.theme-btn');
    const body = document.body;

    // Get current theme
    let currentTheme = localStorage.getItem('cinereo-theme') || 'dark';

    // Set initial active button
    function updateActiveButton() {
        themeButtons.forEach(btn => {
            if (btn.dataset.theme === currentTheme) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // Apply theme
    function applyTheme(theme) {
        body.setAttribute('data-theme', theme);
        currentTheme = theme;
        localStorage.setItem('cinereo-theme', theme);
        updateActiveButton();
    }

    // Initialize
    applyTheme(currentTheme);

    // Theme button click handlers
    themeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const theme = this.dataset.theme;
            applyTheme(theme);
        });
    });

    // Listen for system theme changes when in auto mode
    if (window.matchMedia) {
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        darkModeQuery.addListener(function(e) {
            if (currentTheme === 'auto') {
                // Trigger re-render by toggling data attribute
                body.setAttribute('data-theme', 'auto');
            }
        });
    }

    // ===== INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS =====
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
                const offsetTop = target.offsetTop - 80; // Adjusted for spacing
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
            background-color: var(--base-white);
            color: var(--base-black);
            padding: 2rem 3rem;
            border: 2px solid var(--base-black);
            border-radius: 1rem;
            z-index: 10000;
            text-align: center;
            font-weight: 600;
            font-size: 1.125rem;
            box-shadow: 0 20px 60px rgba(0,0,0,0.4);
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

    // ===== ANTIGRAVITY CANVAS EFFECT =====
    const canvas = document.getElementById('gravity-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];

        // Resize canvas
        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }

        window.addEventListener('resize', resize);
        resize();

        // Particle class
        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
                this.color = Math.random() > 0.5 ? 'rgba(255, 255, 255, 0.1)' : 'rgba(200, 200, 200, 0.05)';
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Create particles
        for (let i = 0; i < 100; i++) {
            particles.push(new Particle());
        }

        // Connect particles with lines
        function connect() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 - distance/3000})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }

        // Animation loop
        function animate() {
            ctx.clearRect(0, 0, width, height);
            
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            
            connect();
            requestAnimationFrame(animate);
        }

        animate();
    }

    // ===== CONSOLE BRANDING =====
    console.log('%c🎯 CINEREO', 'font-size: 20px; font-weight: bold; color: #ffffff; background: #0a0a0a; padding: 10px;');
});
