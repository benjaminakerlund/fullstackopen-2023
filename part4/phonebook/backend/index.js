/*
require("dotenv").config // take into use environmental variables from .env
const express = require("express")
var morgan = require("morgan")
const cors = require("cors")

const app = express()

// take into use middleware
app.use(express.static("build")) // added for front end deployment
app.use(express.json())
app.use(morgan("tiny"))
app.use(cors())

// run server
app.listen(config.PORT, () => {
	console.log(`Server running on port ${config.PORT}`)
})
*/

const app = require("./app")
const config = require("./utils/config")
const logger = require("./utils/logger")

app.listen(config.PORT, () => {
	logger.info(`Server running on port ${config.PORT}`)
})

