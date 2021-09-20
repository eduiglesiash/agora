
import './Book.css';

export default function Book() {
  return (
    <article className="Book Book--borrowed-available">

      <div className="Book__info">
        <picture>
          <img src="http://books.google.com/books/content?id=HGa1DQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api" alt="Imagen de portada del libro en cuestion" />
        </picture>
        <div className="Book__info-content">
          <h3>
            El día que se perdió la cordura
            <small>La leyenda del legado</small>
          </h3>

          <ul className="Book__details">
            <li>Autor: Javier Castillo</li>
            <li>Editorial: SUMA</li>
            <li>Número de páginas: 300</li>
          </ul>
          <ul className="Book__categories">
            <li>Fiction</li>
            <li>Fantasy</li>
          </ul>
        </div>
      </div>
      <div>
        <p className="Book__counts">88</p>
        <p><strong>ISBN:</strong> 9788414016336</p>
        <div>
          Estado: Prestado
        </div>
      </div >
    </article>
  );
}

