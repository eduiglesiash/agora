import './Books.page.css'
import * as strapi from '../../api/books.api'
import Book from '../../components/Book/Book'
import { useState, useEffect } from 'react'
import { VscChromeClose } from "react-icons/vsc";

// import { toast } from 'react-toastify'
// import { config } from '../../config/config'


import BooksInput from './BooksInput/BooksInput';
import BooksTextarea from './BooksTextarea/BooksTextarea';
import Modal from 'react-modal'
import { genericStylesModal } from '../../utils/customStylesModals';
import { useFormik } from 'formik';


Modal.setAppElement('#root')

const intiValuesFormBooks = {
  title: '',
  author: '',
  imgURL: '',
  categories: '',
  description: '',
  quantity: undefined,
}

const intiValueISBN = {
  isbn: ''
}

const initialValuesError = {
  isbn: '',
  title: '',
  author: '',
  categories: '',
  description: '',
  quantity: '',
}

export default function BooksPage() {
  const [books, setBooks] = useState([])
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    console.log(`AfterOpenModal`)
  }
  const [loadingForm, setLoadingForm] = useState(false);

  const formBooksValues = useFormik({
    initialValues: intiValuesFormBooks,
    validate: values => {
      const errors = '';
      return errors
    },
    onSubmit: values => {

    },
    onReset: () => { }
  })

  const formISBNValues = useFormik({
    initialValues: intiValueISBN,
    onSubmit: () => { },
    onReset: () => { },
    validate: () => { }
  })

  const formErrors = useFormik({
    initialValues: initialValuesError,
    onSubmit: values => { },
    onReset: () => { }
  })


  const clearForm = () => {
    console.log(`clearForm`)
  };

  useEffect(() => {
    clearForm();
    strapi.getBooksAvaliability().then(res => setBooks(res.data))
  }, []);


  // const updateFormData = ({ res }) => {
  //   const authors = res.volumeInfo.authors?.reduce((acc, elem) => {
  //     acc += `${elem}, `;
  //     return acc;
  //   }, '');
  //   const categories = res.volumeInfo.categories?.reduce((acc, elem) => {
  //     acc += `${elem}, `;
  //     return acc;
  //   }, '');
  //   const obj = {
  //     title: res.volumeInfo.title,
  //     author: authors?.substring(0, authors.length - 2),
  //     imgURL: res.volumeInfo.imageLinks?.thumbnail,
  //     categories: categories?.substring(0, categories.length - 2),
  //     description: res.volumeInfo.description,
  //   }
  //   formBooksValues.setFormValues({ ...formBooksValues, ...obj });
  //   setLoadingForm(false);
  // }

  // const searchIsbn = () => {
  //   clearForm();
  //   setLoadingForm(true);
  //   strapi.getBookByISBN(formBooksValues.isbn)
  //     .then((res) => {
  //       if (res.data.totalItems === 0) {
  //         setLoadingForm(false);
  //         return alert('ISBN NO ENCONTRADO, INTRODUCIR LOS DATOS EN EL FORMULARIO');
  //       }
  //       return updateFormData({ res: res.data.items[0] })
  //     });
  // }

  // const isFormCorrect = () => {
  //   let error = false;
  //   let obj = {
  //     isbn: '',
  //     title: '',
  //     author: '',
  //     categories: '',
  //     description: '',
  //     quantity: '',
  //   };
  //   if (formBooksValues.isbn === '') {
  //     error = true;
  //     obj = { ...obj, isbn: 'El ISBN es obligatorio' };
  //   }
  //   if (formBooksValues.title === '') {
  //     error = true;
  //     obj = { ...obj, title: 'El t??tulo es obligatorio' };
  //   }
  //   if (formBooksValues.quantity === undefined || formBooksValues.quantity === '') {
  //     error = true;
  //     obj = { ...obj, quantity: 'Es obligatorio introducir el n??mero de libros que se disponen' };
  //   }
  //   formErrors.setFormErrors(obj);
  //   return !error;
  // }

  // const onSubmit = () => {
  //   if (isFormCorrect()) {
  //     const filter = {
  //       isbn: formBooksValues.isbn,
  //     };
  //     strapi.findBooks(new URLSearchParams(filter).toString())
  //       .then(res => {
  //         if (res.data.length > 0) {
  //           alert('El libro ya est?? guardado en la base de datos');
  //           return false;
  //         }
  //         saveBook();
  //       })
  //       .catch(err => console.error(err));
  //   }
  // }

  // const saveBook = () => {
  //   strapi.createBook({ ...formBooksValues, available: formBooksValues.quantity > 0 })
  //     .then(res => {
  //       if (res.status === 200)
  //         closeModal();
  //     })
  //     .catch(err => console.error(err));
  // }

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
      <button type='button' className='a-btn__add' onClick={openModal}><span className='a-visually-hidden'>A??adir nuevo libro</span></button>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={genericStylesModal}
        contentLabel="A??adir un nuevo libro"
      >
        <header className="Modal__header">
          <button className="a-btn__icon" onClick={() => { closeModal(); clearForm() }}>
            <VscChromeClose size="34px" />
            <span className="sr-only">Cerrar ventana de dialogo </span>
          </button>
        </header>
        <form className='Modal-form' onSubmit={formISBNValues.handleSubmit} onReset={formISBNValues.handleSubmit}>
          <BooksInput
            id='isbn'
            name='isbn'
            type='text'
            layer='Buscar por ISBN'
            value={formISBNValues.isbn}
            placeholder='ISBN'
            onChange={formISBNValues.handleChange}
            error={formISBNValues.isbn}
          />
          <button className='a-cta Book__cta' type='submit'>Buscar por ISBN</button>
        </form>
        <form className='Modal-form' onSubmit={formBooksValues.handleSubmit} onReset={formBooksValues.handleSubmit}>
          <p className='a-fs-18 a-fw-700 Book__paragraph'>En caso que no se encuentre la informaci??n a trav??s del ISBN o no dispongas del mismo, introduce los datos:</p>
          <BooksInput
            id='title'
            name='title'
            type='text'
            layer='T??tulo'
            value={formBooksValues.title}
            placeholder='T??tulo del libro'
            onChange={formBooksValues.handleChange}
            error={formErrors.title}
          />
          <BooksInput
            id='author'
            name='author'
            type='text'
            layer='Autor'
            value={formBooksValues.author}
            placeholder='Autor del libro'
            helpText='Si hay varios autores, separar por comas'
            onChange={formBooksValues.handleChange}
            error={formErrors.author}
          />
          <BooksInput
            id='imgURL'
            name='imgURL'
            type='text'
            layer='Imagen'
            value={formBooksValues.imgURL}
            placeholder='Url de la imagen del libro'
            helpText='Si no se dispone de imagen, dejar en blanco'
            onChange={formBooksValues.handleChange}
          />
          <BooksInput
            id='categories'
            name='categories'
            type='text'
            layer='Categor??as'
            value={formBooksValues.categories}
            placeholder='Categor??as a las que pertenece el libro'
            helpText='Si hay varias categor??as, separar por comas'
            onChange={formBooksValues.handleChange}
            error={formErrors.categories}
          />
          <BooksTextarea
            id='description'
            classes='Book__description'
            name='description'
            layer='Descripci??n'
            value={formBooksValues.description}
            placeholder='Descripci??n del libro'
            onChange={formBooksValues.handleChange}
            error={formErrors.description}
          />
          <BooksInput
            id='quantity'
            name='quantity'
            type='number'
            layer='Cantidad'
            value={formBooksValues.quantity}
            placeholder='Cantidad de libros'
            onChange={formBooksValues.handleChange}
            error={formErrors.quantity}
          />
          <button className='a-btn__action' type='submit'>Guardar libro</button>
          {
            loadingForm && <span className='Modal-loading' aria-hidden='true'>Cargando datos...</span>
          }
        </form>
      </Modal>
    </section>
  )
}
