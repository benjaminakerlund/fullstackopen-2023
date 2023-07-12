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
	likes: 100,
	__v: 0
	},
	{
	_id: "64abe3f1bd4efe3ada2e1d94",
	title: "Now adding a blog to DB has worked twice!",
	author: "PostMan",
	url: "https://www.postman.com/",
	likes: 100000,
	__v: 0
	}
	]


describe("Testing if the helper function ", () => {
    test("dummy function returns 1", () => {
        expect(helper.dummy())
            .toBe(1)
    })

    // Total likes
    test("totalLikes returns 0 when an empty bloglist is fed as input", () => {
        expect(helper.totalLikes([]))
            .toBe(0)
    })

    test("totalLikes returns the correct value for a list of length 1", () => {
        expect(helper.totalLikes(bloglist1))
            .toBe(bloglist1[0].likes)
    })

    test("totalLikes returns the correct value", () => {
        expect(helper.totalLikes(bloglist))
            .toBe(100100)
    })

    
})



