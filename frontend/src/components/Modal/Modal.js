import './Modal.css';

export default function Modal({ title, children, onClose }) {
    return (
      <section className='Modal a-flex a-flex-center'>
        <div className='Modal-content'>
          <header className='Modal-header'>
            <h2>{title}</h2>
          </header>
          <button className='Modal-close' onClick={onClose}><span className='a-visually-hidden'>Cerrar modal</span></button>
          {children}
        </div>
      </section>
    )
}
