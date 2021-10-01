import './Menu.css';
import { config } from '../../config/config';
import { Link } from 'wouter';
import React, {useState} from 'react';
import classname from 'classname';

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
        {state
          ? <i className="ri-menu-unfold-line"/>
          : <i className="ri-menu-fold-line"/>
        }

      </button>
      <ul className="Menu__list">
        <li>
          <Link className="Menu__link" href={config.paths.dashboard}>
            <i className="ri-dashboard-line"/>
            <span className={isHide}>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link className="Menu__link" href={config.paths.books}>
            <i className="ri-book-line"/>
            <span className={isHide}>Libros</span>
          </Link>
        </li>
        <li>
          <Link className="Menu__link" href={config.paths.users}>
            <i className="ri-user-line"/>
            <span className={isHide}>Usuarios</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
