var express = require('express');
app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views');
app.use(express.urlencoded());
const session = require('express-session');
const mongoose = require('mongoose');
const flash = require('express-flash');
require('./server/config/routes.js')(app)
app.use(flash());
app.use(session({
    secret: '4235rfadsa32rq',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))


mongoose.connect('mongodb://localhost:/hippos_db', { useNewUrlParser: true });

app.listen(8000, function () {
    console.log("server running on port 8000");
});