import './Books.page.css'
import * as api from '../../api/books.api'
import Book from '../../components/Book/Book'
import { useState, useEffect } from 'react'
import { useFormik } from 'formik';

import axios from 'axios';

import { toast } from 'react-toastify'
import { config } from '../../config/config'

import BooksInput from './BooksInput/BooksInput';
import BooksTextarea from './BooksTextarea/BooksTextarea';
import Modal from '../../components/Modal/Modal';

const booksApi = `https://www.googleapis.com/books/v1/volumes?q=isbn:`;
const booksApiOpts = `&maxResults=1`;

export default function BooksPage() {
  const [books, setBooks] = useState([])
  const [modal, setModal] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);

  const formik = useFormik({
    initialValues: {
      isbn: '',
      title: '',
      author: '',
      imgURL: '',
      categories: '',
      description: '',
      quantity: undefined,
    },
    onSubmit: async (values) => {
      api.createBook(values)
        .then(res => {
          if (res.status === 200)
            toast.success(config.toastMessage.saveBookSuccess)
            setModal(false);
        })
        .catch(err => toast.error(config.toastMessage.saveBookError, {
          position: toast.POSITION.TOP_CENTER
        }));
    }
  });

  useEffect(() => {
    formik.resetForm();
    api.getBooksAvaliability().then(res => setBooks(res.data))
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
    formik.setValues({ ...formik.values, ...obj });
    setLoadingForm(false);
  }

  const searchIsbn = () => {
    if (formik.values.isbn === '')
      return toast.error(config.toastMessage.isbnNeeded);
    formik.resetForm();
    setLoadingForm(true);
    axios
      .get(`${booksApi}${formik.values.isbn}${booksApiOpts}`)
      .then((res) => {
        setLoadingForm(false);
        if (res.data.totalItems === 0) {
          return toast.error(config.toastMessage.isbnNotFound);
        }
        return updateFormData({ res: res.data.items[0] });
      });
  }

  const toggleModal = () => {
    setModal(!modal);
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
          leftBooks={book.leftBooks}
          isbn={book.isbn}
        />)
      }
      <button type='button' className='a-btn__add' onClick={toggleModal}><span className='a-visually-hidden'>Añadir nuevo libro</span></button>
      {
        modal && (
          <Modal
            title='Añadir un nuevo libro'
            onClose={toggleModal}
          >
            <form className='Modal-form' onSubmit={formik.handleSubmit}>
              <BooksInput
                id='isbn'
                name='isbn'
                type='text'
                layer='Buscar por ISBN'
                value={formik.values.isbn}
                placeholder='ISBN'
                onChange={formik.handleChange}
                required
              />
              <button className='a-cta Book__cta' type='button' onClick={searchIsbn}>Buscar por ISBN</button>
              <p className='a-fs-18 a-fw-700 Book__paragraph'>En caso que no se encuentre la información a través del ISBN o no dispongas del mismo, introduce los datos:</p>
              <BooksInput
                id='title'
                name='title'
                type='text'
                layer='Título'
                value={formik.values.title}
                placeholder='Título del libro'
                onChange={formik.handleChange}
                required
              />
              <BooksInput
                id='author'
                name='author'
                type='text'
                layer='Autor'
                value={formik.values.author}
                placeholder='Autor del libro'
                helpText='Si hay varios autores, separar por comas'
                onChange={formik.handleChange}
                required
              />
              <BooksInput
                id='imgURL'
                name='imgURL'
                type='text'
                layer='Imagen'
                value={formik.values.imgURL}
                placeholder='Url de la imagen del libro'
                helpText='Si no se dispone de imagen, dejar en blanco'
                onChange={formik.handleChange}
              />
              <BooksInput
                id='categories'
                name='categories'
                type='text'
                layer='Categorías'
                value={formik.values.categories}
                placeholder='Categorías a las que pertenece el libro'
                helpText='Si hay varias categorías, separar por comas'
                onChange={formik.handleChange}
              />
              <BooksTextarea
                id='description'
                classes='Book__description'
                name='description'
                layer='Descripción'
                value={formik.values.description}
                placeholder='Descripción del libro'
                onChange={formik.handleChange}
              />
              <BooksInput
                id='quantity'
                name='quantity'
                type='number'
                layer='Cantidad'
                value={formik.values.quantity}
                placeholder='Cantidad de libros'
                onChange={formik.handleChange}
                required
              />
              <button className='a-btn__action' type='submit'>Guardar libro</button>
              {
                loadingForm && (
                  <span className='Modal-loading' aria-hidden='true'>Cargando datos...</span>
                )
              }
            </form>
          </Modal>
        )
      }
    </section>
  )
}
