import axios from 'axios';

export const API_URL = `https://artworks-server.herokuapp.com/`;

export const $api = axios.create({
  baseURL: API_URL,
});
