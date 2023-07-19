const mongoose = require("mongoose")
const supertest = require("supertest")
const helper = require("./test_helper")
const app = require("../app")
const Blog = require("../models/blog")
const blog = require("../models/blog")

const api = supertest(app) // wrap the express application with a supertest function into a superagent object


// reset the database to the same state before each test is run
beforeEach(async () => {
    await Blog.deleteMany({})

    for (i=0; i < helper.initialBlogs.length; i++) { // Post each initialBlog to DB
        blogObject = new Blog(helper.initialBlogs[i])
        await blogObject.save()
    } 
})

describe("010: Initialising the db: ", ()=> {
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
})



describe("020: Adding a single note: ", () => {
    test("021 Verify that the POST request to the base url succesfully creates a new blog post", async() => { // 4.10
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
    
    
    test("022 A blog without likes will default to 0" , async() => { // 4.11*
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
    
    
    /* 4.12* Testing post method */
    test("023 A blog without a title will not be added to the list" , async() => { // 4.12*
        const testDataNoTitle = {
            author: "Mike Hawk",
            url: "www.mikehawk.com",
            likes: 69
        }
    
        await api   
            .post("/api/blogs")
            .send(testDataNoTitle)
            .expect(400) // expect backend to reject posting a note without a required field (title)
    
        const blogsAtEnd = await helper.blogsInDb()
    
        expect(blogsAtEnd)
            .toHaveLength(helper.initialBlogs.length)
    
    }, 10000)
    
    test("024 A blog without a url will not be added to the list" , async() => { // 4.12*
        const testDataNoUrl = {
            title: "Testy blog - no url",
            author: "Mike Hawk",
            likes: 69
        }
    
        await api
        .post("/api/blogs")
        .send(testDataNoUrl)
        .expect(400) // expect backend to reject posting a note without a required field (url)
    
    }, 10000)
})




describe("030: Operations to a single blog: ", () => {
    test("031 Fetch a individual blog", async() => { // extra route and test
        const blogsAtStart = await helper.blogsInDb()
        const blogToView = blogsAtStart[0]

        const resultBlog = await api
            .get(`/api/blogs/${blogToView.id}`)
            .expect(200)
            .expect("Content-Type", /application\/json/)

        expect(resultBlog.body)
            .toEqual(blogToView)
    })

    test("032 Delete individual blog", async() => { // 4.13
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)
            
        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd)
            .toHaveLength(helper.initialBlogs.length - 1)

        const titles = blogsAtEnd.map(r => r.title)
        expect(titles)
            .not.toContain(blogToDelete.title)
    })

    test("033 Update individual blog", async() => { // 4.14
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        const newBlog = {
            title: "The Naked Chef",
            author: "Jamie Oliver",
            url: "www.nakedchef.com/notPorn",
            likes: 69, //This was 44 in the beginning
        }

        await api   
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(newBlog)
            .expect(200)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd[0].likes)
            .toBe(newBlog.likes)
    })
})


afterAll(async() => {
    await mongoose.connection.close()
})
