/**
 * Ribbon Animation Controller
 * Maneja las animaciones de aparición del ribbon al hacer scroll
 */

class RibbonAnimation {
    constructor() {
        this.ribbon = document.querySelector('.ribbon');
        this.ribbonChars = document.querySelectorAll('.ribbon__char');
        this.isVisible = false;
        this.threshold = 0.3; // 30% del elemento visible para activar
        
        this.init();
    }

    init() {
        if (!this.ribbon) return;

        // Configurar Intersection Observer
        this.setupIntersectionObserver();
        
        // Reset inicial
        this.resetAnimation();
    }

    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: this.threshold
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.isVisible) {
                    this.playAnimation();
                } else if (!entry.isIntersecting && this.isVisible) {
                    this.resetAnimation();
                }
            });
        }, options);

        this.observer.observe(this.ribbon);
    }

    playAnimation() {
        this.isVisible = true;
        
        // Activar la clase para el ribbon principal
        this.ribbon.classList.add('is-visible');
        
        // Reset y activar animaciones de caracteres
        this.ribbonChars.forEach((char, index) => {
            char.style.opacity = '0';
            char.style.animation = 'none';
            
            // Forzar reflow
            char.offsetHeight;
            
            // Aplicar animaciones con delay
            setTimeout(() => {
                char.style.animation = `
                    charFadeIn 0.6s ease-out forwards,
                    charGlow 3s ease-in-out infinite ${1 + (index * 0.05)}s
                `;
            }, index * 50);
        });
    }

    resetAnimation() {
        this.isVisible = false;
        
        // Remover clase del ribbon
        this.ribbon.classList.remove('is-visible');
        
        // Reset caracteres
        this.ribbonChars.forEach(char => {
            char.style.opacity = '0';
            char.style.animation = 'none';
        });
    }

    // Método público para reiniciar manualmente
    restart() {
        this.resetAnimation();
        setTimeout(() => this.playAnimation(), 100);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    window.ribbonAnimation = new RibbonAnimation();
});

// Reiniciar en resize para recalcular posiciones
window.addEventListener('resize', () => {
    if (window.ribbonAnimation) {
        setTimeout(() => window.ribbonAnimation.restart(), 200);
    }
});