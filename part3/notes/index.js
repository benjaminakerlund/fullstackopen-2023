const express = require('express')
const app = express()

// take json-parser into use
app.use(express.json())

// Hard coded notes for test purposes, should be changed in the future to a db
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
        content: "GET and POST are the most important methods of HTTP proocol",
        important: true
    }
]

// useful functions as of now in here...
const generateId = () => { // used in post request
    const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
    return maxId + 1
}




// HTTP requests
// Get front page of API
app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})
  
// Get all notes
app.get('/api/notes', (request, response) => {
    response.json(notes)
})

// Get specific note
app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)

    if (note) {
        response.json(note)
    } else {
        response.status(404).send("Page does not exist...").end()
    }
  })

// Add a new note
// Method for adding id is not recommended, will be changed later. It finds the largest id and adds +1 to it for the new one
app.post('/api/notes', (request, response) => {
    const body = request.body

    if (!body.content) {
        return response.status(400).json({
            error: "content missint"
        })
    }

    const note = {
        content: body.content,
        important: body.important || false, // || operator is or, giving the default value of false if no importancy is defined.
        id: generateId()
    }

    notes = notes.concat(note)
    response.json(note)    
})
  
// Delete a note
app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

