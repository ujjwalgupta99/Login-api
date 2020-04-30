const express = require("express");
var app = express();
const router = require("./api/user/user.router");
var _dbContaxt = require("./config/database.js");
var bodyParser = require('body-parser')
var session = require('express-session')
var jwt = require('jsonwebtoken');
var ResHelper = require("./api/helper/response/response");

global.knexSqlDb = _dbContaxt.getContext()
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' })); //handle queryStrings
// app.use(bodyParser.json())        //handle json data
app.use(bodyParser.json({ limit: '50mb' }))
app.use(session({
    secret: 'realtourup',
    rolling: true,
    saveUninitialized: true,
    resave: false
}))                                //handle session
app.use(express.static(__dirname + '/api'))      //handle static files

app.use(function (req, res, next) {
    // Mentioning content types
    res.setHeader('Content-Type', 'application/json; charset=UTF-8');
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'content-type,Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions) 
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//app.use()

app.use("/api/user", router);

module.exports = app