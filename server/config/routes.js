const mongoose = require('mongoose');

const hippo_controller = require('../controllers/controller');

module.exports = function(app){
    app.get('/hippos/new', hippo_controller.index);
    app.get('/', hippo_controller.display);
    app.get('/edit/:id', hippo_controller.single);
    app.post('/edit/:id', hippo_controller.edit);
    app.get('/destroy/:id', hippo_controller.destroy);
    app.get('/messageboard', hippo_controller.messageboard);
    app.post('/user', hippo_controller.user);
    app.post('/comment/:id', hippo_controller.comment);
    app.post('/create', hippo_controller.create);
}