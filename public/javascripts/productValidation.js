document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('productForm');
    const name = document.getElementById('name');
    const description = document.getElementById('description');
    const image = document.getElementById('image');

    const nameError = document.getElementById('nameError');
    const descriptionError = document.getElementById('descriptionError');
    const imageError = document.getElementById("imageError");

    productForm.addEventListener('submit', async (event) => {
        let valid = true;

        // Limpiar mensajes de error al inicio
        nameError.textContent = '';
        descriptionError.textContent = '';
        imageError.textContent = '';

        // Validar Nombre
        if (!name.value.trim()) {
            nameError.textContent = 'Campo requerido.';
            valid = false;
        } else if (name.value.trim().length < 5) {
            nameError.textContent = "El Campo debe tener al menos 5 caracteres.";
            valid = false;
        }

        // Validar Descripción
        if (!description.value.trim()) {
            descriptionError.textContent = 'Campo requerido.';
            valid = false;
        } else if (description.value.trim().length < 20) {
            descriptionError.textContent = "El Campo debe tener al menos 20 caracteres.";
            valid = false;
        }

        // Validar Imagen
        if (image.files.length > 0) {
            const file = image.files[0];
            const validExtensions = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
            
            if (!validExtensions.includes(file.type)) {
                imageError.textContent = "La imagen debe ser JPG, JPEG, PNG o GIF.";
                valid = false;
            }
        }

        // Prevenir el envío del formulario si hay errores
        if (!valid) {
            event.preventDefault();
        }
    });
});
