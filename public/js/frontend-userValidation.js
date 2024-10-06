document.addEventListener('DOMContentLoaded', function() {

    const registerForm = document.getElementById('registerForm');

    if (registerForm) {
        registerForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            const image = document.getElementById('image').files[0];
            const validationMessage = [];

            // Validaciones
            if (firstName.length < 2) {
                validationMessage.push('El nombre debe tener al menos 2 caracteres.');
            }

            if (lastName.length < 2) {
                validationMessage.push('El apellido debe tener al menos 2 caracteres.');
            }

            if (!email) {
                validationMessage.push('El email es requerido.');
            } else if (!/\S+@\S+\.\S+/.test(email)) {
                validationMessage.push('Debe ser un email válido.');
            }

            if (password.length < 8) {
                validationMessage.push('La contraseña debe tener al menos 8 caracteres.');
            } else {
                if (!/[a-z]/.test(password)) {
                    validationMessage.push('La contraseña debe contener al menos una letra minúscula.');
                }
                if (!/[A-Z]/.test(password)) {
                    validationMessage.push('La contraseña debe contener al menos una letra mayúscula.');
                }
                if (!/\d/.test(password)) {
                    validationMessage.push('La contraseña debe contener al menos un número.');
                }
                if (!/[@$!%*?&]/.test(password)) {
                    validationMessage.push('La contraseña debe contener al menos un carácter especial.');
                }
            }

            if (!image) {
                validationMessage.push('La imagen es requerida.');
            } else {
                const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
                if (!validImageTypes.includes(image.type)) {
                    validationMessage.push('El archivo debe ser una imagen válida (JPG, JPEG, PNG, GIF).');
                }
            }

            // Mostrar mensajes de error o enviar el formulario
            const messageContainer = document.getElementById('validationMessage');
            messageContainer.innerHTML = '';
            if (validationMessage.length > 0) {
                validationMessage.forEach(message => {
                    const errorElement = document.createElement('p');
                    errorElement.textContent = message;
                    messageContainer.style.color = "red";
                    messageContainer.appendChild(errorElement);
                });
            } else {
                try {
                    const formData = new FormData(registerForm);
                    const response = await fetch(registerForm.action, {
                        method: registerForm.method,
                        body: formData
                    });

                    if (response.ok) {
                        messageContainer.style.color = 'green';
                        messageContainer.textContent = 'Usuario registrado exitosamente.';
                        registerForm.reset();
                    } else {
                        const errorElement = document.createElement('p');
                        errorElement.textContent = 'Ocurrió un error al registrar el usuario.';
                        messageContainer.style.color = 'red';
                        messageContainer.appendChild(errorElement);
                    }
                } catch (error) {
                    const errorElement = document.createElement('p');
                    errorElement.textContent = 'Ocurrió un error al registrar el usuario.';
                    messageContainer.style.color = 'red';
                    messageContainer.appendChild(errorElement);
                }
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
            const validationMessage = [];

            // Validaciones
            if (!email) {
                validationMessage.push('El email es requerido.');
            } else if (!/\S+@\S+\.\S+/.test(email)) {
                validationMessage.push('Debe ser un email válido.');
            }

            if (!password) {
                validationMessage.push('La contraseña es requerida.');
            }

            // Mostrar mensajes de error o enviar el formulario
            const messageContainer = document.getElementById('validationMessage');
            messageContainer.innerHTML = '';
            if (validationMessage.length > 0) {
                validationMessage.forEach(message => {
                    const errorElement = document.createElement('p');
                    errorElement.textContent = message;
                    messageContainer.appendChild(errorElement);
                });
            } else {
                loginForm.submit();
            }
        });
    }

    // Validación del formulario de edición de usuario
    const editForm = document.getElementById('editForm');

    if (editForm) {
        editForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            const validationMessage = [];

            // Validaciones
            if (firstName.length < 2) {
                validationMessage.push('El nombre debe tener al menos 2 caracteres.');
            }

            if (lastName.length < 2) {
                validationMessage.push('El apellido debe tener al menos 2 caracteres.');
            }

            if (!email) {
                validationMessage.push('El email es requerido.');
            } else if (!/\S+@\S+\.\S+/.test(email)) {
                validationMessage.push('Debe ser un email válido.');
            }

            if (password && password.length < 8) {
                validationMessage.push('La contraseña debe tener al menos 8 caracteres.');
            } else if (password) { // Validaciones de contraseña solo si hay contraseña ingresada
                if (!/[a-z]/.test(password)) {
                    validationMessage.push('La contraseña debe contener al menos una letra minúscula.');
                }
                if (!/[A-Z]/.test(password)) {
                    validationMessage.push('La contraseña debe contener al menos una letra mayúscula.');
                }
                if (!/\d/.test(password)) {
                    validationMessage.push('La contraseña debe contener al menos un número.');
                }
                if (!/[@$!%*?&]/.test(password)) {
                    validationMessage.push('La contraseña debe contener al menos un carácter especial.');
                }
            }

            if (image) {
                const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
                if (!validImageTypes.includes(image.type)) {
                    validationMessage.push('El archivo debe ser una imagen válida (JPG, JPEG, PNG, GIF).');
                }
            }

            // Mostrar mensajes de error o enviar el formulario
            const messageContainer = document.getElementById('validationMessage');
            messageContainer.innerHTML = '';
            if (validationMessage.length > 0) {
                validationMessage.forEach(message => {
                    const errorElement = document.createElement('p');
                    errorElement.textContent = message;
                    messageContainer.style.color = "red";
                    messageContainer.appendChild(errorElement);
                });
            } else {
                try {
                    const formData = new FormData(editForm);
                    const response = await fetch(editForm.action, {
                        method: editForm.method,
                        body: formData
                    });

                    if (response.ok) {
                        messageContainer.style.color = 'green';
                        messageContainer.textContent = 'Usuario editado exitosamente.';
                        editForm.reset();
                    } else {
                        const errorElement = document.createElement('p');
                        errorElement.textContent = 'Ocurrió un error al editar el usuario.';
                        messageContainer.style.color = 'red';
                        messageContainer.appendChild(errorElement);
                    }
                } catch (error) {
                    const errorElement = document.createElement('p');
                    errorElement.textContent = 'Ocurrió un error al editar el usuario.';
                    messageContainer.style.color = 'red';
                    messageContainer.appendChild(errorElement);
                }
            }
        });
    }
});