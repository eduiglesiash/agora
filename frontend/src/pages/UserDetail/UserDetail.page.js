import './UserDetail.page.css';
import { useState, useEffect} from 'react';
import Avatar from '../../components/Avatar/Avatar';
import Book from '../../components/Book/Book';
import * as strapi from '../../api/users.api';
import Modal from 'react-modal';
import { VscChromeClose } from 'react-icons/vsc';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import { config } from '../../config/config';

const customStyleModal = {
  content: {
    position: 'absolute',
    padding: '48px',
    top: '40%',
    left: '50%',
    transform: 'translate(-40%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    width: '60%',
    height: '600px',
    border: 'none',
    boxShadow: '0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%)'
  }
};
Modal.setAppElement('#root');

export default function UserDetailPage() {
  const [user, setUser] = useState({});
  const [modalIsOpen, setIsOpen] = useState(false);
  const navigation = useNavigate();
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  let { id } = useParams();

  const formDeleteUser = useFormik({
    initialValues: {
      confirm: ''
    },
    validate: values => {
      const VALIDATED = 'borrar/usuario';
      const valueFormat = values.confirm.toLowerCase().trim();
      const errors = {};
      if (!values.confirm) {
        errors.confirm = 'Tiene que rellenar el campo';
      } else if (valueFormat !== VALIDATED) {
        errors.confirm = 'La validación no coincide';
      }
      return errors;
    },
    onSubmit: values => {
      console.log(`On Submit`);
      strapi.deleteUser(user.id)
        .then(user => {
          // console.log({ user })
          navigation(config.paths.users);
          closeModal();
          toast.success(config.toastMessage.userDeleteSuccess);
        })
        .catch(err => toast.error(`${config.toastMessage.userDeleteError} ${err}`));

    },
    onReset: () => closeModal()
  });

  const formValidateClassError = classNames({
    'a-form__errorInput': formDeleteUser.errors.confirm,
    'a-form__success': !formDeleteUser.errors.confirm
  });

  const updateFormUser = useFormik({
    initialValues: {
      name: '',
      surname: '',
      phone: '',
      email: ''
    },
    validate: values => {
      const errors = {};

      return errors;
    },
    onSubmit: values => {
      strapi.updateUser({ ...user, ...values })
        .then(userUpdated => {
          setUser(userUpdated.data);
          toast.success(config.toastMessage.userUpdateSuccess);
        })
        .catch(err => toast.error(`${config.toastMessage.userUpdateError}\n ${err}`));
    },
    onReset: () => { }
  });

  useEffect(() => {
    strapi.getUserByID(id)
      .then(user => {
        setUser(user.data);
        updateFormUser.setValues({
          name: user.data.name,
          surname: user.data.surname,
          phone: user.data.phone,
          email: user.data.email
        });
      })
      .catch(err => toast.error(`${config.toastMessage.getUserByIDError} ${err}`));
  }, []);

  const isFieldModified = () => {
    const { name, surname, phone, email } = user;
    return updateFormUser.values.name !== name || updateFormUser.values.surname !== surname || updateFormUser.values.phone !== phone || updateFormUser.values.email !== email;
  };

  return (
    <>
      <section className="a-flex a-flex-column">
        <section className="a-p-16 a-flex-basis-50">
          <Avatar thumbnail={user.avatar} />
          <form onSubmit={updateFormUser.handleSubmit} onReset={updateFormUser.handleReset}>
            <fieldset>
              <legend className="sr-only"> Datos Personales</legend>
              <div>
                <label htmlFor="mainName">Nombre</label>
                <input id="name" name="name" type="text"
                  value={updateFormUser.values.name}
                  onChange={updateFormUser.handleChange} />
              </div>
              <div>
                <label htmlFor="surname">Apellidos</label>
                <input id="surname" name="surname" type="text"
                  value={updateFormUser.values.surname}
                  onChange={updateFormUser.handleChange} />
              </div>
              <div>
                <label htmlFor="phone">Teléfono</label>
                <input id="phone" name="phone" type="number"
                  value={updateFormUser.values.phone}
                  onChange={updateFormUser.handleChange} />
              </div>
              <div>
                <label htmlFor="email">Dirección de email</label>
                <input id="email" name="email" type="email"
                  value={updateFormUser.values.email}
                  onChange={updateFormUser.handleChange} />
              </div>
            </fieldset>
            {
              isFieldModified() &&
              <>
                <button type="reset" className="udp__btn udp__btn--cancel a-bk-red">Descartar cambios</button>
                <button type="submit" className="udp__btn udp__btn--success a-bk-green">Guardar cambios</button>
              </>
            }
          </form>
          <div className="a-flex a-flex-column a-flex-sBetween">
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
        </section>
        <section className="a-p-16 a-flex-basis-100">
          <h2>Libros leídos</h2>
          <Book />
        </section>
      </section>
      <section className="a-flex a-flex-column a-flex-center a-margin-bottom-16">
        <h2 className="a-red a-text-center a-margin-bottom-16">Zona peligrosa</h2>
        <button type="button" className="a-btn__delete" onClick={openModal}>Borrar usuario</button>
      </section>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyleModal}
        contentLabel="Zona peligrosa | Borrar usuario"
      >
        <header className="a-flex a-flex-end">
          <button className="a-btn__icon" onClick={closeModal}>
            <VscChromeClose size="34px" />
            <span className="sr-only">Cerrar ventana de dialogo </span>
          </button>
        </header>
        <section>

          <form onSubmit={formDeleteUser.handleSubmit} onReset={formDeleteUser.handleReset}>
            <fieldset>
              <legend className="a-form__legend">
                <h4>¿Estas seguro/a que deseas eliminar este usuario?</h4>
                <p>La eliminación del usuario es irreversible</p>
              </legend>
              <div className="a-margin-bottom-16">
                <label htmlFor="email">
                  Para eliminar el usuario tienes que escribir el siguiente texto en el
                  campo: <strong>borrar/usuario</strong>
                </label>
                <input id="confirm" name="confirm" type="text" className={formValidateClassError}
                  value={formDeleteUser.values.confirm}
                  onChange={formDeleteUser.handleChange} required />
                {
                  formDeleteUser.errors.confirm
                  && <p className="a-form__errorText">{formDeleteUser.errors.confirm}</p>
                }
              </div>

            </fieldset>
            <div className="a-flex a-flex-center">
              <button type="reset" className="a-btn__cancel">Cancelar</button>
              <button type="submit" className="a-btn__action">Borrar</button>
            </div>
          </form>
        </section>
      </Modal>
    </>
  );
}
