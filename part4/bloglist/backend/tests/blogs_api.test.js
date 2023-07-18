const mongoose = require("mongoose")
const supertest = require("supertest")
const helper = require("./test_helper")
const app = require("../app")
const Blog = require("../models/blog")

const api = supertest(app) // wrap the express application with a supertest function into a superagent object


// reset the database to the same state before each test is run
beforeEach(async () => {
    await Blog.deleteMany({})
    
    for (i=0; i < helper.initialBlogs.length; i++) { // Post each initialBlog to DB
        blogObject = new Blog(helper.initialBlogs[i])
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
        .toHaveLength(helper.initialBlogs.length)
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
        "url": "www.meatspin.com",
        "likes": 69
    }
    
    await api
        .post("/api/blogs")
        .send(testData)
        .expect(201) // testing returned code - 201 = created
        .expect('Content-Type', /application\/json/) // testing type of returned data
        
    const blogsAtEnd = await helper.blogsInDb() // testing that a new blog item was added to list and the length of blogs has increased
    expect(blogsAtEnd)
        .toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(r => r.title)
    expect(titles)
        .toContain("The testy chef") // testing specific content being added to bloglist
})


test("017 A blog without likes will default to 0" , async() => { // 4.11*
    const testData = {
        "title": "No Likes",
        "author": "Mike Hawk",
        "url": "www.mikehawk.com"
    }

    await api
        .post("/api/blogs")
        .send(testData)
        .expect(201)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd[3].likes) // Check wether likes field is defined
        .toBeDefined()
    
    expect(blogsAtEnd[3].likes) // Check wether likes field defaults to 0
        .toBe(0)
})






afterAll(async() => {
    await mongoose.connection.close()
})
