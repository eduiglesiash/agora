import './CardUser.css'
import Avatar from '../Avatar/Avatar'


export default function CardUser() {
  return (
    <article className="Card__users">
      <Avatar />
      <div className="a-flex a-flex-column a-flex-sBetween">
        <h3>Eduardo Iglesias Hernández</h3>
        <p>112132342-M</p>
        <p>Desde: 1/Ago/2020</p>
      </div>
      <div className="a-flex a-flex-column a-flex-sBetween a-flex-basis-25">
        <p>Libros totales: 88</p>
        <p>Libros prestados: 2</p>
      </div>
      <div>
        <h4>Próximo vencimiento: </h4>
        <ul>
          <li>4/OCT/2021</li>
        </ul>
      </div>
      <div className="a-flex-align-self-center">
        <ul className="a-flex a-flex-row">
          <li>
            <button className="a-btn__icon">
              <i className="ri-eye-line a-fs-24"></i>
              <span className="sr-only">Ver ficha de usuario</span>
            </button>
          </li>
          <li>
            <button className="a-btn__icon">
              <i className="ri-edit-line a-fs-24"></i>
              <span className="sr-only">Editar ficha de usuario</span>
            </button>
          </li>
        </ul>
      </div>
    </article>
  )
}
