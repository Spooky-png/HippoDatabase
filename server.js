const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views');
app.use(express.urlencoded());
const session = require('express-session');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:/hippos_db', { useNewUrlParser: true });

const HippoSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 2},
    description: {type: String, required: true, minlength: 6},
}, {timestamps: true })
const Hippo = mongoose.model('Hippo', HippoSchema);

const CommentSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 2},
    message: {type: String, required: true},
}, {timestamps: true })
const Comment = mongoose.model('Comment', CommentSchema);

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 2},
    message: {type: String, required: true},
    comments: [CommentSchema]
}, {timestamps: true })
const User = mongoose.model('User', UserSchema);

const flash = require('express-flash');
app.use(flash());
app.post('/create', (req, res) => {
    const hippo = new Hippo();
    hippo.name = req.body.name;
    hippo.description = req.body.description;
    hippo.save()
        .then(newUserData => {
            console.log('Hippo logged: ', newHippoData)
            res.redirect('/');
        })
        .catch(err => {
            console.log("We have an error!", err);
            for (var key in err.errors) {
                req.flash('registration', err.errors[key].message);
            }
            res.redirect('/');
        });
});

app.use(session({
    secret: '4235rfadsa32rq',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))

app.get('/hippos/new', (req, res) => {
    res.render('index')
});
app.get('/', (req, res) => {
    Hippo.find()
        .then(data => res.render("hippos", { Hippos: data }))
        .catch(err => res.json(err));
});
app.get('/edit/:id', (req, res) => {
    var hippo_id = req.params.id;
    Hippo.findOne({_id: hippo_id})
    .then(data => res.render("single", { Hippo: data }))
        .catch(err => res.json(err));
})
app.post('/edit/:id', (req, res) => {
    var hippo_id = req.params.id;
    Hippo.findOne({_id: hippo_id})
        .then(hippos => {
            hippos.name = req.body.name;
            hippos.description = req.body.description;
            return hippos.save();
        })
        .then(hippos => {
            res.redirect("/")
        })
        .catch(err => res.json(err));
})

app.get('/destroy/:id', (req, res) => {
    var hippo_id = req.params.id;
    Hippo.findOne({_id: hippo_id})
        .then(hippos => {
            hippos.remove({_id: hippo_id});
            res.redirect('/')
        })
        .catch(err => res.json(err));
})
app.get('/messageboard', (req, res) => {
    User.find()
    .then(data => res.render("messageboard", { Users: data }))
    .catch(err => res.json(err));
});

app.post('/user', (req, res) => {
    const user = new User();
    user.name = req.body.name;
    user.message = req.body.message;
    user.save()
        .then(newUserData => {
            res.redirect('/messageboard');
        })
        .catch(err => {
                req.flash('registration', 'Both Fields are required');
            res.redirect('/messageboard');
        });
});

app.post('/comment/:id', (req, res) => {
    const comment = new Comment();
    comment.name = req.body.name;
    comment.message = req.body.message;
    comment.save()
        .then(data => {
            User.findOneAndUpdate({_id: req.params.id}, {$push: {comments: data}}, function(err, data){
                res.redirect('/messageboard');
            })
        })
        .catch(err => {
            req.flash('registration', 'Both Fields are required');
            res.redirect('/messageboard');
        });
});

app.listen(8000, function () {
    console.log("server running on port 8000");
});