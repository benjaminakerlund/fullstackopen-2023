import React, { useState } from "react"
import blogService from "../services/blogs"

const Blog = ({blog}) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }
    
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5
        }


    const setVisibility = () => {
        setVisible(!visible)
    }

    const handleLike = async event => {
        const likes = blog.likes + 1
        const updatedBlog = {...blog, likes}
        try{
            await blogService
                .update(blog.id, updatedBlog)

        } catch { 
            console.log("something happened, inside handleLogin Catch")
        }
    }


    return(
        <div style={blogStyle} >
            <div style={hideWhenVisible}>
                {blog.title} - {blog.author}
                <button onClick={setVisibility}>view </button>
            </div>

            <div style={showWhenVisible}>
                {blog.title} - {blog.author} <br />
                {blog.url} <br />
                {blog.likes} 
                <button onClick={handleLike}>like</button> <br />
                {blog.user.username} <br />

                <button onClick={setVisibility}>hide</button>

            </div>
            
        </div>
    )
}

export default Blog