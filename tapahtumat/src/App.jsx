import { useState } from 'react'

const Display = ({counter}) => {
  return (
    <div>{counter}</div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.onClick}>
      {props.text}
    </button>
  )
}

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }

  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const App = () => {
  const [ counter, setCounter ] = useState(0)
  const [allClicks, setAll] = useState([])

  console.log('rendering with counter value', counter)

  const increasedByOne = () => {
    console.log('increasing, value before', counter)
    setAll(allClicks.concat('P'))
    setCounter(counter + 1)
  }
  const decreasedByOne = () => { 
    console.log('decreasing, value before', counter)
    setAll(allClicks.concat('M'))
    setCounter(counter - 1)
  }

  const setToZero = () => {
    console.log('resetting to zero, value before', counter)
    setAll(allClicks.concat('Z'))
    setCounter(0)
  }

  return (
    <div>
      <Display counter={counter}/>

      <Button onClick={increasedByOne} text='plus' />
      <Button onClick={decreasedByOne} text='minus' />
      <Button onClick={setToZero} text='zero' />
      <History allClicks={allClicks} />
    </div>
  )
}

export default App