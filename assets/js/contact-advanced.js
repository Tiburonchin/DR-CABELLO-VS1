/**
 * Advanced Contact Form Interactive Features
 * Provides enhanced user experience with step progression, validation, and animations
 */

document.addEventListener('DOMContentLoaded', function() {
    initAdvancedContactForm();
});

function initAdvancedContactForm() {
    const form = document.getElementById('contactFormAdvanced');
    if (!form) return;

    // Initialize form features
    initFormStepProgression();
    initFormValidation();
    initServiceSelection();
    initFormAnimations();
    initFormSubmission();
    
    console.log('Advanced contact form initialized');
}

// Step progression system
function initFormStepProgression() {
    const steps = document.querySelectorAll('.step');
    const formFields = document.querySelectorAll('.form-field-advanced');
    const serviceCards = document.querySelectorAll('.service-card');
    
    if (steps.length === 0) return;
    
    // Update step progression based on form completion
    function updateStepProgression() {
        const personalFields = ['nombre', 'email', 'telefono'];
        const serviceSelected = document.querySelector('input[name="servicio"]:checked');
        const messageField = document.getElementById('mensaje');
        
        // Step 1: Personal Info
        const personalComplete = personalFields.every(fieldId => {
            const field = document.getElementById(fieldId);
            return field && field.value.trim().length > 0;
        });
        
        // Step 2: Service Selection
        const serviceComplete = serviceSelected !== null;
        
        // Step 3: Message
        const messageComplete = messageField && messageField.value.trim().length > 0;
        
        // Update step states
        updateStepState(0, personalComplete);
        updateStepState(1, serviceComplete);
        updateStepState(2, messageComplete);
    }
    
    function updateStepState(stepIndex, isComplete) {
        const step = steps[stepIndex];
        if (!step) return;
        
        if (isComplete) {
            step.classList.add('completed');
            step.classList.add('active');
        } else {
            step.classList.remove('completed');
            // Only remove active if it's not the current step being worked on
            if (stepIndex > getCurrentActiveStep()) {
                step.classList.remove('active');
            }
        }
    }
    
    function getCurrentActiveStep() {
        const personalFields = ['nombre', 'email', 'telefono'];
        const serviceSelected = document.querySelector('input[name="servicio"]:checked');
        
        const personalComplete = personalFields.every(fieldId => {
            const field = document.getElementById(fieldId);
            return field && field.value.trim().length > 0;
        });
        
        if (!personalComplete) return 0;
        if (!serviceSelected) return 1;
        return 2;
    }
    
    // Listen to input changes
    formFields.forEach(field => {
        const input = field.querySelector('input, select, textarea');
        if (input) {
            input.addEventListener('input', updateStepProgression);
            input.addEventListener('change', updateStepProgression);
        }
    });
    
    // Listen to service selection changes
    serviceCards.forEach(card => {
        const input = card.querySelector('input[type="radio"]');
        if (input) {
            input.addEventListener('change', updateStepProgression);
        }
    });
    
    // Initial update
    updateStepProgression();
}

// Enhanced form validation
function initFormValidation() {
    const inputs = document.querySelectorAll('.form-input-advanced');
    
    inputs.forEach(input => {
        // Real-time validation
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearFieldError(input));
    });
}

function validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    const isRequired = field.hasAttribute('required');
    
    // Remove existing error states
    clearFieldError(field);
    
    // Check if required field is empty
    if (isRequired && !value) {
        showFieldError(field, 'Este campo es obligatorio');
        return false;
    }
    
    // Email validation
    if (fieldType === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Por favor ingresa un email válido');
            return false;
        }
    }
    
    // Phone validation (basic)
    if (fieldType === 'tel' && value) {
        const phoneRegex = /^[\d\s\-\+\(\)]{9,}$/;
        if (!phoneRegex.test(value)) {
            showFieldError(field, 'Por favor ingresa un teléfono válido');
            return false;
        }
    }
    
    // Name validation
    if (field.name === 'nombre' && value) {
        if (value.length < 2) {
            showFieldError(field, 'El nombre debe tener al menos 2 caracteres');
            return false;
        }
    }
    
    return true;
}

function showFieldError(field, message) {
    field.classList.add('error');
    field.style.borderColor = '#d32f2f';
    field.style.boxShadow = '0 0 0 4px rgba(211, 47, 47, 0.15)';
    
    // Create or update error message
    let errorElement = field.parentNode.querySelector('.field-error');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.style.cssText = `
            color: #d32f2f;
            font-size: 0.85rem;
            margin-top: 4px;
            opacity: 0;
            transform: translateY(-5px);
            transition: all 0.3s ease;
        `;
        field.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    setTimeout(() => {
        errorElement.style.opacity = '1';
        errorElement.style.transform = 'translateY(0)';
    }, 10);
}

function clearFieldError(field) {
    field.classList.remove('error');
    field.style.borderColor = '';
    field.style.boxShadow = '';
    
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.style.opacity = '0';
        errorElement.style.transform = 'translateY(-5px)';
        setTimeout(() => {
            if (errorElement.parentNode) {
                errorElement.parentNode.removeChild(errorElement);
            }
        }, 300);
    }
}

// Service selection enhancements
function initServiceSelection() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        const input = card.querySelector('.service-input');
        const label = card.querySelector('.service-label');
        
        if (input && label) {
            // Add click animation
            label.addEventListener('click', () => {
                label.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    label.style.transform = '';
                }, 150);
            });
            
            // Add selection sound effect (optional)
            input.addEventListener('change', () => {
                if (input.checked) {
                    // Remove selection from other cards
                    serviceCards.forEach(otherCard => {
                        if (otherCard !== card) {
                            const otherLabel = otherCard.querySelector('.service-label');
                            otherLabel.style.transform = '';
                        }
                    });
                    
                    // Animate selected card
                    label.style.transform = 'scale(1.02)';
                    setTimeout(() => {
                        label.style.transform = '';
                    }, 200);
                }
            });
        }
    });
}

// Form animations and effects
function initFormAnimations() {
    // Entrance animations for form elements
    const formElements = document.querySelectorAll('.form-field-advanced, .service-card, .checkbox-advanced');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                animationObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    formElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
        animationObserver.observe(element);
    });
    
    // Input focus animations
    const inputs = document.querySelectorAll('.form-input-advanced');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            const label = input.parentNode.querySelector('.form-label-advanced');
            if (label) {
                label.style.color = 'var(--brand-primary)';
                label.style.transform = 'translateY(-2px)';
            }
        });
        
        input.addEventListener('blur', () => {
            const label = input.parentNode.querySelector('.form-label-advanced');
            if (label && !input.classList.contains('error')) {
                label.style.color = '';
                label.style.transform = '';
            }
        });
    });
}

// Form submission handling
function initFormSubmission() {
    const form = document.getElementById('contactFormAdvanced');
    const submitBtn = document.querySelector('.submit-btn-advanced');
    const statusElement = document.querySelector('.form-status-advanced');
    
    if (!form || !submitBtn) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate all fields
        const inputs = form.querySelectorAll('.form-input-advanced');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        // Check service selection
        const serviceSelected = form.querySelector('input[name="servicio"]:checked');
        if (!serviceSelected) {
            showFormStatus('Por favor selecciona un servicio', 'error');
            isValid = false;
        }
        
        // Check privacy policy
        const privacyCheckbox = form.querySelector('#acepto');
        if (!privacyCheckbox || !privacyCheckbox.checked) {
            showFormStatus('Debes aceptar la política de privacidad', 'error');
            isValid = false;
        }
        
        if (!isValid) {
            return;
        }
        
        // Show loading state
        setSubmitButtonLoading(true);
        
        try {
            // Prepare form data
            const formData = new FormData(form);
            
            // Add service selection to form data
            if (serviceSelected) {
                formData.set('servicio', serviceSelected.value);
            }
            
            // Submit form
            const response = await fetch('contacto.php', {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                showFormStatus('¡Mensaje enviado correctamente! Te contactaremos pronto.', 'success');
                form.reset();
                
                // Reset step progression
                setTimeout(() => {
                    const steps = document.querySelectorAll('.step');
                    steps.forEach(step => {
                        step.classList.remove('completed', 'active');
                    });
                    if (steps[0]) steps[0].classList.add('active');
                }, 1000);
            } else {
                throw new Error('Error del servidor');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            showFormStatus('Hubo un error al enviar el mensaje. Por favor intenta nuevamente.', 'error');
        } finally {
            setSubmitButtonLoading(false);
        }
    });
}

function setSubmitButtonLoading(isLoading) {
    const submitBtn = document.querySelector('.submit-btn-advanced');
    if (!submitBtn) return;
    
    if (isLoading) {
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        submitBtn.textContent = 'Enviando...';
    } else {
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        submitBtn.textContent = 'Enviar Consulta';
    }
}

function showFormStatus(message, type) {
    const statusElement = document.querySelector('.form-status-advanced');
    if (!statusElement) return;
    
    statusElement.textContent = message;
    statusElement.className = `form-status-advanced ${type}`;
    statusElement.classList.add('show');
    
    // Auto hide after 5 seconds for success messages
    if (type === 'success') {
        setTimeout(() => {
            statusElement.classList.remove('show');
        }, 5000);
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export for potential external use
window.ContactFormAdvanced = {
    validateField,
    showFormStatus,
    setSubmitButtonLoading
};