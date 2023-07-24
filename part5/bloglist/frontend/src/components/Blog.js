import React, { useState } from "react"
import blogService from "../services/blogs"

const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
}

const Blog = ({ blog, user }) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? "none" : "" }
    const showWhenVisible = { display: visible ? "" : "none" }


    const setVisibility = () => {
        setVisible(!visible)
    }

    const handleLike = async () => {
        console.log("Pressed like!")
        const likes = blog.likes + 1
        const updatedBlog = { ...blog, likes }
        try{
            await blogService
                .update(blog.id, updatedBlog)

        } catch (error) {
            console.log(error)
        }
    }

    const blogDelete = () => { // only show remove button if user has added the blog
        if (user.username === blog.user.username) {
            return (
                <button onClick={handleDelete}>remove</button>
            )
        }
    }

    const handleDelete = async event => {
        event.preventDefault()
        if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {

            blogService
                .setToken(user.token)

            await blogService
                .remove(blog.id, user)
        }
    }


    return(
        <div style={blogStyle} className="blog">
            <div style={hideWhenVisible}>
                {blog.title} - {blog.author}
                <button onClick={setVisibility}>view </button>
            </div>

            <div style={showWhenVisible} className="hidden">
                {blog.title} - {blog.author}
                <button onClick={setVisibility}>hide</button>
                <br />
                {blog.url} <br />
                {blog.likes}
                <button onClick={handleLike}>like</button> <br />
                {blog.user.username} <br />
                {blogDelete()}

            </div>

        </div>
    )
}

export default Blog