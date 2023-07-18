const blogsRouter = require("express").Router()
const Blog = require("../models/blog")


/** Routes: HTTP requests */
// show all blogs saved to DB
blogsRouter.get("/", async (request, response) => { // 4.8 changed from promises to async/await
	/* PROMISES METHOD
    Blog
		.find({})
		.then(blogs => {
			response.json(blogs)
		}) */
    
    const blogs = await Blog // 4.8 changed from promises to async/await
        .find({})
        .then(blogs => {
            response.json(blogs)}) 
})

// add a blog to DB
blogsRouter.post("/", async (request, response) => {
	/* PROMISES METHOD
    const blog = new Blog(request.body)
	blog
		.save()
		.then(result => {
			response.status(201).json(result)
		}) */

    const blog = new Blog(request.body) 

    const savedBlog = await blog.save() //4.10
    response.status(201).json(savedBlog)
})

module.exports = blogsRouter