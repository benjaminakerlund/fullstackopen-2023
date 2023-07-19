const mongoose = require("mongoose")
const supertest = require("supertest")
const helper = require("./test_helper")
const app = require("../app")

const bcrypt = require("bcrypt")
const User = require("../models/user")

const api = supertest(app) // wrap the express application with a supertest function into a superagent object


beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash("sekret", 10)    
    const user = new User({ username: "root", passwordHash , id: "001"})

    await user.save()
}, 10000)

describe("100 When there is initially one user in db", () => {

    test("101 creation succeeds with a fresh username", async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: "mluukkai",
            name: "Matti Luukkainen",
            password: "salainen"        
        }

        await api
            .post("/api/users")
            .send(newUser)
            .expect(201)
            .expect("Content-Type", /application\/json/)


        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd)
            .toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames)
            .toContain(newUser.username)
    }, 10000)

    test("102 creation fails with a proper statuscode and message if username already taken", async () => { // 4.16*
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: "root",
            name: "Superuser",
            password: "salainen"
        }

        const result = await api    
            .post("/api/users")
            .send(newUser)
            .expect(500) // because this is handled by mongoose and thus it throws 500

        expect(result.text)
            .toContain("expected `username` to be unique") // Mongoose code 500 stores error message in text, not body

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd)
            .toHaveLength(usersAtStart.length)

    }, 10000)

    test("103 create a user with too short username", async () => { // 4.16*
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: "ro",
            name: "Username Short",
            password: "CryptoKing69"
        }

        const result = await api
            .post("/api/users")
            .send(newUser)
            .expect(500) // because this is handled by mongoose and thus it throws 500

        expect(result.text) // Mongoose code 500 stores error message in text, not body
            .toContain("Path `username` (`ro`) is shorter than the minimum allowed length (3).")

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd)
            .toHaveLength(usersAtStart.length)
    })

    test("104 create a user with too short password", async () => { // 4.16*
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: "Rooster",
            name: "Password Short",
            password: "Cr"
        }

        const result = await api
            .post("/api/users")
            .send(newUser)
            .expect(400) // because this is handled in our controller it throws 400

        expect(result.body.error) 
            .toContain("Password too short. Minimum required length of password: 3.")

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd)
            .toHaveLength(usersAtStart.length)
    })

    test("105 adding blogtexts to root user", async () => {
        const users = await helper.usersInDb()
        const firstUser = users[0]

        const testData1 = {
            "title": "No Likes",
            "author": "Mike Hawk",
            "url": "www.mikehawk.com",
            "userId": firstUser.id
        }

        await api
            .post("/api/blogs")
            .send(testData1)
            .expect(201)

        const testData2 = {
            "title": "No Likes2",
            "author": "Mike Hawk",
            "url": "www.mikehawk.com",
            "userId": firstUser.id
        }

        await api
            .post("/api/blogs")
            .send(testData2)
            .expect(201)
            
        const blogsAtEnd = await helper.blogsInDb()

        console.log("This should be last blog... ", blogsAtEnd[14])
        console.log("This is user object.name: ", blogsAtEnd[14].values())
        expect(blogsAtEnd[14].user)
            .toContain("root")
    })
})
