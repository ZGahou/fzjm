import Api from './api';

const config = require('../../config');
const root = config.config;

const api = new Api({
    baseURI: 'http://' + root.server_host + ':' + root.server_port + '/proxy',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
    },
    type: 'form'
});

export default api
