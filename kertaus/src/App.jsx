import { useState, useEffect } from 'react'
import axios from 'axios'

const Books = (props) => {
  return (
    <div>
      <h2>Arvostelut</h2>
      <div>
        <div>
          <button onClick={() => props.setShowAll(!props.showAll)}>
            show {props.showAll ? 'best' : 'all'}
          </button>
        </div>
        <div>
          {props.booksToShow.map(b => 
            <div key={b.title}>
              {b.title}, {b.author}, {b.review}, {b.rating} {' '}
              <button onClick={() => props.removeBook(b)}>delete</button>
            </div>
          )}
        </div>
      </div>
    </div>
    
  )
}


const AddBook = (props) => {
  return (
    <div>
      <h2>Kirjan lisääminen</h2>
      <form>
        <div>
          Otsikko: <input value={props.newTitle} onChange={props.handleTitleChange}/>
        </div>
        <div>
          Kirjoittaja: <input value={props.newAuthor} onChange={props.handleAuthorChange}/>
        </div>
        <div>
          Arvostelu: <input value={props.newReview} onChange={props.handleReviewChange}/>
        </div>
        <div>
          Arvosana: <input value={props.newRating} onChange={props.handleRatingChange}/>
        </div>
        <div>
          <button type="submit" onClick={props.Add}>
            add
          </button>
        </div>
      </form>
    </div>
  )
}


const App = () => {
  const [books, setBooks] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newReview, setNewReview] = useState('')
  const [newRating, setNewRating] = useState('')
  const [showAll, setShowAll] = useState(true)

  const hook = () => {
    console.log('effect tehty')
    axios
    .get('http://localhost:3001/api/books')
    .then(response => {
      console.log('promise fulfilled')
      setBooks(response.data)
    })
  }
  useEffect(hook, [])

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleRatingChange = (event) => {
    setNewRating(event.target.value)
  }

  const handleReviewChange = (event) => {
    setNewReview(event.target.value)
  }

  const removeBook = (book) => {
    if (window.confirm(`delete ${book.title}`)) {
      axios
        .delete(`http://localhost:3001/api/books/${book.id}`)
        .then(() => {
          setBooks(b => b.filter(thisBook => thisBook.id !== book.id))
        })
    }
  }

  const Add = (event) => {
    console.log('book added')
    event.preventDefault()
    const bookObject = {
      id:1,
      title: newTitle,
      author: newAuthor,
      review: newReview,
      rating: newRating
    }

    if (books.some(b => b.title === newTitle)) {
      console.log(newTitle, 'is Already reviewed')
    } else {

      axios
        .post(`http://localhost:3001/api/books`, bookObject)
        .then(response => {
          setBooks(books.concat(response.data))
          setNewTitle('')
          setNewAuthor('')
          setNewReview('')
          setNewRating('')
        })
    }
  }

  const booksToShow = showAll
      ? books
      : books.filter(b => b.rating === "5")

  return (
    <div>
      <h1>Kirja Arvostelut</h1>
      <p>Täänne voit lisätä kirja-arvosteluja</p>
      <AddBook newTitle={newTitle} newAuthor={newAuthor} newReview={newReview}
      newRating={newRating} handleTitleChange={handleTitleChange} handleAuthorChange={handleAuthorChange}
      handleReviewChange={handleReviewChange} handleRatingChange={handleRatingChange} 
      Add={Add}/>
      <Books books={books} showAll={showAll} booksToShow={booksToShow} setShowAll={setShowAll}
      removeBook={removeBook}/>
    </div>
  )
}

export default App