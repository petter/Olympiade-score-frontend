import axios from 'axios';
import { node } from 'prop-types';

export default axios.create({
  baseURL:
    process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:8080',
});
