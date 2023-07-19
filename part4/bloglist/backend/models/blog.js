const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
	title: {
        type: String,
        required: [true, "Each blog entry has to have a title."] //4.12*
    },
	
    author: {
        type: String
    },
	
    url: {
        type: String,
        required: true //4.12* - This should work but for some reason keeps running the test on forever...
    },
	
    likes: {
        type: Number,
        default: 0 // 4.11*
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
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