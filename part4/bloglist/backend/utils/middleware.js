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
	} else if (error.name === "ValidationError") {
		return response.status(400).json({ error: error.message })
	} else if (error.name === "JsonWebTokenError") {
        return response.status(401).json({ error: "invalid token" })
    } else if (error.name === "TokenExpiredError") {
        return response.status(401).json({ error: "token expired" })
    }

	next(error)
} 

// 4.20* put token request function into middle ware
const tokenExtractor = request => { // 4.18
    const authorization = request.get("authorization")
    if (authorization && authorization.startsWith("Bearer ")) {
        return authorization.replace("Bearer ", "")
    }
    return null
}



module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler,
    tokenExtractor
}