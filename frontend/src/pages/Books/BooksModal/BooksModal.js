import BooksInput from './../BooksInput/BooksInput';
import BooksTextarea from './../BooksTextarea/BooksTextarea';

import './BooksModal.css';

export default function BooksModal({ formValues, formErrors, onChangeInput, searchIsbn, onSubmit, closeModal, loading }) {
    return (
      <section className='Books__modal a-flex a-flex-center'>
        <div className='Books__modal-content'>
          <header className='Books__modal-header'>
            <h2>Añadir un nuevo libro</h2>
          </header>
          <form className='Books__modal-form'>
            <BooksInput
              id='isbn'
              name='isbn'
              type='text'
              layer='Buscar por ISBN'
              value={formValues.isbn}
              placeholder='ISBN'
              onChange={onChangeInput}
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
                <span className='Books__modal-loading' aria-hidden='true'>Cargando datos...</span>
              )
            }
          </form>
          <button className='Books__modal-close' onClick={closeModal}><span className='a-visually-hidden'>Cerrar modal</span></button>
        </div>
      </section>
    )
}
