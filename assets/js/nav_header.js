/*
========================================
  MODERN HEADER & NAVIGATION
========================================
*/

// Mobile menu toggle - MEJORADO
(function() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const headerNav = document.querySelector('.header__nav');
    const body = document.body;
    
    if (!menuToggle || !navMenu || !headerNav) {
        console.error('❌ Elementos del menú no encontrados:', {
            menuToggle: !!menuToggle,
            navMenu: !!navMenu,
            headerNav: !!headerNav
        });
        return;
    }
    
    console.log('✅ Menú móvil inicializado correctamente');
    
    // Toggle del menú
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = headerNav.classList.toggle('is-open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        menuToggle.classList.toggle('is-active', isOpen);
        body.classList.toggle('menu-open', isOpen);
        
        console.log('🔄 Menú toggle:', isOpen ? 'ABIERTO' : 'CERRADO');
    });
    
    // Cerrar menú al hacer click en el overlay
    document.addEventListener('click', (e) => {
        if (body.classList.contains('menu-open')) {
            if (!headerNav.contains(e.target) && !menuToggle.contains(e.target)) {
                closeMenu();
            }
        }
    });
    
    // Cerrar menú al hacer click en un enlace con efecto visual
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Efecto visual al hacer click
            link.style.transform = 'scale(0.95)';
            setTimeout(() => {
                link.style.transform = '';
                closeMenu();
            }, 150);
        });
    });
    
    // Cerrar menú con tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && body.classList.contains('menu-open')) {
            closeMenu();
        }
    });
    
    // Cerrar menú al cambiar orientación
    window.addEventListener('orientationchange', () => {
        if (body.classList.contains('menu-open')) {
            closeMenu();
        }
    });
    
    // Cerrar menú si se redimensiona a desktop
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768 && body.classList.contains('menu-open')) {
                closeMenu();
            }
        }, 250);
    });
    
    function closeMenu() {
        headerNav.classList.remove('is-open');
        menuToggle.classList.remove('is-active');
        menuToggle.setAttribute('aria-expanded', 'false');
        body.classList.remove('menu-open');
    }
    
    // Prevenir scroll en menú cuando llegue al límite
    let startY = 0;
    headerNav.addEventListener('touchstart', (e) => {
        startY = e.touches[0].pageY;
    }, { passive: true });
    
    headerNav.addEventListener('touchmove', (e) => {
        const currentY = e.touches[0].pageY;
        const scrollTop = headerNav.scrollTop;
        const scrollHeight = headerNav.scrollHeight;
        const height = headerNav.clientHeight;
        
        // Prevenir bounce scroll en iOS
        if ((scrollTop <= 0 && currentY > startY) || 
            (scrollTop + height >= scrollHeight && currentY < startY)) {
            e.preventDefault();
        }
    }, { passive: false });
})();

// Header scroll behavior
(function() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    
    let lastScroll = 0;
    let ticking = false;
    const scrollThreshold = 100;
    
    const updateHeader = () => {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        if (currentScroll > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        lastScroll = currentScroll <= 0 ? 0 : currentScroll;
        ticking = false;
    };
    
    const onScroll = () => {
        if (!ticking) {
            window.requestAnimationFrame(updateHeader);
            ticking = true;
        }
    };
    
    window.addEventListener('scroll', onScroll, { passive: true });
    updateHeader();
})();

// Set header offset
(function() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    
    const setHeaderOffset = () => {
        const headerHeight = header.offsetHeight;
        document.documentElement.style.setProperty('--header-offset', headerHeight + 'px');
        document.body.style.paddingTop = headerHeight + 'px';
    };
    
    window.addEventListener('load', setHeaderOffset);
    window.addEventListener('resize', setHeaderOffset);
    const observer = new ResizeObserver(setHeaderOffset);
    observer.observe(header);
    setHeaderOffset();
})();

// Smooth scroll - MEJORADO
(function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            
            // Ignorar enlaces vacíos
            if (targetId === '#' || targetId === '#!' || !targetId) return;
            
            const targetElement = document.querySelector(targetId);
            
            if (!targetElement) {
                console.warn('Sección no encontrada:', targetId);
                return;
            }
            
            e.preventDefault();
            
            // Obtener altura del header
            const header = document.querySelector('.site-header');
            const headerOffset = header ? header.offsetHeight : 100;
            
            // Calcular posición
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            // Scroll suave
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Actualizar URL
            if (history.pushState) {
                history.pushState(null, null, targetId);
            }
            
            console.log('Navegando a:', targetId);
        });
    });
})();

// Active link highlighting - MEJORADO
(function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link, .nav__cta');
    
    if (!sections.length || !navLinks.length) return;
    
    let currentSection = '';
    
    const updateActiveLink = () => {
        const scrollPosition = window.scrollY + 200; // Aumentado el offset
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });
        
        // Actualizar clase active
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href');
            if (linkHref === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    };
    
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(updateActiveLink);
    }, { passive: true });
    
    // Ejecutar al cargar
    updateActiveLink();
})();

// Indicador de progreso de scroll - NUEVO
(function() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    
    // Crear indicador de progreso
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-indicator';
    header.appendChild(progressBar);
    
    const updateScrollProgress = () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    };
    
    let progressTimeout;
    window.addEventListener('scroll', () => {
        if (progressTimeout) {
            window.cancelAnimationFrame(progressTimeout);
        }
        progressTimeout = window.requestAnimationFrame(updateScrollProgress);
    }, { passive: true });
    
    updateScrollProgress();
})();

// Marcar header como cargado - NUEVO
(function() {
    window.addEventListener('load', () => {
        const header = document.querySelector('.site-header');
        if (header) {
            header.classList.add('loaded');
        }
    });
})();

// Lazy loading de animaciones para mejor performance
(function() {
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1
        });
        
        // Observar elementos del menú móvil
        const navItems = document.querySelectorAll('.nav__item');
        navItems.forEach(item => observer.observe(item));
    }
})();

// Debug: Mostrar todas las secciones encontradas
console.log('=== Secciones disponibles ===');
document.querySelectorAll('section[id]').forEach(section => {
    console.log('- #' + section.id);
});