import React from "react"
import ShowPerson from "./ShowPerson"


const ShowAll = (props) => {
    return (
    <div>
        {props.persons.map(element => <ShowPerson 
        key={element.name} 
        name={element.name} 
        number={element.number} /> )} 
    </div>
    )
}

export default ShowAll