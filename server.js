
var express = require('express');
var mongoose = require('mongoose');
var app = express();
var port = 8888;
var path = __dirname + '/views/';
/*Database connection - MongoDB*/
//Created from the command earlier. Ensure this is done on the first_db instance
var username = 'shaoliujia';
var password = 'shao';

var dbHost = 'localhost';
var dbPort = '27017';
var database = 'first_db';

var url = 'mongodb://' + username + ':' + password + '@' + dbHost + ':' + dbPort + '/' + database;
console.log('mongodb connection = ' + url);

mongoose.connect(url, function(err) {
    if(err) {
        console.log('connection error: ', err);
    } else {
        console.log('connection successful');
    }
});
/*
 * set different routers
 */
app.get('/', function (req, res, next) {
 res.sendFile( path + 'index.html');
});

app.listen(port, function() {
 console.log('Server running at port ' + port);
});
