const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');
const toggleIcon = document.getElementById('toggleIcon');
const eyeIcon = document.getElementById('eyeIcon');

togglePassword.addEventListener('click', () => {

    // Alternar color del botón
    if (togglePassword.style.backgroundColor === "") {
        togglePassword.style.backgroundColor = "blueviolet";
        eyeIcon.style.fill = "white";
    } else {
        togglePassword.style.backgroundColor = ""
        eyeIcon.style.fill = "";
    }

    // Alterna el tipo del input => password (ocultar) | text (mostrar) contraseña
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        passwordInput.style.color = 'gray';
        passwordInput.style.fontSize = '14px';
    } else {
        passwordInput.type = 'password';
        passwordInput.style.color = "";
        passwordInput.style.fontSize = "";
    }

    // Dejar presionado el botón
    togglePassword.classList.toggle('active');

});
