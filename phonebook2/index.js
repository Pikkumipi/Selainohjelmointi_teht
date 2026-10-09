const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

let persons = [
  {
    id: "1",
    name: "Mipsu",
    number: "9350279987"
  },
  {
    id: "2",
    name: "Jumala",
    number: "09876578"
  },
  {
    id: "3",
    name: "zeus",
    number: "23847654"
  },
]

app.get('/', (request, response) => {
    response.send('<h1>Moikkuli meitsi on tääl!</h1> <p>Löyät infoa kun laitat kenttään /info</p>')
})

app.get('/info', (request, response) => {
    const a = persons.length
    const time = new Date()
    response.send(`
        <h1> INFO</h1> 
        <p>Phonebook has info for ${a} people
        <p>${time}</p>`)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(p => p.id !== id)

    response.status(204).end()
})

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => Number(n.id)))
    : 0
  return String(maxId + 1)
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'name or number missing' 
    })
  }
  if (persons.some(person => person.name === body.name) || 
    persons.some(person => person.number === body.number)) {
    return response.status(400).json({
        error: 'name or number already in phonebook'
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(person)

  response.json(person)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)