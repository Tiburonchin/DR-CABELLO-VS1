
    <footer class="site-footer">
        <!-- Decorative top wave with hair follicle pattern -->
        <div class="footer-wave" aria-hidden="true">
            <svg class="wave-pattern" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style="stop-color:#008fcc"/>
                        <stop offset="50%" style="stop-color:#12d7ff"/>
                        <stop offset="100%" style="stop-color:#008fcc"/>
                    </linearGradient>
                    <pattern id="folliclePattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                        <circle cx="20" cy="20" r="2" fill="rgba(255,255,255,0.3)"/>
                        <circle cx="5" cy="10" r="1" fill="rgba(255,255,255,0.2)"/>
                        <circle cx="35" cy="30" r="1.5" fill="rgba(255,255,255,0.25)"/>
                    </pattern>
                </defs>
                <path d="M0,0 C300,120 900,120 1200,0 L1200,120 L0,120 Z" fill="url(#waveGradient)"/>
                <path d="M0,0 C300,120 900,120 1200,0 L1200,120 L0,120 Z" fill="url(#folliclePattern)" opacity="0.6"/>
            </svg>
        </div>

        <!-- Main footer content -->
        <div class="footer-main">
            <div class="container footer__content">
                <!-- Brand section with enhanced design -->
                <div class="footer-brand">
                    <a href="<?php echo esc_url( home_url( '/#top' ) ); ?>" class="brand brand--footer">
                        <div class="brand__icon">
                            <svg viewBox="0 0 40 40" class="brand__logo-svg">
                                <defs>
                                    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" style="stop-color:#12d7ff"/>
                                        <stop offset="100%" style="stop-color:#008fcc"/>
                                    </linearGradient>
                                </defs>
                                <circle cx="20" cy="20" r="18" fill="url(#logoGradient)" stroke="white" stroke-width="2"/>
                                <text x="20" y="26" font-family="Outfit" font-weight="700" font-size="16" fill="white" text-anchor="middle">Dr.C</text>
                            </svg>
                        </div>
                        <div class="brand__text">
                            <span class="brand__name"><?php bloginfo( 'name' ); ?></span>
                            <span class="brand__tagline"><?php echo esc_html( get_bloginfo( 'description' ) ?: 'Clínica Especializada' ); ?></span>
                        </div>
                    </a>
                    <p class="footer-description">
                        <?php 
                        $footer_desc = get_field( 'footer_description', 'option' );
                        echo esc_html( $footer_desc ?: 'Líderes en tratamientos capilares avanzados con más de 1,000 pacientes satisfechos. Recupera tu confianza con nuestras técnicas de vanguardia.' );
                        ?>
                    </p>
                    <div class="footer-certifications">
                        <div class="cert-badge">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="m9 12 2 2 4-4"/>
                                <path d="M21 12c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z"/>
                                <path d="M3 12c.552 0 1-.448 1-1s-.448-1-1-1-1 .448-1 1 .448 1 1 1z"/>
                                <path d="m12 3 1.5 1.5L16 3l1.5 1.5L21 3v6l-3.5 1.5L16 12l-1.5-1.5L12 12l-1.5-1.5L8 12l-1.5-1.5L3 12V6l3.5-1.5L8 3l1.5 1.5L12 3z"/>
                            </svg>
                            <span>Certificación<br>Médica</span>
                        </div>
                        <div class="cert-badge">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"/>
                                <polyline points="12,6 12,12 16,14"/>
                            </svg>
                            <span><?php echo esc_html( get_field( 'years_experience', 'option' ) ?: '5+' ); ?> Años<br>Experiencia</span>
                        </div>
                    </div>
                </div>

                <!-- Services section -->
                <div class="footer-section">
                    <h4 class="footer-title">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                        </svg>
                        Nuestros Servicios
                    </h4>
                    <?php
                    if ( is_active_sidebar( 'footer-1' ) ) {
                        dynamic_sidebar( 'footer-1' );
                    } else {
                        // Fallback menu estático
                        ?>
                        <ul class="footer-list">
                            <li><a href="#servicios">Injerto Capilar FUE</a></li>
                            <li><a href="#servicios">Técnica DHI</a></li>
                            <li><a href="#servicios">Tratamiento PRP</a></li>
                            <li><a href="#servicios">Bioestimulación</a></li>
                            <li><a href="#servicios">Diagnóstico Capilar</a></li>
                            <li><a href="#servicios">Tricología Médica</a></li>
                        </ul>
                        <?php
                    }
                    ?>
                </div>

                <!-- Contact information -->
                <div class="footer-section">
                    <h4 class="footer-title">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0c0 3-2.7 7-8 11.7z"/>
                            <circle cx="12" cy="10" r="3"/>
                        </svg>
                        Información de Contacto
                    </h4>
                    <?php
                    // Reutilizar las variables del header
                    $whatsapp_number = get_field( 'whatsapp_number', 'option' ) ?: '+51999999999';
                    $phone_number = get_field( 'phone_number', 'option' ) ?: '+51 999 999 999';
                    $email = get_field( 'contact_email', 'option' ) ?: get_option( 'admin_email' );
                    $address = get_field( 'clinic_address', 'option' ) ?: 'Lima, Perú';
                    $schedule = get_field( 'clinic_schedule', 'option' ) ?: 'Lun - Sáb: 9:00 - 18:00';
                    ?>
                    <ul class="footer-list footer-contact">
                        <li>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5  0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                            </svg>
                            <div>
                                <strong>Teléfono</strong>
                                <a href="tel:<?php echo esc_attr( str_replace( ' ', '', $phone_number ) ); ?>"><?php echo esc_html( $phone_number ); ?></a>
                            </div>
                        </li>
                        <li>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                <polyline points="22,6 12,13 2,6"/>
                            </svg>
                            <div>
                                <strong>Email</strong>
                                <a href="mailto:<?php echo esc_attr( $email ); ?>"><?php echo esc_html( $email ); ?></a>
                            </div>
                        </li>
                        <li>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="10" r="3"/>
                                <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z"/>
                            </svg>
                            <div>
                                <strong>Ubicación</strong>
                                <span><?php echo esc_html( $address ); ?></span>
                            </div>
                        </li>
                        <li>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"/>
                                <polyline points="12,6 12,12 16,14"/>
                            </svg>
                            <div>
                                <strong>Horarios</strong>
                                <span><?php echo esc_html( $schedule ); ?></span>
                            </div>
                        </li>
                    </ul>
                </div>

                <!-- Quick links and patient resources -->
                <div class="footer-section">
                    <h4 class="footer-title">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                            <polyline points="14,2 14,8 20,8"/>
                            <line x1="16" y1="13" x2="8" y2="13"/>
                            <line x1="16" y1="17" x2="8" y2="17"/>
                            <polyline points="10,9 9,9 8,9"/>
                        </svg>
                        Recursos para Pacientes
                    </h4>
                    <?php
                    wp_nav_menu( array(
                        'theme_location'  => 'footer',
                        'menu_class'      => 'footer-list',
                        'container'       => false,
                        'fallback_cb'     => 'dr_cabello_footer_menu_fallback',
                    ) );
                    ?>
                    
                    <!-- Call to action button -->
                    <div class="footer-cta">
                        <a href="#contacto" class="btn btn--footer">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                                <polyline points="9,22 9,12 15,12 15,22"/>
                            </svg>
                            Consulta Gratuita
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <!-- Social media and newsletter section -->
        <div class="footer-social-section">
            <div class="container">
                <div class="footer-social-content">
                    <div class="social-connect">
                        <h5>Síguenos y mantente informado</h5>
                        <div class="social-links">
                            <?php
                            $facebook_url = get_field( 'facebook_url', 'option' ) ?: '#';
                            $instagram_url = get_field( 'instagram_url', 'option' ) ?: '#';
                            $youtube_url = get_field( 'youtube_url', 'option' ) ?: '#';
                            $tiktok_url = get_field( 'tiktok_url', 'option' ) ?: '#';
                            ?>
                            <a href="<?php echo esc_url( $facebook_url ); ?>" class="social-link" aria-label="Facebook" data-platform="facebook" target="_blank" rel="noopener">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                                <span>Facebook</span>
                            </a>
                            <a href="<?php echo esc_url( $instagram_url ); ?>" class="social-link" aria-label="Instagram" data-platform="instagram" target="_blank" rel="noopener">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.596-3.205-1.535l1.098-.656c.569.706 1.435 1.156 2.383 1.156 1.748 0 3.168-1.42 3.168-3.168S10.197 9.617 8.449 9.617s-3.168 1.42-3.168 3.168c0 .948.45 1.814 1.156 2.383l-.656 1.098c-.939-.757-1.535-1.908-1.535-3.205 0-2.279 1.855-4.134 4.134-4.134s4.134 1.855 4.134 4.134-1.855 4.134-4.134 4.134zm7.718-3.205c0 2.279-1.855 4.134-4.134 4.134s-4.134-1.855-4.134-4.134 1.855-4.134 4.134-4.134 4.134 1.855 4.134 4.134z"/>
                                </svg>
                                <span>Instagram</span>
                            </a>
                            <a href="<?php echo esc_url( $youtube_url ); ?>" class="social-link" aria-label="YouTube" data-platform="youtube" target="_blank" rel="noopener">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                </svg>
                                <span>YouTube</span>
                            </a>
                            <a href="<?php echo esc_url( $tiktok_url ); ?>" class="social-link" aria-label="TikTok" data-platform="tiktok" target="_blank" rel="noopener">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                                </svg>
                                <span>TikTok</span>
                            </a>
                        </div>
                    </div>
                    <div class="newsletter-signup">
                        <h5>Recibe tips y novedades</h5>
                        <form class="newsletter-form" method="post" action="<?php echo esc_url( admin_url( 'admin-ajax.php' ) ); ?>">
                            <div class="input-group">
                                <input type="email" name="newsletter_email" placeholder="Tu email aquí" required>
                                <input type="hidden" name="action" value="dr_cabello_newsletter">
                                <?php wp_nonce_field( 'dr_cabello_newsletter_nonce', 'newsletter_nonce' ); ?>
                                <button type="submit">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <line x1="22" y1="2" x2="11" y2="13"/>
                                        <polygon points="22,2 15,22 11,13 2,9 22,2"/>
                                    </svg>
                                </button>
                            </div>
                            <small>Información sobre tratamientos y promociones exclusivas</small>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- Bottom legal section -->
        <div class="footer-bottom">
            <div class="container footer-bottom-content">
                <div class="legal-info">
                    <small>© <span id="year"><?php echo date( 'Y' ); ?></span> <?php bloginfo( 'name' ); ?>. Todos los derechos reservados.</small>
                    <div class="legal-links">
                        <?php
                        wp_nav_menu( array(
                            'theme_location'  => 'legal',
                            'container'       => false,
                            'menu_class'      => '',
                            'fallback_cb'     => 'dr_cabello_legal_menu_fallback',
                        ) );
                        ?>
                    </div>
                </div>
                <div class="footer-badges">
                    <div class="security-badge">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                        </svg>
                        <span>Sitio Seguro</span>
                    </div>
                    <div class="ssl-badge">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                            <circle cx="12" cy="16" r="1"/>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                        </svg>
                        <span>SSL Certificado</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Floating back to top button -->
        <button class="back-to-top" id="backToTop" aria-label="Volver al inicio">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="18 15 12 9 6 15"/>
            </svg>
        </button>
    </footer>

<?php wp_footer(); ?>
</body>
</html>
