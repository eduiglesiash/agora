import { useState } from 'react';
import { Link } from 'wouter';
import './Book.css';

import noImage from "../../assets/images/no-image.jpg";

export default function Book({title, author, imgURL, leftBooks, isbn}) {
  const [ status ] = useState({
    class: leftBooks === 0 ? 'non-available' : (leftBooks > 3 ? 'available' : 'last-units'),
    text: leftBooks === 0 ? 'No disponible' : (leftBooks > 3 ? 'Disponible' : 'Pocas unidades'),
  });
  return (
    <Link href={`/bookDetail/${isbn}`} className={`a-fade-in Book Book--${status.class} `}>
        <picture className="Book__cover">
          <img src={imgURL || noImage} alt={title} />
        </picture>

        <h3 className="Book__title">
          {title}
          <small>{author}</small>
        </h3>
        <p className="Book__isbn"><strong>{isbn}</strong><span>ISBN</span></p>
        <p className="Book__counts">{leftBooks}</p>
        <p className="Book__status"><strong>{status.text}</strong></p>
    </Link>
  );
}
