const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
	title: {
        type: String,
        minLength: 3,
        required: [true, "Each blog entry has to have a title."]
    },
	author: String,
	url: String,
	likes: {
        type: Number,
        default: 0 // 4.11*
    }
})


// Delete auto generated version numeber and modify ID to workable string
blogSchema.set("toJSON", { // 4.9
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model("Blog", blogSchema)