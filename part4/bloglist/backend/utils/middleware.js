const logger = require("./logger")

/* Custom request logger */
const requestLogger = (request, response, next) => {
	logger.info("Method: ", request.method)
	logger.info("Path:   ", request.path)
	logger.info("Body:   ", request.body)
	next()
} // not yet used !!!

/* Middleware to catch requests made to non-existent routes resulting in an error message */
const unknownEndpoint = (request, response) => {
	response.status(404).send({
		error: "unknown endpoint"
	})
} //

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
} // not yet used !!!



module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler
}