'use strict';

const https = require("https");

module.exports = class ProxyBridge {
    port = '443';
    host = 'api.bigcommerce.com';
    path = '/stores';
    token = process.env.BIGCOMMERCE_STORE_HASH;
    xToken = process.env.BIGCOMMERCE_TOKEN;
    version = 2; // default is 2 but there is api use version 3
    method = 'GET';
    payload = {};

    constructor({ method, version = 2, path, payload }) {
        this.method = method;
        this.version = version;
        this.path += '/' + this.token + '/v' + this.version + '/' + path;
        this.payload = JSON.stringify(payload);
    }

    getHeaders = () => {
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Auth-Token': this.xToken
        }
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
                // check reponse status
                let checkData = JSON.parse(data)
                if (checkData.data !== undefined) {
                    response.send(JSON.stringify({
                        status: 200,
                        ...checkData
                    }))
                } else {
                    response.send(data);
                }
            });

        });

        // handle errors
        request.on('error', function(event) {
            console.log('problem with request: ' + event.message);
        });

        // write data to request body
        if (this.method != 'GET') {
            request.write(this.payload);
        }

        request.end();
    }
}
