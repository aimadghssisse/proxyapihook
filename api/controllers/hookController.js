'use strict';
// This route use to execute a hooks you need to set up hooks build for gatsby cloud
const ProxyBridge = require('../models/proxyBridge')

exports.proxyPost = function (request, response) {
    response.send(JSON.stringify({
        status: 200
    }))
    if(process.env.HOST_HOOKS_REBUILD && process.env.HOST_HOOKS_REBUILD_PATH) {
        let listPath = JSON.parse(process.env.HOST_HOOKS_REBUILD_PATH);
        listPath.map(path => {
            const bridge = new ProxyBridge({
                host: process.env.HOST_HOOKS_REBUILD,
                version: false,
                path:  path,
                method: "POST",
                hooks: true
            });

            bridge.makeRequest(response);
        })
    }
}
