const blogsRouter = require("express").Router()
const Blog = require("../models/blog")


/** Routes: HTTP requests */
// show all blogs saved to DB
blogsRouter.get("/", async (request, response) => {
	/* Blog
		.find({})
		.then(blogs => {
			response.json(blogs)
		}) */
        
    
    const blogs = await Blog
        .find({})
        .then(blogs => {
            response.json(blogs)}) 
})

// add a blog to DB
blogsRouter.post("/", (request, response) => {
	const blog = new Blog(request.body)

	blog
		.save()
		.then(result => {
			response.status(201).json(result)
		})
})

module.exports = blogsRouter