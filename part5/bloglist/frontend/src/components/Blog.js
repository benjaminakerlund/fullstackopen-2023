import React, { useState } from "react"


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
    return(
        <div style={blogStyle} >
            <div style={hideWhenVisible}>
                {blog.title} {blog.author}
                <button onClick={setVisibility}>view </button>
            </div>

            <div style={showWhenVisible}>
                {blog.title} {blog.author} <br />
                {blog.url} <br />
                {blog.likes} 
                <button>like</button> <br />
                {blog.user.username} <br />

                <button onClick={setVisibility}>hide</button>

            </div>
            
        </div>
    )
}

export default Blog