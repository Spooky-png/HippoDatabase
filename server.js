var express = require('express');
    app = express();
    session = require('express-session');
    mongoose = require('./server/config/mongoose');
    flash = require('express-flash');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/client/static"));
app.set('views', __dirname + '/client/views');
app.use(express.urlencoded());
app.use(flash());
app.use(session({
    secret: '4235rfadsa32rq',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))
require('./server/config/routes.js')(app)
app.listen(8000, function () {
    console.log("server running on port 8000");
});