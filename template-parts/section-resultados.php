<?php
/**
 * Template Part: resultados
 * 
 * @package Dr_Cabello
 * @since 1.0.0
 */
?>
<section id="resultados" class="gallery-carousel-section reveal">
            <!-- Orbes luminosos animados -->
            <div class="orb-1"></div>
            <div class="orb-2"></div>
            <!-- Overlay de textura decorativa -->
            <div class="gallery-bg-texture"></div>
            
            <div class="gallery-carousel-container">
                <!-- Header de la Galería -->
                <div class="gallery-header">
                    <h2 class="gallery-title">Resultados sorprendentes</h2>
                    <p class="gallery-subtitle">Transformaciones verificadas de pacientes reales. Cada resultado cuenta una historia de confianza recuperada.</p>
                    
                </div>

                <!-- Carrusel 3D -->
                <div class="gallery-carousel-track-container">
                    <div class="gallery-carousel-track" id="galleryTrack">
                        <!-- Slide 1 -->
                        <div class="gallery-slide">
                            <div class="gallery-card-flip-container">
                                <div class="gallery-card" data-card="1">
                                    <!-- Front: Después (Resultado) -->
                                    <div class="gallery-card-face gallery-card-front">
                                        <div class="gallery-image-container">
                                            <img src="<?php echo get_template_directory_uri(); ?>/assets/img/editadas/rt2.jpg" alt="Resultado del tratamiento - Caso 1" loading="lazy">
                                            <div class="gallery-image-label gallery-image-label-success">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                                                    <polyline points="20 6 9 17 4 12"/>
                                                </svg>
                                                Resultado
                                            </div>
                                            <!-- Hint para voltear -->
                                            <div class="flip-hint">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                    <path d="M1 4v6h6M23 20v-6h-6"/>
                                                    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
                                                </svg>
                                                Click para ver Antes
                                            </div>
                                        </div>
                                        <div class="gallery-card-info">
                                            <div class="gallery-card-stats">
                                                <div class="stat">
                                                    <span class="stat-label">Paciente</span>
                                                    <span class="stat-value">Carlos M.</span>
                                                </div>
                                                <div class="stat">
                                                    <span class="stat-label">Técnica</span>
                                                    <span class="stat-value">FUE</span>
                                                </div>
                                                <div class="stat">
                                                    <span class="stat-label">Tiempo</span>
                                                    <span class="stat-value">12 meses</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Back: Antes (Estado Inicial) -->
                                    <div class="gallery-card-face gallery-card-back">
                                        <div class="gallery-image-container">
                                            <img src="<?php echo get_template_directory_uri(); ?>/assets/img/editadas/rt1.png" alt="Antes del tratamiento - Caso 1" loading="lazy">
                                            <div class="gallery-image-label">
                                                <span class="label-icon">●</span>
                                                Estado Inicial
                                            </div>
                                            <!-- Hint para regresar -->
                                            <div class="flip-hint">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                    <path d="M1 4v6h6M23 20v-6h-6"/>
                                                    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
                                                </svg>
                                                Click para ver Resultado
                                            </div>
                                        </div>
                                        <div class="gallery-card-info">
                                            <div class="gallery-card-message">
                                                <p>💡 Este paciente recuperó su confianza con la técnica FUE</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Slide 2 -->
                        <div class="gallery-slide">
                            <div class="gallery-card-flip-container">
                                <div class="gallery-card" data-card="2">
                                    <!-- Front: Después -->
                                    <div class="gallery-card-face gallery-card-front">
                                        <div class="gallery-image-container">
                                            <img src="<?php echo get_template_directory_uri(); ?>/assets/img/editadas/p2.JPG" alt="Resultado del tratamiento - Caso 2" loading="lazy">
                                            <div class="gallery-image-label gallery-image-label-success">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                                                    <polyline points="20 6 9 17 4 12"/>
                                                </svg>
                                                Resultado
                                            </div>
                                            <div class="flip-hint">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                    <path d="M1 4v6h6M23 20v-6h-6"/>
                                                    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
                                                </svg>
                                                Click para ver Antes
                                            </div>
                                        </div>
                                        <div class="gallery-card-info">
                                            <div class="gallery-card-stats">
                                                <div class="stat">
                                                    <span class="stat-label">Paciente</span>
                                                    <span class="stat-value">Eduardo Q.</span>
                                                </div>
                                                <div class="stat">
                                                    <span class="stat-label">Técnica</span>
                                                    <span class="stat-value">DHI</span>
                                                </div>
                                                <div class="stat">
                                                    <span class="stat-label">Tiempo</span>
                                                    <span class="stat-value">10 meses</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Back: Antes -->
                                    <div class="gallery-card-face gallery-card-back">
                                        <div class="gallery-image-container">
                                            <img src="<?php echo get_template_directory_uri(); ?>/assets/img//editadas/p1.jpg" alt="Antes del tratamiento - Caso 2" loading="lazy">
                                            <div class="gallery-image-label">
                                                <span class="label-icon">●</span>
                                                Estado Inicial
                                            </div>
                                            <div class="flip-hint">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                    <path d="M1 4v6h6M23 20v-6h-6"/>
                                                    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
                                                </svg>
                                                Click para ver Resultado
                                            </div>
                                        </div>
                                        <div class="gallery-card-info">
                                            <div class="gallery-card-message">
                                                <p>💡 Técnica DHI de precisión para resultados naturales</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Slide 3 -->
                        <div class="gallery-slide">
                            <div class="gallery-card-flip-container">
                                <div class="gallery-card" data-card="3">
                                    <!-- Front: Después -->
                                    <div class="gallery-card-face gallery-card-front">
                                        <div class="gallery-image-container">
                                            <img src="<?php echo get_template_directory_uri(); ?>/assets/img/editadas/g2.png" alt="Resultado del tratamiento - Caso 3" loading="lazy">
                                            <div class="gallery-image-label gallery-image-label-success">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                                                    <polyline points="20 6 9 17 4 12"/>
                                                </svg>
                                                Resultado
                                            </div>
                                            <div class="flip-hint">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                    <path d="M1 4v6h6M23 20v-6h-6"/>
                                                    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
                                                </svg>
                                                Click para ver Antes
                                            </div>
                                        </div>
                                        <div class="gallery-card-info">
                                            <div class="gallery-card-stats">
                                                <div class="stat">
                                                    <span class="stat-label">Paciente</span>
                                                    <span class="stat-value">Roberto V.</span>
                                                </div>
                                                <div class="stat">
                                                    <span class="stat-label">Técnica</span>
                                                    <span class="stat-value">FUE + PRP</span>
                                                </div>
                                                <div class="stat">
                                                    <span class="stat-label">Tiempo</span>
                                                    <span class="stat-value">14 meses</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Back: Antes -->
                                    <div class="gallery-card-face gallery-card-back">
                                        <div class="gallery-image-container">
                                            <img src="<?php echo get_template_directory_uri(); ?>/assets/img/editadas/g1.JPG" alt="Antes del tratamiento - Caso 3" loading="lazy">
                                            <div class="gallery-image-label">
                                                <span class="label-icon">●</span>
                                                Estado Inicial
                                            </div>
                                            <div class="flip-hint">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                    <path d="M1 4v6h6M23 20v-6h-6"/>
                                                    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
                                                </svg>
                                                Click para ver Resultado
                                            </div>
                                        </div>
                                        <div class="gallery-card-info">
                                            <div class="gallery-card-message">
                                                <p>💡 Combinación de FUE y PRP para máximos resultados</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Slide 4 -->
                        <div class="gallery-slide">
                            <div class="gallery-card-flip-container">
                                <div class="gallery-card" data-card="4">
                                    <!-- Front: Después -->
                                    <div class="gallery-card-face gallery-card-front">
                                        <div class="gallery-image-container">
                                            <img src="<?php echo get_template_directory_uri(); ?>/assets/img/editadas/ed22.jpg" alt="Resultado del tratamiento - Caso 4" loading="lazy">
                                            <div class="gallery-image-label gallery-image-label-success">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                                                    <polyline points="20 6 9 17 4 12"/>
                                                </svg>
                                                Resultado
                                            </div>
                                            <div class="flip-hint">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                    <path d="M1 4v6h6M23 20v-6h-6"/>
                                                    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
                                                </svg>
                                                Click para ver Antes
                                            </div>
                                        </div>
                                        <div class="gallery-card-info">
                                            <div class="gallery-card-stats">
                                                <div class="stat">
                                                    <span class="stat-label">Paciente</span>
                                                    <span class="stat-value">Jorge L.</span>
                                                </div>
                                                <div class="stat">
                                                    <span class="stat-label">Técnica</span>
                                                    <span class="stat-value">DHI</span>
                                                </div>
                                                <div class="stat">
                                                    <span class="stat-label">Tiempo</span>
                                                    <span class="stat-value">11 meses</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Back: Antes -->
                                    <div class="gallery-card-face gallery-card-back">
                                        <div class="gallery-image-container">
                                            <img src="<?php echo get_template_directory_uri(); ?>/assets/img/editadas/eq1.jpg" alt="Antes del tratamiento - Caso 4" loading="lazy">
                                            <div class="gallery-image-label">
                                                <span class="label-icon">●</span>
                                                Estado Inicial
                                            </div>
                                            <div class="flip-hint">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                    <path d="M1 4v6h6M23 20v-6h-6"/>
                                                    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
                                                </svg>
                                                Click para ver Resultado
                                            </div>
                                        </div>
                                        <div class="gallery-card-info">
                                            <div class="gallery-card-message">
                                                <p>💡 Técnica DHI de alta precisión para densidad óptima</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Slide 5 -->
                        <div class="gallery-slide">
                            <div class="gallery-card-flip-container">
                                <div class="gallery-card" data-card="5">
                                    <!-- Front: Después -->
                                    <div class="gallery-card-face gallery-card-front">
                                        <div class="gallery-image-container">
                                            <img src="<?php echo get_template_directory_uri(); ?>/assets/img/editadas/l2.jpg" alt="Resultado del tratamiento - Caso 5" loading="lazy">
                                            <div class="gallery-image-label gallery-image-label-success">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                                                    <polyline points="20 6 9 17 4 12"/>
                                                </svg>
                                                Resultado
                                            </div>
                                            <div class="flip-hint">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                    <path d="M1 4v6h6M23 20v-6h-6"/>
                                                    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
                                                </svg>
                                                Click para ver Antes
                                            </div>
                                        </div>
                                        <div class="gallery-card-info">
                                            <div class="gallery-card-stats">
                                                <div class="stat">
                                                    <span class="stat-label">Paciente</span>
                                                    <span class="stat-value">Miguel A.</span>
                                                </div>
                                                <div class="stat">
                                                    <span class="stat-label">Técnica</span>
                                                    <span class="stat-value">FUE</span>
                                                </div>
                                                <div class="stat">
                                                    <span class="stat-label">Tiempo</span>
                                                    <span class="stat-value">13 meses</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Back: Antes -->
                                    <div class="gallery-card-face gallery-card-back">
                                        <div class="gallery-image-container">
                                            <img src="<?php echo get_template_directory_uri(); ?>/assets/img/dr_cabello_img_reales/IMG_8963.JPG" alt="Antes del tratamiento - Caso 5" loading="lazy">
                                            <div class="gallery-image-label">
                                                <span class="label-icon">●</span>
                                                Estado Inicial
                                            </div>
                                            <div class="flip-hint">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                    <path d="M1 4v6h6M23 20v-6h-6"/>
                                                    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
                                                </svg>
                                                Click para ver Resultado
                                            </div>
                                        </div>
                                        <div class="gallery-card-info">
                                            <div class="gallery-card-message">
                                                <p>💡 Transformación completa con técnica FUE avanzada</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Controles de Navegación -->
                <div class="gallery-controls">
                    <button class="gallery-nav-btn gallery-nav-prev" id="galleryPrevBtn" aria-label="Anterior">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="15 18 9 12 15 6"/>
                        </svg>
                    </button>
                    
                    <div class="gallery-indicators" id="galleryIndicators">
                        <button class="gallery-indicator active" data-slide="0" aria-label="Ver caso 1"></button>
                        <button class="gallery-indicator" data-slide="1" aria-label="Ver caso 2"></button>
                        <button class="gallery-indicator" data-slide="2" aria-label="Ver caso 3"></button>
                        <button class="gallery-indicator" data-slide="3" aria-label="Ver caso 4"></button>
                        <button class="gallery-indicator" data-slide="4" aria-label="Ver caso 5"></button>
                    </div>
                    
                    <button class="gallery-nav-btn gallery-nav-next" id="galleryNextBtn" aria-label="Siguiente">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="9 18 15 12 9 6"/>
                        </svg>
                    </button>
                </div>
            </div>
        </section>