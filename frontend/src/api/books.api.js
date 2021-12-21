import axios from 'axios';
import {config} from '../config/config';

export const getBooks = () => axios.get(`${config.strapi.path}/libraries`);
export const getBooksAvaliability = (isbn) => axios.get(`${config.strapi.path}/libraries/availability/${isbn || ''}`);
export const findBooks = (filter) => axios.get(`${config.strapi.path}/libraries?${filter}`);
export const createBook = (book) => axios.post(`${config.strapi.path}/libraries`, book);
export const deleteBook = (bookId) => axios.delete(`${config.strapi.path}/libraries/${bookId}`);
export const putBook = (bookId, update) => axios.put(`${config.strapi.path}/libraries/${bookId}`, update);
