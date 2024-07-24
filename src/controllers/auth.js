const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

// Registrar un nuevo usuario
const register = async (req, res, next) => {
  const { name, lastname, email, username, password } = req.body;

  try {
    const user = new User({ name, lastname, email, username, password });
    await user.save();
    res.json({ message: "Registro exitoso" });
  } catch (error) {
    next(error);
  }
};

// Iniciar sesión con un usuario existente
const login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "Error en la autenticación. Usuario no encontrado." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Error en la autenticación. Contraseña incorrecta." });
    }

    const token = jwt.sign({ userId: user._id }, 'secret_key', {
      expiresIn: "1h",
    });
    res.json({ message: "Inicio de sesión exitoso. El usuario fue validado.", token });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
