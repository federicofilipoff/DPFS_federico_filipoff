// Por si solas las validaciones (/validators/) no se muestran al usuario,
// se deben asociar a la ruta como middleware y enviar por controlador.
const { validationResult } = require("express-validator");
const db = require("../database/models"); // "db" contiene todos los modelos
const bcrypt = require("bcrypt"); // encriptar contraseña ("hashing")

// CREAR OBJETO CON LOS CONTROLADORES
let authController = {
  login: function (req, res) {
    return res.render("users/login");
  },
  // ------------------------------------------------------------------------
  authenticate: function (req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, rememberMe } = req.body;

    db.User.findOne({ where: { email } })
      .then(function (data) {
        if (!data || !bcrypt.compareSync(password, data.password)) {
          return res.render("users/login", {
            error: "Correo o contraseña incorrectos.",
          });
        }

        req.session.user = {
          id: data.id,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          category: data.category,
          profileImage: data.profileImage,
        };

        if (rememberMe) {
          res.cookie("rememberMe", data.id, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
          });
        }

        return res.redirect(`/users/${data.id}`);
      })
      .catch(function (error) {
        console.error(error);
        return res.status(500).render("error", {
          message: "Ocurrió un problema. Inténtalo más tarde.",
        });
      });
  },
  // ------------------------------------------------------------------------
  logout: function (req, res) {
    req.session.destroy((error) => {
      if (error) {
        console.error("Error al destruir la sesión:", error);
        return res.status(500).send("Error al cerrar sesión");
      }
      res.clearCookie("rememberMe");
      return res.redirect("/");
    });
  },
  // ------------------------------------------------------------------------
  checkUser: async function (req, res) {
    const { email, password } = req.body;

    try {
      //Verificar que el correo exista.
      const user = await db.User.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({ error: "El correo no está registrado." });
      }

      const isPasswordValid = bcrypt.compareSync(password, user.password);

      // Si el usuario existe: verifica que la contraseña corresponda.
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Contraseña incorrecta." });
      }

      return res.status(200).json({ message: "Credenciales válidas." });
    } catch (error) {
      return res.status(500).json({ error: "Error interno del servidor." });
    }
  },
  // ------------------------------------------------------------------------
  checkEmail: async function (req, res) {
    const { email, currentEmail } = req.body; // currentEmail viene del front-end
    try {
      // Buscar usuario por email
      const user = await db.User.findOne({ where: { email } });

      if (!user) {
        return res.status(200).json({ msg: "El correo no está registrado." });
      }

      // Si el correo pertenece al usuario logueado, no es un error
      if (email === currentEmail) {
        return res
          .status(200)
          .json({ msg: "Correo actual del usuario logueado." });
      }

      return res.status(404).json({ msg: "Correo en uso.", email: email });
    } catch (error) {
      return res.status(500).json({ error: "Error interno del servidor." });
    }
  },
};

module.exports = authController;
