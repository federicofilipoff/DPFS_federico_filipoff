/*
Se crea un objeto que contiene los controladores.
Cada llave contiene una función (controlador).
El controlador contiene la plantilla que renderiza y puede incluir variables.
*/

// Lista de productos provisoria
const productList = [
    { id: 1, name: 'Teclado Mecánico', description: 'Teclado mecánico con retroiluminación RGB', category: 'Teclados', colors: ['Negro', 'Blanco'], price: 80, image: 'https://redragon.es/content/uploads/2024/08/KING-M724-B.png'},
    { id: 2, name: 'Mouse Gamer', description: 'Mouse óptico de alta precisión con 6 botones', category: 'Mouses', colors: ['Negro', 'Rojo'], price: 45, image: 'https://redragon.es/content/uploads/2024/08/KING-M724-B.png'},
    { id: 3, name: 'Auriculares Inalámbricos', description: 'Auriculares inalámbricos con cancelación de ruido', category: 'Auriculares', colors: ['Negro'], price: 120, image: 'https://redragon.es/content/uploads/2024/08/KING-M724-B.png'},
    { id: 4, name: 'Teclado Compacto', description: 'Teclado compacto de 60% con switches rojos', category: 'Teclados', colors: ['Blanco'], price: 65, image: 'https://redragon.es/content/uploads/2024/08/KING-M724-B.png'},
    { id: 5, name: 'Mouse Ergonomico', description: 'Mouse ergonómico para largas horas de uso', category: 'Mouses', colors: ['Gris'], price: 30, image: 'https://redragon.es/content/uploads/2024/08/KING-M724-B.png'},
    { id: 6, name: 'Auriculares Bluetooth', description: 'Auriculares Bluetooth con micrófono integrado', category: 'Auriculares', colors: ['Negro', 'Azul'], price: 70, image: 'https://redragon.es/content/uploads/2024/08/KING-M724-B.png'},
    { id: 7, name: 'Teclado de Membrana', description: 'Teclado de membrana con teclas silenciosas', category: 'Teclados', colors: ['Negro'], price: 25, image: 'https://redragon.es/content/uploads/2024/08/KING-M724-B.png'},
    { id: 8, name: 'Mouse Inalámbrico', description: 'Mouse inalámbrico con batería recargable', category: 'Mouses', colors: ['Negro', 'Plateado'], price: 40, image: 'https://redragon.es/content/uploads/2024/08/KING-M724-B.png'},
    { id: 9, name: 'Auriculares Deportivos', description: 'Auriculares resistentes al agua, ideales para el deporte', category: 'Auriculares', colors: ['Rojo', 'Verde'], price: 60, image: 'https://redragon.es/content/uploads/2024/08/KING-M724-B.png'},
    { id: 10, name: 'Teclado Gamer', description: 'Teclado mecánico con panel numérico', category: 'Teclados', colors: ['Negro', 'Azul'], price: 90, image: 'https://redragon.es/content/uploads/2024/08/KING-M724-B.png'},
    { id: 11, name: 'Mouse de Alta Precisión', description: 'Mouse con sensor de alta precisión para gaming', category: 'Mouses', colors: ['Negro', 'Azul'], price: 55, image: 'https://redragon.es/content/uploads/2024/08/KING-M724-B.png'},
    { id: 12, name: 'Auriculares In-Ear', description: 'Auriculares In-Ear con excelente calidad de sonido', category: 'Auriculares', colors: ['Blanco', 'Negro'], price: 25, image: 'https://redragon.es/content/uploads/2024/08/KING-M724-B.png'},
];


let productController = {
    index: function(req, res) {
        return res.render('products/productList', { products: productList })
    },
    cart: function(req, res) {
        return res.render('products/productCart')
    },
    detail: function(req, res) {
        return res.render('products/productDetail')
    },
    create: function(req, res) {
        return res.render('products/productCreate')
    },
    edit: function(req, res) {
        return res.render('products/productEdit')
    }
};

module.exports = productController;
