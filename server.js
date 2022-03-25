require('dotenv').config()

var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser');

var cors = require('cors');
var corsOptions = {
    allRoutes: true,
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 204
}
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/bigCommerceRoutes');
routes(app);

app.listen(port);

console.log('The Proxy API server started on: ' + port);