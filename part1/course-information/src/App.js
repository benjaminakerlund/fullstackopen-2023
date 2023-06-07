
const Header = (props) => {
  console.log("Inside Header")
  console.log(props)
  return (
  <div>
  <h1>{props.course}</h1>
  </div>
  )
  }
  
  const Part = (props) => {
    console.log("Inside Part")
    console.log(props)
    return (
      <div>
        <p>{props.course} {props.ex}</p>
      </div>
    )
    }

  const Content = (props) => {
  console.log("Inside Content")
  console.log(props)
  return (
    <div>
      <Part course={props.course1} ex={props.ex1} />
      <Part course={props.course2} ex={props.ex2} />
      <Part course={props.course3} ex={props.ex3} />
    </div>
  )
  }
  
  const Total = (props) => {
  console.log("Inside Total")
  console.log(props)
  return (
    <div>
      <p>Number of exercises: {props.exs}</p>

    </div>
  )
  
  }
  
  const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  
  return (
    <div>
      <Header course={course} />
      <Content course1={part1} course2={part2} course3={part3} ex1={exercises1} ex2={exercises2} ex3={exercises3}/>
      <Total exs={exercises1 + exercises2 + exercises3}/>
    </div>
  )
  }
  
  export default App
  