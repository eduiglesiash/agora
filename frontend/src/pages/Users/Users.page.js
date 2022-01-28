import './Users.page.css';
import { config } from '../../config/config';
import CardUser from '../../components/CardUser/CardUser';

import * as strapi from '../../api/users.api';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/useAuth';
import Modal from '../../components/Modal/Modal';


export default function UsersPage() {

  const [users, setUsers] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const auth = useAuth();

  const toggleModal = () => {
    const state = !modalIsOpen;
    console.log({ state })
    setModalIsOpen(state);
  }


  useEffect(() => {
    auth.token && strapi.getUsers(auth.token)
      .then(users => {
        setUsers(users.data);
      })
      .catch(err => toast.error(`${config.toastMessage.getUsersError}: \n ${err}`));
  }, [auth, modalIsOpen]);

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
            setModalIsOpen(false)
            toast.success(config.toastMessage.userRegisterSuccess);
          })
          .catch(err => toast.error(`${config.toastMessage.userRegisterError}\n ${err}`, {
            position: toast.POSITION.BOTTOM_CENTER
          }));
      }
    },
    onReset: values => {
      console.log('Reset form');
      setModalIsOpen(false)
    }
  });

  return (
    <>
      <section className="a-p-16 a-flex a-flex-center">
        <button type='button' className='a-btn__add a-btn--blue ' onClick={toggleModal}><span className='a-visually-hidden'>Dar de alta un usuario</span></button>
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
      {
        modalIsOpen && (
          <Modal
            title='Registro de usuarios para la biblioteca'
            onClose={toggleModal}
          >
            <section>
              <form onSubmit={registerUser.handleSubmit}
                onReset={registerUser.handleReset}>
                <fieldset>
                  <legend className="a-text-center a-margin-bottom-16 a-visually-hidden">Registro de usuarios de la biblioteca</legend>

                  <label><span>Nombre (Obligatorio)</span>
                    <input name="name" type="text"
                      onChange={registerUser.handleChange}
                      value={registerUser.values.name} required />
                  </label>

                  <label htmlFor="surname">
                    <span>Apellidos (Obligatorio)</span>
                    <input name="surname" type="text"
                      value={registerUser.values.surname}
                      onChange={registerUser.handleChange} required />
                  </label>

                  <label>
                    <span>Teléfono (Obligatorio)</span>
                    <input name="phone" type="number"
                      maxLength="9"
                      value={registerUser.values.phone}
                      onChange={registerUser.handleChange} required />
                  </label>

                  <label>
                    <span>Dirección de email</span>
                    <input name="email" type="email"
                      value={registerUser.values.email}
                      onChange={registerUser.handleChange} />
                  </label>


                </fieldset>
                <div className="a-flex a-flex-center a-flex-gap16">
                  <button type="reset" className="a-btn__cancel">Cancelar</button>
                  <button type="submit" className="a-btn__action">Registrar</button>
                </div>
              </form>
            </section>

          </Modal>
        )
      }

    </>
  );
}
