import './Menu.css';
import { config } from '../../config/config';
import { Link } from 'wouter';
import React, {useState} from 'react';
import classname from 'classname';
import { FcMenu, FcTemplate, FcKindle, FcConferenceCall, FcReading } from "react-icons/fc";

export default function Menu() {
  const [state, setState] = useState(false);
  const isHide = classname({'sr-only': state});
  const handleMenu = () => {

    if (state) document.body.classList.remove('is-collapse');
    else document.body.classList.add('is-collapse');

    setState(!state);
  };

  return (
    <nav className="Menu">
      <button className="Menu__btn" onClick={handleMenu}>
        <FcMenu size="34px"/> 
      </button>
      <ul className="Menu__list">
        <li>
          <Link className="Menu__link" href={config.paths.dashboard}>
            <FcTemplate size="34px"/>
            <span className={isHide}>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link className="Menu__link" href={config.paths.books}>
            <FcKindle size="34px"/>
            <span className={isHide}>Libros</span>
          </Link>
        </li>
        <li>
          <Link className="Menu__link" href={config.paths.borrowedBooks}>
            <FcReading size="34px"/>
            <span className={isHide}>Prestados</span>
          </Link>
        </li>
        <li>
          <Link className="Menu__link" href={config.paths.users}>
            <FcConferenceCall size="34px"/>
            <span className={isHide}>Usuarios</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
