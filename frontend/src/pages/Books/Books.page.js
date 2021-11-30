import './Books.page.css'
import * as api from '../../api/books.api'
import Book from '../../components/Book/Book'
import { useState, useEffect } from 'react'
import axios from 'axios';

const booksApi = `https://www.googleapis.com/books/v1/volumes?q=isbn:`;
const booksApiOpts = `&maxResults=1`;

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

const Textarea = ({ id, classes, value, name, type, layer, placeholder, onChange, error, errorHint }) => {
  const classnames = `a-input ${classes}`;
  return (
    <div className='a-input__container'>
      <span className='a-input__layer'>{layer}</span>
      <textarea
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

const BookModal = ({ formValues, onChangeInput, searchIsbn, saveBook, closeModal }) => {
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
            value={formValues.isbn}
            placeholder='ISBN'
            onChange={onChangeInput}
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
            value={formValues.title}
            placeholder='Título del libro'
            onChange={onChangeInput}
            error={false}
            errorHint='Mensaje error'
          />
          <Input
            id='author'
            name='author'
            type='text'
            layer='Autor'
            value={formValues.author}
            placeholder='Autor del libro'
            onChange={onChangeInput}
            error={false}
            errorHint='Mensaje error'
          />
          <Input
            id='image'
            name='image'
            type='text'
            layer='Imagen'
            value={formValues.image}
            placeholder='Url de la imagen del libro'
            onChange={onChangeInput}
            error={false}
            errorHint='Mensaje error'
          />
          <Input
            id='categories'
            name='categories'
            type='text'
            layer='Categorías'
            value={formValues.categories}
            placeholder='Categorías a las que pertenece el libro'
            onChange={onChangeInput}
            error={false}
            errorHint='Mensaje error'
          />
          <Textarea
            id='description'
            classes='Book__description'
            name='description'
            layer='Descripción'
            value={formValues.description}
            placeholder='Descripción del libro'
            onChange={onChangeInput}
            error={false}
            errorHint='Mensaje error'
          />
          <Input
            id='quantity'
            name='quantity'
            type='number'
            layer='Cantidad'
            value={formValues.quantity}
            placeholder='Cantidad de libros'
            onChange={onChangeInput}
            error={false}
            errorHint='Mensaje error'
          />
          <button className='a-cta Book__cta' type='button' onClick={saveBook}>Guardar libro</button>
        </form>
        <button className='Book__modal-close' onClick={closeModal}><span class='a-visually-hidden'>Cerrar modal</span></button>
      </div>
    </section>
  )
}

export default function BooksPage() {
  const [books, setBooks] = useState([])
  const [modal, setModal] = useState(false);
  const [formValues, setFormValues] = useState({
    isbn: '',
    title: '',
    author: '',
    image: '',
    categories: '',
    description: '',
    quantity: null,
  });

  const onChangeInput = (e) => {
    setFormValues({ ...formValues, ...{ [e.target.getAttribute('id')]: e.target.value } });
  }

  useEffect(() => {
    api.getBooks().then(res => setBooks(res.data))
  }, []);

  const updateFormData = ({ res }) => {
    const authors = res.volumeInfo.authors.reduce((acc, elem) => {
      acc += `${elem}, `;
      return acc;
    }, '');
    const categories = res.volumeInfo.categories.reduce((acc, elem) => {
      acc += `${elem}, `;
      return acc;
    }, '');
    const obj = {
      title: res.volumeInfo.title,
      author: authors,
      image: res.volumeInfo.imageLinks.thumbnail,
      categories: categories,
      description: res.volumeInfo.description,
    }
    setFormValues({ ...formValues, ...obj });
    console.log(formValues);
  }

  const searchIsbn = () => {
    axios
      .get(`${booksApi}${formValues.isbn}${booksApiOpts}`)
      .then((res) => updateFormData({ res: res.data.items[0] }));
  }

  const saveBook = () => {

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
          <BookModal
            formValues={formValues}
            onChangeInput={onChangeInput}
            searchIsbn={searchIsbn}
            saveBook={saveBook}
            closeModal={toggleModal}
          />
        )
      }
    </section>
  )
}
