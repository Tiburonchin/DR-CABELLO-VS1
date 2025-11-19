/**
 * Gallery Carousel - Premium 3D Carousel with Flip Card Interaction
 * Features: Auto-rotate, flip cards, touch support, keyboard navigation
 */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        autoRotate: true,
        autoRotateInterval: 5000,
        totalSlides: 5, // Actualizado a 5 slides
        transitionDuration: 800,
        flipDuration: 800
    };

    // State
    let currentIndex = 0;
    let isAnimating = false;
    let autoRotateTimer = null;
    let touchStartX = 0;
    let touchEndX = 0;

    // DOM Elements
    const track = document.getElementById('galleryTrack');
    const prevBtn = document.getElementById('galleryPrevBtn');
    const nextBtn = document.getElementById('galleryNextBtn');
    const indicators = document.querySelectorAll('.gallery-indicator');
    const slides = document.querySelectorAll('.gallery-slide');
    const cards = document.querySelectorAll('.gallery-card');

    // Initialize
    function init() {
        if (!track || !prevBtn || !nextBtn) {
            console.warn('Gallery carousel elements not found');
            return;
        }

        setupEventListeners();
        updateCarousel();
        
        if (CONFIG.autoRotate) {
            startAutoRotate();
        }

        // Pause auto-rotate when user hovers over carousel
        const carouselSection = document.querySelector('.gallery-carousel-section');
        if (carouselSection) {
            carouselSection.addEventListener('mouseenter', stopAutoRotate);
            carouselSection.addEventListener('mouseleave', () => {
                if (CONFIG.autoRotate) startAutoRotate();
            });
        }
    }

    // Setup Event Listeners
    function setupEventListeners() {
        // Navigation buttons
        prevBtn.addEventListener('click', () => navigate('prev'));
        nextBtn.addEventListener('click', () => navigate('next'));

        // Indicators
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                if (!isAnimating && index !== currentIndex) {
                    currentIndex = index;
                    updateCarousel();
                    resetAutoRotate();
                }
            });
        });

        // Flip card interaction - only for center card
        cards.forEach((card, index) => {
            card.addEventListener('click', (e) => {
                // Only flip if it's the center card
                if (index === currentIndex) {
                    e.stopPropagation();
                    toggleFlip(card);
                    resetAutoRotate();
                }
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', handleKeyboard);

        // Touch support
        track.addEventListener('touchstart', handleTouchStart, { passive: true });
        track.addEventListener('touchend', handleTouchEnd, { passive: true });

        // Mouse drag support
        let isDragging = false;
        let startX = 0;

        track.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            track.style.cursor = 'grabbing';
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
        });

        document.addEventListener('mouseup', (e) => {
            if (!isDragging) return;
            isDragging = false;
            track.style.cursor = 'grab';
            
            const diff = e.clientX - startX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    navigate('prev');
                } else {
                    navigate('next');
                }
            }
        });
    }

    // Toggle flip on card
    function toggleFlip(card) {
        card.classList.toggle('is-flipped');
    }

    // Unflip all cards
    function unflipAllCards() {
        cards.forEach(card => {
            card.classList.remove('is-flipped');
        });
    }

    // Navigate carousel
    function navigate(direction) {
        if (isAnimating) return;

        stopAutoRotate();
        
        // Unflip all cards before navigating
        unflipAllCards();

        if (direction === 'next') {
            currentIndex = (currentIndex + 1) % CONFIG.totalSlides;
        } else {
            currentIndex = (currentIndex - 1 + CONFIG.totalSlides) % CONFIG.totalSlides;
        }

        updateCarousel();
        resetAutoRotate();
    }

    // Update carousel positions
    function updateCarousel() {
        if (!slides.length) return;

        isAnimating = true;

        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });

        // Update slide positions
        slides.forEach((slide, index) => {
            const position = getSlidePosition(index);
            applySlideTransform(slide, position);
        });

        // Reset animation lock after transition
        setTimeout(() => {
            isAnimating = false;
        }, CONFIG.transitionDuration);
    }

    // Get slide position relative to current index
    function getSlidePosition(slideIndex) {
        let position = slideIndex - currentIndex;

        // Normalize position for circular arrangement
        if (position > CONFIG.totalSlides / 2) {
            position -= CONFIG.totalSlides;
        } else if (position < -CONFIG.totalSlides / 2) {
            position += CONFIG.totalSlides;
        }

        return position;
    }

    // Apply transform to slide based on position
    function applySlideTransform(slide, position) {
        const transforms = {
            '-2': 'translateX(-900px) translateZ(-500px) scale(0.7)',
            '-1': 'translateX(-450px) translateZ(-250px) scale(0.85)',
            '0': 'translateX(0) translateZ(0) scale(1)',
            '1': 'translateX(450px) translateZ(-250px) scale(0.85)',
            '2': 'translateX(900px) translateZ(-500px) scale(0.7)'
        };

        const opacities = {
            '-2': 0,
            '-1': 0.6,
            '0': 1,
            '1': 0.6,
            '2': 0
        };

        const blurs = {
            '-2': 'blur(2px)',
            '-1': 'blur(1px)',
            '0': 'blur(0)',
            '1': 'blur(1px)',
            '2': 'blur(2px)'
        };

        const zIndexes = {
            '-2': 1,
            '-1': 5,
            '0': 10,
            '1': 5,
            '2': 1
        };

        slide.style.transform = transforms[position] || transforms['2'];
        slide.style.opacity = opacities[position] !== undefined ? opacities[position] : 0;
        slide.style.filter = blurs[position] || blurs['2'];
        slide.style.zIndex = zIndexes[position] || 1;
        slide.style.pointerEvents = position === 0 ? 'auto' : 'none';
    }

    // Auto-rotate functions
    function startAutoRotate() {
        stopAutoRotate();
        autoRotateTimer = setInterval(() => {
            navigate('next');
        }, CONFIG.autoRotateInterval);
    }

    function stopAutoRotate() {
        if (autoRotateTimer) {
            clearInterval(autoRotateTimer);
            autoRotateTimer = null;
        }
    }

    function resetAutoRotate() {
        if (CONFIG.autoRotate) {
            startAutoRotate();
        }
    }

    // Touch handlers
    function handleTouchStart(e) {
        touchStartX = e.changedTouches[0].screenX;
    }

    function handleTouchEnd(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                navigate('next');
            } else {
                navigate('prev');
            }
        }
    }

    // Keyboard navigation
    function handleKeyboard(e) {
        const carouselSection = document.querySelector('.gallery-carousel-section');
        if (!carouselSection) return;

        // Check if carousel is in viewport
        const rect = carouselSection.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;

        if (!inView) return;

        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                navigate('prev');
                break;
            case 'ArrowRight':
                e.preventDefault();
                navigate('next');
                break;
        }
    }

    // Intersection Observer for reveal animation
    function setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    
                    // Start auto-rotate when carousel comes into view
                    if (CONFIG.autoRotate && !autoRotateTimer) {
                        startAutoRotate();
                    }
                }
            });
        }, {
            threshold: 0.2
        });

        const carouselSection = document.querySelector('.gallery-carousel-section');
        if (carouselSection) {
            observer.observe(carouselSection);
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            init();
            setupIntersectionObserver();
        });
    } else {
        init();
        setupIntersectionObserver();
    }

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        stopAutoRotate();
    });

    // Expose API for external control (optional)
    window.GalleryCarousel = {
        next: () => navigate('next'),
        prev: () => navigate('prev'),
        goTo: (index) => {
            if (index >= 0 && index < CONFIG.totalSlides && !isAnimating) {
                unflipAllCards();
                currentIndex = index;
                updateCarousel();
                resetAutoRotate();
            }
        },
        getCurrentIndex: () => currentIndex,
        pauseAutoRotate: stopAutoRotate,
        resumeAutoRotate: startAutoRotate,
        flipCurrent: () => {
            const currentCard = cards[currentIndex];
            if (currentCard) {
                toggleFlip(currentCard);
            }
        },
        unflipAll: unflipAllCards
    };

})();
