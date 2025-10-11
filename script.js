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
                const originalText = stat.textContent;
                // Only animate if it contains numbers and is not already formatted
                if (/\d/.test(originalText) && !originalText.includes('x') && !originalText.includes('%') && !originalText.includes('/')) {
                    const number = parseInt(originalText.replace(/\D/g, ''));
                    if (number) {
                        stat.textContent = '0';
                        setTimeout(() => {
                            animateCounter(stat, number, 1500);
                        }, 200);
                    }
                }
                // For formatted stats, just show them immediately
                else if (originalText.includes('x') || originalText.includes('%') || originalText.includes('/')) {
                    // Keep the original formatted text
                    stat.textContent = originalText;
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

// Interactive Cost Calculator
class CostCalculator {
    constructor() {
        this.ticketsInput = document.getElementById('tickets');
        this.costInput = document.getElementById('cost');
        this.agentsInput = document.getElementById('agents');
        
        this.ticketsValue = document.getElementById('tickets-value');
        this.costValue = document.getElementById('cost-value');
        this.agentsValue = document.getElementById('agents-value');
        
        this.monthlySavings = document.getElementById('monthly-savings');
        this.annualSavings = document.getElementById('annual-savings');
        this.roi = document.getElementById('roi');
        this.payback = document.getElementById('payback');
        
        this.agentSavings = document.getElementById('agent-savings');
        this.timeSavings = document.getElementById('time-savings');
        this.availabilitySavings = document.getElementById('availability-savings');
        
        this.init();
    }
    
    init() {
        if (!this.ticketsInput) return;
        
        // Add event listeners
        this.ticketsInput.addEventListener('input', () => this.updateCalculations());
        this.costInput.addEventListener('input', () => this.updateCalculations());
        this.agentsInput.addEventListener('input', () => this.updateCalculations());
        
        // Initial calculation
        this.updateCalculations();
    }
    
    updateCalculations() {
        const tickets = parseInt(this.ticketsInput.value);
        const costPerHour = parseInt(this.costInput.value);
        const agents = parseInt(this.agentsInput.value);
        
        // Update display values
        this.ticketsValue.textContent = tickets.toLocaleString();
        this.costValue.textContent = `$${costPerHour}`;
        this.agentsValue.textContent = agents;
        
        // Calculate savings
        const monthlyAgentCost = agents * costPerHour * 160; // 160 hours per month
        const reducedAgents = Math.max(1, Math.ceil(agents * 0.2)); // 80% reduction
        const newMonthlyAgentCost = reducedAgents * costPerHour * 160;
        
        const agentSavings = monthlyAgentCost - newMonthlyAgentCost;
        const timeSavings = tickets * 0.5 * costPerHour; // 30 min saved per ticket
        const availabilitySavings = tickets * 0.1 * costPerHour; // 24/7 availability
        
        const totalMonthlySavings = agentSavings + timeSavings + availabilitySavings;
        const totalAnnualSavings = totalMonthlySavings * 12;
        
        // Rationa cost (simplified)
        const rationaMonthlyCost = Math.max(2000, tickets * 2); // $2 per ticket, min $2000
        const netMonthlySavings = totalMonthlySavings - rationaMonthlyCost;
        const netAnnualSavings = netMonthlySavings * 12;
        
        const roi = rationaMonthlyCost > 0 ? (netAnnualSavings / (rationaMonthlyCost * 12)) * 100 : 0;
        const paybackMonths = rationaMonthlyCost > 0 ? (rationaMonthlyCost * 12) / netAnnualSavings : 0;
        
        // Update results with animation
        this.animateValue(this.monthlySavings, netMonthlySavings, '$', 0);
        this.animateValue(this.annualSavings, netAnnualSavings, '$', 0);
        this.animateValue(this.roi, roi, '', 0, '%');
        this.animateValue(this.payback, paybackMonths, '', 1, ' months');
        
        // Update breakdown
        this.animateValue(this.agentSavings, agentSavings, '$', 0, '/mo');
        this.animateValue(this.timeSavings, timeSavings, '$', 0, '/mo');
        this.animateValue(this.availabilitySavings, availabilitySavings, '$', 0, '/mo');
    }
    
    animateValue(element, target, prefix = '', decimals = 0, suffix = '') {
        if (!element) return;
        
        const start = parseFloat(element.textContent.replace(/[^0-9.-]/g, '')) || 0;
        const duration = 800;
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = start + (target - start) * easeOutQuart;
            
            element.textContent = prefix + current.toLocaleString('en-US', {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals
            }) + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CostCalculator();
});

// Add hover effects for story cards
document.addEventListener('DOMContentLoaded', () => {
    const storyCards = document.querySelectorAll('.story-card');
    storyCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add click-to-copy functionality for calculator results
document.addEventListener('DOMContentLoaded', () => {
    const resultItems = document.querySelectorAll('.result-item');
    resultItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.title = 'Click to copy';
        
        item.addEventListener('click', () => {
            const value = item.querySelector('.result-value').textContent;
            const label = item.querySelector('.result-label').textContent;
            const text = `${label}: ${value}`;
            
            navigator.clipboard.writeText(text).then(() => {
                // Show temporary feedback
                const originalBg = item.style.backgroundColor;
                item.style.backgroundColor = '#e8f5e8';
                setTimeout(() => {
                    item.style.backgroundColor = originalBg;
                }, 1000);
            });
        });
    });
});
