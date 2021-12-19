import './Books.page.css'
import * as api from '../../api/books.api'
import Book from '../../components/Book/Book'
import { useState, useEffect } from 'react'
import axios from 'axios';

import BooksModal from './BooksModal/BooksModal';

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
    api.getBooks({}).then(res => setBooks(res.data))
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
      title: '',
      author: '',
      categories: '',
      description: '',
      quantity: '',
    };
    if (formValues.title === '') {
      error = true;
      obj = { ...obj, title: 'El título es obligatorio' };
    }
    if (formValues.author === '') {
      error = true;
      obj = { ...obj, author: 'El autor es obligatorio' };
    }
    if (formValues.categories === '') {
      error = true;
      obj = { ...obj, categories: 'Es obligatirio incluir al menos una categoría' };
    }
    if (formValues.description === '') {
      error = true;
      obj = { ...obj, description: 'La descripción es obligatoria' };
    }
    if (formValues.quantity === undefined || formValues.quantity === '') {
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
          available={book.available}
          isbn={book.isbn}
        />)
      }
      <button type='button' className='Book__add' onClick={toggleModal}><span className='a-visually-hidden'>Añadir nuevo libro</span></button>
      {
        modal && (
          <BooksModal
            formValues={formValues}
            formErrors={formErrors}
            onChangeInput={onChangeInput}
            searchIsbn={searchIsbn}
            closeModal={toggleModal}
            loading={loadingForm}
            onSubmit={onSubmit}
          />
        )
      }
    </section>
  )
}
