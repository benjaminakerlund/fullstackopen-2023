require("dotenv").config() // take into use environmental variables from .env

const mongoose = require("mongoose")


const url = process.env.MONGODB_URI

mongoose.set("strictQuery",false)
mongoose.connect(url)


/** Create entry schema for DB entries contacts */
const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })
  
const Blog = mongoose.model('Blog', blogSchema)

const blog = new Blog ({
    name: "name1",
    author: "author1",
    url: "some-url",
    likes: 69
}) 

// command used to save data to (and create DB)
/*blog.save()
    .then(() => {
        console.log(`Blog by ${blog.author} saved to DB.`)
        mongoose.connection.close()
    })*/


// Command used to show contents of DB
Blog.find({})
    .then(result => {
        result.forEach(blog => {
            console.log(blog)
		})
    mongoose.connection.close()
    })