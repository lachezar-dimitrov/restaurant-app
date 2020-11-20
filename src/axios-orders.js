import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://project-1-93922.firebaseio.com/',
});

export default instance;
