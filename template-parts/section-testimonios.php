<?php
/**
 * Template Part: testimonios
 * 
 * @package Dr_Cabello
 * @since 1.0.0
 */
?>
<section id="testimonios" class="google-reviews-section reveal">
            <div class="container">
                <!-- Header -->
                <div class="google-reviews-header">
                    <div class="google-badge">
                        <svg width="22" height="22" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"/>
                            <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"/>
                            <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"/>
                            <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"/>
                        </svg>
                        <span>Reseñas de Google</span>
                    </div>
                    
                    <h2 class="section__title">Lo Que Dicen Nuestros Pacientes</h2>
                    
                    <div class="google-stats">
                        <div class="google-rating-display">
                            <div class="google-rating-number" id="google-rating-number">4.4</div>
                            <div class="google-stars-container">
                                <div class="google-stars" id="google-header-stars">
                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                                </div>
                                <span class="google-review-count"><span id="google-total-reviews">7</span> reseñas</span>
                            </div>
                        </div>
                    </div>
                    
                    <p class="section__subtitle">
                        Reseñas verificadas de pacientes reales. Conoce sus experiencias y resultados transformadores.
                    </p>
                </div>
                
                <!-- Layout: Carrusel de Reseñas + Mapa -->
                <div class="reviews-map-container">
                    <!-- Carrusel Vertical de Reseñas (Izquierda) -->
                    <div class="reviews-carousel-wrapper">
                        <div class="reviews-carousel" id="testimonials-container">
                            <div class="reviews-loading">
                                <div class="loading-spinner"></div>
                                <p class="loading-text">Cargando reseñas...</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Mapa de Google (Derecha) -->
                    <div class="map-section">
                        <div class="map-header">
                            <h3>Nuestra Ubicación</h3>
                            <div class="map-address">
                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                                </svg>
                                <span>Av. Faustino Sánchez Carrión 615,<br>Jesús María 15076, Perú</span>
                            </div>
                        </div>
                        
                        <iframe 
                            class="map-container"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.3842779364706!2d-77.04816492408396!3d-12.084738388143805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c91e05142da9%3A0xc70a341d0c1b241d!2sAv.%20Faustino%20S%C3%A1nchez%20Carri%C3%B3n%20615%2C%20Jes%C3%BAs%20Mar%C3%ADa%2015076!5e0!3m2!1ses!2spe!4v1697000000000!5m2!1ses!2spe"
                            loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade"
                            title="Ubicación Dr.Cabello - Clínica de Trasplante Capilar"
                            allowfullscreen>
                        </iframe>
                        
                        <div class="map-footer">
                            <a href="https://www.google.com/maps/place/?q=place_id:ChIJa-sU4YPJBZERHSQbDA1wOsc" 
                               target="_blank" 
                               rel="noopener noreferrer" 
                               class="btn-google-map">
                                <svg width="20" height="20" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"/>
                                    <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"/>
                                    <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"/>
                                    <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"/>
                                </svg>
                                Ver en Google Maps
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>