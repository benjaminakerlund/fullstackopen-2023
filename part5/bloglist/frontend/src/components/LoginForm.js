const LoginForm = ({ //5.4? moved to own component, only display when pressing button for login
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password
    })  => {
    return (
        <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleSubmit}>
                <div>
                    username
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={handleUsernameChange}
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={handlePasswordChange}
                        />
                </div>
                <div>
                    <button type="submit">login</button>
                </div>
            </form>
        </div> 
    )
}

export default LoginForm