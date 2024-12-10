const { findUserByEmail } = require("../../service/userRepository");
const { verifyPassword } = require("../../service/password");

const checkUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).json({ error: "El correo no está registrado." });
    }

    const isPasswordValid = await verifyPassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Contraseña incorrecta." });
    }

    return res.status(200).json({ message: "Credenciales válidas." });
  } catch (error) {
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

const checkEmail = async (req, res) => {
  const { email, currentEmail } = req.body;

  try {
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(200).json({ msg: "El correo no está registrado." });
    }

    if (email === currentEmail) {
      return res
        .status(200)
        .json({ msg: "Correo actual del usuario logueado." });
    }

    return res.status(404).json({ msg: "Correo en uso.", email: email });
  } catch (error) {
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

module.exports = { checkUser, checkEmail };
