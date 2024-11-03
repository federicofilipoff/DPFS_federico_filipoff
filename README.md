# SPRINT 1

## Temática del sitio y Público objetivo
### __Temática__
Venta minorísta de artículos para PC: teclados, mouses, auriculares.

### __Público objetivo__
El sitio web esta dirigido a usuarios casuales o no.
Ofreciendo opciones variadas en calidad y precio, para profesionales o gamers
con mayores exigencias, así como para aquellos que prefieren alternativas más económicas.

## Sitios web referentes
- [Mexx](https://www.mexx.com.ar/)
- [Precio Calidad](https://www.precio-calidad.com.ar/)
- [Seven Electronics](https://www.sevenelectronics.com.ar/)
- [CompuMax](https://compumax.com.ar/)
- [Morshop](https://www.morshop.com.ar/)
- [Mercado Libre](https://www.mercadolibre.com.ar/)

Elegí los sitios mencionados ya que comparten una estructura similar:
- Registro y acceso de usuarios
- Catálogo de artículos y funcionalidad de búsqueda.
- Incoporar artículos a un carrito de compra.

Considero que estos sitios cubren los aspectos básicos de una tienda virtual.

## Entregables
- Wireframe: home, detalle de producto, carrito de compras, formulario registro, formulario login.
- Logo.
- Paleta de colores.
- Tipografías: roboto, open sans.

# SPRINT 2

## Tablero de trabajo
https://github.com/users/federicofilipoff/projects/2

## Aplicación Node.js + Express
### Modelo MVC
Desarrollo básico de la estructura mediante express-generator
Creación de /controllers para separar la lógica de la definición de las rutas.

### Archivos estáticos (ver carpeta /public/html)
- Home (index.html)
- Detalle del producto (productDetail.html)
- Carrito de compras (productCart.html)
- Formulario de registro (register.html)
- Formulario de login (login.html)

#### Rutas de acceso a las páginas estáticas
- http://localhost:3000/html/index.html
- http://localhost:3000/html/productDetail.html
- http://localhost:3000/html/productCart.html
- http://localhost:3000/html/register.html
- http://localhost:3000/html/login.html

### Modificación
La Paleta de colores se eliminó de /public/design y se incluyeron
los colores como variables en /public/stylesheets/variables.css


# SPRINT 3

## Tablero de trabajo
https://github.com/users/federicofilipoff/projects/3

## Entregables
- Archivos parciales (head, header, footer, etc.)
- Home
- Listado de productos
- Detalle del producto
- Carrito de productos
- Formulario de registro y login
- Formulario de carga y edición de productos
- Cada plantilla fue vinculada con su ruta y controlador

# SPRINT 4

## Tablero de trabajo
https://github.com/users/federicofilipoff/projects/4

# SPRINT 5

## Tablero de trabajo
https://github.com/users/federicofilipoff/projects/5

# SPRINT 6

## Tablero de trabajo
https://github.com/users/federicofilipoff/projects/6

## Base de datos
Ejecutar scripts (usando MySQL) ubicados en:
"/data/structure.sql"
"/data/data.sql"
Se creará la base de datos "ecommerce" y sus tablas.

## Contraseñas de usuarios:
Los usuarios creados por script de SQL inician sesión con la siguiente contraseña: 123
La misma debe ser encriptada, usar el comando:
> npx sequelize db:seed --seed database/seeders/encrypt-passwords.js

Esto es así porque en el controlador de Users (login),
cuando comparo la contraseña ingresada por formulario con la registrada
en la base de datos, si ambas no fueron cifradas, la comparación retorna falso.

# SPRINT 7

## Tablero de trabajo
https://github.com/users/federicofilipoff/projects/7
