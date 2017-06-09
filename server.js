
/*
 * import certain modules
 */
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt-nodejs');
var User = require('./models/users.js');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

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

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use('/public', express.static(__dirname + '/public'));

app.get('/', function (req, res, next) {
 res.sendFile( path + 'loginin.html');
});

app.get('/register', function (req, res, next) {
 res.sendFile( path + 'register.html');
});

app.get('/home', loggedIn, function (req, res, next) {
    res.sendFile( path + 'home.html');
});

function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/');
    }
}
app.post('/login', passport.authenticate('local'),
    function(req, res) {
        res.redirect('/home');
});

app.get('/logout', function (req, res, next) {
    req.logout();
    res.redirect('/');
});
/**********
The login logic where it passes here if it reaches passport.authenticate
**********/
passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if(user !== null) {
                var isPasswordCorrect = bcrypt.compareSync(password, user.password);
                if(isPasswordCorrect) {
                    console.log("Username and password correct!");
                    return done(null, user);
                } else {
                    console.log("Password incorrect!");
                    return done(null, false);
                }
           } else {
               console.log("Username does not exist!");
               return done(null, false);
           }
       });
    }
));
/**********
Serialize and Deserialize here for passport.authenticate
**********/
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
     done('wrong', user);
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
