import './BookDetail.page.css'
import React, { useState } from 'react';
import { getBooksAvaliability, putBook, deleteBook } from '../../api/books.api';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BooksInput from '../Books/BooksInput/BooksInput';

import { borrowedBookUsers, borrowBook } from '../../api/borrowedBooks.api';

import Modal from '../../components/Modal/Modal';

import noImage from "../../assets/images/no-image.jpg";

const BookDetailField = ({ label, value }) => {
  return (
    <div className='a-margin-bottom-16'>
      <span className='a-block a-fs-18'><strong>{label}</strong></span>
      <span className='a-block a-fs-18'>{value}</span>
    </div>
  )
}

export default function BookDetailPage() {
  const [book, setBook] = useState({});
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [users, setUsers] = useState([]);


  const { isbn } = useParams();

  useEffect(() => {
    getBooksAvaliability(isbn)
      .then(res => {
        if (res.data.length === 0) {
          alert('El libro no existe en la base de datos');
          return false;
        }
        setBook(res.data[0]);
      })
      .catch(err => console.error(err));
  }, [isbn]);

  const refreshBookusers = () => {
    borrowedBookUsers({ book: book.isbn })
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }

  useEffect(() => {
    if (modal)
      refreshBookusers();
  }, [modal, book.isbn]);

  const updateQuantity = () => {
    putBook(book.id, { quantity: book.quantity })
      .then(() => alert('CANTIDAD ACTUALIZADA CORRECTAMENTE'))
      .catch(err => console.error(err));
  }

  const removeBook = () => {
    if (window.confirm('¿Estás seguro de eliminar el libro?')) {
      deleteBook(book.id)
        .then(() => navigate('/books'))
        .catch(err => console.error(err));
    }
  }

  const toggleModal = () => {
    setModal(!modal);
  }

  const lendBook = ({ user }) => {
    borrowBook({ book, user })
      .then(res => {
        if (res.status === 200) {
          alert('LIBRO PRESTADO CORRECTAMENTE');
        }
        refreshBookusers();
      })
      .catch(err => console.error(err));
  }

  const ModalContent = () => {
    return (
      <>
        <div className='a-flex a-flex-align-item BookDetailPage__modal-header'>
          <div className='a-flex a-flex-basis-25 BookDetailPage__modal-name'><strong>Nombre</strong></div>
          <div className='a-flex a-flex-basis-50 BookDetailPage__modal-surname'><strong>Apellidos</strong></div>
        </div>
        <ul className='BookDetailPage__modal-list'>
          {
            users.map(user =>
              <li className='a-flex a-flex-align-item a-margin-top-16 BookDetailPage__modal-element' key={user.codeUser}>
                <div className='a-flex a-flex-basis-25 BookDetailPage__modal-name'>{user.name}</div>
                <div className='a-flex a-flex-basis-50 BookDetailPage__modal-surname'>{user.surname}</div>
                <div className='a-flex a-flex-basis-25 BookDetailPage__modal-button-container'>
                  <button className={`a-cta ${user.borrowed ? 'a-cta--disabled' : 'a-cta--blue'} Book__cta BookDetailPage__modal-button`} type='button' disabled={user.borrowed} onClick={() => lendBook({ user })}>{user.borrowed ? 'Libro prestado' : 'Prestar libro'}</button>
                </div>
              </li>
            )
          }
        </ul>
      </>
    )
  }

  return (
    <section className="a-flex">
      <section className="a-p-16 a-flex-basis-25 BookDetailPage__col--left">
        <img src={book.imgURL || noImage} alt='Portada de libro' />
        <form className='a-margin-top-16'>
          <BooksInput
            id='quantity'
            name='quantity'
            type='number'
            layer='Cantidad en la biblioteca:'
            value={book.quantity}
            placeholder='Url de la imagen del libro'
            onChange={(e) => setBook({ ...book, quantity: e.target.value })}
          />
          <button className='a-cta Book__cta' type='button' onClick={updateQuantity}>Actualizar cantidad</button>
          <button className={`a-cta ${book.leftBooks === 0 ? ' a-cta--disabled' : 'a-cta--blue'} a-margin-top-16 Book__cta`} disabled={book.leftBooks === 0} type='button' onClick={toggleModal}>{book.leftBooks > 0 ? 'Prestar libro' : 'Todos prestados'}</button>
          <button className='a-cta a-cta--red a-margin-top-16 Book__cta' type='button' onClick={removeBook}>Eliminar libro</button>
        </form>
      </section>
      <section className="a-p-16 a-flex-basis-75">
        <BookDetailField label='Título' value={book.title} />
        <BookDetailField label='Autor(es)' value={book.author} />
        <BookDetailField label='Categoría(s)' value={book.categories} />
        <BookDetailField label='Descripción' value={book.description} />
      </section>
      {modal && (
        <Modal
          title='Selecciona el usuario'
          onClose={toggleModal}
        >
          <ModalContent />
        </Modal>
      )}
    </section>
  )
}
