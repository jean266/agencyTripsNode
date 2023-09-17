
import express from "express";
import router from "./routes/index.js";
import db from "./config/db.js";

const app = express();

// Conectar a la base de datos
db.authenticate()
    .then( () => console.log("Base de datos autenticada"))
    .catch(error => console.error(error))

// Definir puerto
const port = process.env.PORT || 4001;

// Habilitar PUG
app.set("view engine", "pug");

// Obtener el año actual
app.use( (req, res, next) => {
    const year = new Date();
    res.locals.currentYear = year.getFullYear();
    res.locals.nameWebsite = "Agencia de Viajes";
    next();
});

// Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

// Definir la carpeta public
app.use(express.static("public"));

// Agregar un router
app.use("/", router);

app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
});