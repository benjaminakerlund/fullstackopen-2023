const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
	title: String,
	author: String,
	url: String,
	likes: Number
})

/*
  // Delete auto generated version numeber and modify ID to workable string
  blogSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject.id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
  }) */

module.exports = mongoose.model("Blog", blogSchema)