USE ecommerce;

INSERT INTO Categories (name) VALUES
('Teclados'),
('Mouses'),
('Auriculares'),
('Otros');

INSERT INTO Brands (name) VALUES
('Logitech'),
('Redragon'),
('Corsair'),
('Razer');

INSERT INTO Products (name, description, image, category_id, brand_id, officialWeb, size, price, createdAt, updatedAt) VALUES 
('Redragon Shiva K512', 'Teclado mecánico', 'teclado (1).png', 1, 2, 'https://redragon.es/products/shiva-k512/', '43.5 x 12.5 x 3.5 cm', 95.00, NOW(), NOW()),
('Logitech G213', 'Teclado gaming RGB', 'teclado (2).png', 1, 1, 'https://www.logitech.com/gaming-keyboards/g213/', '45 x 15.8 x 3.3 cm', 70.00, NOW(), NOW()),
('Corsair K55 RGB', 'Teclado de membrana', 'teclado (3).png', 1, 3, 'https://www.corsair.com/k55-rgb/', '48 x 16.7 x 3.5 cm', 75.00, NOW(), NOW()),
('Razer Cynosa V2', 'Teclado de membrana RGB', 'teclado (4).png', 1, 4, 'https://www.razer.com/cynosa-v2/', '46.3 x 16.7 x 3.2 cm', 60.00, NOW(), NOW()),
('Redragon Cobra M711', 'Mouse óptico RGB', 'mouse (1).png', 2, 2, 'https://redragon.es/mouse-cobra-m711/', '12.5 x 7.5 x 3.8 cm', 35.00, NOW(), NOW()),
('Logitech G502', 'Mouse gaming personalizable', 'mouse (2).png', 2, 1, 'https://www.logitech.com/g502/', '13.2 x 7.5 x 4.0 cm', 75.00, NOW(), NOW()),
('Corsair Dark Core RGB', 'Mouse inalámbrico gaming', 'mouse (3).png', 2, 3, 'https://www.corsair.com/dark-core-rgb/', '12.6 x 8.2 x 4.0 cm', 100.00, NOW(), NOW()),
('Razer DeathAdder V2', 'Mouse ergonómico óptico', 'mouse (4).png', 2, 4, 'https://www.razer.com/deathadder-v2/', '12.7 x 6.1 x 4.2 cm', 70.00, NOW(), NOW()),
('Redragon Zeus H510', 'Auriculares gaming con micrófono', 'auriculares (1).png', 3, 2, 'https://redragon.es/zeus-h510/', '20 x 18 x 10 cm', 60.00, NOW(), NOW()),
('Logitech G935', 'Auriculares gaming inalámbricos', 'auriculares (2).png', 3, 1, 'https://www.logitech.com/g935/', '22 x 19 x 9.5 cm', 120.00, NOW(), NOW()),
('Corsair HS70 Pro', 'Auriculares inalámbricos con sonido envolvente', 'auriculares (3).png', 3, 3, 'https://www.corsair.com/hs70-pro/', '19 x 17.5 x 10.5 cm', 100.00, NOW(), NOW()),
('Razer Kraken X', 'Auriculares ultraligeros', 'auriculares (4).png', 3, 4, 'https://www.razer.com/kraken-x/', '18.5 x 15 x 9 cm', 40.00, NOW(), NOW()),
('Redragon Kumara K552', 'Teclado mecánico compacto', 'teclado (1).png', 1, 2, 'https://redragon.es/kumara-k552/', '36 x 13 x 3.5 cm', 45.00, NOW(), NOW()),
('Logitech K845', 'Teclado mecánico retroiluminado', 'teclado (2).png', 1, 1, 'https://www.logitech.com/k845/', '45.5 x 14 x 3.5 cm', 85.00, NOW(), NOW()),
('Corsair K70 RGB', 'Teclado mecánico avanzado', 'teclado (3).png', 1, 3, 'https://www.corsair.com/k70-rgb/', '46.7 x 17 x 3.5 cm', 130.00, NOW(), NOW()),
('Razer BlackWidow V3', 'Teclado mecánico con switches verdes', 'teclado (4).png', 1, 4, 'https://www.razer.com/blackwidow-v3/', '44 x 16.4 x 4.2 cm', 110.00, NOW(), NOW()),
('Redragon Storm Elite', 'Mouse óptico de alta precisión', 'mouse (1).png', 2, 2, 'https://redragon.es/storm-elite/', '12.2 x 7.1 x 4 cm', 50.00, NOW(), NOW()),
('Logitech MX Master 3', 'Mouse inalámbrico avanzado', 'mouse (2).png', 2, 1, 'https://www.logitech.com/mx-master-3/', '12.5 x 8.4 x 5.1 cm', 100.00, NOW(), NOW()),
('Corsair Sabre RGB', 'Mouse gaming ultraligero', 'mouse (3).png', 2, 3, 'https://www.corsair.com/sabre-rgb/', '12.9 x 7 x 4.4 cm', 55.00, NOW(), NOW()),
('Razer Viper', 'Mouse gaming ambidiestro', 'mouse (4).png', 2, 4, 'https://www.razer.com/viper/', '12.6 x 6.7 x 3.8 cm', 65.00, NOW(), NOW()),
('Redragon Pandora H350', 'Auriculares RGB con micrófono', 'auriculares (1).png', 3, 2, 'https://redragon.es/pandora-h350/', '21 x 18 x 11 cm', 45.00, NOW(), NOW()),
('Logitech G433', 'Auriculares con sonido envolvente', 'auriculares (2).png', 3, 1, 'https://www.logitech.com/g433/', '18.2 x 18 x 8.4 cm', 80.00, NOW(), NOW()),
('Corsair Virtuoso RGB', 'Auriculares inalámbricos de alta fidelidad', 'auriculares (3).png', 3, 3, 'https://www.corsair.com/virtuoso-rgb/', '19 x 16 x 10 cm', 160.00, NOW(), NOW()),
('Razer Nari Ultimate', 'Auriculares con retroalimentación háptica', 'auriculares (4).png', 3, 4, 'https://www.razer.com/nari-ultimate/', '21 x 19 x 10 cm', 150.00, NOW(), NOW()),
('Redragon Draconic K530', 'Teclado mecánico compacto sin cables', 'teclado (1).png', 1, 2, 'https://redragon.es/draconic-k530/', '29 x 10 x 4 cm', 55.00, NOW(), NOW()),
('Logitech K380', 'Teclado compacto inalámbrico', 'teclado (2).png', 1, 1, 'https://www.logitech.com/k380/', '27.9 x 12.4 x 1.6 cm', 30.00, NOW(), NOW()),
('Corsair K63', 'Teclado mecánico compacto inalámbrico', 'teclado (3).png', 1, 3, 'https://www.corsair.com/k63/', '36 x 17 x 4 cm', 75.00, NOW(), NOW()),
('Razer Huntsman Mini', 'Teclado mecánico compacto con switches ópticos', 'teclado (4).png', 1, 4, 'https://www.razer.com/huntsman-mini/', '29 x 10 x 3.5 cm', 100.00, NOW(), NOW()),
('Redragon Griffin M607', 'Mouse gaming óptico RGB', 'mouse (1).png', 2, 2, 'https://redragon.es/griffin-m607/', '12 x 6.8 x 4 cm', 20.00, NOW(), NOW()),
('Logitech M720', 'Mouse inalámbrico multi-dispositivo', 'mouse (2).png', 2, 1, 'https://www.logitech.com/m720/', '11.5 x 7.4 x 4.5 cm', 40.00, NOW(), NOW()),
('Corsair Katar Pro', 'Mouse gaming compacto', 'mouse (3).png', 2, 3, 'https://www.corsair.com/katar-pro/', '11.5 x 6.7 x 3.8 cm', 35.00, NOW(), NOW()),
('Razer Atheris', 'Mouse inalámbrico compacto', 'mouse (4).png', 2, 4, 'https://www.razer.com/atheris/', '10 x 6.3 x 3.4 cm', 40.00, NOW(), NOW()),
('Redragon Ajax H230', 'Auriculares gaming de bajo costo', 'auriculares (1).png', 3, 2, 'https://redragon.es/ajax-h230/', '19.5 x 17.5 x 8 cm', 30.00, NOW(), NOW()),
('Logitech G332', 'Auriculares con sonido envolvente', 'auriculares (2).png', 3, 1, 'https://www.logitech.com/g332/', '18 x 17 x 8.5 cm', 45.00, NOW(), NOW()),
('Corsair Void Elite', 'Auriculares con sonido envolvente 7.1', 'auriculares (3).png', 3, 3, 'https://www.corsair.com/void-elite/', '22 x 19 x 10 cm', 80.00, NOW(), NOW()),
('Razer Tiamat 7.1', 'Auriculares con sonido envolvente 7.1', 'auriculares (4).png', 3, 4, 'https://www.razer.com/tiamat-7.1/', '22.5 x 18.5 x 11 cm', 200.00, NOW(), NOW());

INSERT INTO Users (firstName, lastName, email, password, category, profileImage, createdAt, updatedAt) VALUES 
('José', 'Pérez', 'jose.perez@gmail.com', '123', 'admin', 'imagen_perfil_1.jpeg', NOW(), NOW()),
('María', 'López', 'maria.lopez@gmail.com', '123', 'user', 'imagen_perfil_2.jpg', NOW(), NOW()),
('Carlos', 'Gómez', 'carlos.gomez@gmail.com', '123', 'user', 'imagen_perfil_3.jpg', NOW(), NOW());

INSERT INTO Colors (name) VALUES
('Rojo') -- 1
('Azul'), -- 2
('Negro'), -- 3
('Blanco'), -- 4
('Verde'), -- 5
('Amarillo'), -- 6
('Gris'), -- 7
('Naranja'); -- 8

INSERT INTO Product_Colors (product_id, color_id) VALUES 
(1, 4), (1, 3),
(2, 7),
(3, 1),
(4, 2), (4, 8),
(5, 4),
(6, 2), (6, 5),
(7, 3),
(8, 1), (8, 5),
(9, 3),
(10, 1), (10, 7),
(11, 4),
(12, 8), (12, 6),
(13, 3),
(14, 8), 
(15, 3),
(16, 7),
(17, 6),
(18, 4), 
(19, 7),
(20, 5),
(21, 8), 
(22, 1),
(23, 5),
(24, 2), 
(25, 3),
(26, 7), 
(27, 5),
(28, 8),
(29, 1), 
(30, 6),
(31, 2),
(32, 8), 
(33, 5),
(34, 4), 
(35, 6),
(36, 7),
(37, 3), 
(38, 5),
(39, 4), 
(40, 6),
(41, 2), 
(42, 3),
(43, 7), 
(44, 4),
(45, 8),
(46, 6), 
(47, 3),
(48, 5),
(49, 7),
(50, 1);