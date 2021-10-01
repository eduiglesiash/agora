import './Book.css';

export default function Book() {
  return (
    <a href="#bookDetails" className="Book a-fade-in">
        <picture className="Book__cover">
          <img src="http://books.google.com/books/content?id=HGa1DQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api" alt="Imagen de portada del libro en cuestion" />
        </picture>

        <h3 className="Book__title">
          El día que se perdió la cordura
          <small>La leyenda del legado</small>
        </h3>
        <p className="Book__isbn"><strong>9788414016336</strong><span>ISBN</span></p>
        <p className="Book__counts">1</p>
        <p className="Book__status"><strong>Disponible</strong></p>
        {/* <p className="Book__status"><strong>Prestados 1/1</strong></p> */}
    </a>
  );
}

