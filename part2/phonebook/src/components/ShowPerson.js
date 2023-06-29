import React from "react"

// Display one persons information
const ShowPerson= ( props ) => {

return (
    <div>
        {props.name} {props.number}
        <button onClick={props.toggleDelete}>Delete</button> 
    </div>
)} // 2.14 added button

export default ShowPerson