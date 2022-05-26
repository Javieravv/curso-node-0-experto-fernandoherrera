/**Manejo de express */

const express = require('express')
const app = express()
const port = 8080

// servir contenido estático
app.use ( express.static('public'))

app.get('/generic', function (req, res) {
  res.sendFile(__dirname + '/public/generic.html')
})

app.get('*', ( req, res) => {
    res.sendFile(__dirname + '/public/404.html')
})

app.listen(port, () => {
    console.log (`Servidor corriendo en el puerto ${ port }`)
})