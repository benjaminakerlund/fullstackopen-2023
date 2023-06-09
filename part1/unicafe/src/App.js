import logo from './logo.svg';
import './App.css';

import { useState } from 'react'

const StatisticLine = (props) => <p>{props.text} {props.value} {props.text2}</p>


const Statistics = (props) => {
if (props.all === 0) {
  console.log("All is zero...")
  return (
    <div>
      <p>
        No feedback given
      </p>
    </div>
  )
}

/** 1.11 create a different StatisticLine function for displaying single statistic
 * This will ruin the "positive" statistics line 
 *    since we need to forcefully somehow add a "%" sign after
 *    notice the ugly fix made when calling the Statistics component for positive...
 * This however will fix our "newline" problem, and allow to skip the <br /> sign
 * For some reason this still gives us an annoying line break in between
 *  which is not present int the assignment picture
 * 
*/

/* Old code to display stuff
    <p>
      good {props.good} <br />
      neutral {props.neutral} <br />
      bad {props.bad} <br />
      all {props.all} <br />
      average {props.ave} <br />
      positive {props.pos} %
    </p>
*/
  return (
    <div>
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine text="all" value={props.all} />
      <StatisticLine text="average" value={props.ave} />
      <StatisticLine text="positive" value={props.pos} text2="%"/> 
  </div>
  )
}
  
// Button was already extracted before 1.10
// Uncertain how it should be otherwise extracted, since no example is given.
const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [ave, setAve] = useState(0)
  const [score, setScore] = useState(0)
  const [pos, setPos] = useState(0)

  const handleClickGood = () => {
    console.log("Clicked the good button")
    const updatedGood = good + 1
    const updatedScore = updatedGood - bad
    const updatedAll = all + 1
    const updatedAve = updatedScore / updatedAll

    setGood(updatedGood)
    setAll(updatedAll)
    setScore(updatedScore)
    setAve(updatedAve)
    setPos(100 * updatedGood / updatedAll) //good has been updated

    /*
    console.log("score: ", score, "updatedScore: ", updatedScore)
    console.log("all: ", all, "updatedAll: ", updatedAll)
    console.log("ave: ", ave, "updatedAve: ", updatedAve)*/
  }

  const handleClickNeutral = () => {
    console.log("Clicked the neutral button")
    const updatedNeutral = neutral + 1
    const updatedAll = all + 1

    setNeutral(updatedNeutral)
    setAll(updatedAll)
    setAve(score / updatedAll) // no need to update score
    setPos(100 * good / updatedAll)
  }  

  const handleClickBad = () => {
    console.log("Clicked the bad button")
    const updatedBad = bad + 1
    const updatedScore = good - updatedBad
    const updatedAll = all + 1

    setBad(updatedBad)
    setAll(updatedAll)
    setScore(updatedScore)
    setAve(updatedScore / updatedAll)
    setPos(100 * good / updatedAll)
  }  

  return (
    <div>
      <h1>give feedback</h1>

      <Button handleClick={handleClickGood} text="good" />
      <Button handleClick={handleClickNeutral} text="neutral" />
      <Button handleClick={handleClickBad} text="bad" />

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} ave={ave} pos={pos}/>
    </div>
  )
} 

export default App;