const blog = require("../models/blog")

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => blogs.reduce((sum, item) => sum + item.likes, 0) // shortened version as in videos

const favBlog = (blogs) => {
    const reducer = (fav, item) => {
        if (item.likes >= fav.likes) { 
            fav = item }

        const ret = {
            title: fav.title,
            author: fav.author,
            likes: fav.likes
        }
        return ret
    }

    return blogs.reduce(reducer, blogs[0])
} 

/** favBlog alternative
 * A shorter version of favBlog could be written as below
 * However the output restrictions of the assignment require a longer function
    
    const favBlog = blogs => blogs.reduce((a, b) => (a.likes > b.likes ? a : b))
 */

const mostBlogs = (blogs) => {
    const reducer = (i, blog) => {
        let temp = i.find(item => item.author === blog.author)

        if (!temp) {
            return i.concat({ author: blog.author, blogs: 1})
        }

        temp.blogs++
        return i
    }
 
    return blogs.reduce(reducer, [])[0]
}

module.exports = {
    dummy,
    totalLikes,
    favBlog,
    mostBlogs
    
}