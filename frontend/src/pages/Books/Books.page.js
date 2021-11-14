import './Books.page.css'
import * as api from '../../api/books.api'
import Book from '../../components/Book/Book'
import { useState, useEffect } from 'react'


export default function BooksPage() {

  const [books, setBooks] = useState([])

  useEffect(() => {
    api.getBooks().then(res => setBooks(res.data))
  }, [])

  return (
    <section className="a-p-16 a-flex a-flex-column">
      {
        books.map(book => <Book
          key={book.id}
          title={book.title}
          author={book.author}
          imgURL={book.imgURL}
          quantity={book.quantity}
          available={book.available}
          isbn={book.isbn}
        />)
      }
    </section>
  )
}
