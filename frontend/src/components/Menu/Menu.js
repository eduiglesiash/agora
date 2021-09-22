import './Menu.css';
import React, {useState} from 'react';
import classname from 'classname';

export default function Menu() {
  const [state, setState] = useState(false);
  const isHide = classname({'sr-only': state});
  const handleMenu = () => {
    setState(!state);
    console.log({
      state
    });
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
          <a className="Menu__link" href="#dashboard">
            <i className="ri-dashboard-line"/>
            <span className={isHide}>Dashboard</span>
          </a>
        </li>
        <li>
          <a className="Menu__link" href="#books">
            <i className="ri-book-line"/>
            <span className={isHide}>Libros</span>
          </a>
        </li>
        <li>
          <a className="Menu__link" href="#users">
            <i className="ri-user-line"/>
            <span className={isHide}>Usuarios</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
