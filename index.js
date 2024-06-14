// Se importa el módulo de express
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

/* Posibles soluciones al problema de req.body = {}
1. poner console.log en cada uno de los lugares donde aparezca req.body para debuggear la app
2. buscar el problema en google
*/

// La función express() se asigna a la variable app
const app = express()

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

// Al enviar la información de la nueva nota en el body de la solicitud en formato JSON
app.use(express.json()) // Para poder acceder a los datos fácilmente. Es el json parser de express

// Middleware CORS para habilitar solicitudes cruzadas legítimas
app.use(cors())

// Implementando un middleware. Recibe tres parametros (req, res, next)
const requestLogger = (req, res, next) => {
    console.log('Method: ', req.method)
    console.log('Path: ', req.path)
    console.log('Body: ', req.body)
    console.log('---')
    next()
}

// Definir un token personalizado para Morgan
morgan.token('info', function (req, res) {
    return JSON.stringify(req.body)
});

// Configurar Morgan para usar el token personalizado
app.use(morgan(':method :info :url'))

app.use(requestLogger)


// Se define la primera ruta a la raíz de la apicación (/). req -> contiene toda la info de la solicitud http. res-> es para definir como se responde a la solicitud
app.get('/', (req, res) => {
// Envío de respuesta, express establece automaticamente el valor de la cabecera (header) Content-Type en text/html. El código de estado de la respuesta predeterminado es 200
res.send('<h1>Hello World!</h1>')
})


// La segunda ruta define un controlador de eventos que maneja las solicitudes get a la ruta /notes de la api
app.get('/api/notes', (req, res) => {
// Se responde con el método .json del objeto response(res). Express establece automaticamente el header en application/json, se convierte el objeto notes en json (string).
res.json(notes)
})

// Se crea una ruta para para buscar un solo recurso (notes/id)
app.get('/api/notes/:id', (req, res) => { // la parte /:id puede ser cualquier cosa (SOMETHING), una cadena arbitraria
    // Se accede al parametro id de la ruta a travéz del objeto req (request), se declara como Number ya que al ser json (cadena) no funcionaria el método .find para encontrar la nota
    const id = Number(req.params.id)
    const note = notes.find(note => note.id === id) // Se busca una nota con el id que coincida con el parametro
    if (note){
        res.json(note) // Se devuelve la nota al remitente de la solicitud
    } else {
        res.status(404).end() // Método status para establecer el estado y end para responder la solicitud sin devolver ningún dato
    }
   
})

// La ruta para borrar un único elemento, es similar a la ruta de buscar un solo recurso
app.delete('/api/notes/:id', (req,res) => {
    const id = Number(req.params.id)
    notes = notes.filter(note => note.id !== id)

    res.status(204).end() // Si la eliminación de la nota fue exitosa (la nota existe y se elimina), se response con el código 204 no content y no se devuelven datos con la respuesta
})

// Agregar nuevas notas al SV con POST

const generateId = () => {
    const maxId = notes.length > 0 
        ? Math.max(...notes.map(n => n.id))
        : 0

    return maxId + 1
}

app.post('/api/notes', (req, res) => {
    const body = req.body

    // Devolver 404 not found si la propiedad content de los datos recibidos no tiene contenido
    if(!body.content){
        return res.status(404).json({
            error: 'Content missing'
    })
    }

    const note = {
        content: body.content,
        important: Boolean(body.important) || false,
        id: generateId()
    }

    notes = notes.concat(note) // Añadir la nota al array de notas

    res.json(note) // Devolver los datos recibidos como json
})

// Middleware para capturar solicitudes a rutas inexistentes
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

// Se llama al middleware de las rutas inexistentes
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
 