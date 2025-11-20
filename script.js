/**
 * CINEREO LANDING PAGE - INTERACTIONS
 * Smooth animations, scroll effects, form handling, theme switching
 */

// ===== THEME SWITCHING LOGIC =====

// Helper to determine system preference
function getSystemTheme() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

// Helper to get the inverse of a theme
function getInverseTheme(theme) {
    return theme === 'light' ? 'dark' : 'light';
}

// Helper to get currently applied theme (from DOM)
function getAppliedTheme() {
    return document.documentElement.getAttribute('data-theme') || 'dark';
}

// ===== IIFE: APPLY THEME IMMEDIATELY TO PREVENT FLASH =====
(function() {
    // 1. Get saved state: 'auto' (default) or specific 'light'/'dark'
    const savedState = localStorage.getItem('cinereo-theme-state') || 'auto';
    
    let themeToApply;

    if (savedState === 'auto') {
        themeToApply = getSystemTheme();
    } else {
        themeToApply = savedState;
    }

    // Apply to DOM
    document.documentElement.setAttribute('data-theme', themeToApply);
    if (document.body) {
        document.body.setAttribute('data-theme', themeToApply);
    }
})();


// ===== MAIN INTERACTION LOOP =====
document.addEventListener('DOMContentLoaded', function() {
    
    // Elements
    const body = document.body;
    const btnAuto = document.querySelector('.theme-btn[data-theme="auto"]');
    const btnInverse = document.querySelector('.theme-btn[data-theme="inverse"]');
    const iconInverse = btnInverse ? btnInverse.querySelector('i') : null;

    // State
    let currentState = localStorage.getItem('cinereo-theme-state') || 'auto';

    // Function to update UI (Buttons & Icons)
    function updateUI() {
        const systemTheme = getSystemTheme();
        const appliedTheme = getAppliedTheme(); // What's currently on screen

        // 1. Update Active State
        if (currentState === 'auto') {
            btnAuto.classList.add('active');
            btnInverse.classList.remove('active');
        } else {
            btnAuto.classList.remove('active');
            btnInverse.classList.add('active');
        }

        // 2. Update Inverse Button Icon
        // If current effective theme is dark, the inverse button should show a Sun (to switch to light)
        // If current effective theme is light, the inverse button should show a Moon (to switch to dark)
        if (iconInverse) {
            if (appliedTheme === 'dark') {
                iconInverse.className = 'ph ph-sun'; // Option to go light
                btnInverse.setAttribute('title', 'Passa al tema chiaro');
            } else {
                iconInverse.className = 'ph ph-moon'; // Option to go dark
                btnInverse.setAttribute('title', 'Passa al tema scuro');
            }
        }
    }

    // Function to Apply Theme
    function applyTheme(state) {
        currentState = state;
        localStorage.setItem('cinereo-theme-state', state);

        let themeToRender;
        if (state === 'auto') {
            themeToRender = getSystemTheme();
        } else {
            themeToRender = state;
        }

        // Set DOM
        document.documentElement.setAttribute('data-theme', themeToRender);
        body.setAttribute('data-theme', themeToRender);

        // Update Canvas
        if (window.updateCanvasColor) {
            window.updateCanvasColor();
        }

        // Update Buttons
        updateUI();
    }

    // --- Event Handlers ---

    // 1. Auto Button Click
    if (btnAuto) {
        btnAuto.addEventListener('click', function() {
            applyTheme('auto');
        });
    }

    // 2. Inverse Button Click
    if (btnInverse) {
        btnInverse.addEventListener('click', function() {
            // Logic:
            // If we are in 'auto', we want to force the OPPOSITE of the system theme.
            // If we are already manual, we toggle the manual theme.
            
            const currentEffective = getAppliedTheme();
            const newTheme = getInverseTheme(currentEffective);
            
            applyTheme(newTheme);
        });
    }

    // 3. System Preference Change Listener
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: light)').addListener(e => {
            // Only auto-update if state is 'auto'
            if (currentState === 'auto') {
                applyTheme('auto'); // Re-evaluate system theme
            } else {
                // Just update UI (icons might need changing even if theme doesn't change, 
                // though in manual mode, icons track the manual theme, so maybe not needed, 
                // but good practice to sync)
                updateUI(); 
            }
        });
    }

    // Initialize UI on load
    updateUI();


    // ... (Rest of the code: Fade-in, Scroll, Form, Canvas) ...
    
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

        // Helper to get color from CSS variable
        function getParticleColor() {
            const style = getComputedStyle(document.body);
            return style.getPropertyValue('--particle-color').trim() || 'rgba(255, 255, 255, 0.1)';
        }

        // Resize canvas
        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }

        window.addEventListener('resize', resize);
        resize();

        // Make color updatable globally
        window.updateCanvasColor = function() {
             const newColor = getParticleColor();
             particles.forEach(p => p.color = newColor);
        }

        // Particle class
        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
                this.color = getParticleColor();
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
            // Removed unused variable
            
            for (let i = 0; i < particles.length; i++) {
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        // Dynamic opacity based on distance
                        let opacity = 0.05 - distance/3000;
                        if (opacity < 0) opacity = 0;
                        
                        ctx.strokeStyle = particles[i].color; // Use particle color
                        ctx.globalAlpha = opacity; // Set global alpha for the line
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                        ctx.globalAlpha = 1.0; // Reset
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
