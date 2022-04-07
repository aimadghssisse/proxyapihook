'use strict';

const https = require("https");

module.exports = class ProxyBridge {
    port = '443';
    host = '';
    path = '/stores';
    token = process.env.BIGCOMMERCE_STORE_HASH;
    xToken = process.env.BIGCOMMERCE_TOKEN;
    version = 2; // default is 2 but there is api use version 3
    method = 'GET';
    payload = {};
    hooks = false;

    constructor({ method, version = 2, path, payload = '', host = 'api.bigcommerce.com', hooks = false }) {
        this.host = host;
        this.method = method;
        this.version = version;

        if(version != false) {
            this.path += '/' + this.token + '/v' + this.version + '/' + path;
        } else {
            this.path = path;
        }
        this.hooks = hooks;
        this.payload = JSON.stringify(payload);
    }

    getHeaders = () => {
        let header = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
        if(this.version) {
            header = {
                ...header,
                'X-Auth-Token': this.xToken
            }
        }
        return header;
    }

    getOptions = () => {
        return {
            host: this.host,
            port: this.port,
            path: this.path,
            method: this.method,
            headers: this.getHeaders()
        }
    }

    makeRequest(response) {
        var request = https.request(this.getOptions(), (resp) => {
            let data = '';

            // A chunk of data has been received.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                if(!this.hooks) {
                    // check reponse status
                    if(data != '') {
                        let checkData = JSON.parse(data)
                        if (checkData && checkData.data !== undefined) {
                            response.send(JSON.stringify({
                                status: 200,
                                ...checkData
                            }))
                        } else {
                            response.send(data);
                        }
                    } else {
                        response.send(JSON.stringify({
                            status: 200
                        }))
                    }
                }
            });

        });

        // write data to request body
        if (this.payload.length > 0) {
            request.write(this.payload);
        }

        // handle errors
        request.on('error', function(event) {
            console.log('problem with request: ' + event.message);
        });

        request.end();
    }
}
