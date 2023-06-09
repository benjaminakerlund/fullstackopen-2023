import React from "react"
import ShowPerson from "./ShowPerson"


const ShowAll = (props) => {
    if (props.persons.length >= 1) {
        return (
        <div>
            {props.persons.map(element => <ShowPerson 
            key={element.name} 
            name={element.name} 
            number={element.number} 
            toggleDelete={() => props.toggleDelete(element)} //2.14
            /> )} 
        </div>
        )
    }
}

export default ShowAll