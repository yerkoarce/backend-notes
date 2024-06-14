// Este archivo fue de muestra, el proyecto se pasó a realizar con express, se conserva de forma educativa.

const http = require('http')

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ]

// Se crea el SV con el método createServer del módulo http
const app = http.createServer((req, res) => { 
    // La solicitud se responde con el código 200 con la cabecera (header) Content-Type establecida en text/plain 
    // La cabecera pasa a ser Content-Type establecida en application/json mas adelante para mostrar notes 
    res.writeHead(200, {"Content-Type": "application/json"})
    // El contenido del sitio se devolverá establecido en Hello World.
    // Se envía al SV el objeto notes convertido en JSON (formato de intercambio de datos ligero y comprensible)
    res.end(JSON.stringify(notes))
})

const PORT = 3001
// Se enlaza el servidor http asignado a la variable app para escuchar las solicitudes 
// http enviadas al PORT (3001)
app.listen(PORT)
console.log(`Server running on port ${PORT}`)