/**
 * Doctor Profile Interactive Animations
 * Adds engaging animations and interactivity to the doctor profile section
 */

document.addEventListener('DOMContentLoaded', function() {
    initDoctorProfileAnimations();
});

function initDoctorProfileAnimations() {
    // Counter animations for stats - SOLO en la sección de equipo/doctor
    const doctorSection = document.getElementById('equipo');
    if (!doctorSection) {
        console.warn('Doctor section (#equipo) not found');
        return;
    }
    
    const statNumbers = doctorSection.querySelectorAll('.stat-number');
    console.log('Doctor profile stats found:', statNumbers.length);
    
    const observerOptions = {
        threshold: 0.7,
        rootMargin: '0px 0px -50px 0px'
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Floating elements animation
    initFloatingElements();
    
    // Credential badges hover effect
    initCredentialBadges();
    
    // Doctor image parallax effect
    initDoctorImageParallax();
    
    // Specialty items reveal animation
    initSpecialtyAnimation();
}

function animateCounter(element) {
    // Guardar el texto original PRIMERO
    const originalText = element.textContent.trim();
    
    // Verificar si el label hermano contiene % o +
    const statLabel = element.parentElement?.querySelector('.stat-label');
    const labelText = statLabel ? statLabel.textContent : '';
    const hasPercent = originalText.includes('%') || labelText.includes('%');
    const hasPlus = originalText.includes('+');
    
    // Obtener el número objetivo del atributo data-target o del texto
    let number;
    
    if (element.hasAttribute('data-target')) {
        number = parseInt(element.getAttribute('data-target'));
    } else {
        number = parseInt(originalText.replace(/[^\d]/g, ''));
    }
    
    // Validar que el número sea válido
    if (isNaN(number) || number === 0) {
        console.warn('Invalid stat number. Original:', originalText, 'data-target:', element.getAttribute('data-target'), 'parsed:', number);
        // Mantener el valor original si hay error
        return;
    }
    
    console.log('Animating counter:', { number, hasPercent, hasPlus, labelText });
    
    let current = 0;
    const increment = number / 50; // 50 steps for smooth animation
    const duration = 2000; // 2 seconds
    const stepTime = duration / 50;
    
    // Iniciar la animación desde 0
    element.textContent = '0' + (hasPercent ? '%' : '');
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
            current = number;
            clearInterval(timer);
        }
        
        let displayValue = Math.floor(current).toString();
        if (hasPlus && current >= number) displayValue += '+';
        if (hasPercent) displayValue += '%';
        
        element.textContent = displayValue;
    }, stepTime);
}

function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-icon');
    
    floatingElements.forEach((element, index) => {
        // Add random delay to create more natural movement
        const randomDelay = Math.random() * 2;
        element.style.animationDelay = `${randomDelay}s`;
        
        // Add mouse interaction
        element.addEventListener('mouseenter', () => {
            element.style.animationPlayState = 'paused';
            element.style.transform = 'translateY(-10px) scale(1.2)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.animationPlayState = 'running';
            element.style.transform = '';
        });
    });
}

function initCredentialBadges() {
    const badges = document.querySelectorAll('.credential-badge');
    
    badges.forEach((badge, index) => {
        // Stagger the initial animation
        badge.style.opacity = '0';
        badge.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            badge.style.transition = 'all 0.6s ease';
            badge.style.opacity = '1';
            badge.style.transform = 'translateY(0)';
        }, index * 150);
        
        // Add click effect
        badge.addEventListener('click', () => {
            badge.style.transform = 'scale(0.95)';
            setTimeout(() => {
                badge.style.transform = '';
            }, 150);
        });
    });
}

function initDoctorImageParallax() {
    const doctorImage = document.querySelector('.doctor-image-main');
    const imageContainer = document.querySelector('.doctor-image-container');
    
    if (!doctorImage || !imageContainer) return;
    
    // Mouse move parallax effect
    imageContainer.addEventListener('mousemove', (e) => {
        const rect = imageContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / centerY * -10;
        const rotateY = (x - centerX) / centerX * 10;
        
        doctorImage.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
    });
    
    imageContainer.addEventListener('mouseleave', () => {
        doctorImage.style.transform = '';
    });
    
    // Scroll parallax effect
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const imageSection = document.querySelector('.doctor-profile-section');
        
        if (!imageSection) return;
        
        const rect = imageSection.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isInView) {
            const parallaxSpeed = 0.1;
            const yPos = scrolled * parallaxSpeed;
            
            const floatingElements = document.querySelectorAll('.floating-icon');
            floatingElements.forEach((element, index) => {
                const speed = 0.05 + (index * 0.02);
                element.style.transform = `translateY(${yPos * speed}px)`;
            });
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
}

function initSpecialtyAnimation() {
    const specialtyItems = document.querySelectorAll('.specialty-item');
    
    const specialtyObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 100);
                specialtyObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    specialtyItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'all 0.6s ease';
        specialtyObserver.observe(item);
    });
}

// Add click tracking for buttons (optional analytics)
function initButtonTracking() {
    const ctaButtons = document.querySelectorAll('.btn-primary-gradient, .btn-outline-animated');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Add ripple effect
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Console log for tracking (replace with actual analytics)
            console.log('Doctor profile CTA clicked:', button.textContent.trim());
        });
    });
}

// CSS for ripple effect (add to CSS if not already present)
const rippleStyles = `
.btn-primary-gradient, .btn-outline-animated {
    position: relative;
    overflow: hidden;
}

.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.4);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

// Add styles to document if not already present
if (!document.getElementById('doctor-profile-ripple-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'doctor-profile-ripple-styles';
    styleSheet.textContent = rippleStyles;
    document.head.appendChild(styleSheet);
}

// Initialize button tracking
document.addEventListener('DOMContentLoaded', initButtonTracking);