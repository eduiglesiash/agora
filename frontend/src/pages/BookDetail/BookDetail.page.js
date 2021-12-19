import './BookDetail.page.css'
import React, { useState } from 'react';
import { findBooks, putBook, deleteBook } from '../../api/books.api';
import { useRoute } from 'wouter';
import { useEffect } from 'react';
import { useLocation } from 'wouter';
import BooksInput from '../Books/BooksInput/BooksInput';

const BookDetailField = ({ label, value }) => {
  return (
    <div className='a-margin-bottom-16'>
      <span className='a-block a-fs-18'><strong>{label}</strong></span>
      <span className='a-block a-fs-18'>{value}</span>
    </div>
  )
}

export default function BookDetailPage() {
  const [, params] = useRoute("/bookDetail/:id");
  const [book, setBook] = useState({});
  const [, setLocation] = useLocation();

  useEffect(() => {
    const filter = {
      id: params.id,
    };
    findBooks(new URLSearchParams(filter).toString())
      .then(res => {
        if (res.data.length === 0) {
          alert('El libro no existe en la base de datos');
          return false;
        }
        setBook(res.data[0]);
      })
      .catch(err => console.error(err));
  }, [params.id]);

  const onSubmit = () => {
    putBook(params.id, { quantity: book.quantity })
      .then(() => alert('CANTIDAD ACTUALIZADA CORRECTAMENTE'))
      .catch(err => console.error(err));
  }

  const onDelete = () => {
    if (window.confirm('¿Estás seguro de eliminar el libro?')) {
      deleteBook(params.id)
        .then(() => setLocation('/books'))
        .catch(err => console.error(err));
    }
  }

  return (
    <section className="a-flex">
      <section className="a-p-16 a-flex-basis-25">
        <img src={book.imgURL} alt='Portada de libro' />
        <form className='a-margin-top-16'>
          <BooksInput
            id='quantity'
            name='quantity'
            type='number'
            layer='Cantidad'
            value={book.quantity}
            placeholder='Url de la imagen del libro'
            onChange={(e) => setBook({ ...book, quantity: e.target.value })}
          />
          <button className='a-cta Book__cta' type='button' onClick={onSubmit}>Actualizar cantidad</button>
          <button className='a-cta a-cta--red Book__cta a-margin-top-16' type='button' onClick={onDelete}>Eliminar libro</button>
        </form>
      </section>
      <section className="a-p-16 a-flex-basis-75">
        <BookDetailField label='Título' value={book.title} />
        <BookDetailField label='Autor(es)' value={book.author} />
        <BookDetailField label='Categoría(s)' value={book.categories} />
        <BookDetailField label='Descripción' value={book.description} />
      </section>
    </section>
  )
}
