'use strict';

const ProxyBridge = require('../models/proxyBridge')

exports.proxyGet = function (request, response) {
   //
}

exports.proxyPost = function (request, response) {
    const bridge = new ProxyBridge({
        ...request.body
    });

    bridge.makeRequest(response);
}

exports.proxyPut = function (request, response) {
    //
}

exports.proxyDelete = function (request, response) {
    //test
}
