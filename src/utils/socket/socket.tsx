import io from 'socket.io-client';

let url = '';

if (process.env.NODE_ENV === 'production') {
    url = 'TODO';
} else {
    url = 'http://localhost:8080'
}

const socket = (baseUrl = '/') => {
    return io(url + baseUrl);
}

export default socket;