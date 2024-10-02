document.addEventListener('DOMContentLoaded', function() {
    // Validación del formulario de registro
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            const image = document.getElementById('image').files[0];
            const errorMessages = [];

            // Validaciones
            if (firstName.length < 2) {
                errorMessages.push('El nombre debe tener al menos 2 caracteres.');
            }

            if (lastName.length < 2) {
                errorMessages.push('El apellido debe tener al menos 2 caracteres.');
            }

            if (!email) {
                errorMessages.push('El email es requerido.');
            } else if (!/\S+@\S+\.\S+/.test(email)) {
                errorMessages.push('Debe ser un email válido.');
            }

            if (password.length < 8) {
                errorMessages.push('La contraseña debe tener al menos 8 caracteres.');
            } else {
                if (!/[a-z]/.test(password)) {
                    errorMessages.push('La contraseña debe contener al menos una letra minúscula.');
                }
                if (!/[A-Z]/.test(password)) {
                    errorMessages.push('La contraseña debe contener al menos una letra mayúscula.');
                }
                if (!/\d/.test(password)) {
                    errorMessages.push('La contraseña debe contener al menos un número.');
                }
                if (!/[@$!%*?&]/.test(password)) {
                    errorMessages.push('La contraseña debe contener al menos un carácter especial.');
                }
            }

            if (!image) {
                errorMessages.push('La imagen es requerida.');
            } else {
                const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
                if (!validImageTypes.includes(image.type)) {
                    errorMessages.push('El archivo debe ser una imagen válida (JPG, JPEG, PNG, GIF).');
                }
            }

            // Mostrar mensajes de error o enviar el formulario
            const errorContainer = document.getElementById('errorMessages');
            errorContainer.innerHTML = '';
            if (errorMessages.length > 0) {
                errorMessages.forEach(message => {
                    const errorElement = document.createElement('p');
                    errorElement.textContent = message;
                    errorContainer.appendChild(errorElement);
                });
            } else {
                registerForm.submit();
            }
        });
    }

    // Validación del formulario de inicio de sesión
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            const errorMessages = [];

            // Validaciones
            if (!email) {
                errorMessages.push('El email es requerido.');
            } else if (!/\S+@\S+\.\S+/.test(email)) {
                errorMessages.push('Debe ser un email válido.');
            }

            if (!password) {
                errorMessages.push('La contraseña es requerida.');
            }

            // Mostrar mensajes de error o enviar el formulario
            const errorContainer = document.getElementById('errorMessages');
            errorContainer.innerHTML = '';
            if (errorMessages.length > 0) {
                errorMessages.forEach(message => {
                    const errorElement = document.createElement('p');
                    errorElement.textContent = message;
                    errorContainer.appendChild(errorElement);
                });
            } else {
                loginForm.submit();
            }
        });
    }

    // Validación del formulario de edición de usuario
    const editForm = document.getElementById('editForm');
    if (editForm) {
        editForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            const errorMessages = [];

            // Validaciones
            if (firstName.length < 2) {
                errorMessages.push('El nombre debe tener al menos 2 caracteres.');
            }

            if (lastName.length < 2) {
                errorMessages.push('El apellido debe tener al menos 2 caracteres.');
            }

            if (!email) {
                errorMessages.push('El email es requerido.');
            } else if (!/\S+@\S+\.\S+/.test(email)) {
                errorMessages.push('Debe ser un email válido.');
            }

            if (password.length < 8) {
                errorMessages.push('La contraseña debe tener al menos 8 caracteres.');
            } else {
                if (!/[a-z]/.test(password)) {
                    errorMessages.push('La contraseña debe contener al menos una letra minúscula.');
                }
                if (!/[A-Z]/.test(password)) {
                    errorMessages.push('La contraseña debe contener al menos una letra mayúscula.');
                }
                if (!/\d/.test(password)) {
                    errorMessages.push('La contraseña debe contener al menos un número.');
                }
                if (!/[@$!%*?&]/.test(password)) {
                    errorMessages.push('La contraseña debe contener al menos un carácter especial.');
                }
            }

            // Mostrar mensajes de error o enviar el formulario
            const errorContainer = document.getElementById('errorMessages');
            errorContainer.innerHTML = '';
            if (errorMessages.length > 0) {
                errorMessages.forEach(message => {
                    const errorElement = document.createElement('p');
                    errorElement.textContent = message;
                    errorContainer.appendChild(errorElement);
                });
            } else {
                editForm.submit();
            }
        });
    }
});
