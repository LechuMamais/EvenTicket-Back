require("dotenv").config();
const express = require('express');
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const { connectDB } = require("./src/config/db");
const eventsRouter = require("./src/api/routes/events");
const usersRouter = require("./src/api/routes/users");
const ManageAssistanceRouter = require("./src/api/routes/manageAssitance");

const app = express();

// Inicializar la aplicación Express
connectDB();
app.use(express.json());
// Definición del middleware CORS personalizado
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // o el origen específico desde donde se realizan las solicitudes
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Middleware para configurar las cabeceras CORS
/*app.use(cors({
  origin: 'https://even-ticket-8dgto7diw-lechumamais-projects.vercel.app', // Puedes cambiar esto según el origen desde donde se realizan las solicitudes
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));*/

// Definición de las rutas del API
app.use("/api/events", eventsRouter);
app.use("/api/users", usersRouter);
app.use("/api/manageAssistance", ManageAssistanceRouter);

// Ruta de prueba de ping
app.use("/api/ping", (req, res, next) => {
    return res.status(200).json("pong");
});

// Ruta de prueba de acceso
app.use("/api", (req, res, next) => {
    return res.status(200).json("Acceso correcto al backend");
});

// Manejo de rutas no encontradas
app.use("*", (req, res, next) => {
    return res.status(404).json("Route Not Found");
});

// Escuchar en el puerto 3000
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
