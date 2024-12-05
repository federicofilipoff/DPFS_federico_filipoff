const bcrypt = require("bcrypt");
const saltRounds = 10;

("use strict");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    // Insertar en Categories (timestamps: false)
    await queryInterface.bulkInsert("Categories", [
      { name: "Teclados" },
      { name: "Mouses" },
      { name: "Auriculares" },
      { name: "Otros" },
    ]);

    // Insertar en Brands (timestamps: false)
    await queryInterface.bulkInsert("Brands", [
      { name: "Logitech" },
      { name: "Redragon" },
      { name: "Corsair" },
      { name: "Razer" },
    ]);

    // Insertar en Products (timestamps: true)
    await queryInterface.bulkInsert("Products", [
      {
        name: "Redragon Shiva K512",
        description: "Teclado mecánico",
        image: "teclado_1.png",
        category_id: 1,
        brand_id: 2,
        officialWeb: "https://redragon.es/products/shiva-k512/",
        size: generateRandomSize(5, 25),
        price: generateRandomPrice(30, 150),
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Logitech G213",
        description: "Teclado gaming RGB",
        image: "teclado_2.png",
        category_id: 1,
        brand_id: 1,
        officialWeb: "https://www.logitech.com/gaming-keyboards/g213/",
        size: generateRandomSize(5, 25),
        price: generateRandomPrice(30, 150),
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Corsair K55 RGB",
        description: "Teclado de membrana",
        image: "teclado_3.png",
        category_id: 1,
        brand_id: 3,
        officialWeb: "https://www.corsair.com/k55-rgb/",
        size: generateRandomSize(5, 25),
        price: generateRandomPrice(30, 150),
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Razer Cynosa V2",
        description: "Teclado de membrana RGB",
        image: "teclado_4.png",
        category_id: 1,
        brand_id: 4,
        officialWeb: "https://www.razer.com/cynosa-v2/",
        size: generateRandomSize(5, 25),
        price: generateRandomPrice(30, 150),
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Redragon Cobra M711",
        description: "Mouse óptico RGB",
        image: "mouse_1.png",
        category_id: 2,
        brand_id: 2,
        officialWeb: "https://redragon.es/mouse-cobra-m711/",
        size: generateRandomSize(5, 25),
        price: generateRandomPrice(30, 150),
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Logitech G502",
        description: "Mouse gaming personalizable",
        image: "mouse_2.png",
        category_id: 2,
        brand_id: 1,
        officialWeb: "https://www.logitech.com/g502/",
        size: generateRandomSize(5, 25),
        price: generateRandomPrice(30, 150),
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Corsair Dark Core RGB",
        description: "Mouse inalámbrico gaming",
        image: "mouse_3.png",
        category_id: 2,
        brand_id: 3,
        officialWeb: "https://www.corsair.com/dark-core-rgb/",
        size: generateRandomSize(5, 25),
        price: generateRandomPrice(30, 150),
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Razer DeathAdder V2",
        description: "Mouse ergonómico óptico",
        image: "mouse_4.png",
        category_id: 2,
        brand_id: 4,
        officialWeb: "https://www.razer.com/deathadder-v2/",
        size: generateRandomSize(5, 25),
        price: generateRandomPrice(30, 150),
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Redragon Zeus H510",
        description: "Auriculares gaming con micrófono",
        image: "auriculares_1.png",
        category_id: 3,
        brand_id: 2,
        officialWeb: "https://redragon.es/zeus-h510/",
        size: generateRandomSize(5, 25),
        price: generateRandomPrice(30, 150),
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Logitech G935",
        description: "Auriculares gaming inalámbricos",
        image: "auriculares_2.png",
        category_id: 3,
        brand_id: 1,
        officialWeb: "https://www.logitech.com/g935/",
        size: generateRandomSize(5, 25),
        price: generateRandomPrice(30, 150),
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Corsair HS70 Pro",
        description: "Auriculares inalámbricos con sonido envolvente",
        image: "auriculares_3.png",
        category_id: 3,
        brand_id: 3,
        officialWeb: "https://www.corsair.com/hs70-pro/",
        size: generateRandomSize(5, 25),
        price: generateRandomPrice(30, 150),
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Razer Kraken X",
        description: "Auriculares ultraligeros",
        image: "auriculares_4.png",
        category_id: 3,
        brand_id: 4,
        officialWeb: "https://www.razer.com/kraken-x/",
        size: generateRandomSize(5, 25),
        price: generateRandomPrice(30, 150),
        createdAt: now,
        updatedAt: now,
      },
    ]);

    // Insertar en Users (timestamps: true)
    await queryInterface.bulkInsert("Users", [
      {
        firstName: "José",
        lastName: "Pérez",
        email: "jose.perez@gmail.com",
        password: await encryptPassword("123"),
        category: "admin",
        profileImage: "imagen_perfil_1.jpeg",
        createdAt: now,
        updatedAt: now,
      },
      {
        firstName: "María",
        lastName: "López",
        email: "maria.lopez@gmail.com",
        password: await encryptPassword("123"),
        category: "user",
        profileImage: "imagen_perfil_2.jpeg",
        createdAt: now,
        updatedAt: now,
      },
      {
        firstName: "Carlos",
        lastName: "Gómez",
        email: "carlos.gomez@gmail.com",
        password: await encryptPassword("123"),
        category: "user",
        profileImage: "imagen_perfil_3.jpeg",
        createdAt: now,
        updatedAt: now,
      },
    ]);

    // Insertar en Colors (timestamps: false)
    await queryInterface.bulkInsert("Colors", [
      { name: "Rojo" },
      { name: "Azul" },
      { name: "Negro" },
      { name: "Blanco" },
      { name: "Verde" },
      { name: "Amarillo" },
      { name: "Gris" },
      { name: "Naranja" },
    ]);

    // Insertar en Product_Colors (timestamps: false)
    // Por cada prdocuto agregar relaciones de color/es
    await queryInterface.bulkInsert("Product_Colors", [
      {
        product_id: 1,
        color_id: 4,
      },
      {
        product_id: 1,
        color_id: 3,
      },
      {
        product_id: 2,
        color_id: 7,
      },
      {
        product_id: 2,
        color_id: 2,
      },
      {
        product_id: 3,
        color_id: 3,
      },
      {
        product_id: 3,
        color_id: 4,
      },
      {
        product_id: 5,
        color_id: 5,
      },
      {
        product_id: 6,
        color_id: 1,
      },
      {
        product_id: 7,
        color_id: 5,
      },
      {
        product_id: 8,
        color_id: 2,
      },
      {
        product_id: 9,
        color_id: 8,
      },
      {
        product_id: 10,
        color_id: 3,
      },
      {
        product_id: 11,
        color_id: 7,
      },
      {
        product_id: 12,
        color_id: 6,
      },
      {
        product_id: 11,
        color_id: 1,
      },
    ]);

    // Crear Carrito (timestamps: true)
    await queryInterface.bulkInsert("ShoppingCart", [
      {
        user_id: 2,
        total: 156.07,
        createdAt: now,
        updatedAt: now,
      },
    ]);

    // Insertar productos al Carrito (timestamps: true)
    await queryInterface.bulkInsert("CartItems", [
      {
        cart_id: 1,
        product_id: 5,
        quantity: 1,
        price: 92.75,
        createdAt: now,
        updatedAt: now,
      },
      {
        cart_id: 1,
        product_id: 8,
        quantity: 2,
        price: 63.32,
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    // Eliminar datos en orden inverso
    await queryInterface.bulkDelete("CartItems", { cart_id: 1 }, {});
    await queryInterface.bulkDelete("ShoppingCart", { user_id: 2 }, {});
    await queryInterface.bulkDelete("Product_Colors", null, {});
    await queryInterface.bulkDelete("Colors", null, {});
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.bulkDelete("Products", null, {});
    await queryInterface.bulkDelete("Brands", null, {});
    await queryInterface.bulkDelete("Categories", null, {});
  },
};

// Creé funciones para generar aleatoreamente precio y tamaño
const generateRandomPrice = (min, max) => {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
};

const generateRandomSize = (min, max) => {
  const randomDimension = () => (Math.random() * (max - min) + min).toFixed(1);
  return `${randomDimension()} x ${randomDimension()} x ${randomDimension()} cm`;
};

// Función para encriptar contraseñas
const encryptPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};
