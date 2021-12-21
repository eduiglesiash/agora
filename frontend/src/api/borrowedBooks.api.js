import axios from 'axios';
import {config} from '../config/config';

export const findBook = ({ filter }) => axios.get(`${config.strapi.path}/borrowed-books/${filter}`);
export const borrowBook = ({ book, user }) => axios.post(`${config.strapi.path}/borrowed-books`, { library: book.id, users_library: user.id });