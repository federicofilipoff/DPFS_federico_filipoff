# SPRINT 2

Retrospectiva del SPRINT 1

## Comenzar a hacer

Investigar y probar nuevas tendencias en diseño web.

## Hacer más

Confiar más en la mejora contínua, equivocarme temprano.

## Continuar haciendo

Desarrollar un diseño web minimalista, con la intención de ser funcional
y realizable, sin abundar en detalles que podrían complicar labores futuras.

# SPRINT 3

## Comenzar a

Implementar EJS para simplificar el maquetado web.
Buscar formas de reutilizar estilos (css).

## Hacer más

Enforcarme en las historias del usuario.
Usar el tablero de trabajo.

## Continuar haciendo

Adaptar el maquetado web a los Sprint.

# Pendiente

- falta hacer un filtro para ordenar los productos según precio.
- El controlador "delete" (tanto de usuario como productos) elimina el registro en la base de datos,
  pero no elimina la imagen asociada al usuario/producto en /public/images/.
  Esto es útil para tener una imagen única para usuario sin imagen de perfil o
  para reciclar las imágenes de productos. En otros casos puede dejar imágenes sin uso y ocupar espacio innecesariamente.
- El catálogo de productos no tiene paginado.

## Mejoré

- Mostrar colores en la descripción (detail) del producto.
- Incluí menu de navegación vertical para diseño responsivo.
- Desplazamiento del Navbar: antes desparecia.
- Refactoricé los estilos utilizando Bootstrap
- Simplifiqué formularios con plantillas parciales: crear y editar usuario, crear y editar producto.
- Solucioné problemas con la imagen de perfil en la barra de navegación: al actualizar los datos del usuario,
  la imagen del avatar quedaba desactualizada porque usaba la imagen de la sesión. Lo resolví actualizando los datos de sesión al actualizar los datos del usuario.
- Incorporé validación front-end de correo y contraseña en el formulario de Login.
  Ídem en formularios para editar y crear usuario.
