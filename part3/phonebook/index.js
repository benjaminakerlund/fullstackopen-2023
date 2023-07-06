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
    * 3.2 - return 
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


/* Run server */
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
