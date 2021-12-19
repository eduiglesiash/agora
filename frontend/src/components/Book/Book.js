import { Link } from 'wouter';
import './Book.css';

export default function Book({id, title, author, imgURL, quantity, available, isbn}) {
  return (
    <Link href={`/bookDetail/${id}`} className="Book a-fade-in">
        <picture className="Book__cover">
          <img src={imgURL} alt={title} />
        </picture>

        <h3 className="Book__title">
          {title}
          <small>{author}</small>
        </h3>
        <p className="Book__isbn"><strong>{isbn}</strong><span>ISBN</span></p>
        <p className="Book__counts">{quantity}</p>
        <p className="Book__status"><strong>{available}</strong></p>
        {/* <p className="Book__status"><strong>Prestados 1/1</strong></p> */}
    </Link>
  );
}
