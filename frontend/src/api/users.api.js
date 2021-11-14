import axios from 'axios';
import { config } from '../config/config';


export const getUsers = () => axios.get(`${config.strapi.path}/users-libraries`);
export const countUsers = ()=> axios.get(`${config.strapi.path}/libraries/countexit`)
