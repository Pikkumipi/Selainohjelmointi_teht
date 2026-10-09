import { useState } from 'react'

const Button = (props) => {
  return(
  <button onClick={props.onClick}>
    {props.text}
  </button>
  )
}

const StatisticsLine = (props) => {
  return (
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
  )
}

const Stats = ({good, bad, neutral}) => {
  const total = good + neutral + bad
  const average = (good + bad * -1) /total
  const positive = good/total * 100 + "%"
  if (good == 0 && bad == 0 && neutral == 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return(
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticsLine text="Good" value={good}/>
          <StatisticsLine text="Neutral" value={neutral}/>
          <StatisticsLine text="Bad" value={bad}/>
          <StatisticsLine text="All" value={total}/>
          <StatisticsLine text="Average" value={average}/>
          <StatisticsLine text="Positive" value={positive}/>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodReview = () => {
    console.log('A good review')
    setGood(good + 1)
  }

  const neutralReview = () => {
    console.log('A neutral review')
    setNeutral(neutral + 1)
  }

  const badReview = () => {
    console.log('A bad review')
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={goodReview} text='good'/>
      <Button onClick={neutralReview} text='neutral'/>
      <Button onClick={badReview} text='bad'/>
      <Stats good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App