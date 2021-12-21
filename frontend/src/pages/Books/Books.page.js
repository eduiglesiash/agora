import './Books.page.css'
import * as api from '../../api/books.api'
import Book from '../../components/Book/Book'
import { useState, useEffect } from 'react'
import axios from 'axios';

import BooksInput from './BooksInput/BooksInput';
import BooksTextarea from './BooksTextarea/BooksTextarea';
import Modal from '../../components/Modal/Modal';

const booksApi = `https://www.googleapis.com/books/v1/volumes?q=isbn:`;
const booksApiOpts = `&maxResults=1`;

export default function BooksPage() {
  const [books, setBooks] = useState([])
  const [modal, setModal] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);
  const [formValues, setFormValues] = useState({
    isbn: '',
    title: '',
    author: '',
    imgURL: '',
    categories: '',
    description: '',
    quantity: undefined,
  });
  const [formErrors, setFormErrors] = useState({
    isbn: '',
    title: '',
    author: '',
    categories: '',
    description: '',
    quantity: '',
  });

  const clearForm = () => setFormValues({
    isbn: '',
    title: '',
    author: '',
    imgURL: '',
    categories: '',
    description: '',
    quantity: undefined,
  });

  const onChangeInput = (e) => {
    setFormValues({ ...formValues, ...{ [e.target.getAttribute('id')]: e.target.value } });
  }

  useEffect(() => {
    clearForm();
    api.getBooksAvaliability({}).then(res => setBooks(res.data))
  }, [modal]);

  const updateFormData = ({ res }) => {
    const authors = res.volumeInfo.authors?.reduce((acc, elem) => {
      acc += `${elem}, `;
      return acc;
    }, '');
    const categories = res.volumeInfo.categories?.reduce((acc, elem) => {
      acc += `${elem}, `;
      return acc;
    }, '');
    const obj = {
      title: res.volumeInfo.title,
      author: authors?.substring(0, authors.length - 2),
      imgURL: res.volumeInfo.imageLinks?.thumbnail,
      categories: categories?.substring(0, categories.length - 2),
      description: res.volumeInfo.description,
    }
    setFormValues({ ...formValues, ...obj });
    setLoadingForm(false);
  }

  const searchIsbn = () => {
    clearForm();
    setLoadingForm(true);
    axios
      .get(`${booksApi}${formValues.isbn}${booksApiOpts}`)
      .then((res) => {
        if (res.data.totalItems === 0) {
          setLoadingForm(false);
          return alert('ISBN NO ENCONTRADO, INTRODUCIR LOS DATOS EN EL FORMULARIO');
        }
        return updateFormData({ res: res.data.items[0] })
      });
  }

  const isFormCorrect = () => {
    let error = false;
    let obj = {
      isbn: '',
      title: '',
      author: '',
      categories: '',
      description: '',
      quantity: '',
    };
    if (formValues.isbn === '') {
      error = true;
      obj = { ...obj, isbn: 'El ISBN es obligatorio' };
    }
    if (formValues.title === '') {
      error = true;
      obj = { ...obj, title: 'El título es obligatorio' };
    }
    if (formValues.quantity === undefined || formValues.quantity === '') {
      error = true;
      obj = { ...obj, quantity: 'Es obligatorio introducir el número de libros que se disponen' };
    }
    setFormErrors(obj);
    return !error;
  }

  const onSubmit = () => {
    if (isFormCorrect()) {
      const filter = {
        isbn: formValues.isbn,
      };
      api.findBooks(new URLSearchParams(filter).toString())
        .then(res => {
          if (res.data.length > 0) {
            alert('El libro ya está guardado en la base de datos');
            return false;
          }
          saveBook();
        })
        .catch(err => console.error(err));
    }
  }

  const saveBook = () => {
    api.createBook({ ...formValues, available: formValues.quantity > 0 })
      .then(res => {
        if (res.status === 200)
          setModal(false);
      })
      .catch(err => console.error(err));
  }

  const toggleModal = () => {
    setModal(!modal);
  }

  const ModalContent = ({ formValues, formErrors, onChangeInput, searchIsbn, onSubmit, closeModal, loading }) => {
    return (
    <>
      <form className='Modal-form'>
        <BooksInput
          id='isbn'
          name='isbn'
          type='text'
          layer='Buscar por ISBN'
          value={formValues.isbn}
          placeholder='ISBN'
          onChange={onChangeInput}
          error={formErrors.isbn}
        />
        <button className='a-cta Book__cta' type='button' onClick={searchIsbn}>Buscar por ISBN</button>
        <p className='a-fs-18 a-fw-700 Book__paragraph'>En caso que no se encuentre la información a través del ISBN o no dispongas del mismo, introduce los datos:</p>
        <BooksInput
          id='title'
          name='title'
          type='text'
          layer='Título'
          value={formValues.title}
          placeholder='Título del libro'
          onChange={onChangeInput}
          error={formErrors.title}
        />
        <BooksInput
          id='author'
          name='author'
          type='text'
          layer='Autor'
          value={formValues.author}
          placeholder='Autor del libro'
          helpText='Si hay varios autores, separar por comas'
          onChange={onChangeInput}
          error={formErrors.author}
        />
        <BooksInput
          id='imgURL'
          name='imgURL'
          type='text'
          layer='Imagen'
          value={formValues.imgURL}
          placeholder='Url de la imagen del libro'
          helpText='Si no se dispone de imagen, dejar en blanco'
          onChange={onChangeInput}
        />
        <BooksInput
          id='categories'
          name='categories'
          type='text'
          layer='Categorías'
          value={formValues.categories}
          placeholder='Categorías a las que pertenece el libro'
          helpText='Si hay varias categorías, separar por comas'
          onChange={onChangeInput}
          error={formErrors.categories}
        />
        <BooksTextarea
          id='description'
          classes='Book__description'
          name='description'
          layer='Descripción'
          value={formValues.description}
          placeholder='Descripción del libro'
          onChange={onChangeInput}
          error={formErrors.description}
        />
        <BooksInput
          id='quantity'
          name='quantity'
          type='number'
          layer='Cantidad'
          value={formValues.quantity}
          placeholder='Cantidad de libros'
          onChange={onChangeInput}
          error={formErrors.quantity}
        />
        <button className='a-cta Book__cta' type='button' onClick={onSubmit}>Guardar libro</button>
        {
          loading && (
            <span className='Modal-loading' aria-hidden='true'>Cargando datos...</span>
          )
        }
      </form>
    </>
  )
  }

  return (
    <section className="a-p-16 a-flex a-flex-column">
      {
        books.map(book => <Book
          key={book.id}
          id={book.id}
          title={book.title}
          author={book.author}
          imgURL={book.imgURL}
          quantity={book.quantity}
          isbn={book.isbn}
        />)
      }
      <button type='button' className='Book__add' onClick={toggleModal}><span className='a-visually-hidden'>Añadir nuevo libro</span></button>
      {
        modal && (
          <Modal
            title='Añadir un nuevo libro'
            onClose={toggleModal}
          >
            <ModalContent
              formValues={formValues}
              formErrors={formErrors}
              onChangeInput={onChangeInput}
              searchIsbn={searchIsbn}
              loading={loadingForm}
              onSubmit={onSubmit}
            />
          </Modal>
        )
      }
    </section>
  )
}
