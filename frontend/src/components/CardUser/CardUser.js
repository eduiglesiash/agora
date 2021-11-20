import './CardUser.css'
import { useState } from 'react';
import { Link } from 'wouter'
import { config } from '../../config/config'
import Avatar from '../Avatar/Avatar'
import Modal from 'react-modal'
import { FcInfo, FcDataConfiguration } from "react-icons/fc";
import { VscChromeClose } from "react-icons/vsc";


const customStyles = {
  content: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    width: '60%',
    height: 'auto',
    border: 'none',
    boxShadow: '0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%)',
  },
};
Modal.setAppElement('#root');

export default function CardUser({ codeUser, email, name, phone, surname, totalBookRead, avatar, created_at }) {
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
      <Avatar thumbnail={avatar} />
      <div className="a-flex a-flex-column a-flex-sBetween">
        <h3>{name} {surname}</h3>
        <p>{codeUser}</p>
        <p>Desde: {created_at}</p>
      </div>
      <div className="a-flex a-flex-column a-flex-sBetween">
        <p>Libros totales: {totalBookRead}</p>
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
              <FcInfo size="30px"/>
              <span className="sr-only">Ver ficha de usuario</span>
            </button>
          </li>
          <li>
            <Link href={config.paths.userDetail + `/eliddelusuario`} className="a-btn__icon a-lh-2 a-flex a-flex-center a-flex-align-item">
              <FcDataConfiguration size="30px"/>
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
            <VscChromeClose size="34px"/> 
            <span className="sr-only">Cerrar ventana de dialogo </span>
          </button>
        </header>
        <section className="Modal__content">
          <div className="a-flex ">
            <Avatar thumbnail={avatar} />
            <div>
              <h3>{name} {surname}</h3>
              <ul>
                <li>{codeUser}</li>
                <li>{phone}</li>
                <li> {email}</li>
              </ul>
            </div>
          </div>
          <div>
            <p>Desde: {created_at}</p>
            <p>Libros totales: {totalBookRead}</p>
            <p>Libros prestados: 2</p>
          </div>
        </section>
      </Modal>
    </article>
  )
}
