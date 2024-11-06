document.addEventListener('keydown', function(event) {

    // Verifica si se presiona la combinación de teclas
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        
        // Prevenir el comportamiento por defecto del navegador
        event.preventDefault();
        
        // Mover el foco al input de búsqueda
        document.getElementById('search').focus();
    }
});