/**
 * ========================================
 * HERO MEDICAL SECTION
 * Professional interactions and animations
 * Versión Desktop/Tablet (>768px)
 * ========================================
 */

(function() {
    'use strict';

    // Esperar a que el script móvil termine de verificar
    if (window.heroMobileLoading) {
        setTimeout(arguments.callee, 50);
        return;
    }

    // Si la versión móvil está activa, no ejecutar desktop
    if (window.heroMobileActive) {
        console.log('🖥️ Hero Desktop: Versión móvil activa, script desktop no se ejecutará');
        return;
    }

    // Detectar si es móvil y detener la ejecución
    if (window.innerWidth <= 768) {
        console.log('🖥️ Hero Desktop: Móvil detectado, script desktop no se ejecutará');
        console.log('📱 Cargando versión móvil optimizada...');
        window.heroDesktopActive = false;
        return;
    }

    // Marcar que la versión desktop está activa
    window.heroDesktopActive = true;
    window.heroMobileActive = false;

    console.log('🖥️ Hero Desktop: Inicializando versión escritorio/tablet');

    // Configuración
    const CONFIG = {
        observerOptions: {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        },
        parallaxIntensity: 0.3,
        counterDuration: 2000,
        counterDelay: 500,
        carouselInterval: 4000, // Intervalo uniforme de 4 segundos
        fadeDuration: 800 // Transición suave de 0.8 segundos
    };

    // Arrays de imágenes para el carrusel - TODAS las imágenes disponibles
    // Si existe window.HERO_IMAGES_OVERRIDE (WordPress), se usa en su lugar
    const IMAGES = window.HERO_IMAGES_OVERRIDE || window.wpAssets?.heroImages || {
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
    
    // Debug: Verificar qué rutas se están usando
    if (window.HERO_IMAGES_OVERRIDE || window.wpAssets) {
        console.log('🎨 Hero Medical: Usando rutas de WordPress');
    } else {
        console.log('🎨 Hero Medical: Usando rutas estáticas');
    }

    // Estado global del carrusel
    const carouselState = {
        currentIndex: 0,
        intervalId: null,
        isHovered: false,
        isVisible: true,
        isInitialized: false
    };

    // Inicialización cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        setupIntersectionObserver();
        setupParallax();
        setupImageInteractions();
        setupTagAnimations();
        setupVideoBackground();
        setupImageCarousel();
    }

    /**
     * Intersection Observer para animaciones al entrar en viewport
     */
    function setupIntersectionObserver() {
        const heroSection = document.querySelector('.hero-medical');
        if (!heroSection) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Trigger counters when section becomes visible
                    if (!entry.target.dataset.counted) {
                        entry.target.dataset.counted = 'true';
                        setTimeout(() => animateCounters(), CONFIG.counterDelay);
                    }
                }
            });
        }, CONFIG.observerOptions);

        observer.observe(heroSection);
    }

    /**
     * Efecto parallax suave en scroll
     */
    function setupParallax() {
        const heroSection = document.querySelector('.hero-medical');
        if (!heroSection) return;

        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    applyParallax();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    function applyParallax() {
        const heroSection = document.querySelector('.hero-medical');
        if (!heroSection) return;

        const rect = heroSection.getBoundingClientRect();
        const scrollPercent = -rect.top / (rect.height + window.innerHeight);

        if (scrollPercent >= 0 && scrollPercent <= 1) {
            // Parallax en decoraciones
            const decorations = heroSection.querySelectorAll('.hero-decoration');
            decorations.forEach((decoration, index) => {
                const speed = (index + 1) * CONFIG.parallaxIntensity;
                const yPos = scrollPercent * 100 * speed;
                decoration.style.transform = `translateY(${yPos}px)`;
            });

            // Parallax en imágenes
            const mainImage = heroSection.querySelector('.hero-image--main');
            const refImage = heroSection.querySelector('.hero-image--reference');
            
            if (mainImage) {
                const mainYPos = scrollPercent * 30;
                mainImage.style.transform = `translateY(calc(-50% + ${mainYPos}px))`;
            }
            
            if (refImage) {
                const refYPos = scrollPercent * 50;
                refImage.style.transform = `translateY(calc(-50% + ${refYPos}px))`;
            }
        }
    }

    /**
     * Interacciones con imágenes
     */
    function setupImageInteractions() {
        const images = document.querySelectorAll('.hero-image--main, .hero-image--reference');
        
        images.forEach(image => {
            // Efecto de seguimiento del mouse
            image.addEventListener('mousemove', (e) => {
                const rect = image.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                
                const tiltX = y * 10;
                const tiltY = -x * 10;
                
                image.style.transform = `translateY(-50%) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
            });

            image.addEventListener('mouseleave', () => {
                image.style.transform = 'translateY(-50%) rotateX(0) rotateY(0) scale(1)';
            });
        });

        // Agregar transición suave
        images.forEach(image => {
            image.style.transition = 'transform 0.3s ease-out';
        });
    }

    /**
     * Animación de contadores (si existen stats)
     */
    function animateCounters() {
        const counters = document.querySelectorAll('.hero-stat__number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace(/\D/g, '')) || 0;
            const suffix = counter.textContent.replace(/[\d,]/g, '');
            const duration = CONFIG.counterDuration;
            const step = target / (duration / 16); // 60fps

            let current = 0;
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    counter.textContent = formatNumber(target) + suffix;
                    clearInterval(timer);
                } else {
                    counter.textContent = formatNumber(Math.floor(current)) + suffix;
                }
            }, 16);
        });
    }

    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    /**
     * Animaciones de tags con delay secuencial
     */
    function setupTagAnimations() {
        const tags = document.querySelectorAll('.hero-tag');
        
        tags.forEach((tag, index) => {
            tag.style.animationDelay = `${0.5 + (index * 0.1)}s`;
            tag.style.animation = 'fadeInUp 0.6s ease-out both';
        });

        // Efecto de hover mejorado
        tags.forEach(tag => {
            tag.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-4px) scale(1.02)';
            });

            tag.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    /**
     * Smooth scroll para enlaces internos (si los hay)
     */
    function setupSmoothScroll() {
        const links = document.querySelectorAll('.hero-medical a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerOffset = 100;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /**
     * Responsive behavior
     */
    function setupResponsiveBehavior() {
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                // Recalcular posiciones si es necesario
                applyParallax();
            }, 250);
        });
    }

    // Inicializar comportamientos adicionales
    setupSmoothScroll();
    setupResponsiveBehavior();

    /**
     * Accessibility improvements
     */
    function enhanceAccessibility() {
        // Agregar roles ARIA apropiados
        const heroSection = document.querySelector('.hero-medical');
        if (heroSection && !heroSection.getAttribute('role')) {
            heroSection.setAttribute('role', 'banner');
        }

        // Asegurar que las decoraciones no sean anunciadas
        const decorations = document.querySelectorAll('.hero-decoration, .hero-visual__accent');
        decorations.forEach(decoration => {
            decoration.setAttribute('aria-hidden', 'true');
        });

        // Mejorar las imágenes con alt text apropiado
        const images = document.querySelectorAll('.hero-medical img');
        images.forEach(img => {
            if (!img.getAttribute('alt')) {
                img.setAttribute('alt', 'Resultado de trasplante capilar profesional');
            }
        });
    }

    enhanceAccessibility();

    /**
     * Performance optimization: Pause animations cuando no están visibles
     */
    function setupPerformanceOptimization() {
        const heroSection = document.querySelector('.hero-medical');
        if (!heroSection) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    heroSection.style.animationPlayState = 'running';
                } else {
                    heroSection.style.animationPlayState = 'paused';
                }
            });
        }, { threshold: 0 });

        observer.observe(heroSection);
    }

    setupPerformanceOptimization();

    /**
     * Configuración del video de fondo
     */
    function setupVideoBackground() {
        const video = document.querySelector('.hero-medical__video-bg video');
        if (!video) return;

        // Asegurar que el video se reproduzca automáticamente
        video.play().catch(err => {
            console.log('Video autoplay prevented:', err);
        });

        // Optimización: Pausar video cuando no está visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play().catch(err => console.log('Video play error:', err));
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.25 });

        const heroSection = document.querySelector('.hero-medical');
        if (heroSection) {
            observer.observe(heroSection);
        }

        // Reducir la velocidad del video para un efecto más suave (opcional)
        video.playbackRate = 0.8;
    }

    /**
     * Configuración del carrusel de imágenes automático
     * Versión profesional con timing uniforme de 4 segundos
     */
    function setupImageCarousel() {
        const refImageContainer = document.querySelector('.hero-image--reference img');
        const mainImageContainer = document.querySelector('.hero-image--main img');
        
        if (!refImageContainer || !mainImageContainer) {
            console.warn('⚠️ Contenedores de imagen no encontrados');
            return;
        }

        if (!IMAGES.antes.length || !IMAGES.despues.length) {
            console.warn('⚠️ Arrays de imágenes vacíos');
            return;
        }

        const totalImages = Math.min(IMAGES.antes.length, IMAGES.despues.length);
        
        // Precargar imágenes
        preloadImages();

        // Configurar transiciones CSS
        const transitionStyle = `opacity ${CONFIG.fadeDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        refImageContainer.style.transition = transitionStyle;
        mainImageContainer.style.transition = transitionStyle;

        // Función centralizada para actualizar imágenes
        function updateImages(index) {
            if (IMAGES.antes[index]) {
                refImageContainer.src = IMAGES.antes[index];
                refImageContainer.alt = `Antes - Caso ${index + 1}`;
            }
            if (IMAGES.despues[index]) {
                mainImageContainer.src = IMAGES.despues[index];
                mainImageContainer.alt = `Después - Caso ${index + 1}`;
            }
        }

        // Función para cambiar imágenes con fade
        function transitionToNext() {
            // Calcular siguiente índice
            const nextIndex = (carouselState.currentIndex + 1) % totalImages;
            
            // Precargar las siguientes imágenes para evitar flash del fondo
            const preloadAntes = new Image();
            const preloadDespues = new Image();
            
            let antesLoaded = false;
            let despuesLoaded = false;
            
            // Función para iniciar transición cuando ambas imágenes estén cargadas
            function checkAndTransition() {
                if (antesLoaded && despuesLoaded) {
                    // Fade out
                    refImageContainer.style.opacity = '0';
                    mainImageContainer.style.opacity = '0';
                    
                    setTimeout(() => {
                        // Actualizar índice
                        carouselState.currentIndex = nextIndex;
                        
                        // Cambiar imágenes (ya están precargadas)
                        updateImages(carouselState.currentIndex);
                        
                        // Fade in inmediato ya que las imágenes están en caché
                        requestAnimationFrame(() => {
                            refImageContainer.style.opacity = '1';
                            mainImageContainer.style.opacity = '1';
                        });
                    }, CONFIG.fadeDuration);
                }
            }
            
            // Precargar imagen "antes"
            if (IMAGES.antes[nextIndex]) {
                preloadAntes.onload = () => {
                    antesLoaded = true;
                    checkAndTransition();
                };
                preloadAntes.onerror = () => {
                    antesLoaded = true; // Continuar incluso si falla
                    checkAndTransition();
                };
                preloadAntes.src = IMAGES.antes[nextIndex];
            } else {
                antesLoaded = true;
            }
            
            // Precargar imagen "después"
            if (IMAGES.despues[nextIndex]) {
                preloadDespues.onload = () => {
                    despuesLoaded = true;
                    checkAndTransition();
                };
                preloadDespues.onerror = () => {
                    despuesLoaded = true; // Continuar incluso si falla
                    checkAndTransition();
                };
                preloadDespues.src = IMAGES.despues[nextIndex];
            } else {
                despuesLoaded = true;
            }
        }

        // Precargar todas las imágenes
        function preloadImages() {
            const allImages = [...IMAGES.antes, ...IMAGES.despues];
            allImages.forEach(src => {
                const img = new Image();
                img.src = src;
            });
        }

        // Iniciar carrusel
        function startCarousel() {
            // Limpiar intervalo previo si existe
            if (carouselState.intervalId) {
                clearInterval(carouselState.intervalId);
                carouselState.intervalId = null;
            }
            
            // Solo iniciar si está visible y no hay hover
            if (carouselState.isVisible && !carouselState.isHovered) {
                carouselState.intervalId = setInterval(transitionToNext, CONFIG.carouselInterval);
            }
        }

        // Detener carrusel
        function stopCarousel() {
            if (carouselState.intervalId) {
                clearInterval(carouselState.intervalId);
                carouselState.intervalId = null;
            }
        }

        // Mostrar primera imagen inmediatamente
        updateImages(0);
        refImageContainer.style.opacity = '1';
        mainImageContainer.style.opacity = '1';
        carouselState.isInitialized = true;

        // Iniciar carrusel después de un breve delay
        setTimeout(() => {
            startCarousel();
        }, 100);

        // Manejo de hover
        const imageContainers = [
            document.querySelector('.hero-image--reference'),
            document.querySelector('.hero-image--main')
        ];

        imageContainers.forEach(container => {
            if (container) {
                container.addEventListener('mouseenter', () => {
                    carouselState.isHovered = true;
                    stopCarousel();
                });

                container.addEventListener('mouseleave', () => {
                    carouselState.isHovered = false;
                    if (carouselState.isInitialized) {
                        startCarousel();
                    }
                });
            }
        });

        // Observer para visibilidad
        const heroSection = document.querySelector('.hero-medical');
        if (heroSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    carouselState.isVisible = entry.isIntersecting;
                    
                    if (entry.isIntersecting && carouselState.isInitialized) {
                        startCarousel();
                    } else {
                        stopCarousel();
                    }
                });
            }, { threshold: 0.25 });

            observer.observe(heroSection);
        }

        console.log('✓ Carrusel inicializado:', totalImages, 'imágenes • Intervalo:', CONFIG.carouselInterval / 1000, 's');
    }

    // API pública para control externo
    window.HeroMedical = {
        refresh: applyParallax,
        animateCounters: animateCounters,
        
        pauseCarousel: function() {
            if (carouselState.intervalId) {
                clearInterval(carouselState.intervalId);
                carouselState.intervalId = null;
                console.log('⏸ Carrusel pausado');
            }
        },
        
        resumeCarousel: function() {
            if (!carouselState.intervalId && carouselState.isInitialized) {
                const refImageContainer = document.querySelector('.hero-image--reference img');
                const mainImageContainer = document.querySelector('.hero-image--main img');
                
                if (refImageContainer && mainImageContainer) {
                    const totalImages = Math.min(IMAGES.antes.length, IMAGES.despues.length);
                    
                    carouselState.intervalId = setInterval(() => {
                        const nextIndex = (carouselState.currentIndex + 1) % totalImages;
                        
                        // Precargar las siguientes imágenes
                        const preloadAntes = new Image();
                        const preloadDespues = new Image();
                        
                        let antesLoaded = false;
                        let despuesLoaded = false;
                        
                        function checkAndTransition() {
                            if (antesLoaded && despuesLoaded) {
                                refImageContainer.style.opacity = '0';
                                mainImageContainer.style.opacity = '0';
                                
                                setTimeout(() => {
                                    carouselState.currentIndex = nextIndex;
                                    
                                    if (IMAGES.antes[carouselState.currentIndex]) {
                                        refImageContainer.src = IMAGES.antes[carouselState.currentIndex];
                                        refImageContainer.alt = `Antes - Caso ${carouselState.currentIndex + 1}`;
                                    }
                                    if (IMAGES.despues[carouselState.currentIndex]) {
                                        mainImageContainer.src = IMAGES.despues[carouselState.currentIndex];
                                        mainImageContainer.alt = `Después - Caso ${carouselState.currentIndex + 1}`;
                                    }
                                    
                                    requestAnimationFrame(() => {
                                        refImageContainer.style.opacity = '1';
                                        mainImageContainer.style.opacity = '1';
                                    });
                                }, CONFIG.fadeDuration);
                            }
                        }
                        
                        if (IMAGES.antes[nextIndex]) {
                            preloadAntes.onload = () => {
                                antesLoaded = true;
                                checkAndTransition();
                            };
                            preloadAntes.onerror = () => {
                                antesLoaded = true;
                                checkAndTransition();
                            };
                            preloadAntes.src = IMAGES.antes[nextIndex];
                        } else {
                            antesLoaded = true;
                        }
                        
                        if (IMAGES.despues[nextIndex]) {
                            preloadDespues.onload = () => {
                                despuesLoaded = true;
                                checkAndTransition();
                            };
                            preloadDespues.onerror = () => {
                                despuesLoaded = true;
                                checkAndTransition();
                            };
                            preloadDespues.src = IMAGES.despues[nextIndex];
                        } else {
                            despuesLoaded = true;
                        }
                    }, CONFIG.carouselInterval);
                    
                    console.log('▶ Carrusel reanudado');
                }
            }
        },
        
        nextImage: function() {
            const refImageContainer = document.querySelector('.hero-image--reference img');
            const mainImageContainer = document.querySelector('.hero-image--main img');
            
            if (refImageContainer && mainImageContainer) {
                const totalImages = Math.min(IMAGES.antes.length, IMAGES.despues.length);
                const nextIndex = (carouselState.currentIndex + 1) % totalImages;
                
                // Precargar las siguientes imágenes
                const preloadAntes = new Image();
                const preloadDespues = new Image();
                
                let antesLoaded = false;
                let despuesLoaded = false;
                
                function checkAndTransition() {
                    if (antesLoaded && despuesLoaded) {
                        refImageContainer.style.opacity = '0';
                        mainImageContainer.style.opacity = '0';
                        
                        setTimeout(() => {
                            carouselState.currentIndex = nextIndex;
                            
                            if (IMAGES.antes[carouselState.currentIndex]) {
                                refImageContainer.src = IMAGES.antes[carouselState.currentIndex];
                                refImageContainer.alt = `Antes - Caso ${carouselState.currentIndex + 1}`;
                            }
                            if (IMAGES.despues[carouselState.currentIndex]) {
                                mainImageContainer.src = IMAGES.despues[carouselState.currentIndex];
                                mainImageContainer.alt = `Después - Caso ${carouselState.currentIndex + 1}`;
                            }
                            
                            requestAnimationFrame(() => {
                                refImageContainer.style.opacity = '1';
                                mainImageContainer.style.opacity = '1';
                            });
                        }, CONFIG.fadeDuration);
                    }
                }
                
                if (IMAGES.antes[nextIndex]) {
                    preloadAntes.onload = () => {
                        antesLoaded = true;
                        checkAndTransition();
                    };
                    preloadAntes.onerror = () => {
                        antesLoaded = true;
                        checkAndTransition();
                    };
                    preloadAntes.src = IMAGES.antes[nextIndex];
                } else {
                    antesLoaded = true;
                }
                
                if (IMAGES.despues[nextIndex]) {
                    preloadDespues.onload = () => {
                        despuesLoaded = true;
                        checkAndTransition();
                    };
                    preloadDespues.onerror = () => {
                        despuesLoaded = true;
                        checkAndTransition();
                    };
                    preloadDespues.src = IMAGES.despues[nextIndex];
                } else {
                    despuesLoaded = true;
                }
            }
        },
        
        getStatus: function() {
            return {
                isRunning: carouselState.intervalId !== null,
                currentIndex: carouselState.currentIndex,
                totalImages: Math.min(IMAGES.antes.length, IMAGES.despues.length),
                intervalTime: CONFIG.carouselInterval,
                fadeDuration: CONFIG.fadeDuration,
                isHovered: carouselState.isHovered,
                isVisible: carouselState.isVisible
            };
        }
    };

})();