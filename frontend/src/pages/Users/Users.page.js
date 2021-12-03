import './Users.page.css';
import { config } from '../../config/config';
import CardUser from '../../components/CardUser/CardUser';
import Modal from 'react-modal';
import { VscChromeClose } from 'react-icons/vsc';
import * as strapi from '../../api/users.api';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

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

export default function UsersPage() {

  const [users, setUsers] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    strapi.getUsers()
      .then(users => {
        // console.log({users: users.data});
        setUsers(users.data);
      })
      .catch(err => toast.error(`${config.toastMessage.getUsersError}: \n ${err}`));
  }, []);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const registerUser = useFormik({
    initialValues: {
      name: '',
      surname: '',
      phone: '',
      email: ''
    },
    onSubmit: values => {
      const nameAndSurnameRegistered = users.map(user => `${user.name} ${user.surname}`.toLowerCase().trim());
      const nameAndSurnameNotRegistered = `${values.name} ${values.surname}`.toLowerCase().trim();
      console.log({ nameAndSurnameRegistered, nameAndSurnameNotRegistered })
      if (nameAndSurnameRegistered.includes(nameAndSurnameNotRegistered)) {

        // TODO:  hay que limpiar espacios y tildes para evitar registros duplicados.
        toast.error(config.toastMessage.userRegistered, {
          position: toast.POSITION.TOP_CENTER
        });
      } else {
        const codeUser = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

        // TODO: Serializar el nombre y los datos antes de guardarlo
        strapi.addUser({ ...values, codeUser, 'totalBookRead': 0 })
          .then(user => {
            setUsers([...users, user.data]);
            registerUser.resetForm({
              name: '',
              surname: '',
              phone: '',
              email: ''
            });
            closeModal();
            toast.success(config.toastMessage.userRegisterSuccess);
          })
          .catch(err => toast.error(`${config.toastMessage.userRegisterError}\n ${err}`, {
            position: toast.POSITION.BOTTOM_CENTER
          }));
      }
    },
    onReset: values => {
      closeModal();
    }
  });

  return (
    <>
      <section className="a-p-16 a-flex a-flex-center">
        <button className="a-btn__action" type="button" onClick={openModal}>Dar de alta un usuario</button>
      </section>
      <section className="a-p-16 a-flex a-flex-column">
        {
          users.map(user => (<CardUser
            key={user.id}
            userId={user.id}
            codeUser={user.codeUser}
            email={user.email}
            name={user.name}
            phone={user.phone}
            surname={user.surname}
            totalBookRead={user.totalBookRead}
            avatar={user.avatar}
            created_at={user.created_at}
          />))
        }
      </section>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyleModal}
        contentLabel="Example Modal"
      >
        <header className="a-flex a-flex-end">
          <button className="a-btn__icon" onClick={closeModal}>
            <VscChromeClose size="34px" />
            <span className="sr-only">Cerrar ventana de dialogo </span>
          </button>
        </header>
        <section>
          <form onSubmit={registerUser.handleSubmit} onReset={registerUser.handleReset}>
            <fieldset>
              <legend className="a-text-center a-margin-bottom-16">Registro de usuarios de la biblioteca</legend>
              <div className="a-margin-bottom-16">
                <label htmlFor="mainName">Nombre (Obligatorio)</label>
                <input id="name" name="name" type="text"
                  onChange={registerUser.handleChange}
                  value={registerUser.values.name} required />
              </div>
              <div className="a-margin-bottom-16">
                <label htmlFor="surname">Apellidos (Obligatorio)</label>
                <input id="surname" name="surname" type="text"
                  value={registerUser.values.surname}
                  onChange={registerUser.handleChange} required />
              </div>
              <div className="a-margin-bottom-16">
                <label htmlFor="phone">Teléfono (Obligatorio)</label>
                <input id="phone" name="phone" type="number"
                  maxLength="9"
                  value={registerUser.values.phone}
                  onChange={registerUser.handleChange} required />
              </div>
              <div className="a-margin-bottom-16">
                <label htmlFor="email">Dirección de email </label>
                <input id="email" name="email" type="email"
                  value={registerUser.values.email}
                  onChange={registerUser.handleChange} />
              </div>
            </fieldset>
            <div className="a-flex a-flex-center">
              <button type="reset" className="a-btn__cancel">Cancelar</button>
              <button type="submit" className="a-btn__action">Registrar</button>
            </div>
          </form>
        </section>

      </Modal>
    </>
  );
}
