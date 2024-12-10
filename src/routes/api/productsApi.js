const express = require("express");
const router = express.Router();

const authorize = require("../../middlewares/authorize");

const {
  showAllProducts,
  showAProduct,
} = require("../../controllers/api/products");

/**
 * @swagger
 * tags:
 *   name: Productos
 *   description: APIs para gestionar productos
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Obtener la lista de productos con métricas avanzadas
 *     tags: [Productos]
 *     description: Retorna información detallada de productos, incluyendo métricas, ventas recientes y productos destacados.
 *     responses:
 *       200:
 *         description: Información de productos obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   description: Cantidad total de productos disponibles.
 *                   example: 33
 *                 countByCategory:
 *                   type: object
 *                   additionalProperties:
 *                     type: integer
 *                   description: Cantidad de productos por categoría.
 *                   example:
 *                     Teclados: 12
 *                     Mouses: 9
 *                     Auriculares: 12
 *                 totalUnitsSold:
 *                   type: integer
 *                   description: Cantidad total de unidades vendidas.
 *                   example: 51
 *                 totalSalesAmount:
 *                   type: number
 *                   format: float
 *                   description: Ingresos totales generados por ventas.
 *                   example: 3520.00
 *                 latestSales:
 *                   type: array
 *                   description: Lista de las ventas más recientes.
 *                   items:
 *                     type: object
 *                     properties:
 *                       productName:
 *                         type: string
 *                         description: Nombre del producto vendido.
 *                         example: "Razer Viper"
 *                       quantity:
 *                         type: integer
 *                         description: Cantidad vendida.
 *                         example: 1
 *                       total:
 *                         type: string
 *                         description: Monto total de la venta.
 *                         example: "65.00"
 *                       saleDate:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha de la venta.
 *                         example: "2024-11-23T14:31:09.000Z"
 *                 topProducts:
 *                   type: array
 *                   description: Lista de productos más vendidos.
 *                   items:
 *                     type: object
 *                     properties:
 *                       productName:
 *                         type: string
 *                         description: Nombre del producto.
 *                         example: "Logitech G502"
 *                       totalSold:
 *                         type: string
 *                         description: Cantidad total vendida.
 *                         example: "19"
 *                 products:
 *                   type: array
 *                   description: Lista detallada de productos.
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: ID único del producto.
 *                         example: 1
 *                       name:
 *                         type: string
 *                         description: Nombre del producto.
 *                         example: "Redragon Shiva K512"
 *                       description:
 *                         type: string
 *                         description: Descripción del producto.
 *                         example: "Teclado mecánico"
 *                       category:
 *                         type: string
 *                         description: Categoría del producto.
 *                         example: "Teclados"
 *                       brand:
 *                         type: string
 *                         description: Marca del producto.
 *                         example: "Redragon"
 *                       colors:
 *                         type: array
 *                         description: Colores disponibles para el producto.
 *                         items:
 *                           type: string
 *                         example: ["Negro", "Blanco"]
 *                       detail:
 *                         type: string
 *                         description: URL con más detalles del producto.
 *                         example: "/products/1"
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/", authorize("admin"), showAllProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Obtener detalles de un producto
 *     tags: [Productos]
 *     description: Retorna los detalles de un producto específico según su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID único del producto.
 *     responses:
 *       200:
 *         description: Detalles del producto obtenidos exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID único del producto.
 *                   example: 1
 *                 name:
 *                   type: string
 *                   description: Nombre del producto.
 *                   example: "Redragon Shiva K512"
 *                 description:
 *                   type: string
 *                   description: Descripción del producto.
 *                   example: "Teclado mecánico"
 *                 price:
 *                   type: string
 *                   format: float
 *                   description: Precio del producto.
 *                   example: "95.00"
 *                 brand:
 *                   type: string
 *                   description: Marca del producto.
 *                   example: "Redragon"
 *                 category:
 *                   type: string
 *                   description: Categoría del producto.
 *                   example: "Teclados"
 *                 colors:
 *                   type: array
 *                   description: Lista de colores disponibles.
 *                   items:
 *                     type: string
 *                   example: ["Negro", "Blanco"]
 *                 size:
 *                   type: string
 *                   description: Tamaño del producto.
 *                   example: "43.5 x 12.5 x 3.5 cm"
 *                 imageUrl:
 *                   type: string
 *                   description: URL de la imagen del producto.
 *                   example: "/images/products/teclado_1.png"
 *       404:
 *         description: Producto no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Producto no encontrado."
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/:id", authorize("admin"), showAProduct);

module.exports = router;
