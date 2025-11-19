/**
 * Google Reviews Integration con Carrusel Vertical
 * Carga y muestra reseñas de Google Maps en tiempo real
 */

class GoogleReviews {
    constructor(apiEndpoint, containerId) {
        this.apiEndpoint = apiEndpoint;
        this.container = document.getElementById(containerId);
        this.reviews = [];
        this.currentIndex = 0;
        this.autoScrollInterval = null;
        this.init();
    }

    async init() {
        try {
            await this.fetchReviews();
            this.renderReviews();
            this.setupCarousel();
        } catch (error) {
            console.error('Error al cargar las reseñas:', error);
            this.showError();
        }
    }

    async fetchReviews() {
        const response = await fetch(this.apiEndpoint);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error);
        }
        
        this.reviews = data.reviews || [];
        
        // Actualizar estadísticas del header
        this.updateStats(data.rating, data.totalReviews);
    }

    updateStats(rating, totalReviews) {
        // Actualizar número de rating
        const ratingElement = document.getElementById('google-rating-number');
        if (ratingElement) {
            ratingElement.textContent = rating ? rating.toFixed(1) : '5.0';
        }
        
        // Actualizar conteo de reseñas
        const countElement = document.getElementById('google-total-reviews');
        if (countElement) {
            countElement.textContent = totalReviews || this.reviews.length;
        }
        
        // Actualizar estrellas en el header
        this.updateHeaderStars(rating);
    }

    updateHeaderStars(rating) {
        const starsContainer = document.getElementById('google-header-stars');
        if (!starsContainer) return;
        
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        
        starsContainer.innerHTML = '';
        
        // Estrellas completas
        for (let i = 0; i < fullStars; i++) {
            starsContainer.innerHTML += `
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
            `;
        }
        
        // Estrella media si corresponde
        if (hasHalfStar) {
            starsContainer.innerHTML += `
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="half-star">
                    <defs>
                        <linearGradient id="half-fill">
                            <stop offset="50%" stop-color="var(--google-yellow)"/>
                            <stop offset="50%" stop-color="#ddd"/>
                        </linearGradient>
                    </defs>
                    <path fill="url(#half-fill)" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
            `;
        }
        
        // Estrellas vacías
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            starsContainer.innerHTML += `
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="empty-star">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
            `;
        }
    }

    renderReviews() {
        if (!this.container) return;

        if (this.reviews.length === 0) {
            this.container.innerHTML = '<p class="no-reviews">No hay reseñas disponibles en este momento.</p>';
            return;
        }

        this.container.innerHTML = this.reviews.map(review => 
            this.createReviewCard(review)
        ).join('');
    }

    createReviewCard(review) {
        const stars = this.createStars(review.rating);
        const authorInitials = this.getInitials(review.author_name);
        const avatarUrl = review.profile_photo_url || null;
        
        // Generar avatar
        const avatar = avatarUrl 
            ? `<img src="${avatarUrl}" alt="${review.author_name}">`
            : `<div class="review-avatar-placeholder">${authorInitials}</div>`;

        return `
            <div class="review-card">
                <div class="review-header">
                    <div class="review-author">
                        <div class="review-avatar">
                            ${avatar}
                        </div>
                        <div class="review-author-info">
                            <h4 class="review-author-name">${review.author_name}</h4>
                            <div class="review-rating">
                                ${stars}
                            </div>
                        </div>
                    </div>
                    <div class="review-date">
                        ${this.formatDate(review.time)}
                    </div>
                </div>
                
                <div class="review-text">
                    ${review.text || 'Sin comentario escrito.'}
                </div>
                
                <div class="review-footer">
                    <svg width="18" height="18" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" class="google-icon-small">
                        <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"/>
                        <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"/>
                        <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"/>
                        <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"/>
                    </svg>
                    <span class="posted-on-google">Publicado en Google</span>
                </div>
            </div>
        `;
    }

    setupCarousel() {
        const carousel = this.container;
        if (!carousel) return;

        // Pausar auto-scroll al hacer hover
        carousel.addEventListener('mouseenter', () => this.stopAutoScroll());
        carousel.addEventListener('mouseleave', () => this.startAutoScroll());

        // Iniciar auto-scroll
        this.startAutoScroll();
    }

    scrollUp() {
        const carousel = this.container;
        const cardHeight = carousel.querySelector('.review-card')?.offsetHeight || 0;
        carousel.scrollBy({
            top: -cardHeight - 20, // 20px es el gap
            behavior: 'smooth'
        });
    }

    scrollDown() {
        const carousel = this.container;
        const cardHeight = carousel.querySelector('.review-card')?.offsetHeight || 0;
        carousel.scrollBy({
            top: cardHeight + 20,
            behavior: 'smooth'
        });
    }

    startAutoScroll() {
        this.autoScrollInterval = setInterval(() => {
            this.scrollDown();
            
            // Si llegamos al final, volver al inicio
            const carousel = this.container;
            if (carousel.scrollTop + carousel.clientHeight >= carousel.scrollHeight - 10) {
                setTimeout(() => {
                    carousel.scrollTo({ top: 0, behavior: 'smooth' });
                }, 3000);
            }
        }, 5000); // Cambiar cada 5 segundos
    }

    stopAutoScroll() {
        if (this.autoScrollInterval) {
            clearInterval(this.autoScrollInterval);
            this.autoScrollInterval = null;
        }
    }

    createStars(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars += `<svg class="star filled" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;
            } else {
                stars += `<svg class="star" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;
            }
        }
        return stars;
    }

    getInitials(name) {
        if (!name) return '?';
        return name
            .split(' ')
            .map(word => word[0])
            .slice(0, 2)
            .join('')
            .toUpperCase();
    }

    formatDate(timestamp) {
        if (!timestamp) return '';
        const date = new Date(timestamp * 1000);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays < 7) {
            return `hace ${diffDays} día${diffDays !== 1 ? 's' : ''}`;
        } else if (diffDays < 30) {
            const weeks = Math.floor(diffDays / 7);
            return `hace ${weeks} semana${weeks !== 1 ? 's' : ''}`;
        } else if (diffDays < 365) {
            const months = Math.floor(diffDays / 30);
            return `hace ${months} mes${months !== 1 ? 'es' : ''}`;
        } else {
            const years = Math.floor(diffDays / 365);
            return `hace ${years} año${years !== 1 ? 's' : ''}`;
        }
    }

    showError() {
        if (this.container) {
            this.container.innerHTML = `
                <div class="reviews-error">
                    <p>❌ Error al cargar las reseñas. Por favor, intenta más tarde.</p>
                </div>
            `;
        }
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const apiEndpoint = typeof drCabelloReviews !== 'undefined' ? drCabelloReviews.apiEndpoint : 'get-reviews.php';
    new GoogleReviews(apiEndpoint, 'testimonials-container');
});
