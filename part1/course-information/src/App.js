
/*
const Header = (props) => {
  console.log(props)
  return (
  <div>
    <h1>{props.course}</h1>
  </div>
  )
  }*/
  
const Header = (props) => <h1>{props.course}</h1>

const Part = (props) => {
  console.log("Inside Part function")
  return (
    <div>
      <p>{props.course} {props.ex}</p>
    </div>
  )
  }

const Content = (props) => {
  console.log("Inside Content function")
  let first = props.parts[0]
  let second = props.parts[1]
  let third = props.parts[2]

  return (
    <div>
      <Part course={first.name} ex={first.exercises} />
      <Part course={second.name} ex={third.exercises} />
      <Part course={third.name} ex={third.exercises} />
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

// Old code from 1.2
/**
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
} */


//Code from 1.3
/*
const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content course1={part1.name} course2={part2.name} course3={part3.name} ex1={part1.exercises} ex2={part2.exercises} ex3={part3.exercises} />
      <Total exs={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  )
} */

//Code from 1.4
/*
const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
} */

//Code from 1.5
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App
  