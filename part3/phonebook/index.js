const express = require('express')
const app = express()

/* take json-parser into use */
app.use(express.json())

/* Hard coded phonebook values for testing purposes */ 
let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

/* HTTP requests
* GET 
    * return front page of api
    * 3.1 - return all numbers stored in api/persons 
    * 3.2 - return info page
    * 3.3 - return single person from list of persons
*/
app.get('/', (request, response) => { 
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => { //3.1
    response.json(persons)
})

app.get('/info', (request, response) => { //3.2
    const sendInfo = `
        <div>
            <br>Phonebook has info for ${persons.length} people</br>
            <br>${Date()}</br>
        </div>`
    response.send(sendInfo)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).send("Number does not exist...").end()
    }
  })


/* Run server */
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
