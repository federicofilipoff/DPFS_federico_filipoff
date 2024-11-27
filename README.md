# INSTRUCCIONES: CARRITO DE COMPRA

## Requisitos

Tener instaladas las siguientes herramientas:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- (Opcional) [Git](https://git-scm.com/) para clonar el repositorio

## Pasos

Usando la consola de comandos del sistema operativo:

1. Clonar repositorio:

```bash
git clone https://github.com/federicofilipoff/DPFS_federico_filipoff
```

2. Dirigirse a la carpeta del proyecto:

```bash
cd DPFS_federico_filipoff
```

3. Instalar dependencias:

```bash
npm install
```

4.  Base de datos: crear base de datos y los datos para cada tabla.

Crear la base de datos "ecommerce" y sus tablas.
Ejecutar scripts, usando MySQL Workbench:

- "/src/database/seeders/structure.sql"
- "/src/database/seeders/data.sql"

Contraseñas de usuarios

Los usuarios creados por script de SQL inician sesión con la siguiente contraseña: 123
La misma debe ser encriptada, usar el comando:

```bash
npx sequelize db:seed --seed src/database/seeders/encrypt-passwords.js
```

Esto es así porque en el controlador de Users (login),
cuando comparo la contraseña ingresada por formulario con la registrada
en la base de datos, si ambas no fueron cifradas, la comparación retorna falso.

5.  Ejecutar Back-end:

```bash
nodemon
```

6. Ejecutar Front-end usando otra instancia de la consola de comandos del sistema operativo:

```bash
cd dashboard
```

```bash
npm run dev
```

# APIs

## GET /api/products

- Descripción: visualizar lista de productos y analíticas básicas.

## GET /api/products/:id

- Descripción: visualizar información detallada del artículo, según su ID.

## GET /api/users

- Descripción: visualizar cantidad y lista de usuarios registrados.

## GET /api/users/:id

- Descripción: visualizar información básica del usuario, según su ID.

# SPRINT 1

## Temática del sitio y Público objetivo

### **Temática**

Venta minorísta de artículos para PC: teclados, mouses, auriculares.

### **Público objetivo**

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

# SPRINT 3

## Tablero de trabajo

https://github.com/users/federicofilipoff/projects/3

# SPRINT 4

## Tablero de trabajo

https://github.com/users/federicofilipoff/projects/4

# SPRINT 5

## Tablero de trabajo

https://github.com/users/federicofilipoff/projects/5

# SPRINT 6

## Tablero de trabajo

https://github.com/users/federicofilipoff/projects/6

# SPRINT 7

## Tablero de trabajo

https://github.com/users/federicofilipoff/projects/7

# SPRINT 8

## Tablero de trabajo

https://github.com/users/federicofilipoff/projects/8
