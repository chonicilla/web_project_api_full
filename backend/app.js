require("dotenv").config();

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const usersRoutes = require("./routes/users");
const cardsRoutes = require("./routes/cards");
const { login, createUser } = require("./controllers/users");
const auth = require("./middlewares/auth");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const errorHandler = require("./middlewares/error-handler");
const { validateSignin, validateSignup } = require("./middlewares/validation");
const createError = require("./utils/errors");

const app = express();
const { PORT = 3000, MONGO_URL = "mongodb://localhost:27017/aroundb" } =
  process.env;

mongoose.connect(MONGO_URL);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error de conexión a MongoDB:"));
db.once("open", () => {
  console.log("Conectado exitosamente a MongoDB");
});

app.use(express.json());
app.use(cors());
app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("El servidor va a caer");
  }, 0);
});

app.post("/signin", validateSignin, login);
app.post("/signup", validateSignup, createUser);

app.use(auth);

app.use("/", usersRoutes);
app.use("/", cardsRoutes);

app.use((req, res, next) => {
  next(createError(404, "Recurso solicitado no encontrado"));
});

app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
