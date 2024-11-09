var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const methodOverride = require("method-override");
const session = require("express-session");

// Instanciar Express
var app = express();

// Importar rutas
var indexRouter = require("./src/routes/index");
var userRouter = require("./src/routes/userRoutes");
var productRouter = require("./src/routes/productRoutes");

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
  })
);

// Middleware de sesión para mostrar 'user' en todas las vistas
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// Crear rutas
app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/products", productRouter);

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
