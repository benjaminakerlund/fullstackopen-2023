const Blog = require("../models/blog")
const User = require("../models/user")
const USer = require("../models/user")

const initialBlogs = [
    {
        title: "The Naked Chef",
        author: "Jamie Oliver",
        url: "www.nakedchef.com/notPorn",
        likes: 44,
    },
    {
        title: "How to not cook like old people f*ck",
        author: "Gordon Ramsay",
        url: "www.gordo_not_old.com/cookingblog",
        likes: 69,
    },
    {
        title: "Chefs vs. Wild",
        author: "Various Artists",
        url: "www.chefsvswild.com/signup",
        likes: 100,
    }
]

const nonExistingId = async () => {
    const blog = new Blog({ title: "WillRemoveThisSoon"})
    await blog.save()
    await blog.deleteOne()

    return blog.id.toString()   
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(r => r.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(r => r.toJSON())
}

module.exports = {
    initialBlogs,
    nonExistingId,
    blogsInDb,
    usersInDb
}