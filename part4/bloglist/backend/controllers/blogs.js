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

    // 4.12*? adding error handling
    if (blog.title && blog.url) {
        const savedBlog = await blog.save() //4.10
        response.status(201).json(savedBlog)
    } else {
        response.status(400).end()
    } 

})

// This is extra???
blogsRouter.get("/:id", async (request, response, next) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.json(blog)
    } else {
        response.status(404).end()
    } 

})

blogsRouter.delete("/:id", async (request, response, next) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()  
})

module.exports = blogsRouter