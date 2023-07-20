import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from "./services/login"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import NewBlogForm from "./components/NewBlogForm"

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
    const [createVisible, setCreateVisible] = useState(false) // 5.5


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
        setCreateVisible(false)
    }


    /* For some reason needed for hiding create form */
    const hideWhenVisible = { display: createVisible ? 'none' : '' }
    const showWhenVisible = { display: createVisible ? '' : 'none' }

    const showBlogs = () => { //5.6 moved NewBlogForm to own component
        return (
            <div>
                <div>{user.name} is logged in
                <button onClick={handleLogout}>logout</button> </div>
                <br></br>

                <div style={hideWhenVisible}>
                    <button onClick={() => setCreateVisible(true)}>new blog</button>
                </div>

                <div style={showWhenVisible}>
                    <NewBlogForm
                        handleSubmit={handleCreate}
                        handleBlogTitleChange={({ target }) => setBlogTitle(target.value)}
                        handleBlogAuthorChange={({ target }) => setBlogAuthor(target.value)}
                        handleBlogUrlChange={({ target }) => setBlogUrl(target.value)}
                        title={blogTitle}
                        author={blogAuthor}
                        url={blogUrl} />
                    <button onClick={() => setCreateVisible(false)}>cancel</button>
                </div>
                
                
                {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
                    )}
            </div> 
            
        )
    }


    return (
        <div>
            <h1>blogs</h1>
            <Notification info={info} />
            <div>
            {user === null
                ? <LoginForm
                    username={username}
                    password={password}
                    handleUsernameChange={({ target }) => setUsername(target.value)}
                    handlePasswordChange={({ target }) => setPassword(target.value)}
                    handleSubmit={handleLogin} /> 
                :showBlogs()
                }

            </div>
        </div>
            
    )
}

export default App