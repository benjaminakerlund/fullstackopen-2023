const helper = require("../utils/list_helper")

const bloglist1 = [
    {
        title: "First blog",
        autrhor: "F. Author",
        likes: 69
    }
]

const bloglist = [
	{
	_id: "64abe3a9bd4efe3ada2e1d90",
	title: "I forgot titles in the other blogs :D",
	author: "PostMan",
	url: "https://www.postman.com/",
	likes: 101,
	__v: 0
	},
	{
	_id: "64abe3f1bd4efe3ada2e1d94",
	title: "Now adding a blog to DB has worked twice!",
	author: "PostMan",
	url: "https://www.postman.com/",
	likes: 100000,
	__v: 0
	},
    {
    _id: "64abe3a9bd4efe3ada2e1d99",
    title: "Not a PostMan blog",
    author: "Not PostMan",
    url: "https://www.lollercoaster.com/",
    likes: 100,
    __v: 0
    }
]

describe("001 Testing dummy function: ", () => {
    // dummy function tester for 4.3*
    test("dummy function returns 1", () => {
        expect(helper.dummy())
            .toBe(1)
    })
})

describe("002 Testing helper function totalLikes:", () => {
    // totalLikes tester for 4.4
    test("totalLikes returns 0 when an empty bloglist is fed as input", () => {
        expect(helper.totalLikes([]))
            .toBe(0)
    })

    test("003 totalLikes returns the correct value for a list of length 1", () => {
        expect(helper.totalLikes(bloglist1))
            .toBe(bloglist1[0].likes)
    })

    test("004 totalLikes returns the correct value", () => {
        expect(helper.totalLikes(bloglist))
            .toBe(100201)
    })
})

describe("Testing helper function favBlog:", () => {
    // favouriteBlog tester for 4.5*
    test("005 favBlog returns the blog with most likes", () => {
        output = {
            title: "Now adding a blog to DB has worked twice!",
            author: "PostMan",
            likes: 100000
        }

        expect(helper.favBlog(bloglist))
            .toEqual(output)
    })
    
    // Only one test here, since nothing more about the return of the function was defined... 
    // eg. what to do when a list of 0 is run through favBlog
})

describe("Testing helper function mostBlogs:", () => {
    // mostBlogs tester for 4.6*
    test("006 mostBlogs returns the author with most blogs", () => {
        output = {
            author: "PostMan",
            blogs: 2
        }

        expect(helper.mostBlogs(bloglist))
            .toEqual(output)
    })
})

describe("Testing helper function mostLikes:", () => {
    // mostLikes tester for 4.7*
    test("007 mostLikes returns the author with most likes", () => {
        output = {
            author: "PostMan",
            likes: 100101
        }

        expect(helper.mostLikes(bloglist))
            .toEqual(output)
    })
})