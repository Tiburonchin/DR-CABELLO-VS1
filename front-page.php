<?php
/**
 * Template Name: Página de Inicio
 * 
 * Plantilla para la página principal del sitio.
 * Este archivo carga todas las secciones modulares de la página de inicio.
 * 
 * @package Dr_Cabello
 * @since 1.0.0
 */

get_header(); ?>

<!-- Menú flotante de redes sociales -->
<div class="floating-social-menu" id="floatingSocial">
    <?php
    $facebook_url = get_field( 'facebook_url', 'option' ) ?: '#';
    $instagram_url = get_field( 'instagram_url', 'option' ) ?: '#';
    $youtube_url = get_field( 'youtube_url', 'option' ) ?: '#';
    $whatsapp_url = get_field( 'whatsapp_url', 'option' ) ?: '#';
    ?>
    <div class="floating-social-item">
        <a href="<?php echo esc_url( $facebook_url ); ?>" target="_blank" rel="noopener" aria-label="Facebook">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M13.5 21v-7h2.5l.5-3.5h-3V8.6c0-1 .3-1.7 1.8-1.7H16V3.7c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.2V10H7v3.5h2.6V21h3.9z" fill="currentColor"/>
            </svg>
        </a>
    </div>
    <div class="floating-social-item">
        <a href="<?php echo esc_url( $instagram_url ); ?>" target="_blank" rel="noopener" aria-label="Instagram">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="1.6"/>
                <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="1.6"/>
                <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor"/>
            </svg>
        </a>
    </div>
    <div class="floating-social-item">
        <a href="<?php echo esc_url( $youtube_url ); ?>" target="_blank" rel="noopener" aria-label="YouTube">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" fill="currentColor"/>
                <path d="M9.75 15.02V8.48L15.5 11.75L9.75 15.02Z" fill="white"/>
            </svg>
        </a>
    </div>
    <div class="floating-social-item">
        <a href="<?php echo esc_url( $whatsapp_url ); ?>" target="_blank" rel="noopener" aria-label="WhatsApp">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="currentColor"/>
            </svg>
        </a>
    </div>
    <div class="floating-social-toggle">
        <span class="toggle-text">OBTEN TU CITA</span>
    </div>
</div>

<main>
    <?php
    /**
     * Secciones modulares de la página de inicio
     * Cada sección se carga desde template-parts/
     * 
     * Estructura:
     * - Hero Medical: Sección principal con llamado a la acción
     * - Ribbon: Cinta animada con mensaje destacado
     * - Videos: Carrusel de videos testimoniales
     * - Candidato: Sección "¿Eres candidato?"
     * - Resultados: Galería de antes/después
     * - Centro Médico: Información sobre las instalaciones
     * - Equipo: Perfiles de médicos
     * - Medicamentos: Productos y tratamientos
     * - Servicios Premium: Servicios ofrecidos
     * - Testimonios: Google Reviews
     * - Contacto: Formulario de contacto avanzado
     */
    
    // Sección Hero
    get_template_part( 'template-parts/section', 'hero-medical' );
    
    // Ribbon animado
    get_template_part( 'template-parts/section', 'ribbon' );
    
    // Videos testimoniales
    get_template_part( 'template-parts/section', 'videos' );
    
    // ¿Eres candidato?
    get_template_part( 'template-parts/section', 'candidato' );
    
    // Galería de resultados (antes/después)
    get_template_part( 'template-parts/section', 'resultados' );
    
    // Centro médico
    get_template_part( 'template-parts/section', 'centro-medico' );
    
    // Equipo de doctores
    get_template_part( 'template-parts/section', 'equipo' );
    
    // Medicamentos y tratamientos
    get_template_part( 'template-parts/section', 'medicamentos' );
    
    // Servicios premium
    get_template_part( 'template-parts/section', 'servicios' );
    
    // Google Reviews
    get_template_part( 'template-parts/section', 'testimonios' );
    
    // Formulario de contacto
    get_template_part( 'template-parts/section', 'contacto' );
    ?>
</main>

<?php get_footer(); ?>
