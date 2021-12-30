import { Link } from 'wouter';
import { FcLink } from "react-icons/fc";
import Moment from 'moment';

import { config } from '../../config/config';

import noImage from '../../assets/images/no-image.jpg';
import './BorrowedBook.css';

Moment.locale('es');

export default function BorrowedBook({ imgURL, title, date, userId, userName, userSurname }) {
    return (
        <li className='a-fade-in BorrowedBook'>
            <picture className="BorrowedBook__cover">
                <img src={imgURL || noImage} alt={title} />
            </picture>
            <h3 className="BorrowedBook__title">{title}</h3>
            <p className="BorrowedBook__date">{Moment(date).format('DD/MM/YYYY')}</p>
            <p className="BorrowedBook__user">
                <Link to={`${config.paths.userDetail}/${userId}`} className='BorrowedBook__link a-flex a-flex-align-item'>
                    <span className='a-margin-right-16'>{userName} {userSurname}</span>
                    <FcLink size='24px' />
                </Link>
            </p>
        </li>
    )
}