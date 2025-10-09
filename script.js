// Rationa Website JavaScript

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Demo form handling
const demoForm = document.getElementById('demoForm');
if (demoForm) {
    demoForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(demoForm);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = demoForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual endpoint)
        setTimeout(() => {
            alert('Thank you! We\'ll contact you within 24 hours to schedule your demo.');
            demoForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1000);
        
        // In production, send to your backend:
        // try {
        //     const response = await fetch('/api/demo-request', {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify(data)
        //     });
        //     if (response.ok) {
        //         alert('Thank you! We\'ll contact you within 24 hours.');
        //         demoForm.reset();
        //     }
        // } catch (error) {
        //     alert('Error submitting form. Please try again.');
        // }
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.product-card, .feature-card, .benefit-card, .use-case').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Counter animation for stats
const animateCounter = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
};

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stats = entry.target.querySelectorAll('.stat-value');
            stats.forEach(stat => {
                const text = stat.textContent;
                // Only animate if it contains numbers
                if (/\d/.test(text)) {
                    const number = parseInt(text.replace(/\D/g, ''));
                    if (number) {
                        stat.textContent = '0';
                        setTimeout(() => {
                            animateCounter(stat, number, 1500);
                        }, 200);
                    }
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}
