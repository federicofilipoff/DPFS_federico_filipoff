// MENÚ DESPLEGABLE
function alternarMenu() {
  // SELECCIONA EL ELEMENTO DEL MENÚ
  const menu = document.getElementById("menu");

  if (menu.style.width === "250px") {
    // Si el menú está abierto, se cierra.
    menu.style.width = "0";
  } else {
    // Si el menú está cerrado, se abre.
    menu.style.width = "250px";
  }
}
