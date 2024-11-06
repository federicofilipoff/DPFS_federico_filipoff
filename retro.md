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

## Observaciones
### Mejoras pendientes
- Me falta incluir menu de navegación vertical para diseño responsivo
- El Navbar no se desplaza (funciona mal la propiedad stickly).
- Tengo muchos estilos y podría refactorizarlo para no duplicar CSS.

- Tengo problemas con la imagen de perfil en la barra de navegación.
    La imagen de perfil se toma de la sesión (user), no de la base de datos (data).
    Si uso "user" en el renderizado de la plantilla, se muestra la foto de la sesión sin ser actualizada,
        tengo que reiniciar la sesión,
    si uso "data" tendría que envíar la consulta del modelo a todas las vistas...
        teóricamente podría crear un middleware para obtener los datos de la consulta por única vez y reutilizarlos en la navegación.

- Implementar cookie para recordar sesión del usuario y evitar que inicie sesión cada vez que cierre el navegador.

# SPRINT 6

## Observaciones
Observaciones del SPRINT 5 sin resolver

# SPRINT 7

## Observaciones
Resolver las observaciones del SPRINT 5

## Mejorado
Mostrar colores en la descripción (detail) del producto.

## Mejorar
### validaciones de front-end (OPTATIVO)
- Verificar que el correo exista en la base de datos (aplica en login, registro y editar usuario).
- Verificar que la contraseña sea correcta según el correo ingresado (aplica en login).
Incluir mensajes en el formulario para mejorar la experiencia del usuario.
Nota: creo que se puede hacer con React.js, voy a postergarlo para el proximo sprit.

- falta mejorar carrito y función para incorporar productos al carrito.
- falta hacer un filtro para ordenar los productos según precio.
- El controlador "delete" (tanto de usuario como productos) elimina el registro en la base de datos,
pero no elimina la imagen asociada al usuario/producto en /public/images/.
Esto es útil para tener una imagen única para usuario sin imagen de perfil o
para reciclar las imágenes de productos. En otros casos puede dejar imágenes sin uso y ocupar espacio innecesariamente.

# SPRINT 8
## Mejoras
- Refactoricé los estilos utilizando Bootstrap
- Simplifiqué formularios con plantillas parciales: crear y editar usuario, crear y editar producto.
