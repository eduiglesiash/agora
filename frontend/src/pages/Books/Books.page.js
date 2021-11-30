import './Books.page.css'
import * as api from '../../api/books.api'
import Book from '../../components/Book/Book'
import { useState, useEffect } from 'react'
import axios from 'axios';

const booksApi = `https://www.googleapis.com/books/v1/volumes?q=isbn:`;


export default function BooksPage() {
  const [books, setBooks] = useState([])
  const [modal, setModal] = useState(false);
  const [isbn, setIsbn] = useState('');

  useEffect(() => {
    api.getBooks().then(res => setBooks(res.data))
  }, [])

  const searchIsbn = () => {
    // axios.get(`${booksApi}${isbn}`)
    console.log(isbn);
  }

  const saveBook = () => {

  }

  const Input = ({ id, classes, value, name, type, layer, placeholder, onChange, error, errorHint }) => {
    const classnames = `a-input ${classes}`;
    return (
      <div className='a-input__container'>
        <span className='a-input__layer'>{layer}</span>
        <input
          id={id}
          className={classnames}
          value={value}
          name={name}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
        />
        { error && (
          <span class='a-input__error'>{errorHint}</span>
        )}
      </div>
    )
  }

  const Textarea = ({ id, classes, name, type, layer, placeholder, error, errorHint }) => {
    const classnames = `a-input ${classes}`;
    return (
      <div className='a-input__container'>
        <span className='a-input__layer'>{layer}</span>
        <textarea
          id={id}
          className={classnames}
          name={name}
          type={type}
          placeholder={placeholder}
        />
        { error && (
          <span class='a-input__error'>{errorHint}</span>
        )}
      </div>
    )
  }

  const BookModal = () => {
    return (
      <section className='Book__modal a-flex a-flex-center'>
        <div className='Book__modal-content'>
          <header className='Book__modal-header'>
            <h2>Añadir un nuevo libro</h2>
          </header>
          <form className='Book__modal-form'>
            <Input
              id='isbn'
              name='isbn'
              type='text'
              layer='Buscar por ISBN'
              value={isbn}
              placeholder='ISBN'
              onChange={(e) => setIsbn(e.target.value)}
              error={false}
              errorHint='Mensaje error'
            />
            <button className='a-cta Book__cta' type='button' onClick={searchIsbn}>Buscar por ISBN</button>
            <p className='a-fs-18 a-fw-700 Book__paragraph'>En caso que no se encuentre la información a través del ISBN o no dispongas del mismo, introduce los datos:</p>
            <Input
              id='title'
              name='title'
              type='text'
              layer='Título'
              placeholder='Título del libro'
              error={false}
              errorHint='Mensaje error'
            />
            <Input
              id='author'
              name='author'
              type='text'
              layer='Autor'
              placeholder='Autor del libro'
              error={false}
              errorHint='Mensaje error'
            />
            <Input
              id='image'
              name='image'
              type='text'
              layer='Imagen'
              placeholder='Url de la imagen del libro'
              error={false}
              errorHint='Mensaje error'
            />
            <Input
              id='categories'
              name='categories'
              type='text'
              layer='Categorías'
              placeholder='Categorías a las que pertenece el libro'
              error={false}
              errorHint='Mensaje error'
            />
            <Textarea
              id='description'
              classes='Book__description'
              name='description'
              layer='Descripción'
              placeholder='Descripción del libro'
              error={false}
              errorHint='Mensaje error'
            />
            <button className='a-cta Book__cta' type='button' onClick={saveBook}>Guardar libro</button>
          </form>
          <button className='Book__modal-close' onClick={toggleModal}><span class='a-visually-hidden'>Cerrar modal</span></button>
        </div>
      </section>
    )
  }

  const toggleModal = () => {
    setModal(!modal);
  }

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
      <button type='button' className='Book__add' onClick={toggleModal}><span class='a-visually-hidden'>Añadir nuevo libro</span></button>
      {
        modal && (
          <BookModal />
        )
      }
    </section>
  )
}
