/**
 * WordPress Menu Enhancement
 * Agrega clases y atributos necesarios para que el menú de WordPress
 * funcione igual que el menú del diseño original
 */

document.addEventListener('DOMContentLoaded', function() {
    // Obtener todos los enlaces del menú
    const menuItems = document.querySelectorAll('.nav__list .menu-item > a');
    
    menuItems.forEach(link => {
        // Agregar clase nav__link para compatibilidad con JavaScript existente
        link.classList.add('nav__link');
        
        // Si el enlace es un ancla (#), agregar atributo data-section
        const href = link.getAttribute('href');
        if (href && href.includes('#')) {
            const section = href.split('#')[1];
            if (section) {
                link.setAttribute('data-section', section);
            }
        }
    });
    
    // Detectar sección activa al hacer scroll (si existe el script nav_header.js)
    if (typeof window.updateActiveNavLink === 'function') {
        // La función ya existe en nav_header.js
        console.log('WordPress menu enhancement: nav_header.js detectado');
    } else {
        // Implementación simplificada si no existe
        const sections = document.querySelectorAll('section[id]');
        
        function setActiveLink() {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            
            menuItems.forEach(link => {
                link.classList.remove('active');
                const section = link.getAttribute('data-section');
                if (section === current) {
                    link.classList.add('active');
                    // También agregar clase al parent li
                    link.parentElement.classList.add('current-menu-item');
                } else {
                    link.parentElement.classList.remove('current-menu-item');
                }
            });
        }
        
        window.addEventListener('scroll', setActiveLink);
        setActiveLink(); // Ejecutar al cargar
    }
    
    console.log('WordPress menu enhancement: Inicializado correctamente');
});
