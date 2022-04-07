'use strict';

module.exports = function (app) {
    const bigCommerce = require('../controllers/bigCommerceController');
    const hookController = require('../controllers/hookController');

    // BigCommerce Routes
    app.route('/big-commerce')
        .get(bigCommerce.proxyGet)
        .post(bigCommerce.proxyPost)
        .put(bigCommerce.proxyPut)
        .delete(bigCommerce.proxyDelete);

        app.route('/hooks')
            .post(hookController.proxyPost);
}
