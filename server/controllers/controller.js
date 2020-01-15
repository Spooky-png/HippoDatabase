const mongoose = require('mongoose');

const Hippo = require('../models/hippo');
const Comment = require('../models/comment');
const User = require('../models/users');

module.exports = {
    index: function(req, res){
        res.render('index')
    },
    display: function(req, res){
        Hippo.find()
            .then(data => res.render("hippos", { Hippos: data }))
            .catch(err => res.json(err));
    },
    single: function(req, res){
        var hippo_id = req.params.id;
        Hippo.findOne({_id: hippo_id})
        .then(data => res.render("single", { Hippo: data }))
            .catch(err => res.json(err));
    },
    edit: function(req, res){
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
    },
    destroy: function(req, res){
        var hippo_id = req.params.id;
        Hippo.findOne({_id: hippo_id})
            .then(hippos => {
                hippos.remove({_id: hippo_id});
                res.redirect('/')
            })
            .catch(err => res.json(err));
    },
    messageboard: function(req, res){
        User.find()
        .then(data => res.render("messageboard", { Users: data }))
        .catch(err => res.json(err));
    },
    user: function(req,res){
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
    },
    comment: function(req,res){
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
    },
    create: function(req,res){
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
    }}