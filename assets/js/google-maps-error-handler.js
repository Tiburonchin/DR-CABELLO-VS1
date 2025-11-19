/**
 * Google Maps Error Handler
 * Suprime errores ERR_BLOCKED_BY_CLIENT relacionados con Google Maps
 * que son causados por bloqueadores de anuncios y no afectan la funcionalidad
 */

(function() {
    'use strict';

    // Interceptar errores de recursos bloqueados relacionados con Google Maps
    window.addEventListener('error', function(event) {
        // Verificar si el error es de Google Maps y es del tipo bloqueado por cliente
        if (event.target && event.target.tagName === 'IFRAME') {
            const src = event.target.src || '';
            if (src.includes('google.com/maps') || src.includes('maps.googleapis.com')) {
                // Este error es común con bloqueadores de anuncios y no afecta la funcionalidad
                event.preventDefault();
                return false;
            }
        }
    }, true);

    // Interceptar errores de red relacionados con gen_204 (solicitud de prueba de Google Maps)
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
        const url = args[0];
        if (typeof url === 'string' && url.includes('maps.googleapis.com/maps/api/mapsjs/gen_204')) {
            // Suprimir silenciosamente las solicitudes gen_204 bloqueadas
            return Promise.reject(new Error('Blocked by client (ad blocker) - non-critical'));
        }
        return originalFetch.apply(this, args).catch(function(error) {
            // Suprimir errores de red relacionados con Google Maps gen_204
            if (typeof args[0] === 'string' && args[0].includes('maps.googleapis.com') && args[0].includes('gen_204')) {
                return Promise.reject(new Error('Blocked by client (ad blocker) - non-critical'));
            }
            throw error;
        });
    };

    // Interceptar errores de XMLHttpRequest relacionados con Google Maps
    const originalXHROpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url, ...rest) {
        if (typeof url === 'string' && url.includes('maps.googleapis.com/maps/api/mapsjs/gen_204')) {
            // Suprimir silenciosamente las solicitudes gen_204
            this._suppressError = true;
        }
        return originalXHROpen.call(this, method, url, ...rest);
    };

    const originalXHRSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function(...args) {
        if (this._suppressError) {
            this.addEventListener('error', function(e) {
                e.stopPropagation();
            }, true);
            this.addEventListener('abort', function(e) {
                e.stopPropagation();
            }, true);
        }
        return originalXHRSend.apply(this, args);
    };

    // Suprimir errores en la consola relacionados con gen_204
    const originalConsoleError = console.error;
    console.error = function(...args) {
        const message = args.join(' ');
        // No mostrar errores relacionados con gen_204 de Google Maps
        if (message.includes('gen_204') || 
            (message.includes('maps.googleapis.com') && message.includes('ERR_BLOCKED_BY_CLIENT'))) {
            return; // Suprimir el error
        }
        originalConsoleError.apply(console, args);
    };
})();

