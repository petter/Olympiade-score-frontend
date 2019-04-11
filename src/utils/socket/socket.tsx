import io from 'socket.io-client';

let url = '';

if (process.env.NODE_ENV === 'production') {
    url = 'http://158.39.48.32';
} else {
    url = 'http://localhost:8080'
}

const socket = (baseUrl = '/') => {
    return io(url + baseUrl);
}

export default socket;