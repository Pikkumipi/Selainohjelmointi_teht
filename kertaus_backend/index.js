const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

let books = [
    {
        id:1,
        title: 'Sinuhe Egyptiläinen',
        author: 'Mika Waltari',
        review: 'Vaikuttava',
        rating: "5"
    },
    {
        id: 2,
        title: 'Mun elämänkerta',
        author: 'Mipsu',
        review: 'Sykähdyttävä',
        rating: '2'
    }
]

app.get('/api/books', (request, response) => {
    response.json(books)
})

app.get('/api/books/:id', (request, response) => {
    const id = Number(request.params.id)
    const book = books.find(b => b.id === id)
    if (book) {
        response.json(book)
    } else {
        response.status(404).end()
    }
})

app.post('/api/books', (request, response) => {
    const book = request.body

    if (!book.title || !book.author || 
        !book.id || !book.review || !book.rating) {
            return response.status(400).json({
            error: 'Enter all of your information!'
            })
        }
    if (books.some(b => b.title === book.title)) {
        return response.status(400).json({
            error: 'That book is already reviewed.'
        })
    }
    book.id = books.length + 1
    books.concat(book)
    books.push(book)
    response.status(201).json(book)
})

app.delete('/api/books/:id', (request, response) => {
    const id = Number(request.params.id)
    books = books.filter(b => b.id !== id)

    response.status(204).end()
})

const PORT = 3001
app.listen(PORT)
console.log('Server running on port ', PORT)