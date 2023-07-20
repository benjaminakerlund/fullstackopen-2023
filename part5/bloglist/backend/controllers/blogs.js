const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require("jsonwebtoken") // 4.18


/** Routes: HTTP requests */
// show all blogs saved to DB
blogsRouter.get("/", async (request, response) => { // 4.8 changed from promises to async/await
    const blogs = await Blog // 4.8 changed from promises to async/await
        .find({}).populate("user", {username: 1, name: 1})
        .then(blogs => {
            response.json(blogs)}) 
})

// add a blog to DB
blogsRouter.post("/", async (request, response, next) => {
    const body = request.body

    // 4.18 addition, user token 
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token && !decodedToken.id) {
        return response.status(401).json({ error: "token missing or invalid"})
    }

    console.log("This is decodedToken:", decodedToken)
    /*const user = await User.findById(body.userId) */
    const user = await User.findById(decodedToken.id) // edited in 4.18

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user.id
    }) 

    // 4.12*? adding error handling
    if (body.title && body.url) {
        const savedBlog = await blog.save() //4.10
        user.blogs = user.blogs.concat(savedBlog.id)
        await user.save()
        response.status(201).json(savedBlog)
    } else {
        response.status(400).end()
    } 

})

/* 4.13 Implement functionality for deleting a single blog post resource */
blogsRouter.delete("/:id", async (request, response, next) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()  
})

/* 4.14 implement functionality for updating the information of an individual blog post */
blogsRouter.put("/:id", async (request, response, next) => {
    const blog = request.body

    Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        .then(updatedBlog => {
            console.log("Updated information for: ", request.body, " to: ", blog)
            response.status(200).json(updatedBlog)
        })
        .catch(error => next(error))
})


// Extra?
blogsRouter.get("/:id", async (request, response, next) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.json(blog)
    } else {
        response.status(404).end()
    } 
})

module.exports = blogsRouter