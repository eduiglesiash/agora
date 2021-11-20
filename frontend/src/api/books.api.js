import axios from 'axios';
import {config} from '../config/config';

export const getBooks = () => axios.get(`${config.strapi.path}/libraries`);
export const createBook = (book) => axios.post(`${config.strapi.path}/libraries`, book);
export const deleteBook = (bookId) => axios.delete(`${config.strapi.path}/libraries/${bookId}`);
export const putBook = (bookId) => axios.put(`${config.strapi.path}/libraries/${bookId}`);