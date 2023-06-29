import React from "react"

// Display one persons information
const ShowPerson= ( props ) => {

return (
    <li>
        {props.name} {props.number}
        <button onClick={props.toggleDelete}>Delete</button> 
    </li>
)} // 2.14 added button

export default ShowPerson