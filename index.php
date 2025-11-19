<?php
/**
 * The main template file
 * 
 * Este es el archivo de plantilla principal que se usa cuando ninguna otra plantilla
 * más específica coincide con la consulta.
 * 
 * @package Dr_Cabello
 * @since 1.0.0
 */

get_header(); ?>

<main id="main-content" class="site-main">
    <?php
    if ( have_posts() ) :
        while ( have_posts() ) :
            the_post();
            the_content();
        endwhile;
    else :
        echo '<p>No se encontró contenido.</p>';
    endif;
    ?>
</main>

<?php get_footer(); ?>
