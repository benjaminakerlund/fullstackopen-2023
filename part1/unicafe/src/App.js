import logo from './logo.svg';
import './App.css';

import { useState } from 'react'

const Display = (props) => 
    <div>
      <p>{props.text} {props.number}</p>
    </div>
 
  
const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const handleClickGood = () => {
    console.log("Clicked the good button")
    const updatedGood = good + 1
    setGood(updatedGood)
  }

  const handleClickNeutral = () => {
    console.log("Clicked the neutral button")
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
  }  

  const handleClickBad = () => {
    console.log("Clicked the bad button")
    const updatedBad = bad + 1
    setBad(updatedBad)
  }  

  return (
    <div>
      <h1>give feedback</h1>

      <Button handleClick={handleClickGood} text="good" />
      <Button handleClick={handleClickNeutral} text="neutral" />
      <Button handleClick={handleClickBad} text="bad" />

      <h1>statistics</h1>
      <Display text="good" number={good}/> 
      <Display text="neutral" number={neutral}/> 
      <Display text="bad" number={bad}/>       
    </div>
  )
} 

export default App;