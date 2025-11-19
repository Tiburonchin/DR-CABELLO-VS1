/**
 * Enhanced Footer Functionality
 * Handles animations, interactions, and dynamic behaviors
 */

class EnhancedFooter {
    constructor() {
        this.backToTopBtn = document.getElementById('backToTop');
        this.footer = document.querySelector('.site-footer');
        this.newsletterForm = document.querySelector('.newsletter-form');
        this.socialLinks = document.querySelectorAll('.social-link');
        this.yearElement = document.getElementById('year');
        
        this.init();
    }
    
    init() {
        this.setCurrentYear();
        this.setupBackToTop();
        this.setupNewsletterForm();
        this.setupSocialAnimations();
        this.setupScrollAnimations();
        this.setupIntersectionObserver();
    }
    
    /**
     * Set current year in footer
     */
    setCurrentYear() {
        if (this.yearElement) {
            this.yearElement.textContent = new Date().getFullYear();
        }
    }
    
    /**
     * Setup back to top button functionality
     */
    setupBackToTop() {
        if (!this.backToTopBtn) return;
        
        // Show/hide button based on scroll position
        const toggleVisibility = () => {
            const scrollY = window.pageYOffset;
            const threshold = 400;
            
            if (scrollY > threshold) {
                this.backToTopBtn.classList.add('visible');
            } else {
                this.backToTopBtn.classList.remove('visible');
            }
        };
        
        // Smooth scroll to top
        const scrollToTop = (e) => {
            e.preventDefault();
            
            const startTime = performance.now();
            const startPos = window.pageYOffset;
            const duration = 800;
            
            const animateScroll = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function (ease-out-cubic)
                const easeOut = 1 - Math.pow(1 - progress, 3);
                
                window.scrollTo(0, startPos * (1 - easeOut));
                
                if (progress < 1) {
                    requestAnimationFrame(animateScroll);
                }
            };
            
            requestAnimationFrame(animateScroll);
        };
        
        // Event listeners
        window.addEventListener('scroll', throttle(toggleVisibility, 100));
        this.backToTopBtn.addEventListener('click', scrollToTop);
        
        // Initial check
        toggleVisibility();
    }
    
    /**
     * Setup newsletter form functionality
     */
    setupNewsletterForm() {
        if (!this.newsletterForm) return;
        
        this.newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const emailInput = this.newsletterForm.querySelector('input[type="email"]');
            const submitBtn = this.newsletterForm.querySelector('button[type="submit"]');
            const email = emailInput.value.trim();
            
            // Basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!emailRegex.test(email)) {
                this.showFormMessage('Por favor, ingresa un email válido', 'error');
                return;
            }
            
            // Simulate form submission
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M8 12l2 2 4-4"/>
                </svg>
            `;
            
            // Simulate API call
            setTimeout(() => {
                this.showFormMessage('¡Gracias! Te has suscrito exitosamente', 'success');
                emailInput.value = '';
                submitBtn.disabled = false;
                submitBtn.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="22" y1="2" x2="11" y2="13"/>
                        <polygon points="22,2 15,22 11,13 2,9 22,2"/>
                    </svg>
                `;
            }, 2000);
        });
    }
    
    /**
     * Show form submission message
     */
    showFormMessage(message, type) {
        // Remove existing message
        const existingMessage = this.newsletterForm.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create new message
        const messageEl = document.createElement('div');
        messageEl.className = `form-message form-message--${type}`;
        messageEl.textContent = message;
        
        // Style the message
        messageEl.style.cssText = `
            padding: 12px 16px;
            border-radius: 8px;
            font-size: 0.85rem;
            font-weight: 500;
            margin-top: 12px;
            transition: all 0.3s ease;
            ${type === 'success' 
                ? 'background: rgba(34, 197, 94, 0.1); color: #059669; border: 1px solid rgba(34, 197, 94, 0.2);'
                : 'background: rgba(239, 68, 68, 0.1); color: #dc2626; border: 1px solid rgba(239, 68, 68, 0.2);'
            }
        `;
        
        this.newsletterForm.appendChild(messageEl);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.style.opacity = '0';
                messageEl.style.transform = 'translateY(-10px)';
                setTimeout(() => messageEl.remove(), 300);
            }
        }, 5000);
    }
    
    /**
     * Setup social link animations
     */
    setupSocialAnimations() {
        this.socialLinks.forEach((link, index) => {
            // Add staggered entrance animation
            link.style.animationDelay = `${index * 0.1}s`;
            
            // Add custom hover effects based on platform
            const platform = link.dataset.platform;
            
            link.addEventListener('mouseenter', () => {
                link.style.transform = 'translateY(-4px) scale(1.05)';
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.transform = 'translateY(0) scale(1)';
            });
            
            // Add click analytics (you can replace this with actual analytics)
            link.addEventListener('click', () => {
                console.log(`Social link clicked: ${platform}`);
                // Example: gtag('event', 'social_click', { platform: platform });
            });
        });
    }
    
    /**
     * Setup scroll-based animations
     */
    setupScrollAnimations() {
        const animateOnScroll = () => {
            const scrollY = window.pageYOffset;
            const wavePattern = document.querySelector('.wave-pattern');
            
            if (wavePattern) {
                // Parallax effect for wave
                const parallaxSpeed = 0.5;
                wavePattern.style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
            }
            
            // Animate certification badges
            const certBadges = document.querySelectorAll('.cert-badge');
            certBadges.forEach((badge, index) => {
                const rect = badge.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                
                if (isVisible) {
                    const delay = index * 100;
                    setTimeout(() => {
                        badge.style.transform = 'translateY(0) scale(1)';
                        badge.style.opacity = '1';
                    }, delay);
                }
            });
        };
        
        window.addEventListener('scroll', throttle(animateOnScroll, 16));
    }
    
    /**
     * Setup intersection observer for reveal animations
     */
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('footer-revealed');
                    
                    // Animate social links with stagger
                    const socialLinks = entry.target.querySelectorAll('.social-link');
                    socialLinks.forEach((link, index) => {
                        setTimeout(() => {
                            link.style.opacity = '1';
                            link.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);
        
        if (this.footer) {
            observer.observe(this.footer);
        }
    }
}

/**
 * Utility function for throttling
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Utility function for debouncing
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Initialize enhanced footer when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    new EnhancedFooter();
});

/**
 * Additional utility: Copy to clipboard functionality
 * Can be used for contact information
 */
function copyToClipboard(text, successMessage = 'Copiado al portapapeles') {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showToast(successMessage, 'success');
        }).catch(() => {
            fallbackCopyTextToClipboard(text, successMessage);
        });
    } else {
        fallbackCopyTextToClipboard(text, successMessage);
    }
}

/**
 * Fallback copy method for older browsers
 */
function fallbackCopyTextToClipboard(text, successMessage) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showToast(successMessage, 'success');
    } catch (err) {
        showToast('Error al copiar', 'error');
    }
    
    document.body.removeChild(textArea);
}

/**
 * Show toast notification
 */
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.textContent = message;
    
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        padding: 12px 24px;
        border-radius: 8px;
        font-weight: 500;
        z-index: 10000;
        transition: all 0.3s ease;
        ${type === 'success' 
            ? 'background: #059669; color: white;'
            : type === 'error'
            ? 'background: #dc2626; color: white;'
            : 'background: #3b82f6; color: white;'
        }
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(100px)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 300);
    }, 3000);
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EnhancedFooter;
}