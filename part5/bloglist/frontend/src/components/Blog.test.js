/*5.13: Blog list tests, step1

Make a test, which checks that the component displaying a blog
renders the blog's title and author, but does not render its 
URL or number of likes by default.

Add CSS classes to the component to help the testing as 
necessary.

5.14: Blog list tests, step2

Make a test, which checks that the blog's URL and number of likes are shown 
when the button controlling the shown details has been clicked.
*/

/**
 * <Blog
        key={blog.id}
        blog={blog}
        user={user}
        />
 */

import React from "react"
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from "./Blog"



const blog = {
    title: "The fully clothed chef",
    author: "Robbie Oliver",
    url: "www.hurl.com",
    likes: 4,
    user: {
        username: "Bena",
        name: "Benjamin Åkerlund",
        id: "64b8d320c390c03b49b4a596"
    },
    id: "64b90e4a4e39fb9653bab809"
}
const user = {
    id: "666"
}

let container

beforeEach(() => {
    container = render(<Blog 
        key={blog.id}
        blog={blog}
        user={blog.user}
        />).container
})

test("001 renders blog title and author", () => { // 5.13

    const element = screen.getAllByText("The fully clothed chef - Robbie Oliver")
    expect(element)
        .toBeDefined()
})

test("002 At the start url and likes are not shown", () => {
    const div = container.querySelector(".hidden")
    expect(div).toHaveStyle("display: none")
})

test("003 Check wether blogs url and likes are shown when button is clicked", async () => { // 5.14
    /*5.14: Blog list tests, step2

    Make a test, which checks that the blog's URL and number of likes are shown 
    when the button controlling the shown details has been clicked.
    */
    const user1 = userEvent.setup()

    const button = screen.getByText("view")

    expect(button).toBeDefined()
    await user1.click(button)
    
    const div = container.querySelector(".hidden")
    expect(div).not.toHaveStyle("display: none") //meaning all fields are shown 
})

test("004 Check that event handler for like is called twice", async () => { // 5.15
    /* 5.15: Blog list tests, step3

    Make a test, which ensures that if the like button is clicked twice, 
    the event handler the component received as props is called twice.
    */
    const mockHandler = jest.fn()
    const testUser = userEvent.setup()
    const button1 = screen.getByText("view") 
    await testUser.click(button1)

    const button2 = screen.getByText("like")
    expect(button2).toBeDefined()

    await testUser.click(button2)

    console.log(mockHandler.mock)

    await testUser.click(button2)

    console.log(mockHandler.mock)


    expect(mockHandler.mock.calls).toHaveLength(1)

})
