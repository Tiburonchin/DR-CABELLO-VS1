<?php
/**
 * Template Part: hero-medical
 * 
 * @package Dr_Cabello
 * @since 1.0.0
 */
?>
<section class="hero-medical" id="inicio">
            <!-- Animación de círculos de fondo -->
            <div class="hero-circles-bg">
                <div class="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </div>
            </div>
            
            <!-- Overlay para mantener legibilidad -->
            <div class="hero-medical__overlay"></div>
            
            <!-- Decoraciones de fondo -->
            <div class="hero-medical__decorations" aria-hidden="true">
                <div class="hero-decoration"></div>
                <div class="hero-decoration"></div>
                <div class="hero-decoration"></div>
            </div>
            
            <div class="hero-medical__container container">
                <!-- Columna de Contenido -->
                <div class="hero-medical__content">
                    <!-- Título principal -->
                    <h1 class="hero-medical__title">
                        <span class="hero-medical__title-highlight">Trasplante Capilar</span>
                        <span>con Resultados Naturales y Permanentes</span>
                    </h1>

                    

                    <!-- Tags de características -->
                    <div class="hero-medical__tags">
                        <div class="hero-tag">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                                <path d="M2 17l10 5 10-5"/>
                                <path d="M2 12l10 5 10-5"/>
                            </svg>
                            Metodologías Avanzadas
                        </div>
                        <div class="hero-tag">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M9 11l3 3L22 4"/>
                                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                            </svg>
                            Técnicas Especializadas
                        </div>
                        <div class="hero-tag">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                            </svg>
                            Resultados Naturales
                        </div>
                        <div class="hero-tag">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                            </svg>
                            Atención Especializada
                        </div>
                    </div>

                    <!-- Estadísticas (opcional) -->
                    <div class="hero-medical__stats">
                        <div class="hero-stat">
                            <div class="hero-stat__number">15+</div>
                            <div class="hero-stat__label">Años de Experiencia</div>
                        </div>
                        <div class="hero-stat">
                            <div class="hero-stat__number">2,500+</div>
                            <div class="hero-stat__label">Pacientes Satisfechos</div>
                        </div>
                        <div class="hero-stat">
                            <div class="hero-stat__number">98%</div>
                            <div class="hero-stat__label">Tasa de Éxito</div>
                        </div>
                    </div>
                </div>
                <!-- Columna Visual -->
                <div class="hero-medical__visual">
                    <!-- Contenedor de imágenes -->
                    <div class="hero-visual__images">
                        <!-- Etiqueta SOLO MÓVIL: esquina superior derecha de las imágenes -->
                        <div class="hero-image-label hero-image-label--mobile" role="note" aria-hidden="true">
                            <span class="label-icon">★</span>
                            Después
                        </div>
                        <!-- Imagen de referencia (antes - estado inicial) - más pequeña, posición izquierda superior -->
                        <div class="hero-image--reference">
                            <img src="" 
                                 alt="Estado inicial del paciente" 
                                 loading="eager"
                                 data-carousel-image />
                            <!-- Etiqueta sutil de contexto -->
                            <div class="hero-image-label hero-image-label--subtle">
                                <span class="label-icon">●</span>
                                Estado Inicial
                            </div>
                        </div>

                        <!-- Imagen principal (después - resultado) - más grande y destacada, lado derecho -->
                        <div class="hero-image--main">
                            <img src="" 
                                 alt="Resultado del trasplante capilar - aspecto natural y profesional" 
                                 loading="eager"
                                 data-carousel-image />
                            
                            <!-- Badge de información con resultado -->
                            <div class="hero-image-badge">
                                <div class="hero-image-badge__icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <polyline points="20 6 9 17 4 12"/>
                                    </svg>
                                </div>
                                <div class="hero-image-badge__content">
                                    <p class="hero-image-badge__title">Transformación Natural</p>
                                    <p class="hero-image-badge__value">12 Meses</p>
                                </div>
                            </div>

                            <!-- Etiqueta destacada -->
                            <div class="hero-image-label hero-image-label--featured">
                                <span class="label-icon">✓</span>
                                Resultado Final
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>