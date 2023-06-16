import React from 'react'
import ShowAll from './ShowAll'
import ShowPerson from './ShowPerson'


// 2.9* Component for displaying persons depending on filter
const Filter = (props) => {
    // IF statement to check if filter condition is undefined or ''
    if (props.filterName === undefined) { // No filter was selected, display content as usual
      return (
        <div>
          <ShowAll persons={props.persons} />
        </div>
      )
    } else if (props.filterName === '') { // No filter was selected, display content as usual
      return (
        <div>
          <ShowAll persons={props.persons} />
        </div>
      )
    } 
    else { // Something was typed into the filter, display content accordingly
      return (
        <div>
          {props.persons.filter(person => person.name.toUpperCase().includes(props.filterName.toUpperCase())).map(person => (
            <ShowPerson key={person.name} name={person.name} number={person.number} />
          ))}
        </div>
      )
    }
  }

export default Filter