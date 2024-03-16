const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://YerkoArceGalaz:${password}@noteapp.vozi3eq.mongodb.net/?retryWrites=true&w=majority&appName=noteApp`

mongoose.set('strictQuery',false)
mongoose.connect(url)

// El sqchema le dice a mongoose como se guardan los objetos
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

// La app crea un objeto de nota con la ayuda del modelo Note
// const note = new Note({
//   content: 'HTML is Easy',
//   important: true,
// })

// // Guardar el objeto en la base de datos con .save()
// note.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })


// Para recuperar datos de la base de datos
// Con el método find de el modelo Note
Note
  .find({})
  .then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})