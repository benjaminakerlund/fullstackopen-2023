
//2.5 separate the 2.1 Course component as a separate module, imported by the App component
const Course = (props) => {
    const Header = (props) => <h1>{props.course}</h1>

    const Part = (props) => {
      console.log("Inside Part function")
      return (
        <div>
          <p>{props.name} {props.ex}</p>
        </div>
      )
    }
    
    const Content = (props) => {
      console.log("Inside Content function")
      console.log("This is props: ", props)
      return (
        <div>
          {props.parts.map(part => <Part key={part.id} name={part.name} ex={part.exercises} />)}
        </div>
      )
    }
    
    const Total = (props) => {
      console.log("inside Total")
    
      //2.3* calculate total amount of exercises with array.reduce() method
      const initialValue = 0 //This could be deleted
      const total = props.parts.reduce(
        (accumulator, currentObject) => accumulator + currentObject.exercises,
        initialValue //This could be deleted
      )

      /* 2.2 Old code for total
      props.parts.forEach(element => {
        total += element.exercises
      }) */

      return (
        <div>
          <p><strong>Number of exercises: {total}</strong></p>
        </div>
      )
    }

    return (
      <div>
        <Header course={props.course.name} />
        <Content parts={props.course.parts} />
        <Total parts={props.course.parts} />
      </div>
      )
}

export default Course