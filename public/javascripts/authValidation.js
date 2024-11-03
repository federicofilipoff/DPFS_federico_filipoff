document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    loginForm.addEventListener('submit', async (event) => {
        let valid = true;

        // Limpiar errores anteriores
        emailError.textContent = '';
        passwordError.textContent = '';

        // Validar correo electrónico
        if (!emailInput.value) {
            emailError.textContent = 'Campo requerido.';
            valid = false;
        } else if (!validateEmail(emailInput.value)) {
            emailError.textContent = 'Ingrese un correo electrónico válido.';
            valid = false;
        }

        // Validar contraseña
        if (!passwordInput.value) {
            passwordError.textContent = 'Campo requerido.';
            valid = false;
        }

        // --------------------------------------------------------------------
        // Prevenir el envío del formulario si hay errores
        if (!valid) {
            event.preventDefault();
            return;
        }

        // Verificar si el correo existe en la base de datos
        const emailExists = await checkEmailExists(emailInput.value);
        if (!emailExists) {
            emailError.textContent = 'Este correo no está registrado.';
            event.preventDefault(); // Evitar el envío del formulario
            return;
        }

        // Validar la contraseña en el servidor
        const passwordValid = await validatePassword(emailInput.value, passwordInput.value);
        if (!passwordValid) {
            passwordError.textContent = 'Contraseña incorrecta.';
            event.preventDefault(); // Evitar el envío del formulario
            return;
        }
    });

    // Función para validar formato de correo electrónico
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});
