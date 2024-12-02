document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevenir el envío inicial del formulario
    let valid = true;

    // Limpiar errores anteriores
    emailError.textContent = "";
    passwordError.textContent = "";

    // Validar localmente
    if (!emailInput.value) {
      emailError.textContent = "Campo requerido";
      valid = false;
    } else if (!validateEmail(emailInput.value)) {
      emailError.textContent = "Ingrese un correo electrónico válido.";
      valid = false;
    }

    if (!passwordInput.value) {
      passwordError.textContent = "Campo requerido";
      valid = false;
    }

    if (!valid) return;

    // Validar en el servidor
    try {
      const response = await fetch("/api/users/check-credentials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailInput.value,
          password: passwordInput.value,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 404) {
          emailError.textContent = result.error;
        } else if (response.status === 401) {
          passwordError.textContent = result.error;
        }
        return;
      }

      // Si no hay error envía el formulario
      loginForm.submit();
    } catch (error) {
      console.error("Error al validar en el servidor:", error);
    }
  });

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
});
