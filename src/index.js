const express = require('express');
const mongoose = require("mongoose");
const userRoute = require("./routes/user");

const app = express();

app.use(express.json());
app.use("/api", userRoute);

app.get('/', (req, res) => {
    res.send('Bienvenido a la API');
});

mongoose
    .connect('mongodb+srv://diegoaborraezb:1019985835@serverapi.el4kp8b.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log("Conectado a MongoDB Atlas"))
    .catch((error) => console.error(error));

app.listen(10000, () => {
    console.log('Servidor corriendo en http://localhost:10000');
});

