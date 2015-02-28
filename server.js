/**
 * Created by golans on 2/28/15.
 */
var express = require('express');
var bodyParser = require("body-parser");
var auth = require('./BL/Auth');
var http = require('http')

var app = express();
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public/client/app'));
var server = http.createServer(app);

server.listen(80, function () {

});

function ensureAdmin(req, res, next) {
    auth.CheckSession(req, res,"admin",next);
}

/**********************************************************************************************************************/
/* Example how to create secure REST - START                                                                          */
/**********************************************************************************************************************/

function sayhello(req, res)
{
    res.send(req.authorization);
}

app.get('/test',ensureAdmin, sayhello);

/**********************************************************************************************************************/
/* Example how to create secure REST - END                                                                            */
/**********************************************************************************************************************/
app.post('/api/v0/authenticate',auth.CheckCardinalsAndCreateSession);