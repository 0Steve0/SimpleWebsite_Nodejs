var express = require('express');
var app = express();
var port = 8888;
var path = __dirname + '/views/';

app.get('/', function (req, res, next) {
 res.sendFile( path + 'index.html');
});

app.listen(port, function() {
 console.log('Server running at port ' + port);
});
