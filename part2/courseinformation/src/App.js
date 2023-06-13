
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
      
      /*let first = props.parts[0]
      let second = props.parts[1]
      let third = props.parts[2]
    
      return (
        <div>
          <Part course={first.name} ex={first.exercises} />
          <Part course={second.name} ex={third.exercises} />
          <Part course={third.name} ex={third.exercises} />
        </div>
      )*/
      return (
        <div>
          {props.parts.map(part => <Part key={part.id} name={part.name} ex={part.exercises} />)}
        </div>
      )
    }
    
    const Total = (props) => {
      console.log("inside Total")
      const total = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises
    
      return (
        <div>
          <p>Number of exercises: {total}</p>
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

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }
    
  return <Course course={course} />
}

export default App
    