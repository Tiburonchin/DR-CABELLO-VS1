<?php
/**
 * Dr. Cabello Theme - Functions and Definitions
 * 
 * @package Dr_Cabello
 * @since 1.0.0
 */

// Prevenir acceso directo
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Define constantes del tema
 */
define( 'DR_CABELLO_VERSION', '1.0.0' );
define( 'DR_CABELLO_THEME_DIR', get_template_directory() );
define( 'DR_CABELLO_THEME_URI', get_template_directory_uri() );

/**
 * Configuración inicial del tema
 */
function dr_cabello_theme_setup() {
    // Soporte para traducciones
    load_theme_textdomain( 'dr-cabello', DR_CABELLO_THEME_DIR . '/languages' );

    // Soporte para título dinámico
    add_theme_support( 'title-tag' );

    // Soporte para logo personalizado
    add_theme_support( 'custom-logo', array(
        'height'      => 100,
        'width'       => 300,
        'flex-height' => true,
        'flex-width'  => true,
        'header-text' => array( 'site-title', 'site-description' ),
    ) );

    // Soporte para imágenes destacadas
    add_theme_support( 'post-thumbnails' );
    
    // Tamaños de imagen personalizados
    add_image_size( 'dr-cabello-hero', 1920, 1080, true );
    add_image_size( 'dr-cabello-gallery', 800, 600, true );
    add_image_size( 'dr-cabello-thumbnail', 400, 300, true );
    add_image_size( 'dr-cabello-doctor', 600, 600, true );

    // Soporte para menús de navegación
    register_nav_menus( array(
        'primary'   => __( 'Menú Principal', 'dr-cabello' ),
        'footer'    => __( 'Menú Footer', 'dr-cabello' ),
        'legal'     => __( 'Menú Legal', 'dr-cabello' ),
    ) );

    // Soporte para HTML5
    add_theme_support( 'html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'script',
        'style',
    ) );

    // Soporte para formato de contenido
    add_theme_support( 'post-formats', array(
        'video',
        'gallery',
    ) );

    // Soporte para editor de bloques
    add_theme_support( 'align-wide' );
    add_theme_support( 'responsive-embeds' );
    add_theme_support( 'editor-styles' );
}
add_action( 'after_setup_theme', 'dr_cabello_theme_setup' );

/**
 * Registrar y encolar estilos del tema
 */
function dr_cabello_enqueue_styles() {
    // Google Fonts
    wp_enqueue_style( 
        'dr-cabello-google-fonts', 
        'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Outfit:wght@500;600;700;800&family=Montserrat:wght@700;800;900&display=swap',
        array(),
        null
    );

    // Font Awesome
    wp_enqueue_style( 
        'font-awesome', 
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
        array(),
        '6.4.0'
    );

    // Estilos principales del tema
    // El archivo styles.css importa todos los demás archivos CSS modulares
    wp_enqueue_style( 
        'dr-cabello-main-styles', 
        DR_CABELLO_THEME_URI . '/assets/css/styles.css',
        array( 'dr-cabello-google-fonts', 'font-awesome' ),
        DR_CABELLO_VERSION
    );

    // Fix para menús de WordPress - asegura que se vean como el diseño original
    wp_enqueue_style( 
        'dr-cabello-wp-menu-fix', 
        DR_CABELLO_THEME_URI . '/assets/css/wp-menu-fix.css',
        array( 'dr-cabello-main-styles' ),
        DR_CABELLO_VERSION
    );

    // Style.css del tema (requerido por WordPress)
    wp_enqueue_style( 
        'dr-cabello-style', 
        get_stylesheet_uri(),
        array(),
        DR_CABELLO_VERSION
    );
}
add_action( 'wp_enqueue_scripts', 'dr_cabello_enqueue_styles' );

/**
 * Registrar y encolar scripts del tema
 * 
 * IMPORTANTE: El orden de carga es crítico para el correcto funcionamiento
 * de las animaciones e interacciones.
 */
function dr_cabello_enqueue_scripts() {
    
    // 1. Utilities - Funciones auxiliares que otros scripts pueden necesitar
    wp_enqueue_script( 
        'dr-cabello-utils', 
        DR_CABELLO_THEME_URI . '/assets/js/utils.js',
        array(),
        DR_CABELLO_VERSION,
        true // Cargar en footer
    );

    // 2. Navegación y Header
    wp_enqueue_script( 
        'dr-cabello-nav-header', 
        DR_CABELLO_THEME_URI . '/assets/js/nav_header.js',
        array(),
        '3.0',
        true
    );

    // 2b. WordPress Menu Enhancement - Hace que los menús de WP funcionen como el diseño original
    wp_enqueue_script( 
        'dr-cabello-wp-menu-enhancement', 
        DR_CABELLO_THEME_URI . '/assets/js/wp-menu-enhancement.js',
        array( 'dr-cabello-nav-header' ),
        DR_CABELLO_VERSION,
        true
    );

    // 3. Hero Section - Mobile first approach
    wp_enqueue_script( 
        'dr-cabello-hero-mobile', 
        DR_CABELLO_THEME_URI . '/assets/js/hero-mobile.js',
        array(),
        '2.0',
        true
    );

    wp_enqueue_script( 
        'dr-cabello-hero-medical', 
        DR_CABELLO_THEME_URI . '/assets/js/hero-medical.js',
        array(),
        DR_CABELLO_VERSION,
        true
    );

    // 4. Animaciones generales (puede depender de utils)
    wp_enqueue_script( 
        'dr-cabello-animations', 
        DR_CABELLO_THEME_URI . '/assets/js/animations.js',
        array( 'dr-cabello-utils' ),
        DR_CABELLO_VERSION,
        true
    );

    // 5. Funcionalidad de comparación antes/después
    wp_enqueue_script( 
        'dr-cabello-compare', 
        DR_CABELLO_THEME_URI . '/assets/js/compare.js',
        array(),
        DR_CABELLO_VERSION,
        true
    );

    // 6. Carrusel de galería
    wp_enqueue_script( 
        'dr-cabello-gallery-carousel', 
        DR_CABELLO_THEME_URI . '/assets/js/gallery-carousel.js',
        array(),
        DR_CABELLO_VERSION,
        true
    );

    // 7. Animación del ribbon
    wp_enqueue_script( 
        'dr-cabello-ribbon-animation', 
        DR_CABELLO_THEME_URI . '/assets/js/ribbon-animation.js',
        array(),
        DR_CABELLO_VERSION,
        true
    );

    // 8. Menú flotante de redes sociales
    wp_enqueue_script( 
        'dr-cabello-floating-social', 
        DR_CABELLO_THEME_URI . '/assets/js/floating-social.js',
        array(),
        DR_CABELLO_VERSION,
        true
    );

    // 9. Footer mejorado
    wp_enqueue_script( 
        'dr-cabello-footer-enhanced', 
        DR_CABELLO_THEME_URI . '/assets/js/footer-enhanced.js',
        array(),
        DR_CABELLO_VERSION,
        true
    );

    // 10. Centro médico
    wp_enqueue_script( 
        'dr-cabello-medical-center', 
        DR_CABELLO_THEME_URI . '/assets/js/medical-center.js',
        array(),
        DR_CABELLO_VERSION,
        true
    );

    // 11. Perfil del doctor
    wp_enqueue_script( 
        'dr-cabello-doctor-profile', 
        DR_CABELLO_THEME_URI . '/assets/js/doctor-profile.js',
        array(),
        DR_CABELLO_VERSION,
        true
    );

    // 12. Formulario de contacto avanzado
    wp_enqueue_script( 
        'dr-cabello-contact-advanced', 
        DR_CABELLO_THEME_URI . '/assets/js/contact-advanced.js',
        array(),
        DR_CABELLO_VERSION,
        true
    );

    // 13. Galería de videos
    wp_enqueue_script( 
        'dr-cabello-video-gallery', 
        DR_CABELLO_THEME_URI . '/assets/js/video-gallery.js',
        array(),
        DR_CABELLO_VERSION,
        true
    );

    // 13.5. Google Maps Error Handler (debe cargarse antes del iframe)
    wp_enqueue_script( 
        'dr-cabello-google-maps-error-handler', 
        DR_CABELLO_THEME_URI . '/assets/js/google-maps-error-handler.js',
        array(),
        DR_CABELLO_VERSION,
        false // Cargar en el head para interceptar errores temprano
    );

    // 14. Google Reviews
    wp_enqueue_script( 
        'dr-cabello-google-reviews', 
        DR_CABELLO_THEME_URI . '/assets/js/google-reviews.js',
        array(),
        DR_CABELLO_VERSION,
        true
    );

    // Pasar la URL del endpoint de reviews a JavaScript
    wp_localize_script( 'dr-cabello-google-reviews', 'drCabelloReviews', array(
        'apiEndpoint' => home_url( '/get-reviews.php' )
    ) );
    
    // Pasar URI del tema a todos los scripts (para rutas de assets)
    wp_localize_script( 'dr-cabello-utils', 'wpAssets', array(
        'themeUri' => DR_CABELLO_THEME_URI,
        'homeUrl' => home_url(),
        'ajaxUrl' => admin_url( 'admin-ajax.php' ),
    ) );

    // Pasar rutas de imágenes del hero a JavaScript
    wp_localize_script( 'dr-cabello-hero-medical', 'HERO_IMAGES_OVERRIDE', array(
        'antes' => array(
            DR_CABELLO_THEME_URI . '/assets/img/fijas/new/3.png',
            DR_CABELLO_THEME_URI . '/assets/img/fijas/new/alex_1.png',
            DR_CABELLO_THEME_URI . '/assets/img/fijas/new/2.png',
            DR_CABELLO_THEME_URI . '/assets/img/fijas/new/1.png',
        ),
        'despues' => array(
            DR_CABELLO_THEME_URI . '/assets/img/h_s/despues/d5.png',
            DR_CABELLO_THEME_URI . '/assets/img/dr_cabello_img_reales/hero_section_ds_1.png',
            DR_CABELLO_THEME_URI . '/assets/img/h_s/despues/d2.png',
            DR_CABELLO_THEME_URI . '/assets/img/h_s/despues/d3.png',
        )
    ) );

    // 15. Variables de layout (altura de header) - Se carga al final
    wp_enqueue_script( 
        'dr-cabello-layout-vars', 
        DR_CABELLO_THEME_URI . '/assets/js/layout-vars.js',
        array( 'dr-cabello-footer-enhanced' ),
        DR_CABELLO_VERSION,
        true
    );

    // Pasar datos de PHP a JavaScript
    wp_localize_script( 'dr-cabello-contact-advanced', 'drCabelloAjax', array(
        'ajaxurl' => admin_url( 'admin-ajax.php' ),
        'nonce'   => wp_create_nonce( 'dr_cabello_contact_nonce' ),
    ) );
}
add_action( 'wp_enqueue_scripts', 'dr_cabello_enqueue_scripts' );

/**
 * Registrar áreas de widgets
 */
function dr_cabello_widgets_init() {
    register_sidebar( array(
        'name'          => __( 'Sidebar Principal', 'dr-cabello' ),
        'id'            => 'sidebar-1',
        'description'   => __( 'Área de widgets para el sidebar principal', 'dr-cabello' ),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ) );

    register_sidebar( array(
        'name'          => __( 'Footer - Columna 1', 'dr-cabello' ),
        'id'            => 'footer-1',
        'description'   => __( 'Primera columna del footer', 'dr-cabello' ),
        'before_widget' => '<div id="%1$s" class="footer-widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4 class="footer-widget-title">',
        'after_title'   => '</h4>',
    ) );

    register_sidebar( array(
        'name'          => __( 'Footer - Columna 2', 'dr-cabello' ),
        'id'            => 'footer-2',
        'description'   => __( 'Segunda columna del footer', 'dr-cabello' ),
        'before_widget' => '<div id="%1$s" class="footer-widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4 class="footer-widget-title">',
        'after_title'   => '</h4>',
    ) );

    register_sidebar( array(
        'name'          => __( 'Footer - Columna 3', 'dr-cabello' ),
        'id'            => 'footer-3',
        'description'   => __( 'Tercera columna del footer', 'dr-cabello' ),
        'before_widget' => '<div id="%1$s" class="footer-widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4 class="footer-widget-title">',
        'after_title'   => '</h4>',
    ) );
}
add_action( 'widgets_init', 'dr_cabello_widgets_init' );

/**
 * Agregar Schema.org para SEO médico
 */
function dr_cabello_schema_markup() {
    if ( is_front_page() ) {
        ?>
        <script type="application/ld+json">
        {
            "@context": "https://schema.org",
            "@type": "MedicalClinic",
            "name": "<?php bloginfo( 'name' ); ?>",
            "url": "<?php echo esc_url( home_url( '/' ) ); ?>",
            "image": "<?php echo esc_url( DR_CABELLO_THEME_URI . '/assets/img/doctor.jpg' ); ?>",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Lima",
                "addressCountry": "PE"
            },
            "medicalSpecialty": ["Trichology", "CosmeticSurgery"],
            "priceRange": "$$"
        }
        </script>
        <?php
    }
}
add_action( 'wp_footer', 'dr_cabello_schema_markup' );

/**
 * Personalizar el excerpt
 */
function dr_cabello_excerpt_length( $length ) {
    return 30;
}
add_filter( 'excerpt_length', 'dr_cabello_excerpt_length' );

function dr_cabello_excerpt_more( $more ) {
    return '...';
}
add_filter( 'excerpt_more', 'dr_cabello_excerpt_more' );

/**
 * Añadir clases personalizadas al body
 */
function dr_cabello_body_classes( $classes ) {
    if ( is_front_page() ) {
        $classes[] = 'home-page';
    }
    
    if ( ! is_user_logged_in() ) {
        $classes[] = 'logged-out';
    }
    
    return $classes;
}
add_filter( 'body_class', 'dr_cabello_body_classes' );

/**
 * Handler AJAX para el formulario de contacto
 * (Si decides no usar Contact Form 7)
 */
function dr_cabello_handle_contact_form() {
    // Verificar nonce
    check_ajax_referer( 'dr_cabello_contact_nonce', 'nonce' );

    // Sanitizar datos
    $name    = sanitize_text_field( $_POST['name'] ?? '' );
    $email   = sanitize_email( $_POST['email'] ?? '' );
    $phone   = sanitize_text_field( $_POST['phone'] ?? '' );
    $message = sanitize_textarea_field( $_POST['message'] ?? '' );

    // Validar
    if ( empty( $name ) || empty( $email ) || empty( $message ) ) {
        wp_send_json_error( array( 'message' => 'Por favor complete todos los campos requeridos.' ) );
    }

    if ( ! is_email( $email ) ) {
        wp_send_json_error( array( 'message' => 'Por favor ingrese un email válido.' ) );
    }

    // Enviar email
    $to      = get_option( 'admin_email' );
    $subject = 'Nuevo mensaje de contacto - ' . get_bloginfo( 'name' );
    $body    = "Nombre: $name\n";
    $body   .= "Email: $email\n";
    $body   .= "Teléfono: $phone\n\n";
    $body   .= "Mensaje:\n$message";
    
    $headers = array( 'Content-Type: text/plain; charset=UTF-8' );

    if ( wp_mail( $to, $subject, $body, $headers ) ) {
        wp_send_json_success( array( 'message' => '¡Mensaje enviado exitosamente! Nos pondremos en contacto pronto.' ) );
    } else {
        wp_send_json_error( array( 'message' => 'Error al enviar el mensaje. Por favor intente nuevamente.' ) );
    }
}
add_action( 'wp_ajax_dr_cabello_contact', 'dr_cabello_handle_contact_form' );
add_action( 'wp_ajax_nopriv_dr_cabello_contact', 'dr_cabello_handle_contact_form' );

/**
 * Función auxiliar para obtener la URL correcta de assets
 */
function dr_cabello_asset_url( $path ) {
    return DR_CABELLO_THEME_URI . '/' . ltrim( $path, '/' );
}

/**
 * Deshabilitar el editor de bloques en la página de inicio (si usas ACF)
 */
function dr_cabello_disable_editor_fullwidth_page( $use_block_editor, $post ) {
    if ( isset( $post->ID ) && get_option( 'page_on_front' ) == $post->ID ) {
        return false;
    }
    return $use_block_editor;
}
add_filter( 'use_block_editor_for_post', 'dr_cabello_disable_editor_fullwidth_page', 10, 2 );

/**
 * Menú por defecto para navegación principal si no hay menú asignado
 */
function dr_cabello_default_menu() {
    ?>
    <ul id="navMenu" class="nav__list">
        <li class="nav__item">
            <a href="#inicio" class="nav__link" data-section="inicio">
                <span>Inicio</span>
            </a>
        </li>
        <li class="nav__item">
            <a href="#videos" class="nav__link" data-section="videos">
                <span>Transplante Capilar</span>
            </a>
        </li>
        <li class="nav__item">
            <a href="#resultados" class="nav__link" data-section="resultados">
                <span>Resultados</span>
            </a>
        </li>
        <li class="nav__item">
            <a href="#equipo" class="nav__link" data-section="equipo">
                <span>Nosotros</span>
            </a>
        </li>
        <li class="nav__item">
            <a href="#medicamentos" class="nav__link" data-section="medicamentos">
                <span>Medicamentos</span>
            </a>
        </li>
        <li class="nav__item nav__item--cta">
            <a href="#contacto" class="nav__cta" data-section="contacto">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                Cotización
            </a>
        </li>
    </ul>
    <?php
}

/**
 * Menú por defecto para footer
 */
function dr_cabello_footer_menu_fallback() {
    ?>
    <ul class="footer-list">
        <li><a href="#resultados">Casos de Éxito</a></li>
        <li><a href="#testimonios">Testimonios</a></li>
        <li><a href="#equipo">Nuestro Equipo</a></li>
        <li><a href="#contacto">Agenda tu Cita</a></li>
        <li><a href="#faq">Preguntas Frecuentes</a></li>
    </ul>
    <?php
}

/**
 * Menú por defecto para legal
 */
function dr_cabello_legal_menu_fallback() {
    ?>
    <a href="#">Política de Privacidad</a>
    <a href="#">Términos y Condiciones</a>
    <a href="#">Aviso Legal</a>
    <?php
}

/**
 * ========================================
 * CONFIGURACIÓN ADVANCED CUSTOM FIELDS
 * Compatible con ACF FREE (sin necesidad de PRO)
 * ========================================
 */

/**
 * Crear página de opciones de ACF (solo si tienes ACF PRO)
 * Si usas ACF FREE, los campos aparecerán en la página de Inicio
 */
if( function_exists('acf_add_options_page') ) {
    // ACF PRO detectado - Crear páginas de opciones
    acf_add_options_page(array(
        'page_title'    => 'Opciones del Tema',
        'menu_title'    => 'Opciones del Tema',
        'menu_slug'     => 'theme-general-settings',
        'capability'    => 'edit_posts',
        'redirect'      => false,
        'icon_url'      => 'dashicons-admin-customizer',
        'position'      => 2
    ));
    
    acf_add_options_sub_page(array(
        'page_title'    => 'Información de Contacto',
        'menu_title'    => 'Contacto',
        'parent_slug'   => 'theme-general-settings',
    ));
    
    acf_add_options_sub_page(array(
        'page_title'    => 'Redes Sociales',
        'menu_title'    => 'Redes Sociales',
        'parent_slug'   => 'theme-general-settings',
    ));
    
    acf_add_options_sub_page(array(
        'page_title'    => 'Información de la Clínica',
        'menu_title'    => 'Clínica',
        'parent_slug'   => 'theme-general-settings',
    ));
}

/**
 * Función auxiliar para obtener campos ACF
 * Funciona con ACF FREE (desde página) y ACF PRO (desde opciones)
 */
function dr_cabello_get_option($field_name, $default = '') {
    // Si existe la función get_field de ACF
    if (function_exists('get_field')) {
        // Primero intentar desde opciones (ACF PRO)
        $value = get_field($field_name, 'option');
        
        // Si no existe en opciones, buscar en la página de inicio (ACF FREE)
        if (!$value) {
            $front_page_id = get_option('page_on_front');
            if ($front_page_id) {
                $value = get_field($field_name, $front_page_id);
            }
        }
        
        // Si aún no hay valor, usar el default
        return $value ?: $default;
    }
    
    return $default;
}

/**
 * Registrar grupos de campos ACF programáticamente
 * Compatible con ACF FREE y PRO
 */
if( function_exists('acf_add_local_field_group') ) {
    
    // ========================================
    // GRUPO 1: INFORMACIÓN DE CONTACTO
    // ========================================
    acf_add_local_field_group(array(
        'key' => 'group_contact_info',
        'title' => 'Información de Contacto',
        'fields' => array(
            // WhatsApp
            array(
                'key' => 'field_whatsapp_number',
                'label' => 'Número de WhatsApp',
                'name' => 'whatsapp_number',
                'type' => 'text',
                'instructions' => 'Formato: +51999999999',
                'required' => 0,
                'default_value' => '+51999999999',
                'placeholder' => '+51999999999',
            ),
            array(
                'key' => 'field_whatsapp_message',
                'label' => 'Mensaje por defecto de WhatsApp',
                'name' => 'whatsapp_message',
                'type' => 'text',
                'default_value' => 'Hola, me gustaría agendar una consulta',
                'placeholder' => 'Mensaje que aparecerá al abrir WhatsApp',
            ),
            // Teléfono
            array(
                'key' => 'field_phone_number',
                'label' => 'Teléfono de Contacto',
                'name' => 'phone_number',
                'type' => 'text',
                'instructions' => 'Formato visible: +51 999 999 999',
                'default_value' => '+51 999 999 999',
            ),
            // Email
            array(
                'key' => 'field_contact_email',
                'label' => 'Email de Contacto',
                'name' => 'contact_email',
                'type' => 'email',
                'default_value' => 'contacto@ejemplo.com',
            ),
        ),
        'location' => array(
            array(
                array(
                    'param' => 'page_type',
                    'operator' => '==',
                    'value' => 'front_page',
                ),
            ),
            array(
                array(
                    'param' => 'options_page',
                    'operator' => '==',
                    'value' => 'theme-general-settings',
                ),
            ),
        ),
    ));
    
    // ========================================
    // GRUPO 2: REDES SOCIALES
    // ========================================
    acf_add_local_field_group(array(
        'key' => 'group_social_media',
        'title' => 'Redes Sociales',
        'fields' => array(
            array(
                'key' => 'field_facebook_url',
                'label' => 'Facebook URL',
                'name' => 'facebook_url',
                'type' => 'url',
                'placeholder' => 'https://facebook.com/tu-pagina',
            ),
            array(
                'key' => 'field_instagram_url',
                'label' => 'Instagram URL',
                'name' => 'instagram_url',
                'type' => 'url',
                'placeholder' => 'https://instagram.com/tu-perfil',
            ),
            array(
                'key' => 'field_youtube_url',
                'label' => 'YouTube URL',
                'name' => 'youtube_url',
                'type' => 'url',
                'placeholder' => 'https://youtube.com/@tu-canal',
            ),
            array(
                'key' => 'field_whatsapp_url',
                'label' => 'WhatsApp URL',
                'name' => 'whatsapp_url',
                'type' => 'url',
                'placeholder' => 'https://wa.me/51999999999',
            ),
        ),
        'location' => array(
            array(
                array(
                    'param' => 'page_type',
                    'operator' => '==',
                    'value' => 'front_page',
                ),
            ),
            array(
                array(
                    'param' => 'options_page',
                    'operator' => '==',
                    'value' => 'theme-general-settings',
                ),
            ),
        ),
    ));
    
    // ========================================
    // GRUPO 3: INFORMACIÓN DE LA CLÍNICA
    // ========================================
    acf_add_local_field_group(array(
        'key' => 'group_clinic_info',
        'title' => 'Información de la Clínica',
        'fields' => array(
            array(
                'key' => 'field_clinic_address',
                'label' => 'Dirección',
                'name' => 'clinic_address',
                'type' => 'text',
                'default_value' => 'Av. Faustino Sánchez Carrión 615, Jesús María 15076, Perú',
            ),
            array(
                'key' => 'field_clinic_schedule',
                'label' => 'Horario de Atención',
                'name' => 'clinic_schedule',
                'type' => 'textarea',
                'default_value' => 'Lunes a Viernes: 9:00 AM - 8:00 PM\nSábados: 9:00 AM - 2:00 PM',
                'rows' => 3,
            ),
            array(
                'key' => 'field_years_experience',
                'label' => 'Años de Experiencia',
                'name' => 'years_experience',
                'type' => 'number',
                'default_value' => 15,
            ),
            array(
                'key' => 'field_footer_description',
                'label' => 'Descripción para el Footer',
                'name' => 'footer_description',
                'type' => 'textarea',
                'default_value' => 'Centro médico especializado en tratamientos capilares con más de 15 años de experiencia.',
                'rows' => 4,
            ),
        ),
        'location' => array(
            array(
                array(
                    'param' => 'page_type',
                    'operator' => '==',
                    'value' => 'front_page',
                ),
            ),
            array(
                array(
                    'param' => 'options_page',
                    'operator' => '==',
                    'value' => 'theme-general-settings',
                ),
            ),
        ),
    ));
    
    // ========================================
    // GRUPO 4: VIDEOS DEL CARRUSEL
    // ========================================
    acf_add_local_field_group(array(
        'key' => 'group_video_carousel',
        'title' => 'Videos - Sección Transplante Capilar',
        'fields' => array(
            array(
                'key' => 'field_video_section_title',
                'label' => 'Título de la Sección',
                'name' => 'video_section_title',
                'type' => 'text',
                'default_value' => '¿Cómo es un trasplante capilar?',
            ),
            array(
                'key' => 'field_video_section_subtitle',
                'label' => 'Subtítulo de la Sección',
                'name' => 'video_section_subtitle',
                'type' => 'textarea',
                'default_value' => 'Conoce de primera mano los procedimientos, testimonios y resultados que respaldan nuestra experiencia de más de 12 años transformando vidas.',
                'rows' => 3,
            ),
            array(
                'key' => 'field_videos',
                'label' => 'Videos del Carrusel',
                'name' => 'videos',
                'type' => 'repeater',
                'layout' => 'block',
                'button_label' => 'Agregar Video',
                'min' => 1,
                'max' => 10,
                'sub_fields' => array(
                    array(
                        'key' => 'field_video_title',
                        'label' => 'Título del Video',
                        'name' => 'title',
                        'type' => 'text',
                        'required' => 1,
                        'placeholder' => 'Ej: Técnica DHI - Implante Capilar Directo',
                    ),
                    array(
                        'key' => 'field_video_description',
                        'label' => 'Descripción',
                        'name' => 'description',
                        'type' => 'textarea',
                        'rows' => 3,
                        'placeholder' => 'Breve descripción del contenido del video',
                    ),
                    array(
                        'key' => 'field_video_category',
                        'label' => 'Categoría',
                        'name' => 'category',
                        'type' => 'select',
                        'choices' => array(
                            'Procedimientos' => 'Procedimientos',
                            'Testimonios' => 'Testimonios',
                            'Tratamientos' => 'Tratamientos',
                            'Educativo' => 'Educativo',
                            'Centro Médico' => 'Centro Médico',
                        ),
                        'default_value' => 'Procedimientos',
                    ),
                    array(
                        'key' => 'field_video_duration',
                        'label' => 'Duración (formato: 3:25)',
                        'name' => 'duration',
                        'type' => 'text',
                        'placeholder' => '3:25',
                    ),
                    array(
                        'key' => 'field_video_thumbnail',
                        'label' => 'Imagen de Portada (Thumbnail)',
                        'name' => 'thumbnail',
                        'type' => 'image',
                        'return_format' => 'url',
                        'preview_size' => 'medium',
                        'instructions' => 'Imagen que se mostrará antes de reproducir el video',
                    ),
                    array(
                        'key' => 'field_video_type',
                        'label' => 'Tipo de Video',
                        'name' => 'type',
                        'type' => 'select',
                        'choices' => array(
                            'youtube' => 'YouTube',
                            'local' => 'Video Local (subido a WordPress)',
                        ),
                        'default_value' => 'youtube',
                    ),
                    array(
                        'key' => 'field_video_url_youtube',
                        'label' => 'URL de YouTube',
                        'name' => 'video_url_youtube',
                        'type' => 'url',
                        'placeholder' => 'https://www.youtube.com/watch?v=...',
                        'conditional_logic' => array(
                            array(
                                array(
                                    'field' => 'field_video_type',
                                    'operator' => '==',
                                    'value' => 'youtube',
                                ),
                            ),
                        ),
                    ),
                    array(
                        'key' => 'field_video_file_local',
                        'label' => 'Archivo de Video Local',
                        'name' => 'video_file_local',
                        'type' => 'file',
                        'return_format' => 'url',
                        'mime_types' => 'mp4,webm,mov',
                        'instructions' => 'Sube un archivo de video (MP4, WebM o MOV)',
                        'conditional_logic' => array(
                            array(
                                array(
                                    'field' => 'field_video_type',
                                    'operator' => '==',
                                    'value' => 'local',
                                ),
                            ),
                        ),
                    ),
                    array(
                        'key' => 'field_video_features',
                        'label' => 'Características del Video (máximo 4)',
                        'name' => 'features',
                        'type' => 'repeater',
                        'layout' => 'table',
                        'button_label' => 'Agregar Característica',
                        'min' => 0,
                        'max' => 4,
                        'sub_fields' => array(
                            array(
                                'key' => 'field_feature_text',
                                'label' => 'Texto',
                                'name' => 'text',
                                'type' => 'text',
                                'placeholder' => 'Ej: Sin cicatrices visibles',
                            ),
                        ),
                    ),
                ),
            ),
        ),
        'location' => array(
            array(
                array(
                    'param' => 'page_type',
                    'operator' => '==',
                    'value' => 'front_page',
                ),
            ),
            array(
                array(
                    'param' => 'options_page',
                    'operator' => '==',
                    'value' => 'theme-general-settings',
                ),
            ),
        ),
    ));
}
