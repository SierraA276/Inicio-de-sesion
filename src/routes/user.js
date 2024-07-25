const express = require("express");
const { register, login } = require("../controllers/auth");
const { authenticate } = require("../middlewares/auth");
const userSchema = require("../models/user");

const router = express.Router();

// Rutas de autenticación
router.post("/register", register);
router.post("/login", login);

// Ruta protegida para obtener todos los usuarios
router.get("/users", authenticate, async (req, res) => {
  try {
    const users = await userSchema.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
