/**
 * ========================================
 * HERO MEDICAL SECTION - MOBILE VERSION
 * Carrusel optimizado exclusivamente para dispositivos móviles
 * Muestra una imagen a la vez con transiciones suaves
 * ========================================
 */

(function() {
    'use strict';

    // Marcar que el script móvil se está cargando
    window.heroMobileLoading = true;

    // Solo ejecutar en dispositivos móviles
    function isMobileDevice() {
        return window.innerWidth <= 768;
    }
    
    if (!isMobileDevice()) {
        console.log('📱 Hero Mobile: Desktop detectado, script no se ejecutará');
        window.heroMobileLoading = false;
        window.heroMobileActive = false;
        return;
    }
    
    // Marcar que la versión móvil está activa
    window.heroMobileActive = true;
    window.heroDesktopActive = false;

    // Configuración para móvil
    const CONFIG = {
        carouselInterval: 4000, // 4 segundos por imagen
        fadeDuration: 800,      // Transición de 0.8 segundos
        isMobile: true
    };

    // Arrays de imágenes - sincronizados con hero-medical.js
    // Si existe window.wpAssets (WordPress), se usan esas rutas
    const IMAGES = window.wpAssets?.heroMobileImages || {
        antes: [
            'assets/img/fijas/new/3.png',
            'assets/img/fijas/new/alex_1.png',
            'assets/img/fijas/new/2.png',
            'assets/img/fijas/new/1.png'
        ],
        despues: [
            'assets/img/h_s/despues/d5.png',
            'assets/img/dr_cabello_img_reales/hero_section_ds_1.png',
            'assets/img/h_s/despues/d2.png',
            'assets/img/h_s/despues/d3.png',
        ]
    };
    
    // Debug
    if (window.wpAssets) {
        console.log('📱 Hero Mobile: Usando rutas de WordPress');
    }

    // Estado del carrusel móvil
    const carouselState = {
        currentIndex: 0,
        showingAfter: true, // true = "después", false = "antes"
        intervalId: null,
        isVisible: true,
        isPaused: false,
        isTransitioning: false
    };

    // Inicialización
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        console.log('📱 Hero Mobile: Inicializando versión móvil');
        setupMobileCarousel();
        setupVisibilityObserver();
        // Marcar que la carga móvil terminó (evita que otros scripts queden esperando)
        window.heroMobileLoading = false;
    }

    /**
     * Configuración del carrusel móvil optimizado
     */
    function setupMobileCarousel() {
        const mainImageContainer = document.querySelector('.hero-image--main img');
        const refImageContainer = document.querySelector('.hero-image--reference img');
        const mainWrapper = document.querySelector('.hero-image--main');
        const refWrapper = document.querySelector('.hero-image--reference');
        
        if (!mainImageContainer || !refImageContainer) {
            console.warn('⚠️ Contenedores de imagen no encontrados');
            return;
        }

        if (!IMAGES.antes.length || !IMAGES.despues.length) {
            console.warn('⚠️ Arrays de imágenes vacíos');
            return;
        }

        const totalImages = Math.min(IMAGES.antes.length, IMAGES.despues.length);

        // Precargar todas las imágenes
        preloadImages();

        // Aplicar estilos optimizados para móvil
        applyMobileStyles(mainWrapper, refWrapper, mainImageContainer, refImageContainer);

        // Configurar transiciones CSS suaves
        const transitionStyle = `opacity ${CONFIG.fadeDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        mainImageContainer.style.transition = transitionStyle;
        refImageContainer.style.transition = transitionStyle;

        // Ocultar la imagen de referencia inicialmente (no se usa en móvil)
        refWrapper.style.opacity = '0';
        refWrapper.style.visibility = 'hidden';
        refWrapper.style.pointerEvents = 'none';
        
        // Mostrar la imagen principal inicialmente
        mainWrapper.style.opacity = '1';
        mainWrapper.style.visibility = 'visible';
        mainWrapper.style.pointerEvents = 'auto';

        // Cargar primera imagen del "después" y forzar visibilidad
        updateMainImage(0);
        // Elemento de etiqueta móvil (si existe)
        const mobileLabelEl = document.querySelector('.hero-image-label--mobile');

        // Función para actualizar el texto de la etiqueta móvil según el estado
        function setMobileLabel(showingAfter) {
            if (!mobileLabelEl) return;
            const iconEl = mobileLabelEl.querySelector('.label-icon');
            const iconHTML = iconEl ? iconEl.outerHTML + ' ' : '';
            mobileLabelEl.innerHTML = iconHTML + (showingAfter ? 'DESPUÉS' : 'ANTES');
        }

        // Inicializar texto de la etiqueta móvil según el estado inicial
        setMobileLabel(carouselState.showingAfter);
        
        // Forzar la visibilidad de la imagen con !important via style
        mainImageContainer.style.cssText = `
            opacity: 1 !important;
            display: block !important;
            visibility: visible !important;
            transition: ${transitionStyle};
        `;

        // Función para actualizar la imagen principal visible
        function updateMainImage(index) {
            if (carouselState.showingAfter && IMAGES.despues[index]) {
                mainImageContainer.src = IMAGES.despues[index];
                mainImageContainer.alt = `Resultado del trasplante capilar - Caso ${index + 1}`;
                console.log(`📱 Cargando imagen DESPUÉS: ${IMAGES.despues[index]}`);
            } else if (!carouselState.showingAfter && IMAGES.antes[index]) {
                mainImageContainer.src = IMAGES.antes[index];
                mainImageContainer.alt = `Estado inicial del paciente - Caso ${index + 1}`;
                console.log(`📱 Cargando imagen ANTES: ${IMAGES.antes[index]}`);
            }
        }

        // Función para cambiar entre "después" y "antes"
        function transitionImage() {
            if (carouselState.isTransitioning) return;
            carouselState.isTransitioning = true;

            // Fade out de la imagen actual
            mainImageContainer.style.setProperty('opacity', '0', 'important');

            setTimeout(() => {
                // Alternar entre "después" y "antes"
                carouselState.showingAfter = !carouselState.showingAfter;

                // Si volvemos a "después", avanzar al siguiente caso
                if (carouselState.showingAfter) {
                    carouselState.currentIndex = (carouselState.currentIndex + 1) % totalImages;
                }

                // Actualizar la imagen
                updateMainImage(carouselState.currentIndex);

                // Actualizar la etiqueta móvil para reflejar el nuevo estado (ANTES / RESULTADO)
                setMobileLabel(carouselState.showingAfter);

                // Fade in de la nueva imagen con !important para asegurar visibilidad
                requestAnimationFrame(() => {
                    mainImageContainer.style.setProperty('opacity', '1', 'important');
                    mainImageContainer.style.setProperty('display', 'block', 'important');
                    mainImageContainer.style.setProperty('visibility', 'visible', 'important');
                    carouselState.isTransitioning = false;
                });

                console.log(`📱 Mostrando: ${carouselState.showingAfter ? 'Después' : 'Antes'} - Caso ${carouselState.currentIndex + 1}`);
            }, CONFIG.fadeDuration / 2);
        }

        // Precargar imágenes
        function preloadImages() {
            const allImages = [...IMAGES.antes, ...IMAGES.despues];
            allImages.forEach(src => {
                const img = new Image();
                img.src = src;
            });
        }

        // Iniciar el carrusel
        function startCarousel() {
            if (carouselState.intervalId) {
                clearInterval(carouselState.intervalId);
            }
            
            if (carouselState.isVisible && !carouselState.isPaused) {
                carouselState.intervalId = setInterval(transitionImage, CONFIG.carouselInterval);
                console.log('▶️ Carrusel móvil iniciado');
            }
        }

        // Detener el carrusel
        function stopCarousel() {
            if (carouselState.intervalId) {
                clearInterval(carouselState.intervalId);
                carouselState.intervalId = null;
                console.log('⏸️ Carrusel móvil pausado');
            }
        }

        // Pausar al tocar la imagen
        const visualContainer = document.querySelector('.hero-medical__visual');
        if (visualContainer) {
            visualContainer.addEventListener('touchstart', () => {
                carouselState.isPaused = true;
                stopCarousel();
            });

            visualContainer.addEventListener('touchend', () => {
                setTimeout(() => {
                    carouselState.isPaused = false;
                    startCarousel();
                }, 2000); // Reanudar después de 2 segundos
            });
        }

        // Iniciar el carrusel después de mostrar la primera imagen
        setTimeout(() => {
            startCarousel();
        }, 100);

        console.log('✅ Carrusel móvil configurado:', totalImages, 'casos • Intervalo:', CONFIG.carouselInterval / 1000, 's');
    }

    /**
     * Aplicar estilos optimizados para visualización móvil
     */
    function applyMobileStyles(mainWrapper, refWrapper, mainImg, refImg) {
        // Asegurar que el contenedor principal esté centrado y sea grande
        mainWrapper.style.display = 'flex';
        mainWrapper.style.alignItems = 'center';
        mainWrapper.style.justifyContent = 'center';
        mainWrapper.style.width = '100%';
        mainWrapper.style.maxWidth = '450px';
        mainWrapper.style.margin = '0 auto';
        
        // Imagen principal visible y grande
        mainImg.style.width = '100%';
        mainImg.style.height = 'auto';
        mainImg.style.objectFit = 'contain';
        mainImg.style.objectPosition = 'center';
        mainImg.style.display = 'block';
        
        // Referencia oculta pero lista
        refWrapper.style.display = 'flex';
        refWrapper.style.alignItems = 'center';
        refWrapper.style.justifyContent = 'center';
        refWrapper.style.width = '100%';
        refWrapper.style.maxWidth = '450px';
        refWrapper.style.margin = '0 auto';
        
        refImg.style.width = '100%';
        refImg.style.height = 'auto';
        refImg.style.objectFit = 'contain';
        refImg.style.objectPosition = 'center';
        refImg.style.display = 'block';
        
        console.log('✅ Estilos móvil aplicados - Imágenes optimizadas para centrado');
    }

    /**
     * Observer para pausar cuando no está visible
     */
    function setupVisibilityObserver() {
        const heroSection = document.querySelector('.hero-medical');
        if (!heroSection) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                carouselState.isVisible = entry.isIntersecting;
                
                if (!entry.isIntersecting && carouselState.intervalId) {
                    clearInterval(carouselState.intervalId);
                    carouselState.intervalId = null;
                }
            });
        }, { threshold: 0 });

        observer.observe(heroSection);
    }

    // API pública para control externo
    window.HeroMobile = {
        pause: function() {
            carouselState.isPaused = true;
            if (carouselState.intervalId) {
                clearInterval(carouselState.intervalId);
                carouselState.intervalId = null;
            }
            console.log('⏸️ Carrusel móvil pausado manualmente');
        },
        
        resume: function() {
            carouselState.isPaused = false;
            if (carouselState.isVisible) {
                setupMobileCarousel();
            }
            console.log('▶️ Carrusel móvil reanudado manualmente');
        },
        
        getStatus: function() {
            return {
                isMobile: true,
                currentIndex: carouselState.currentIndex,
                showingAfter: carouselState.showingAfter,
                isRunning: carouselState.intervalId !== null,
                isPaused: carouselState.isPaused,
                isVisible: carouselState.isVisible
            };
        }
    };

    console.log('📱 Hero Mobile Script cargado exitosamente');

})();
