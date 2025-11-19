/**
 * Medical Center Section Interactive Features
 * Maneja animaciones, contadores y efectos interactivos
 * ✅ OPTIMIZADO PARA MÓVILES REALES
 */

class MedicalCenterSection {
    constructor() {
        this.section = document.getElementById('centro-medico');
        
        // SOLO seleccionar stat-numbers dentro de esta sección
        this.statNumbers = this.section ? this.section.querySelectorAll('.stat-number') : [];
        this.serviceCards = document.querySelectorAll('.medical-service-card');
        this.ctaButtons = document.querySelectorAll('.btn-medical-primary, .btn-medical-secondary');
        
        this.animationTriggered = false;
        this.isMobile = this.detectMobile();
        
        // ✅ NUEVO: Log para depuración
        console.log('🏥 Medical Center JS cargado', {
            cards: this.serviceCards.length,
            stats: this.statNumbers.length,
            buttons: this.ctaButtons.length,
            isMobile: this.isMobile
        });
        
        this.init();
    }
    
    /**
     * ✅ NUEVO: Detecta si es dispositivo móvil
     */
    detectMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
            || window.innerWidth <= 768;
    }
    
    init() {
        // ✅ CORREGIDO: No ocultar elementos inicialmente
        // this.setupServiceCardAnimations(); // DESACTIVADO
        // this.setupButtonEffects(); // DESACTIVADO
        
        // ✅ NUEVO: Asegurar visibilidad inmediata
        this.ensureVisibility();
        
        this.setupIntersectionObserver();
        this.setupCounterAnimations();
        
        // ✅ NUEVO: Timeout de seguridad para forzar animaciones
        setTimeout(() => {
            if (!this.animationTriggered) {
                console.warn('⚠️ Animations timeout - forcing visibility');
                this.triggerSectionAnimations();
            }
        }, 3000);
    }
    
    /**
     * ✅ NUEVO: Asegura visibilidad de todos los elementos
     */
    ensureVisibility() {
        // Forzar visibilidad de tarjetas
        this.serviceCards.forEach(card => {
            card.style.visibility = 'visible';
            card.style.opacity = '1';
            card.style.transform = 'none';
        });
        
        // Forzar visibilidad de botones
        this.ctaButtons.forEach(button => {
            button.style.visibility = 'visible';
            button.style.opacity = '1';
            button.style.transform = 'none';
        });
        
        // Forzar visibilidad de stats
        const statsContainer = document.querySelector('.stats-container');
        if (statsContainer) {
            statsContainer.style.visibility = 'visible';
            statsContainer.style.opacity = '1';
        }
        
        console.log('✅ Visibility forced for all elements');
    }
    
    /**
     * Configura el Intersection Observer para la sección
     * ✅ CORREGIDO: Configuración más permisiva para móviles
     */
    setupIntersectionObserver() {
        // ✅ CORREGIDO: Threshold más bajo y rootMargin ajustado para móviles
        const observerOptions = {
            threshold: this.isMobile ? 0.05 : 0.2, // Menos restrictivo en móviles
            rootMargin: this.isMobile ? '0px' : '0px 0px -50px 0px' // Sin margen en móviles
        };
        
        console.log('📊 Observer config:', observerOptions);
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                console.log('👁️ Intersection:', {
                    isIntersecting: entry.isIntersecting,
                    ratio: entry.intersectionRatio,
                    triggered: this.animationTriggered
                });
                
                if (entry.isIntersecting && !this.animationTriggered) {
                    console.log('🎬 Triggering animations');
                    this.triggerSectionAnimations();
                    this.animationTriggered = true;
                }
            });
        }, observerOptions);
        
        if (this.section) {
            observer.observe(this.section);
            console.log('✅ Observer attached to section');
        } else {
            console.error('❌ Section #centro-medico not found');
            // ✅ NUEVO: Forzar animaciones si no se encuentra la sección
            this.triggerSectionAnimations();
        }
    }
    
    /**
     * Dispara todas las animaciones de la sección
     * ✅ CORREGIDO: No depende de animaciones para visibilidad
     */
    triggerSectionAnimations() {
        console.log('🎬 Starting animations');
        
        // ✅ CORREGIDO: Asegurar visibilidad primero
        this.ensureVisibility();
        
        // Animar las tarjetas de servicio con retraso escalonado (opcional)
        if (!this.isMobile) {
            this.serviceCards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
        
        // Iniciar contadores
        setTimeout(() => {
            this.startCounters();
        }, this.isMobile ? 200 : 800);
    }
    
    /**
     * Configura las animaciones de las tarjetas de servicio
     * ✅ CORREGIDO: No oculta elementos inicialmente
     */
    setupServiceCardAnimations() {
        // ✅ DESACTIVADO: No ocultar elementos
        /*
        this.serviceCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease-out';
        });
        */
        
        // Solo agregar eventos hover
        this.serviceCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.enhanceCardHover(card, true);
            });
            
            card.addEventListener('mouseleave', () => {
                this.enhanceCardHover(card, false);
            });
        });
    }
    
    /**
     * Mejora el efecto hover de las tarjetas
     */
    enhanceCardHover(card, isHovering) {
        const icon = card.querySelector('.service-icon');
        const pulse = card.querySelector('.icon-pulse');
        
        if (isHovering) {
            if (icon) {
                icon.style.transform = 'scale(1.05) rotate(5deg)';
            }
            if (pulse) {
                pulse.style.animationDuration = '1s';
            }
        } else {
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
            if (pulse) {
                pulse.style.animationDuration = '2s';
            }
        }
    }
    
    /**
     * Configura los efectos de los botones
     * ✅ CORREGIDO: No oculta botones inicialmente
     */
    setupButtonEffects() {
        // ✅ DESACTIVADO: No ocultar elementos
        /*
        this.ctaButtons.forEach(button => {
            button.style.opacity = '0';
            button.style.transform = 'translateY(20px)';
            button.style.transition = 'all 0.4s ease-out';
        });
        */
        
        // Solo agregar efectos de interacción
        this.ctaButtons.forEach(button => {
            // Efecto ripple en click
            button.addEventListener('click', (e) => {
                this.createRippleEffect(e, button);
            });
            
            // Efecto de tracking para analytics
            button.addEventListener('click', () => {
                const buttonText = button.textContent.trim();
                this.trackButtonClick(buttonText);
            });
        });
    }
    
    /**
     * Crea efecto ripple en los botones
     */
    createRippleEffect(event, button) {
        const rect = button.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            left: ${x - 10}px;
            top: ${y - 10}px;
            width: 20px;
            height: 20px;
            pointer-events: none;
        `;
        
        button.appendChild(ripple);
        
        // Eliminar el elemento después de la animación
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.remove();
            }
        }, 600);
    }
    
    /**
     * Configura las animaciones de contador
     * ✅ CORREGIDO: Visibles por defecto
     */
    setupCounterAnimations() {
        // ✅ CORREGIDO: No ocultar inicialmente
        this.statNumbers.forEach(stat => {
            stat.style.visibility = 'visible';
            stat.style.opacity = '1';
            stat.style.transform = 'none';
        });
    }
    
    /**
     * Inicia los contadores animados
     */
    startCounters() {
        this.statNumbers.forEach((stat, index) => {
            setTimeout(() => {
                const targetValue = parseInt(stat.dataset.count);
                this.animateCounter(stat, targetValue);
            }, index * 200);
        });
    }
    
    /**
     * Anima un contador específico
     * ✅ CORREGIDO: Funciona aunque no haya transiciones
     */
    animateCounter(element, target) {
        // Hacer visible el elemento (por si acaso)
        element.style.visibility = 'visible';
        element.style.opacity = '1';
        element.style.transform = 'none';
        element.classList.add('animate');
        
        let current = 0;
        const increment = target / 50;
        const duration = 1000;
        const stepTime = duration / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, stepTime);
        
        console.log('🔢 Counter animated:', target);
    }
    
    /**
     * Tracking de clicks en botones (para analytics)
     */
    trackButtonClick(buttonText) {
        // Aquí puedes integrar con Google Analytics, Facebook Pixel, etc.
        console.log(`Medical Center Button Clicked: ${buttonText}`);
        
        // Ejemplo de integración con Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'click', {
                event_category: 'Medical Center',
                event_label: buttonText,
                value: 1
            });
        }
        
        // Ejemplo de integración con Facebook Pixel
        if (typeof fbq !== 'undefined') {
            fbq('track', 'Lead', {
                content_name: buttonText,
                content_category: 'Medical Consultation'
            });
        }
    }
    
    /**
     * Método para reiniciar animaciones (útil para testing)
     */
    resetAnimations() {
        this.animationTriggered = false;
        
        this.serviceCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
        });
        
        this.statNumbers.forEach(stat => {
            stat.style.opacity = '0';
            stat.style.transform = 'translateY(20px)';
            stat.textContent = '0';
        });
        
        this.ctaButtons.forEach(button => {
            button.style.opacity = '0';
            button.style.transform = 'translateY(20px)';
        });
    }
}

/**
 * Utilidad para crear efectos de partículas adicionales
 */
class MedicalParticles {
    constructor() {
        this.container = document.querySelector('.medical-center-section');
        this.particles = [];
        this.maxParticles = 20;
        
        if (this.container && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.init();
        }
    }
    
    init() {
        this.createParticleContainer();
        this.generateParticles();
        this.animateParticles();
    }
    
    createParticleContainer() {
        this.particleContainer = document.createElement('div');
        this.particleContainer.className = 'medical-particles';
        this.particleContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;
        this.container.appendChild(this.particleContainer);
    }
    
    generateParticles() {
        for (let i = 0; i < this.maxParticles; i++) {
            const particle = document.createElement('div');
            particle.className = 'medical-particle';
            
            const size = Math.random() * 4 + 2;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const delay = Math.random() * 10;
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(18, 215, 255, ${Math.random() * 0.5 + 0.2});
                border-radius: 50%;
                left: ${x}%;
                top: ${y}%;
                animation: particleFloat ${15 + Math.random() * 10}s linear infinite ${delay}s;
            `;
            
            this.particleContainer.appendChild(particle);
            this.particles.push(particle);
        }
    }
    
    animateParticles() {
        // Las partículas se animan mediante CSS, pero podemos agregar lógica adicional aquí
        setInterval(() => {
            this.particles.forEach(particle => {
                // Cambio sutil de opacidad para crear efecto de "respiración"
                const currentOpacity = parseFloat(particle.style.opacity) || 0.5;
                const newOpacity = Math.max(0.1, Math.min(0.8, currentOpacity + (Math.random() - 0.5) * 0.1));
                particle.style.opacity = newOpacity;
            });
        }, 2000);
    }
}

/**
 * Inicializar cuando el DOM esté listo
 */
document.addEventListener('DOMContentLoaded', () => {
    new MedicalCenterSection();
    new MedicalParticles();
});

/**
 * Añadir estilos CSS dinámicos para efectos adicionales
 */
const addDynamicStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes particleFloat {
            0% {
                transform: translateY(0px) translateX(0px) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) translateX(20px) rotate(360deg);
                opacity: 0;
            }
        }
        
        .medical-service-card:hover .service-icon {
            transition: transform 0.3s ease;
        }
        
        .btn-medical-primary,
        .btn-medical-secondary {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
};

// Agregar estilos dinámicos
addDynamicStyles();

// Exportar para uso en módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MedicalCenterSection, MedicalParticles };
}