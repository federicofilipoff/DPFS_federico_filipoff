const express = require('express');
const router = express.Router();
const User = require('../models/User');


// [1] RUTA: LEER USUARIOS
router.get('/', async (req, res) => {

    try {
      const usuarios = await User.findAll();
      res.json(usuarios);
    } catch (err) {
      res.status(500).send('Error al leer la base de datos');
    }

});

// [2] RUTA: FORMULARIO PARA CREAR USUARIO
router.get('/create', (req, res) => {
    res.render('../views/users/register.ejs')
})

// [3] RUTA: LEER USUARIO SEGÚN SU ID
router.get('/:id', async (req, res) => {

    try {
      const usuario = await User.findByPk(req.params.id);
      if (!usuario) {
        return res.status(404).send('Usuario no encontrado');
      }
      res.json(usuario);
    } catch (err) {
      res.status(500).send('Error al leer la base de datos');
    }

});

// [4] RUTA: CREAR USUARIO
router.post('/', async (req, res) => {

    try {
      const { firstName, lastName, email, password, category } = req.body;
  
      // Crear un nuevo usuario
      const nuevoUsuario = await User.create({
        firstName,
        lastName,
        email,
        password,
        category
      });
  
      res.status(201).json(nuevoUsuario);
    } catch (err) {
      res.status(500).send('Error al crear el usuario');
    }

});

// [5] RUTA: FORMULARIO EDITAR USUARIO
router.get('/:id/edit', async (req, res) => {
    try {
        const usuario = await User.findByPk(req.params.id);
        if (!usuario) {
            return res.status(404).send('Usuario no encontrado');
        }
        res.render('../views/users/editar.ejs', { usuario });
        } catch (err) {
        res.status(500).send('Error al leer la base de datos');
    }
});

// [6] RUTA: EDITAR USUARIO
router.put('/:id', async (req, res) => {
  try {
      const usuario = await User.findByPk(req.params.id);
      if (!usuario) {
          return res.status(404).send('Usuario no encontrado');
      }
      const { firstName, lastName, email, password, category } = req.body;
      await usuario.update({ firstName, lastName, email, password, category });
      res.json(usuario);
  } catch (err) {
      res.status(500).send('Error al actualizar el usuario');
  }
});

// [7] RUTA: ELIMINAR USUARIO
router.delete('/:id', async (req, res) => {
  try {
      const usuario = await User.findByPk(req.params.id);
      if (!usuario) {
          return res.status(404).send('Usuario no encontrado');
      }
      await usuario.destroy();
      res.status(204).send();
  } catch (err) {
      res.status(500).send('Error al eliminar el usuario');
  }
});

// Exportar rutas
module.exports = router;
