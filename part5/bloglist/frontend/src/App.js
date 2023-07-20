import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from "./services/login"
import Notification from "./components/Notification"

const App = () => {
    const [blogs, setBlogs] = useState([])
    //Added code:
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState(null)
    const [blogTitle, setBlogTitle] = useState("") //5.3
    const [blogAuthor, setBlogAuthor] = useState("") //5.3
    const [blogUrl, setBlogUrl] = useState("") //5.3
    const [info, setInfo] = useState({ message: null })


    useEffect(() => {
        blogService.getAll().then(blogs =>
        setBlogs( blogs )
        )  
    }, [])

    //own effect
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser")
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            // uncomment for 5.3 !!!
            blogService.setToken(user.token)
        }
    }, [])

    /* Helper function for displaying notifications */
    const notifyWith = (message, type="info") => {
        setInfo({
            message, type
        })
    
        setTimeout(() => {
            setInfo({ message: null })
        }, 3000)
    }

    // Own code
    const handleLogin = async (event) => { // 5.1
        event.preventDefault()

        try {
            const user = await loginService.login({
                username, password
            })

            window.localStorage.setItem( // 5.2
                "loggedBlogAppUser", JSON.stringify(user)
            )
            blogService.setToken(user.token) // 5.3
            setUser(user)
            setUsername("")
            setPassword("")
            notifyWith("Login succesful")
        } catch{
            notifyWith(`Wrong username or password`, "error")
        }
            
    }
  
    const handleLogout = (event) => { // 5.2
        window.localStorage.clear()
        setUser(null)
        notifyWith("Logout succesful")
    }

    const handleCreate = (event) => { //5.3
        event.preventDefault()
        const blogObject = {
            user: user,
            title: blogTitle,
            author: blogAuthor,
            url: blogUrl
        }

        const auth = user.token
        blogService.create(blogObject, auth)
            .then(blog => {
                setBlogs(blogs.concat(blog))
            })
        notifyWith(`Succesfully added a blog: '${blogObject.title}''`)
    }

    const loginForm = () => {
        return (
            <div>
            <h2>Log in to application</h2>
            <form onSubmit={handleLogin}>
                    <div>
                        username
                        <input
                            type="text"
                            value={username}
                            name="Username"
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </div>
                    <div>
                        password
                        <input
                            type="password"
                            value={password}
                            name="Password"
                            onChange={({ target }) => setPassword(target.value)}
                            />
                    </div>
                    <div>
                        <button type="submit">login</button>
                    </div>
                </form>
            </div> 
        )
    }

    const blogForm = () => {
        return (
            <div>
                <div>{user.name} is logged in
                <button onClick={handleLogout}>logout</button> </div>
                <br></br>
                {newBlogForm()}
                
                {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
                    )}
            </div> 
            
        )
    }

    const newBlogForm = () => {
        console.log("Inside addblog")
        return(
            <div>
                <h2>create new</h2>
                <form onSubmit={handleCreate}>
                    <div>
                        title:
                        <input 
                            type="text"
                            value={blogTitle}
                            name="BlogTitle"
                            onChange={({ target }) => setBlogTitle(target.value)}
                            />
                    </div>
                    <div>
                        author:
                        <input 
                            type="text"
                            value={blogAuthor}
                            name="BlogAuthor"
                            onChange={({ target }) => setBlogAuthor(target.value)}
                            />
                    </div>
                    <div>
                        url:
                        <input 
                            type="text"
                            value={blogUrl}
                            name="BlogUrl"
                            onChange={({ target }) => setBlogUrl(target.value)}
                            />
                    </div>
                    <div>
                        <button type="submit">create</button>
                    </div>
                </form>
            </div>
        )
    }
  
    return (
        <div>
        <h1>blogs</h1>

        <Notification info={info} />
            {user === null
            ? loginForm()
            : blogForm() 
            }
        </div>
    )
}

export default App