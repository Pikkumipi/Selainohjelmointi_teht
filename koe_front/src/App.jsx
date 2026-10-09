import { useState, useEffect } from 'react'
import axios from 'axios'

const Candidate = ({candidate}) => {
  return (
    <div>
        <li key={candidate.id}>
          {candidate.name} {candidate.party} {candidate.votes}
        </li>
    </div>
  )
}

const Total = ({candidates}) => {
  let allVotes = 0
  {candidates.map(c =>
        {allVotes += c.votes}
      )}
  return (
    <div>
      <h2>Votes</h2>
      <p>Total Votes: {allVotes} </p>
    </div>
  )
}
 
const App = (props) => {
  const [candidates, setCandidates] = useState([])

  const hook = () => {
    console.log('effect tehty')
    axios
      .get('http://localhost:3001/api/candidates')
      .then(response => {
        console.log('promise fulfilled')
        setCandidates(response.data)
      })
  } 
  useEffect(hook, [])

  return (
    <div>
      <h1>Candidates</h1>
      <ul>
        {candidates.map(candidate => <Candidate candidate={candidate}/>)}
      </ul>
      <div>
        <Total candidates={candidates} candidate/>
      </div>
    </div>
  )
}

export default App