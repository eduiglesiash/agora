import './UserDetail.page.css';
import { useState, useEffect } from 'react'
import Avatar from '../../components/Avatar/Avatar'
import Book from '../../components/Book/Book'
import * as strapi from '../../api/users.api'

export default function UserDetailPage({ params }) {
  const [user, setUser] = useState({})
  const [stateForm, setStateForm] = useState({
    name: '',
    surname: '',
    phone: '',
    email: ''
  })
  const [stateBtnSave, setStateBtnSave] = useState(false)

  useEffect(() => {
    strapi.getUserByID(params.id)
      .then(user => {
        const { name, surname, phone, email } = user.data
        setUser(user.data)
        setStateForm({ name, surname, phone, email })
      })
  }, [params])


  const handleMainName = (e) => {
    setStateForm({
      ...stateForm,
      name: e.target.value
    })
    setStateBtnSave(true)
    console.log({ stateForm })
  }

  const handleSurname = (e) => {
    setStateForm({
      ...stateForm,
      surname: e.target.value
    })
    setStateBtnSave(true)
    console.log({ stateForm })
  }

  const handlePhone = (e) => {
    setStateForm({
      ...stateForm,
      phone: e.target.value
    })
    setStateBtnSave(true)
    console.log({ stateForm })
  }

  const handleEmail = (e) => {
    setStateForm({
      ...stateForm,
      email: e.target.value
    })
    setStateBtnSave(true)
    console.log({ stateForm })
  }

  const handleResetForm = (e) => {
    e.preventDefault()
    console.log({ user })
    const { name, surname, phone, email } = user
    setStateForm({ name, surname, phone, email })
    setStateBtnSave(false)
  }

  const handleSaveChanges = (e) => {
    e.preventDefault()
    strapi.updateUser({ ...user, ...stateForm })
      .then(userUpdated => { 
        setUser(userUpdated.data)
        setStateBtnSave(false)
       })
      .catch(err => console.log({ err }))
  }

  return (
    <section className="a-flex">
      <section className="a-p-16 a-flex-basis-50">
        <Avatar thumbnail={user.avatar} />
        <form>
          <fieldset>
            <legend className="sr-only"> Datos Personales</legend>
            <div>
              <label htmlFor="mainName">Nombre</label>
              <input id="mainName" name="mainName" type="text" value={stateForm.name} onChange={handleMainName} />
            </div>
            <div>
              <label htmlFor="surname">Apellidos</label>
              <input id="surname" name="surname" type="text" value={stateForm.surname} onChange={handleSurname} />
            </div>
            <div>
              <label htmlFor="phone">Teléfono</label>
              <input id="phone" name="phone00" type="number" value={stateForm.phone} onChange={handlePhone} />
            </div>
            <div>
              <label htmlFor="email">Dirección de email</label>
              <input id="email" name="email" type="email" value={stateForm.email} onChange={handleEmail} />
            </div>
          </fieldset>
          {
            stateBtnSave &&
            <>
              <button className="udp__btn udp__btn--cancel a-bk-red" onClick={handleResetForm}>Descartar cambios</button>
              <button className="udp__btn udp__btn--success a-bk-green" onClick={handleSaveChanges}>Guardar cambios</button>
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
        <Book />
        <Book />
        <Book />
        <Book />
      </section>
    </section >
  )
}
