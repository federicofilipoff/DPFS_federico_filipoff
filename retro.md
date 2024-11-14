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

# SPRINT 5

## Observaciones: sin

# SPRINT 6

## Observaciones: sin

# SPRINT 7

## Pendientes

# SPRINT 8

## Pendiente

- falta hacer un filtro para ordenar los productos según precio.
- El controlador "delete" (tanto de usuario como productos) elimina el registro en la base de datos,
  pero no elimina la imagen asociada al usuario/producto en /public/images/.
  Esto es útil para tener una imagen única para usuario sin imagen de perfil o
  para reciclar las imágenes de productos. En otros casos puede dejar imágenes sin uso y ocupar espacio innecesariamente.

- Crear vista para el carrito + controlador para incorporar productos al mismo: ¿aplicar React? necesito actualizar estados para añadir o quitar unidades y actualizar los totales.
  falta mejorar carrito y función para incorporar productos al carrito.
- Crear API (usuario y productos) según Sprint 8: 2 pares de rutas y controladores
- Consumir dichas API para mostrar datos en Dashboard.

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
