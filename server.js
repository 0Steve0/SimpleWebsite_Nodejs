
/*
 * import certain modules
 */
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt-nodejs');
var User = require('./models/users.js');

/*Database connection - MongoDB*/
//Created from the command earlier. Ensure this is done on the first_db instance
var username = 'shaoliujia';
var password = 'shao';
var dbHost = 'localhost';
var dbPort = '27017';
var database = 'first_db';
var url = 'mongodb://' + username + ':' + password + '@' + dbHost + ':' + dbPort + '/' + database;

mongoose.connect(url, function(err) {
    if(err) {
        console.log('connection error: ', err);
    } else {
        console.log('mongodb connection = ' + url);
        console.log('connection successful');
    }
});
/*
 * set routerss and static files
 */
var app = express();
var port = 8888;
var path = __dirname + '/views/';
// body praser
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/public', express.static(__dirname + '/public'));

app.get('/', function (req, res, next) {
 res.sendFile( path + 'index.html');
});

app.get('/register', function (req, res, next) {
 res.sendFile( path + 'register.html');
});

app.post('/register', function (req, res, next) {
  // Encode the password
  var password = bcrypt.hashSync(req.body.password);
  req.body.password = password;

  User.create(req.body, function(err, saved) {
      if(err) {
          console.log(err);
          res.json({ message : err });
      } else {
          res.json({ message : "User successfully registered!"});
      }
  });
});

app.listen(port, function() {
 console.log('Server running at port ' + port);
});
