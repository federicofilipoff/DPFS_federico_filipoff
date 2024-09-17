const express = require('express')
const path = require('path');
const app = express()
const port = 3000

// Configurar EJS como el motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));


// Definir rutas
app.get('/', (req, res) => {
  res.render('index')
})

app.get('/register', (req, res) => {
  res.render('register')
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.listen(port, () => {
  console.log(`Ejecutando servidor en el puerto ${port}`)
})

