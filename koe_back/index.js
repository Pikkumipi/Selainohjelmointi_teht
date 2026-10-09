const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

const CANDIDATES = [
    {
        id: 1,
        name: "Mattila Mika",
        party: "The Greens",
        votes : 23435
    },
    {
        id: 2,
        name: "Anttila Sanna",
        party: "National Coalition Party",
        votes : 11223
    },
    {
        id: 3,
        name: "Hakkarainen Maria",
        party: "The Greens",
        votes : 34561
    },
    {
        id: 4,
        name: "Mattila Mika",
        party: "Social Democratic Party",
        votes : 23454
    },
    {
        id: 5,
        name: "Maunula Tiina",
        party: "National Coalition Party",
        votes : 15342
    },
    {
        id: 6,
        name: "Sepponen Jaana",
        party: "The Greens",
        votes : 5342
    },
    {
        id: 7,
        name: "Juvonen Janne",
        party: "The Greens",
        votes : 32532
    },
    {
        id: 8,
        name: "Andersson Ritva",
        party: "National Coalition Party",
        votes : 12543
    }
]

app.get('/api/candidates', (request, response) => {
  response.json(CANDIDATES)
})

app.get('/api/candidates/:votes', (request, response) => {
    const votes = Number(request.params.votes)
    const c = CANDIDATES.filter(c => c.votes >= votes)
    response.json(c)
})

app.post('/api/candidates', (request, response) => {
    const candidate = request.body
    candidate.id = CANDIDATES.length + 1
    CANDIDATES.concat(candidate)
    CANDIDATES.push(candidate)
    response.status(201).json(candidate)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
