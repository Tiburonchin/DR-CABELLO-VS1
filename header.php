<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <?php 
    // WordPress generará el <title> automáticamente con add_theme_support('title-tag')
    ?>
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="<?php echo esc_url( dr_cabello_asset_url( 'assets/img/logo_B.webp' ) ); ?>">

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="preconnect" href="https://maps.googleapis.com" />
    <link rel="preconnect" href="https://www.google.com" />
    
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

    <!-- Header moderno y funcional -->
    <header class="site-header" id="siteHeader">
        <!-- Barra superior con información de contacto -->
        <div class="header__topbar" id="headerTopbar">
            <div class="container">
                <div class="topbar__content">
                    <!-- Slogan/Descripción -->
                    <div class="topbar__description">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                        </svg>
                        <span><?php echo esc_html( get_bloginfo( 'description' ) ?: 'Centro Médico Especializado en Transplante Capilar' ); ?></span>
                    </div>
                    
                    <!-- Información de contacto -->
                    <div class="topbar__contact">
                        <?php 
                        // Obtener datos de contacto de ACF o usar valores por defecto
                        $whatsapp_number = get_field( 'whatsapp_number', 'option' ) ?: '+51999999999';
                        $phone_number = get_field( 'phone_number', 'option' ) ?: '+51 999 999 999';
                        $email = get_field( 'contact_email', 'option' ) ?: get_option( 'admin_email' );
                        $whatsapp_message = get_field( 'whatsapp_message', 'option' ) ?: 'Hola, quiero agendar una consulta';
                        ?>
                        
                        <a href="https://wa.me/<?php echo esc_attr( str_replace( array( '+', ' ' ), '', $whatsapp_number ) ); ?>?text=<?php echo rawurlencode( $whatsapp_message ); ?>" 
                           class="contact-item contact-item--whatsapp" 
                           target="_blank" 
                           rel="noopener noreferrer">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                            </svg>
                            <span>WhatsApp</span>
                        </a>
                        <a href="tel:<?php echo esc_attr( str_replace( ' ', '', $phone_number ) ); ?>" class="contact-item">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                            </svg>
                            <span><?php echo esc_html( $phone_number ); ?></span>
                        </a>
                        <a href="mailto:<?php echo esc_attr( $email ); ?>" class="contact-item">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="3" y="5" width="18" height="14" rx="2"/>
                                <path d="M4 7l8 6 8-6"/>
                            </svg>
                            <span><?php echo esc_html( $email ); ?></span>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <!-- Barra principal de navegación -->
        <div class="header__main">
            <div class="container">
                <div class="header__content">
                    <!-- Logo -->
                    <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="header__logo" aria-label="<?php bloginfo( 'name' ); ?> - Inicio">
                        <?php 
                        if ( has_custom_logo() ) {
                            the_custom_logo();
                        } else {
                            ?>
                            <img src="<?php echo esc_url( dr_cabello_asset_url( 'assets/img/logoA.webp' ) ); ?>" 
                                 alt="<?php bloginfo( 'name' ); ?>" 
                                 class="logo__image" />
                            <?php
                        }
                        ?>
                    </a>

                    <!-- Navegación principal -->
                    <nav class="header__nav" aria-label="Navegación principal">
                        <?php
                        wp_nav_menu( array(
                            'theme_location'  => 'primary',
                            'menu_id'         => 'navMenu',
                            'menu_class'      => 'nav__list',
                            'container'       => false,
                            'fallback_cb'     => 'dr_cabello_default_menu',
                            'items_wrap'      => '<ul id="%1$s" class="%2$s">%3$s</ul>',
                        ) );
                        ?>
                        
                        <!-- Información adicional para móvil -->
                        <div class="nav__mobile-info">
                            <div class="mobile-info__item">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                                </svg>
                                <div class="mobile-info__content">
                                    <span class="mobile-info__label">Teléfono</span>
                                    <a href="tel:<?php echo esc_attr( str_replace( ' ', '', $phone_number ) ); ?>" class="mobile-info__value"><?php echo esc_html( $phone_number ); ?></a>
                                </div>
                            </div>
                            <div class="mobile-info__item">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="3" y="5" width="18" height="14" rx="2"/>
                                    <path d="M4 7l8 6 8-6"/>
                                </svg>
                                <div class="mobile-info__content">
                                    <span class="mobile-info__label">Email</span>
                                    <a href="mailto:<?php echo esc_attr( $email ); ?>" class="mobile-info__value"><?php echo esc_html( $email ); ?></a>
                                </div>
                            </div>
                            <a href="https://wa.me/<?php echo esc_attr( str_replace( array( '+', ' ' ), '', $whatsapp_number ) ); ?>?text=<?php echo rawurlencode( $whatsapp_message ); ?>" 
                               class="mobile-info__whatsapp" 
                               target="_blank" 
                               rel="noopener noreferrer">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                </svg>
                                <span>Chatea con nosotros por WhatsApp</span>
                            </a>
                        </div>
                    </nav>

                    <!-- Botón de menú móvil -->
                    <button class="header__toggle" id="menuToggle" aria-expanded="false" aria-controls="navMenu" aria-label="Menú de navegación">
                        <span class="toggle__bar"></span>
                        <span class="toggle__bar"></span>
                        <span class="toggle__bar"></span>
                    </button>
                </div>
            </div>
        </div>
    </header>
