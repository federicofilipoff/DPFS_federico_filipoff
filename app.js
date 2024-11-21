var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const methodOverride = require("method-override");
const session = require("express-session");
const rememberMiddleware = require("./src/middlewares/rememberMiddleware");
const cors = require("cors");

// Instanciar Express
var app = express();

// Permitir conecciones de Vite
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Importar rutas
var indexRouter = require("./src/routes/web/index");
var usersRoutes = require("./src/routes/web/usersRoutes");
var productsRoutes = require("./src/routes/web/productsRoutes");
var usersApi = require("./src/routes/api/usersApi");
var productsApi = require("./src/routes/api/productsApi");

// view engine setup
app.set("views", path.join(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

app.use(
  session({
    secret: "DHproyectoFullStack", // Crear variable de entorno en un futuro
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // Semana en milisegundos
    },
  })
);

// Middlware para recordar sesión
app.use(rememberMiddleware);

// Middleware de sesión para mostrar 'user' en todas las vistas
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// Crear rutas
app.use("/", indexRouter);
app.use("/users", usersRoutes);
app.use("/products", productsRoutes);
app.use("/api/users", usersApi);
app.use("/api/products", productsApi);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
