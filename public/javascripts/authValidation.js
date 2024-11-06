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
            emailError.textContent = 'Campo requerido';
            valid = false;
        } else if (!validateEmail(emailInput.value)) {
            emailError.textContent = 'Ingrese un correo electrónico válido.';
            valid = false;
        }

        // Validar contraseña
        if (!passwordInput.value) {
            passwordError.textContent = 'Campo requerido';
            valid = false;
        }

        // --------------------------------------------------------------------
        // Prevenir el envío del formulario si hay errores
        if (!valid) {
            event.preventDefault();
            return;
        }

    });

    // Función para validar formato de correo electrónico
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});