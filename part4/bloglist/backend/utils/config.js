require("dotenv").config() // take into use environmental variables from .env

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI

module.exports = {
	MONGODB_URI,
	PORT
}
