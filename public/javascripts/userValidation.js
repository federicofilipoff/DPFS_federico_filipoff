document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('userForm');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const profileImage = document.getElementById("profileImage");

    const firstNameError = document.getElementById('firstNameError');
    const lastNameError = document.getElementById('lastNameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const profileImageError = document.getElementById("profileImageError");

    userForm.addEventListener('submit', async (event) => {
        let valid = true;

        // Validar Nombre
        if (!firstName.value.trim()) {
            firstNameError.textContent = 'Campo requerido';
            valid = false;
        } else if (firstName.value.trim().length < 2) {
            firstNameError.textContent = "El Campo debe tener al menos 2 caracteres";
            valid = false;
        } else {
            firstNameError.textContent = '';
        }

        // Validar Apellido
        if (!lastName.value.trim()) {
            lastNameError.textContent = 'Campo requerido';
            valid = false;
        } else if (lastName.value.trim().length < 2) {
            lastNameError.textContent = "El Campo debe tener al menos 2 caracteres";
            valid = false;
        } else {
            lastNameError.textContent = '';
        }

        // Validar correo electrónico
        if (!email.value.trim()) {
            emailError.textContent = 'Campo requerido';
            valid = false;
        } else if (!validateEmail(email.value)) {
            emailError.textContent = 'Correo electrónico inválido';
            valid = false;
        } else {
            emailError.textContent = '';
        }

        // Validar Contraseña
        if (password) { // Solo validar si el campo de contraseña está presente
            if (!password.value.trim() && userForm.dataset.action === 'crearUsuario') {
                passwordError.textContent = 'Campo requerido';
                valid = false;
            } else if (password.value.trim() && !validatePassword(password.value)) {
                passwordError.textContent = "La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula, una minúscula, un número y un carácter especial.";
                valid = false;
            } else {
                passwordError.textContent = '';
            }
        }

        // Validar Imagen
        if (profileImage.files.length > 0) {
            const file = profileImage.files[0];
            const validExtensions = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
        
            if (!validExtensions.includes(file.type)) {
                profileImageError.textContent = "La imagen debe ser JPG, JPEG, PNG o GIF.";
                valid = false;
            } else {
                profileImageError.textContent = '';
            }
        }

        // --------------------------------------------------------------------
        // Prevenir el envío del formulario si hay errores
        if (!valid) {
            event.preventDefault();
        }
    });

    // Función para validar formato de correo electrónico
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Función para validar contraseña
    function validatePassword(password) {
        const minLength = /.{8,}/;
        const hasUppercase = /[A-Z]/;
        const hasLowercase = /[a-z]/;
        const hasNumber = /[0-9]/;
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

        return (
            minLength.test(password) &&
            hasUppercase.test(password) &&
            hasLowercase.test(password) &&
            hasNumber.test(password) &&
            hasSpecialChar.test(password)
        );
    }
});
