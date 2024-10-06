// ENFOCAR MENSAJE
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    window.scrollTo(0, 0);
    document.getElementById('validationMessage').focus();
});