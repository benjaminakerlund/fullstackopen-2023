const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const Blog = require("../models/blog")

const api = supertest(app) // wrap the express application with a supertest function into a superagent object

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

// reset the database to the same state before each test is run
beforeEach(async () => {
    await Blog.deleteMany({})
    
    for (i=0; i < initialBlogs.length; i++) { // Post each initialBlog to DB
        blogObject = new Blog(initialBlogs[i])
        await blogObject.save()
    }
})

test("011 Blogs are returned as JSON", async() => { // 4.8
    await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/)
}, 100000) // add a time limit for the tests

test("012 All blogs are returned", async() => { // 4.8
    const response = await api.get("/api/blogs")

    expect(response.body)
        .toHaveLength(initialBlogs.length)
})

test("013 The first blog is about nudity", async() => { // 4.8 kind of
    const response = await api.get("/api/blogs")

    expect(response.body[0].title) 
        .toBe("The Naked Chef") 
})

test("014 A specific blog is within the returned blogs", async() => { // 4.8 kind of
    const response = await api.get("/api/blogs")

    const contents = response.body.map(r => r.title)
    expect(contents)
        .toContain("Chefs vs. Wild")
}) 

test("015 Test that the unique identifier property if the blog posts is named id and not", async() => { // 4.9
    const response = await api.get("/api/blogs")

    expect(response.body[0].id) 
        .toBeDefined()
})


test("016 Verify that the POST request to the base url succesfully creates a new blog post", async() => { // 4.10
    const testData = {
        "title": "The testy chef",
        "author": "E. Jack Ulate",
        "url": "www.meatspin.com"
    }
    
    await api
        .post("/api/blogs")
        .send(testData)
        .expect(201) // testing returned code
        .expect('Content-Type', /application\/json/) // testing type of returned data
        
    const response = await api.get("/api/blogs")
    const titles = response.body.map(r => r.title)

    expect(response.body) // testing that a new blog item was added to list and the length of blogs has increased
        .toHaveLength(initialBlogs.length + 1) 

    expect(titles)
        .toContain("The testy chef") // testing specific content being added to bloglist
})

afterAll(async() => {
    await mongoose.connection.close()
})
