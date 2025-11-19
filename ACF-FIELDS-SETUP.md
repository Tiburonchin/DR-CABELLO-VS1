# 🎨 Configuración de Campos ACF - Dr. Cabello Theme

Esta guía detalla cómo configurar todos los campos de Advanced Custom Fields para hacer el contenido editable.

## 📋 Índice

1. [Opciones Globales](#1-opciones-globales)
2. [Sección Hero Medical](#2-sección-hero-medical)
3. [Sección Videos](#3-sección-videos)
4. [Sección Galería de Resultados](#4-sección-galería-de-resultados)
5. [Sección Equipo Médico](#5-sección-equipo-médico)
6. [Sección Testimonios](#6-sección-testimonios)
7. [Tips y Recomendaciones](#tips-y-recomendaciones)

---

## 1. Opciones Globales

**Ubicación**: ACF > Grupos de Campos > Añadir Nuevo

### Grupo: "Opciones del Tema"

**Configuración**:
- **Nombre**: Opciones del Tema
- **Ubicación**: Página de opciones es igual a "Opciones del Tema"
- (Primero debes crear la página de opciones: ACF > Opciones)

#### Pestaña: Información de Contacto

| Campo | Tipo | Nombre | Instrucciones | Valor por defecto |
|-------|------|--------|---------------|-------------------|
| Número de WhatsApp | Texto | `whatsapp_number` | Incluir código de país (ej: +51999999999) | +51999999999 |
| Teléfono | Texto | `phone_number` | Formato: +51 999 999 999 | +51 999 999 999 |
| Email de Contacto | Email | `contact_email` | Email principal de la clínica | - |
| Mensaje de WhatsApp | Texto | `whatsapp_message` | Mensaje predeterminado para WhatsApp | Hola, quiero agendar una consulta |

#### Pestaña: Datos de la Clínica

| Campo | Tipo | Nombre | Instrucciones |
|-------|------|--------|---------------|
| Dirección | Texto | `clinic_address` | Dirección completa de la clínica |
| Horario de Atención | Texto | `clinic_schedule` | Ej: Lun - Sáb: 9:00 - 18:00 |
| Años de Experiencia | Número | `years_experience` | Solo el número (ej: 5) |
| Descripción Footer | Área de Texto | `footer_description` | Texto que aparece en el footer |

#### Pestaña: Redes Sociales

| Campo | Tipo | Nombre | Instrucciones |
|-------|------|--------|---------------|
| Facebook | URL | `facebook_url` | URL completa (https://facebook.com/...) |
| Instagram | URL | `instagram_url` | URL completa |
| YouTube | URL | `youtube_url` | URL completa |
| TikTok | URL | `tiktok_url` | URL completa |

---

## 2. Sección Hero Medical

**Ubicación**: ACF > Grupos de Campos > Añadir Nuevo

### Grupo: "Hero - Página de Inicio"

**Configuración**:
- **Nombre**: Hero - Página de Inicio
- **Ubicación**: Página es igual a "Inicio" (o Tipo de página es igual a "Página Frontal")

#### Campos:

| Campo | Tipo | Nombre | Configuración |
|-------|------|--------|---------------|
| Título Principal | Texto | `hero_titulo` | Valor predeterminado: "Recupera Tu Cabello con Confianza" |
| Subtítulo | Área de Texto | `hero_subtitulo` | Máximo 200 caracteres |
| Imagen de Fondo | Imagen | `hero_imagen_fondo` | Retornar: URL de la imagen<br>Tamaño mínimo: 1920x1080px |
| Video de Fondo (Opcional) | Archivo | `hero_video_fondo` | Tipos permitidos: mp4, webm |
| Texto del Botón Principal | Texto | `hero_boton_texto` | Valor predeterminado: "Agenda tu Consulta" |
| URL del Botón | Texto | `hero_boton_url` | Ej: #contacto |

#### Grupo Repetidor: Beneficios (Requiere ACF PRO)

| Sub-campo | Tipo | Nombre |
|-----------|------|--------|
| Ícono SVG | Área de Texto | `beneficio_icono` |
| Título | Texto | `beneficio_titulo` |
| Descripción | Texto | `beneficio_descripcion` |

**Uso en template**:
```php
<?php if( have_rows('hero_beneficios') ): ?>
    <div class="hero-benefits">
        <?php while( have_rows('hero_beneficios') ): the_row(); ?>
            <div class="benefit-item">
                <?php the_sub_field('beneficio_icono'); ?>
                <h3><?php the_sub_field('beneficio_titulo'); ?></h3>
                <p><?php the_sub_field('beneficio_descripcion'); ?></p>
            </div>
        <?php endwhile; ?>
    </div>
<?php endif; ?>
```

---

## 3. Sección Videos

### Grupo: "Videos Testimoniales"

**Configuración**:
- **Nombre**: Videos Testimoniales
- **Ubicación**: Página es igual a "Inicio"

#### Campos:

| Campo | Tipo | Nombre |
|-------|------|--------|
| Título de la Sección | Texto | `videos_titulo` |
| Subtítulo | Área de Texto | `videos_subtitulo` |

#### Grupo Repetidor: Videos

| Sub-campo | Tipo | Nombre | Configuración |
|-----------|------|--------|---------------|
| Miniatura del Video | Imagen | `video_thumbnail` | Tamaño: 800x600px |
| URL del Video | URL | `video_url` | YouTube o Vimeo |
| ID del Video | Texto | `video_id` | Solo el ID (ej: dQw4w9WgXcQ) |
| Título del Video | Texto | `video_titulo` | - |
| Descripción Corta | Texto | `video_descripcion` | Máximo 100 caracteres |

**Uso en template**:
```php
<?php if( have_rows('videos_lista') ): ?>
    <div class="video-carousel">
        <?php while( have_rows('videos_lista') ): the_row(); 
            $thumbnail = get_sub_field('video_thumbnail');
            $video_id = get_sub_field('video_id');
        ?>
            <div class="video-item" data-video-id="<?php echo esc_attr($video_id); ?>">
                <img src="<?php echo esc_url($thumbnail['url']); ?>" alt="<?php the_sub_field('video_titulo'); ?>">
                <h4><?php the_sub_field('video_titulo'); ?></h4>
            </div>
        <?php endwhile; ?>
    </div>
<?php endif; ?>
```

---

## 4. Sección Galería de Resultados

### Grupo: "Galería Antes/Después"

**Configuración**:
- **Nombre**: Galería Antes/Después
- **Ubicación**: Página es igual a "Inicio"

#### Campos:

| Campo | Tipo | Nombre |
|-------|------|--------|
| Título de la Sección | Texto | `galeria_titulo` |
| Subtítulo | Área de Texto | `galeria_subtitulo` |

#### Grupo Repetidor: Casos

| Sub-campo | Tipo | Nombre | Configuración |
|-----------|------|--------|---------------|
| Imagen "Antes" | Imagen | `caso_imagen_antes` | Tamaño recomendado: 800x600px |
| Imagen "Después" | Imagen | `caso_imagen_despues` | Mismo tamaño que "Antes" |
| Nombre del Paciente | Texto | `caso_paciente_nombre` | Opcional, puede ser anónimo |
| Edad | Número | `caso_paciente_edad` | - |
| Tipo de Tratamiento | Texto | `caso_tratamiento` | Ej: FUE, DHI, PRP |
| Número de Folículos | Número | `caso_foliculos` | - |
| Descripción | Área de Texto | `caso_descripcion` | Breve descripción del caso |

**Uso en template con sistema de comparación**:
```php
<?php if( have_rows('galeria_casos') ): ?>
    <div class="gallery-carousel">
        <?php while( have_rows('galeria_casos') ): the_row(); 
            $img_antes = get_sub_field('caso_imagen_antes');
            $img_despues = get_sub_field('caso_imagen_despues');
        ?>
            <div class="comparison-item" data-compare>
                <div class="comparison-images">
                    <img src="<?php echo esc_url($img_antes['url']); ?>" alt="Antes" class="image-before">
                    <img src="<?php echo esc_url($img_despues['url']); ?>" alt="Después" class="image-after">
                </div>
                <div class="case-info">
                    <h4><?php the_sub_field('caso_tratamiento'); ?></h4>
                    <p><?php the_sub_field('caso_foliculos'); ?> folículos</p>
                </div>
            </div>
        <?php endwhile; ?>
    </div>
<?php endif; ?>
```

---

## 5. Sección Equipo Médico

### Grupo: "Equipo de Doctores"

**Configuración**:
- **Nombre**: Equipo de Doctores
- **Ubicación**: Página es igual a "Inicio"

#### Grupo Repetidor: Doctores

| Sub-campo | Tipo | Nombre | Configuración |
|-----------|------|--------|---------------|
| Foto del Doctor | Imagen | `doctor_foto` | Tamaño: 600x600px, formato cuadrado |
| Nombre Completo | Texto | `doctor_nombre` | - |
| Especialidad | Texto | `doctor_especialidad` | Ej: Cirujano Capilar |
| Título/Grado | Texto | `doctor_titulo` | Ej: MD, PhD |
| Biografía Corta | Área de Texto | `doctor_bio` | 2-3 párrafos |
| Años de Experiencia | Número | `doctor_experiencia` | - |
| Certificaciones | Repetidor | `doctor_certificaciones` | Lista de certificaciones |
| Redes Sociales | Grupo | - | - |

#### Sub-campos de Certificaciones:

| Sub-campo | Tipo | Nombre |
|-----------|------|--------|
| Nombre de la Certificación | Texto | `cert_nombre` |
| Institución | Texto | `cert_institucion` |
| Año | Número | `cert_año` |

#### Sub-campos de Redes Sociales:

| Sub-campo | Tipo | Nombre |
|-----------|------|--------|
| LinkedIn | URL | `doctor_linkedin` |
| Instagram | URL | `doctor_instagram` |
| Facebook | URL | `doctor_facebook` |

**Uso en template**:
```php
<?php if( have_rows('equipo_doctores') ): ?>
    <div class="doctors-grid">
        <?php while( have_rows('equipo_doctores') ): the_row(); 
            $foto = get_sub_field('doctor_foto');
        ?>
            <div class="doctor-card">
                <img src="<?php echo esc_url($foto['url']); ?>" alt="<?php the_sub_field('doctor_nombre'); ?>">
                <h3><?php the_sub_field('doctor_nombre'); ?></h3>
                <p class="specialty"><?php the_sub_field('doctor_especialidad'); ?></p>
                <div class="bio"><?php the_sub_field('doctor_bio'); ?></div>
                
                <?php if( have_rows('doctor_certificaciones') ): ?>
                    <ul class="certifications">
                        <?php while( have_rows('doctor_certificaciones') ): the_row(); ?>
                            <li><?php the_sub_field('cert_nombre'); ?> - <?php the_sub_field('cert_institucion'); ?></li>
                        <?php endwhile; ?>
                    </ul>
                <?php endif; ?>
            </div>
        <?php endwhile; ?>
    </div>
<?php endif; ?>
```

---

## 6. Sección Testimonios

### Grupo: "Testimonios de Pacientes"

**Configuración**:
- **Nombre**: Testimonios de Pacientes
- **Ubicación**: Página es igual a "Inicio"

#### Campos:

| Campo | Tipo | Nombre |
|-------|------|--------|
| Título de la Sección | Texto | `testimonios_titulo` |
| Subtítulo | Área de Texto | `testimonios_subtitulo` |
| Google Reviews Widget ID | Texto | `google_reviews_id` |

#### Grupo Repetidor: Testimonios Manuales (Alternativa)

| Sub-campo | Tipo | Nombre |
|-----------|------|--------|
| Nombre del Paciente | Texto | `testimonio_nombre` |
| Foto del Paciente | Imagen | `testimonio_foto` |
| Calificación | Número | `testimonio_rating` |
| Testimonio | Área de Texto | `testimonio_texto` |
| Fecha | Fecha | `testimonio_fecha` |

**Uso en template**:
```php
<?php if( have_rows('testimonios_lista') ): ?>
    <div class="testimonials-slider">
        <?php while( have_rows('testimonios_lista') ): the_row(); 
            $foto = get_sub_field('testimonio_foto');
            $rating = get_sub_field('testimonio_rating');
        ?>
            <div class="testimonial-item">
                <div class="rating">
                    <?php for($i = 0; $i < $rating; $i++): ?>
                        <span class="star">★</span>
                    <?php endfor; ?>
                </div>
                <p class="testimonial-text"><?php the_sub_field('testimonio_texto'); ?></p>
                <div class="testimonial-author">
                    <?php if($foto): ?>
                        <img src="<?php echo esc_url($foto['url']); ?>" alt="<?php the_sub_field('testimonio_nombre'); ?>">
                    <?php endif; ?>
                    <strong><?php the_sub_field('testimonio_nombre'); ?></strong>
                </div>
            </div>
        <?php endwhile; ?>
    </div>
<?php endif; ?>
```

---

## Tips y Recomendaciones

### 1. Valores por Defecto

Siempre usa valores por defecto en tu código:

```php
<?php 
$titulo = get_field('hero_titulo') ?: 'Título por defecto';
echo esc_html($titulo);
?>
```

### 2. Validación de Campos

Antes de mostrar contenido, valida que exista:

```php
<?php if( get_field('hero_titulo') ): ?>
    <h1><?php the_field('hero_titulo'); ?></h1>
<?php endif; ?>
```

### 3. Escape de Datos

Siempre escapa el output por seguridad:

- `esc_html()` - Para texto plano
- `esc_attr()` - Para atributos HTML
- `esc_url()` - Para URLs
- `wp_kses_post()` - Para HTML permitido

```php
<a href="<?php echo esc_url( get_field('enlace') ); ?>">
    <?php echo esc_html( get_field('texto') ); ?>
</a>
```

### 4. Optimización de Imágenes

Usa tamaños de imagen específicos:

```php
<?php 
$imagen = get_field('foto');
if( $imagen ):
    echo wp_get_attachment_image( $imagen['ID'], 'dr-cabello-gallery' );
endif;
?>
```

### 5. Campos Condicionales

ACF permite mostrar campos basado en otros campos. Úsalo para simplificar la interfaz.

**Ejemplo**: Mostrar "URL Externa" solo si "Tipo de Enlace" es "Externo"

### 6. Exportar/Importar Campos

Una vez configurados, exporta tus campos:

1. Ve a ACF > Tools
2. Selecciona "Export Field Groups"
3. Genera PHP code
4. Pega el código en `functions.php`

Esto hace que los campos estén en el tema y no se pierdan al cambiar de base de datos.

### 7. Estructura Recomendada

Para proyectos grandes, crea un archivo separado:

```
wp-content/themes/dr-cabello-theme/
├── inc/
│   └── acf-fields.php
```

En `functions.php`:
```php
require_once get_template_directory() . '/inc/acf-fields.php';
```

---

## Recursos Adicionales

- [Documentación Oficial ACF](https://www.advancedcustomfields.com/resources/)
- [ACF Repeater Field](https://www.advancedcustomfields.com/resources/repeater/)
- [ACF Options Page](https://www.advancedcustomfields.com/resources/options-page/)
- [ACF Gallery Field](https://www.advancedcustomfields.com/resources/gallery/)

---

**Versión**: 1.0.0  
**Última actualización**: Noviembre 2025
