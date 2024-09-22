const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Registrar usuario
router.get('/register', (req, res) => {
    res.render('../views/users/register.ejs')
})

router.post('/register', async (req, res) => {

    try {
        const user = await User.create(req.body);
        res.json(user);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al guardar el usuario' });
    }
});
  

// 
router.get('/login', (req, res) => {
    res.render('../views/users/login')
})

// Exportar rutas
module.exports = router;
