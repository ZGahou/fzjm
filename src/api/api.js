import superagent from 'superagent';
import {NET_TIMEOUT_MS} from '../constants'

const methods = [
    'get',
    'head',
    'post',
    'put',
    'del',
    'options',
    'patch'
];

class _Api {

    constructor(opts) {

        this.opts = opts || {};

        if (!this.opts.baseURI)
            throw new Error('baseURI option is required');

        methods.forEach(method =>
            this[method] = (path, {params, data} = {}) => new Promise((resolve, reject) => {
                const request = superagent[method](this.opts.baseURI + path);
                //const request = superagent[method](path);
                if (params) {
                    request.query(params);
                }

                if (this.opts.headers) {
                    request.set(this.opts.headers);
                }

                if (this.opts.type) {
                    request.type(this.opts.type);
                }

                if (data) {
                    request.send(data);
                }

                request.timeout(NET_TIMEOUT_MS);
                request.end((err, {text} = {}) => {
                    return err ? reject({text, err}) : resolve(JSON.parse(text))
                });
            })
        );
    }
}

const Api = _Api;

export default Api;
