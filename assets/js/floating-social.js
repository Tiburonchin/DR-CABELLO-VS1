/**
 * Floating Social Menu Functionality
 * Maneja la animación y comportamiento del menú flotante de redes sociales
 */

document.addEventListener('DOMContentLoaded', function() {
    const floatingSocial = document.querySelector('.floating-social');
    
    // Solo mantener efectos de hover en los íconos sociales
    const socialItems = document.querySelectorAll('.floating-social-item');
    
    socialItems.forEach((item, index) => {
        const link = item.querySelector('a');
        
        item.addEventListener('mouseenter', function() {
            // Efecto de escala en el contenedor
            this.style.transform = 'scale(1.1)';
            
            // Efecto de rotación sutil en el icono
            const svg = this.querySelector('svg');
            if (svg) {
                svg.style.transform = 'rotate(5deg) scale(1.1)';
            }
            
            // Efecto de ondas
            createRippleEffect(this);
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            
            const svg = this.querySelector('svg');
            if (svg) {
                svg.style.transform = 'rotate(0deg) scale(1)';
            }
        });
        
        // Efecto de clic
        item.addEventListener('click', function(e) {
            createClickEffect(this);
            
            // Si es el último elemento (toggle), alternar visibilidad
            if (this.classList.contains('floating-social-toggle')) {
                e.preventDefault();
                toggleVisibility();
            }
        });
    });
    

    // Crear efecto de ondas
    function createRippleEffect(element) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            left: 50%;
            top: 50%;
            width: 20px;
            height: 20px;
            margin-left: -10px;
            margin-top: -10px;
        `;
        
        // Agregar keyframes para la animación si no existen
        if (!document.querySelector('#rippleAnimation')) {
            const style = document.createElement('style');
            style.id = 'rippleAnimation';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Crear efecto de clic
    function createClickEffect(element) {
        element.style.transform = 'scale(0.95)';
        setTimeout(() => {
            element.style.transform = 'scale(1.1)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 100);
        }, 100);
    }

    // Animación de entrada inicial
    function initializeAnimation() {
        if (!floatingSocial) return;
        
        floatingSocial.style.opacity = '0';
        floatingSocial.style.transform = 'translateY(-50%) translateX(100px)';
        
        setTimeout(() => {
            floatingSocial.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            floatingSocial.style.opacity = '1';
            floatingSocial.style.transform = 'translateY(-50%) translateX(0)';
        }, 500);
    }

    // Efecto parallax sutil
    function addParallaxEffect() {
        if (!floatingSocial) return;
        
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            
            floatingSocial.style.transform = `translateY(calc(-50% + ${parallax * 0.1}px)) translateX(0)`;
            ticking = false;
        }
        
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', requestTick);
    }

    // Inicializar todas las funcionalidades
    function init() {
        if (floatingSocial) {
            initializeAnimation();
            addParallaxEffect();
            
            // Agregar clases de CSS personalizadas
            floatingSocial.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        }
    }

    // Inicializar cuando el DOM esté listo
    init();
});