const mongoose = require('mongoose')

if (process.argv.length < 3){
    console.log('Give password as argument')
    process.exit(1)
}

const password = process.argv[2] // Password ingresada en la terminal como 3er argumento

const url = `mongodb+srv://yerkoarce:${password}@cluster-fso.dxtwdof.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster-FSO` // Cadena de conección a la base de datos 

mongoose.set('strictQuery', false) // Configura opciones globales de Mongoose, En este caso deshabilita los filtros de consulta extricta contra el schema del modelo

mongoose.connect(url) // Para establecer la coneccion con la base de datos 

// Se define el schema de la nota 
const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean
})

// Se define el modelo. Es una envoltura para el schema que permite interactuar con la base de datos 
// Mongoose.model('nombre-del-modelo', schema-asociado)
const Note = mongoose.model('Note', noteSchema)

/* 

// Se crea un nuevo objeto con la ayuda del modelo 
const note = new Note({
    content: 'HTML is easy',
    important: true
})

// Se guarda en la base de datos.
// El resultado de la operación se guarda en el parámetro result. Puede servir para depurar o imprimir el objeto en consola.
note.save().then(result => {
    console.log('Saved')
    mongoose.connection.close() // Hay que serrar la conexión, sino, nunca termina la ejecución
})

*/

// recupera las notas de la base de datos con el método find del modelo Note. Al ser un objeto vacpio ({}) recupera todas las notas. Se puede restringir la búsqueda... Ej: ({ important: true })
Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})