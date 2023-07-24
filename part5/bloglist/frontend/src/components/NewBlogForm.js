import { useState } from "react"

const NewBlogForm = ({ createBlog }) => {
    const [newTitle, setNewTitle] = useState("")
    const [newAuthor, setNewAuthor] = useState("")
    const [newUrl, setNewUrl] = useState("")

    const addBlog = () => {
        //event.preventDefault()
        createBlog({
            title: newTitle,
            author: newAuthor,
            url: newUrl
        })

        setNewTitle("")
        setNewAuthor("")
        setNewUrl("")
    }

    return(
        <div>
            <h2>create new</h2>
            <form onSubmit={addBlog}>
                title:
                <input
                    value={newTitle}
                    onChange={event => setNewTitle(event.target.value)}
                />
                <br></br>
                author:
                <input
                    value={newAuthor}
                    onChange={event => setNewAuthor(event.target.value)}
                />
                <br></br>
                url:
                <input
                    value={newUrl}
                    onChange={event => setNewUrl(event.target.value)}
                />
                <div>
                    <button type="submit">create</button>
                </div>
            </form>
        </div>
    )
}

export default NewBlogForm
