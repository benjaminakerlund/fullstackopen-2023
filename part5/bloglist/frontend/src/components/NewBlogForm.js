const NewBlogForm = ({
    handleSubmit,
    handleBlogTitleChange,
    handleBlogAuthorChange,
    handleBlogUrlChange,
    title,
    author,
    url
}) => {
    return(
        <div>
            <h2>create new</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    title:
                    <input 
                        type="text"
                        value={title}
                        name="BlogTitle"
                        onChange={handleBlogTitleChange}
                        />
                </div>
                <div>
                    author:
                    <input 
                        type="text"
                        value={author}
                        name="BlogAuthor"
                        onChange={handleBlogAuthorChange}
                        />
                </div>
                <div>
                    url:
                    <input 
                        type="text"
                        value={url}
                        name="BlogUrl"
                        onChange={handleBlogUrlChange}
                        />
                </div>
                <div>
                    <button type="submit">create</button>
                </div>
            </form>
        </div>
    )
}

export default NewBlogForm
