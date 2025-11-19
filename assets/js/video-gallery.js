/*
========================================
  VIDEO CAROUSEL - JAVASCRIPT FUNCTIONALITY
========================================
*/

(function() {
    'use strict';

    // Video data structure - DEFAULT (se usa si no hay datos de WordPress)
    const defaultVideoData = [
        {
            id: 'video-1',
            title: 'Técnica DHI - Implante Capilar Directo',
            description: 'Descubre la técnica más avanzada en transplante capilar. Un procedimiento sin dolor con resultados naturales y permanentes.',
            category: 'Procedimientos',
            duration: '3:25',
            thumbnail: 'assets/img/hero_section_2.jpg',
            videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            type: 'youtube',
            features: [
                'Sin cicatrices visibles',
                'Recuperación rápida',
                'Resultados naturales',
                'Técnica mínimamente invasiva'
            ]
        },
        {
            id: 'video-2',
            title: 'Historias de Transformación Real',
            description: 'Conoce testimonios auténticos de pacientes que recuperaron su confianza y transformaron su vida con nuestros tratamientos.',
            category: 'Testimonios',
            duration: '4:15',
            thumbnail: 'assets/img/img5.webp',
            videoUrl: 'assets/video/vide_hero_section_fondo_a.mp4',
            type: 'local',
            features: [
                'Casos reales documentados',
                'Seguimiento completo',
                'Satisfacción garantizada',
                'Resultados verificables'
            ]
        },
        {
            id: 'video-3',
            title: 'Tratamiento PRP - Terapia Regenerativa',
            description: 'Plasma Rico en Plaquetas para fortalecer y estimular el crecimiento capilar de forma natural y efectiva.',
            category: 'Tratamientos',
            duration: '2:48',
            thumbnail: 'assets/img/hero_section.jpg',
            videoUrl: 'assets/video/hero_section.webm',
            type: 'local',
            features: [
                'Procedimiento ambulatorio',
                'Sin efectos secundarios',
                'Estimula crecimiento natural',
                'Complemento ideal al injerto'
            ]
        },
        {
            id: 'video-4',
            title: 'De Consulta a Resultados Finales',
            description: 'Te mostramos cada paso del proceso desde la primera consulta hasta ver los resultados finales de tu transformación.',
            category: 'Educativo',
            duration: '6:30',
            thumbnail: 'assets/img/hero_section_1.jpg',
            videoUrl: 'assets/video/17926-286994407_small.mp4',
            type: 'local',
            features: [
                'Evaluación personalizada',
                'Plan de tratamiento detallado',
                'Seguimiento profesional',
                'Garantía de resultados'
            ]
        },
        {
            id: 'video-5',
            title: 'Cuidados Post-Operatorios Esenciales',
            description: 'Guía completa de cuidados después del implante capilar para garantizar los mejores resultados a largo plazo.',
            category: 'Educativo',
            duration: '3:52',
            thumbnail: 'assets/img/hero_section_2.jpg',
            videoUrl: 'assets/video/vide_hero_section_fondo_a.mp4',
            type: 'local',
            features: [
                'Instrucciones detalladas',
                'Productos recomendados',
                'Cronograma de cuidados',
                'Soporte permanente'
            ]
        },
        {
            id: 'video-6',
            title: 'Instalaciones de Última Generación',
            description: 'Recorrido por nuestro centro médico equipado con la tecnología más avanzada para tu seguridad y comodidad.',
            category: 'Centro Médico',
            duration: '4:05',
            thumbnail: 'assets/img/img5.webp',
            videoUrl: 'assets/video/hero_section.webm',
            type: 'local',
            features: [
                'Equipamiento de punta',
                'Salas quirúrgicas certificadas',
                'Ambiente confortable',
                'Protocolos de bioseguridad'
            ]
        }
    ];

    // USAR DATOS DE WORDPRESS SI ESTÁN DISPONIBLES, SI NO USAR DEFAULT
    let videoData = window.WP_VIDEO_DATA || defaultVideoData;
    
    // Si estamos en WordPress y usando datos por defecto, corregir rutas de imágenes
    if (!window.WP_VIDEO_DATA && typeof wpAssets !== 'undefined' && wpAssets.themeUri) {
        videoData = defaultVideoData.map(video => ({
            ...video,
            thumbnail: video.thumbnail.startsWith('assets/') 
                ? wpAssets.themeUri + '/' + video.thumbnail 
                : video.thumbnail,
            videoUrl: video.type === 'local' && video.videoUrl.startsWith('assets/') 
                ? wpAssets.themeUri + '/' + video.videoUrl 
                : video.videoUrl
        }));
    }

    class VideoCarousel {
        constructor() {
            this.currentSlide = 0;
            this.totalSlides = videoData.length;
            this.track = null;
            this.modal = null;
            this.autoplayInterval = null;
            this.autoplayDelay = 6000; // 6 seconds
            this.init();
        }

        init() {
            this.createCarousel();
            this.createModal();
            this.attachEventListeners();
            this.updateCarousel();
            this.startAutoplay();
        }

        createCarousel() {
            const track = document.querySelector('.video-carousel-track');
            if (!track) return;

            this.track = track;

            // Create slides
            videoData.forEach((video, index) => {
                const slide = this.createSlide(video, index);
                track.appendChild(slide);
            });

            // Update counter
            this.updateCounter();
        }

        createSlide(video, index) {
            const slide = document.createElement('div');
            slide.className = 'video-slide';
            slide.dataset.index = index;

            const featuresHTML = video.features
                .map(feature => `
                    <li>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        ${feature}
                    </li>
                `)
                .join('');

            slide.innerHTML = `
                <div class="video-slide-content">
                    <div class="video-preview">
                        <img src="${video.thumbnail}" alt="${video.title}" class="video-preview-image">
                        <div class="video-play-overlay" data-video-index="${index}">
                            <div class="play-icon-circle">
                                <svg viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z"/>
                                </svg>
                            </div>
                        </div>
                        <div class="video-duration-badge">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <circle cx="12" cy="12" r="10"/>
                                <polyline points="12 6 12 12 16 14" stroke="white" stroke-width="2" fill="none"/>
                            </svg>
                            ${video.duration}
                        </div>
                    </div>
                    <div class="video-info-panel">
                        <div class="video-category-badge">${video.category}</div>
                        <h3 class="video-slide-title">${video.title}</h3>
                        <p class="video-slide-description">${video.description}</p>
                        <ul class="video-features-list">
                            ${featuresHTML}
                        </ul>
                        <a href="#" class="video-watch-btn" data-video-index="${index}">
                            <svg viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                            </svg>
                            Ver Video Completo
                        </a>
                    </div>
                </div>
            `;

            return slide;
        }

        createModal() {
            const modalHTML = `
                <div class="video-modal" id="videoModal">
                    <div class="video-modal-content">
                        <div class="video-modal-header">
                            <h3 class="video-modal-title" id="modalVideoTitle">Video</h3>
                            <button class="video-modal-close" id="closeVideoModal" aria-label="Cerrar video">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                        <div class="video-modal-body" id="modalVideoBody">
                            <!-- Video will be inserted here -->
                        </div>
                    </div>
                </div>
            `;
            
            document.body.insertAdjacentHTML('beforeend', modalHTML);
            this.modal = document.getElementById('videoModal');
        }

        attachEventListeners() {
            // Navigation buttons
            const prevBtn = document.querySelector('.carousel-btn-prev');
            const nextBtn = document.querySelector('.carousel-btn-next');

            if (prevBtn) {
                prevBtn.addEventListener('click', () => this.previousSlide());
            }

            if (nextBtn) {
                nextBtn.addEventListener('click', () => this.nextSlide());
            }

            // Indicators
            document.querySelectorAll('.carousel-indicator').forEach((indicator, index) => {
                indicator.addEventListener('click', () => this.goToSlide(index));
            });

            // Play buttons
            document.addEventListener('click', (e) => {
                const playOverlay = e.target.closest('.video-play-overlay');
                const watchBtn = e.target.closest('.video-watch-btn');
                
                if (playOverlay || watchBtn) {
                    e.preventDefault();
                    const index = parseInt((playOverlay || watchBtn).dataset.videoIndex);
                    this.openVideo(index);
                }
            });

            // Modal close
            const closeBtn = document.getElementById('closeVideoModal');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => this.closeModal());
            }

            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.closeModal();
                }
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                    this.closeModal();
                }
                if (e.key === 'ArrowLeft') {
                    this.previousSlide();
                }
                if (e.key === 'ArrowRight') {
                    this.nextSlide();
                }
            });

            // Pause autoplay on hover
            const carouselWrapper = document.querySelector('.video-carousel-wrapper');
            if (carouselWrapper) {
                carouselWrapper.addEventListener('mouseenter', () => this.stopAutoplay());
                carouselWrapper.addEventListener('mouseleave', () => this.startAutoplay());
            }
        }

        updateCarousel() {
            if (!this.track) return;

            const offset = -this.currentSlide * 100;
            this.track.style.transform = `translateX(${offset}%)`;

            // Update indicators
            document.querySelectorAll('.carousel-indicator').forEach((indicator, index) => {
                indicator.classList.toggle('active', index === this.currentSlide);
            });

            // Update buttons state
            const prevBtn = document.querySelector('.carousel-btn-prev');
            const nextBtn = document.querySelector('.carousel-btn-next');

            if (prevBtn) {
                prevBtn.disabled = this.currentSlide === 0;
            }

            if (nextBtn) {
                nextBtn.disabled = this.currentSlide === this.totalSlides - 1;
            }

            this.updateCounter();
        }

        updateCounter() {
            const counter = document.querySelector('.carousel-counter');
            if (counter) {
                counter.innerHTML = `
                    <span class="current">${this.currentSlide + 1}</span> / ${this.totalSlides}
                `;
            }
        }

        nextSlide() {
            if (this.currentSlide < this.totalSlides - 1) {
                this.currentSlide++;
                this.updateCarousel();
                this.resetAutoplay();
            }
        }

        previousSlide() {
            if (this.currentSlide > 0) {
                this.currentSlide--;
                this.updateCarousel();
                this.resetAutoplay();
            }
        }

        goToSlide(index) {
            this.currentSlide = index;
            this.updateCarousel();
            this.resetAutoplay();
        }

        startAutoplay() {
            this.stopAutoplay();
            this.autoplayInterval = setInterval(() => {
                if (this.currentSlide < this.totalSlides - 1) {
                    this.nextSlide();
                } else {
                    this.currentSlide = 0;
                    this.updateCarousel();
                }
            }, this.autoplayDelay);
        }

        stopAutoplay() {
            if (this.autoplayInterval) {
                clearInterval(this.autoplayInterval);
                this.autoplayInterval = null;
            }
        }

        resetAutoplay() {
            this.stopAutoplay();
            this.startAutoplay();
        }

        openVideo(index) {
            const video = videoData[index];
            const modalTitle = document.getElementById('modalVideoTitle');
            const modalBody = document.getElementById('modalVideoBody');

            this.stopAutoplay();

            modalTitle.textContent = video.title;
            modalBody.innerHTML = '';

            let videoElement;
            if (video.type === 'youtube') {
                const videoId = this.extractYouTubeId(video.videoUrl);
                videoElement = `
                    <iframe 
                        src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                `;
            } else if (video.type === 'vimeo') {
                const videoId = this.extractVimeoId(video.videoUrl);
                videoElement = `
                    <iframe 
                        src="https://player.vimeo.com/video/${videoId}?autoplay=1" 
                        frameborder="0" 
                        allow="autoplay; fullscreen; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                `;
            } else {
                videoElement = `
                    <video controls autoplay>
                        <source src="${video.videoUrl}" type="video/mp4">
                        <source src="${video.videoUrl}" type="video/webm">
                        Tu navegador no soporta la reproducción de video.
                    </video>
                `;
            }

            modalBody.innerHTML = videoElement;
            this.modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        closeModal() {
            const modalBody = document.getElementById('modalVideoBody');
            
            const video = modalBody.querySelector('video');
            if (video) {
                video.pause();
                video.currentTime = 0;
            }

            modalBody.innerHTML = '';
            this.modal.classList.remove('active');
            document.body.style.overflow = '';
            
            this.startAutoplay();
        }

        extractYouTubeId(url) {
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
            const match = url.match(regExp);
            return (match && match[2].length === 11) ? match[2] : null;
        }

        extractVimeoId(url) {
            const regExp = /vimeo.*\/(\d+)/i;
            const match = url.match(regExp);
            return match ? match[1] : null;
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            new VideoCarousel();
        });
    } else {
        new VideoCarousel();
    }

})();
