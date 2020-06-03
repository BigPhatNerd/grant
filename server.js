var express = require('express');
var session = require('express-session');

var grant = require('../../').express();
var MongoStore = require("connect-mongo")(session);

const configFile = require('./config/config');



express()
    .use(session({
        store: new MongoStore({ db: 'grant', url: 'mongodb: //localhost/grant' }),
        secret: 'grant',
        saveUninitialized: true,
        resave: false
    }))
    .use(grant(require('./config/config.json')))
    .get('/garmin/login', (req, res) => {
        res.end(JSON.stringify(req.session.grant.response, null, 2))
    })
    .get('/twitter/login', (req, res) => {
        console.log(req.session.grant);

        res.end(JSON.stringify(req.session.grant.response, null, 2))
    })
    .listen(4390, () => {
        console.log('Server listenting on port: 4390');
    })