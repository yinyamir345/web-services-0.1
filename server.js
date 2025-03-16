const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors"); // Para permitir solicitudes CORS
const app = express();
app.use(express.json());
app.use(cors()); // Habilitar CORS

// Conectar a la base de datos
mongoose
  .connect("mongodb://localhost:27017/miBaseDeDatos", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conectado a la base de datos"))
  .catch((err) => console.error("Error al conectar a la base de datos:", err));

// Definir un esquema de usuario
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

// Endpoint para registro
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  // Verificar si el usuario ya existe
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res
      .status(409)
      .send("El usuario ya existe. Por favor elige otro nombre de usuario.");
  }

  // Cifrar la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword });
  await user.save();
  res.status(201).send("Usuario registrado");
});

// Endpoint para inicio de sesión
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.send("Inicio de sesión exitoso");
  } else {
    res.status(400).send("Usuario o contraseña incorrectos");
  }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
