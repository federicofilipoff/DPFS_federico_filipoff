document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío del formulario para validar primero

    const productName = document.getElementById('productName').value.trim();
    const productDescription = document.getElementById('productDescription').value.trim();
    const image = document.getElementById('image').files[0];
    const category = document.getElementById('category').value.trim();
    const colors = document.getElementById('colors').value.trim();
    const size = document.getElementById('size').value.trim();
    const productPrice = document.getElementById('productPrice').value.trim();
    const errorMessages = [];

    // Validaciones
    if (productName.length < 5) {
        errorMessages.push('El nombre del producto debe tener al menos 5 caracteres.');
    }

    if (productDescription.length < 20) {
        errorMessages.push('La descripción del producto debe tener al menos 20 caracteres.');
    }

    if (!image) {
        errorMessages.push('La imagen es requerida.');
    } else {
        const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        if (!validImageTypes.includes(image.type)) {
            errorMessages.push('El archivo debe ser una imagen válida (JPG, JPEG, PNG, GIF).');
        }
    }

    if (category === '') {
        errorMessages.push('La categoría del producto es requerida.');
    }

    if (colors === '') {
        errorMessages.push('El color del producto es requerido.');
    }

    if (size === '') {
        errorMessages.push('El tamaño del producto es requerido.');
    }

    if (isNaN(productPrice) || productPrice <= 0) {
        errorMessages.push('El precio del producto debe ser un número mayor que 0.');
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
        this.submit(); // Envía el formulario si no hay errores
    }
});
