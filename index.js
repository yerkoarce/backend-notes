// Importar modulo de express y asignarlo a una const
const express = require('express')
const cors = require('cors')
const app = express()

// Para acceder a los datos fácilmente (para definir la propiedad body)
// json-parser
app.use(express.json())
app.use(cors())

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
  

  // Elemento raíz
  app.get('/', (request, response)=> {
    response.send('<h1>Hello World!</h1>')
  })

  // Cargar todas las notas 
  app.get('/api/notes', (request, response) => {
    response.json(notes)

  })

  // Tener acceso cada una de las notas por si solas
  app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => {
      console.log(note.id, typeof note.id, id, typeof id, note.id === id)
      return note.id === id
    })
    
    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
  })

  // Borrar una de las notas 
  app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
  
    response.status(204).end()
  })

  // Agregar nuevas notas al servidor 
  const generateId = () => {
    const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
  }

  app.post('/api/notes', (request, response)=> {
    const body = request.body

    if (!body.content){
      return response.status(400).json({
        error: 'constent missing'
      })
    }

    const note = {
      content: body.content,
      important: Boolean(body.important) || false,
      id: generateId(),
    }

    notes = notes.concat(note)

    response.json(note)
  })

  
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
