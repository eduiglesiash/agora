import './CardUser.css'
import { useState } from 'react';
import { Link } from 'wouter'
import { config } from '../../config/config'
import Avatar from '../Avatar/Avatar'
import Modal from 'react-modal'

const customStyles = {
  content: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    width: '60%',
    border: 'none',
    boxShadow: '0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%)',
    height: '200px'
  },
};
Modal.setAppElement('#root');

export default function CardUser() {
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    console.log(`AfterOpenModal`)
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <article className="Card__users a-fade-in">
      <Avatar id="1" />
      <div className="a-flex a-flex-column a-flex-sBetween">
        <h3>Eduardo Iglesias Hernández</h3>
        <p>112132342-M</p>
        <p>Desde: 1/Ago/2020</p>
      </div>
      <div className="a-flex a-flex-column a-flex-sBetween">
        <p>Libros totales: 88</p>
        <p>Libros prestados: 2</p>
      </div>
      <div className="a-flex-align-self-center">
        <h4>Próximo vencimiento: </h4>
        <ul>
          <li>4/OCT/2021</li>
        </ul>
      </div>
      <div className="a-flex-align-self-center a-flex a-flex-center">
        <ul className="a-flex a-flex-row">
          <li className="a-margin-right-16">
            <button className="a-btn__icon" onClick={openModal}>
              <i className="ri-eye-line a-fs-24"></i>
              <span className="sr-only">Ver ficha de usuario</span>
            </button>
          </li>
          <li>
            <Link href={config.paths.userDetail + `/eliddelusuario`} className="a-btn__icon a-lh-2 a-block">
              <i className="ri-edit-line a-fs-24"></i>
              <span className="sr-only">Editar ficha de usuario</span>
            </Link>
          </li>
        </ul>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <header>
          <button className="a-btn__icon" onClick={closeModal}>
            <i className="ri-close-line a-fs-24"></i>
            <span className="sr-only">Cerrar ventana de dialogo </span>
          </button>
        </header>
        <section className="Modal__content">
          <Avatar id="1" />
          <div>
            <h3>Eduardo Iglesias Hernández</h3>
            <p>112132342-M</p>
          </div>
          <div>
            <h4>Datos personales</h4>
            <p> Teléfono de contacto</p>
            <p> Email </p>
          </div>
          <div>
            <p>Desde: 1/Ago/2020</p>
            <p>Libros totales: 88</p>
            <p>Libros prestados: 2</p>
          </div>
        </section>
      </Modal>
    </article>
  )
}
