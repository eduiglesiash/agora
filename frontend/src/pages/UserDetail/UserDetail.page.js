import './UserDetail.page.css';
import { useState } from 'react'
import Avatar from '../../components/Avatar/Avatar'
import Book from '../../components/Book/Book'

export default function UserDetailPage(user) {

  const [stateForm, setStateForm] = useState({
    mainName: 'Eduardo',
    surname: 'Iglesias Hernández',
    phone: '636848710',
    email: 'edu.iglesias.hernandez@gmail.com'
  })
  const [stateBtnSave, setStateBtnSave] = useState(false)

  const handleMainName = (e) => {
    setStateForm({
      ...stateForm,
      mainName: e.target.value
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

  return (
    <section className="a-flex">
      <section className="a-p-16 a-flex-basis-50">
        <Avatar id="1" />
        <form>
          <fieldset>
            <legend className="sr-only"> Datos Personales</legend>
            <div>
              <label htmlFor="mainName">Nombre</label>
              <input id="mainName" name="mainName" type="text" value={stateForm.mainName} onChange={handleMainName} />
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
              <button className="udp__btn udp__btn--cancel a-bk-red" onClick="handleResetForm">Descartar cambios</button>
              <button className="udp__btn udp__btn--success a-bk-green" onClick="handleSaveChanges">Guardar cambios</button>
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
