require("dotenv").config() // take into use environmental variables from .env


const mongoose = require("mongoose")

mongoose.set("strictQuery", false)


const url = process.env.MONGODB_URI

console.log("connecting to", url)

mongoose.connect(url)
	.then(() => {
		console.log("connected to MongoDB")
	})
	.catch((error) => {
		console.log("error connecting to MongoDB:", error.message)
	})

const contactSchema = new mongoose.Schema({
	// 3.19?? adding validation to schema!
	name: {
		type: String,
		minLength: 3, // 3.19* expand validation
		required: true
	},
	number: { //3.20* adding validation to phone numbers
		type: String,
		minLength: 8, //3.20*
		required: [true, "User phone number required"], //3.20*
		validate: {
			validator: function(v) { //3.20* custom validator
				//Found a regex test for finnish phone numbers online here: https://regex101.com/library/ffGtsW
				// I modified it a bit so it also accepts the 09 format.
				// This one also checks that all characters are numbers!
				const regexTestFin = /^((04[0-9]{1})(\s?|-?)|050(\s?|-?)|09(\s?|-?)|0457(\s?|-?)|[+]?358(\s?|-?)50|0358(\s?|-?)50|00358(\s?|-?)50|[+]?358(\s?|-?)4[0-9]{1}|0358(\s?|-?)4[0-9]{1}|00358(\s?|-?)4[0-9]{1})(\s?|-?)(([0-9]{3,4})(\s|\-)?[0-9]{1,4})$/gm.test(v)
				return regexTestFin
			},
			message: props => `${props.value} is not a valid phone number!` //3.20*
		}
	}
})

contactSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})


module.exports = mongoose.model("Contact", contactSchema)
