require("dotenv").config // take into use environmental variables from .env
const express = require("express")
var morgan = require("morgan")
const cors = require("cors")
const static = require("static") // frontend deployment
const Contact = require("./models/contact") // connect to DB
const app = express()

/** Middleware calls*/
app.use(express.static("build")) // added for front end deployment
app.use(express.json())
app.use(morgan("tiny"))
app.use(cors())

/* Hard coded phonebook values for testing purposes
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
] */

/* Routes: HTTP requests
* GET
    * 3.1 - return all numbers stored in api/persons
    * 3.2 - return info page
    * 3.3 - return single person from list of persons
* DELETE
    * 3.4 - delete a single phonebook entry with HTTP DELETE request to unique URL of that entry
* POST
    * 3.5 - add new phonebook entry by making HTTP POST request
    * 3.6 - implement error handling for missing name and number or when entry is already made in phonebook
*/
app.get("/api/persons", (request, response) => { // 3.13
	Contact.find({}).then(contacts => {
		response.json(contacts)
	})
})

app.get("/info", (request, response) => { //3.18* modifications to support DB
	Contact
		.count()
		.then(count => {
			console.log("This is count: ", count)
			const sendInfo = `
                <div>
                    <br>Phonebook has info for ${count} people</br>
                    <br>${Date()}</br>
                </div>`
			response.send(sendInfo)
		})
})

app.get("/api/persons/:id", (request, response, next) => { // 3.18* DONE and working (had to add next)
	Contact
		.findById(request.params.id)
		.then(contact => {
			if (contact) {
				response.json(contact)
			} else {
				response.status(404).send({ error: "This person doesn't exist." }) // 404 = not found
			}
		})
		.catch(error => next(error)) // 3.16 moving error handling to middleware
})

app.delete("/api/persons/:id", (request, response, next) => { // 3.15 fixed delete route (had to add next)
	Contact
		.findByIdAndRemove(request.params.id)
		.then(() => {
			console.log("Number deleted")
			response.status(204).end()
		})
		.catch(error => next(error))
})

app.post("/api/persons", (request, response, next) => { // 3.19 added validation (had to add next)
	const body = request.body

	// Create new contact
	const contact = new Contact ({ // modified for DB
		name: body.name,
		number: body.number,
	})

	// Save contact to DB
	contact.save()
		.then(savedContact => {
			response.json(savedContact)
		})
		.catch(error => next(error))
})

app.put("/api/persons/:id", (request, response, next) => { // 3.17* Modify the backend to support requests for PUT
	const newNumber = request.body.number
	const requestId = request.params.id

	Contact
		.findByIdAndUpdate(requestId,
			{ number: newNumber },
			{ new: true, runValidators: true, context: "query" } // 3.19 add validation also when updating
		)
		.then(() => {
			console.log("Updated number for: ", request.body.name, "to: ", newNumber)
			response.status(200).end()
		})
		.catch(error => next(error))
})

/* Middleware to catch requests made to non-existent routes resulting in an error message */
const unknownEndpoint = (request, response) => {
	response.status(404).send({
		error: "unknown endpoint"
	})
}

/* Middleware to catch errors */
const errorHandler = (error, request, response, next) => {
	console.error(error.message)

	if (error.name === "CastError") {
		return response.status(400).send({ error: "malformatted id" })
	}
	else if (error.name === "ValidationError") {
		return response.status(400).json({ error: error.message })
	}

	next(error)
}

/* More middleware calls... */
app.use(unknownEndpoint) // unknownEndPoint error handler always needs to be second to last if error handling present
app.use(errorHandler) // 3.18*, error handling middleware has to be loaded last!


/* Run server */
const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
