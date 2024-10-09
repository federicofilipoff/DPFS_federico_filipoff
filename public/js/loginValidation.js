// Función para enviar el formulario
async function enviarFormulario(event) {
    event.preventDefault(); // Evita el envío del formulario por defecto

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errores = await response.json();
            mostrarErrores(errores.errors);
        } else {
            // Redirigir o manejar la respuesta exitosa
            window.location.href = '/';
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Función para mostrar los errores en el front-end
function mostrarErrores(errores) {
    const messageContainer = document.getElementById('validationMessage');
    messageContainer.innerHTML = ''; // Limpia los errores anteriores

    errores.forEach(error => {
        const errorElemento = document.createElement('div');
        errorElemento.textContent = error.msg;
        messageContainer.style.color = 'red';
        messageContainer.appendChild(errorElemento);
    });
}

// Añadir el evento al formulario
document.getElementById('loginForm').addEventListener('submit', enviarFormulario);
