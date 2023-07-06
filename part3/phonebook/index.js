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
    },
    {
        "id": 5,
        "name": "tester",
        "number": "12345"
    }
]

/* HTTP requests
* GET 
    * 3.0 - return front page of api
    * 3.1 - return all numbers stored in api/persons 
    * 3.2 - return info page
    * 3.3 - return single person from list of persons
* DELETE
    * 3.4 - delete a single phonebook entry with HTTP DELETE request to unique URL of that entry
* POST
    * 3.5 - add new phonebook entry by making HTTP POST request 
    * 3.6 - implement error handling for missing name and number or when entry is already made in phonebook
*/
app.get('/', (request, response) => { // 3.0
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

app.get('/api/persons/:id', (request, response) => { //3.3
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).send("Number does not exist...").end()
    }
  })

app.delete('/api/persons/:id', (request, response) => { //3.4
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => { //3.5
    const body = request.body

    // Input error handling
    if (!body.name) { //3.6
        return response.status(400).json({
            error: "Name missing"
        })
    } else if (!body.number) { //3.6
        return response.status(400).json({
            error: "Number missing"
        })
    }
    else if (persons.find(p => p.name === body.name)) { // 3.6 name already in persons
        return response.status(400).json({
            error: "Person already exists in phonebook"
        })
    }

    const person = { //3.5
        name: body.name,
        number: body.number,
        id: Math.floor(10 + (Math.random() * 100000)) // give random id between 10->100 000 (to not create duplicates with hardcoded entries)
    }
    persons = persons.concat(person)
    response.json(person)    
})

/* Run server */
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
