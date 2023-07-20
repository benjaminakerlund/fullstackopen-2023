import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from "./services/login"

const App = () => {
    const [blogs, setBlogs] = useState([])
    //Added code:
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState(null)

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
            //blogService.setToken(user.token)
        }
    }, [])

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
            setUser(user)
            setUsername("")
            setPassword("")
        } catch{
            console.log("Wrong credentials")
            /* Following code for error message not implemented yet.
            setErrorMessage("Wrong credentials"
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000) */
        }
    }
  
    const handleLogout = (event) => { // 5.2
        console.log("pressed logout")
        window.localStorage.clear()
        setUser(null)
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

    const showBlogs = () => {
        return (
            <div>
                <div>{user.name} is logged in
                <button onClick={handleLogout}>logout</button> </div>
                <br></br>
                {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
                    )}
            </div> 
        )
    }

  
    return (
        <div>
        <h1>blogs</h1>
            {user === null
            ? loginForm()
            : showBlogs() }
        </div>
    )
}

export default App