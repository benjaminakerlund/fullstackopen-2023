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

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log("logging in with: ", username, password)

    try {
        const user = await loginService.login({
            username, password
        })
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

  if (user === null) {
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

  return (
    <div>
      <h2>blogs</h2>
      <div>{user.name} is logged in</div>
        <br></br>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App