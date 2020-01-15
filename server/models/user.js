var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const CommentSchema = new Schema({
    name: {type: String, required: true, minlength: 2},
    message: {type: String, required: true},
}, {timestamps: true })
mongoose.model('Comment', CommentSchema);

module.exports = mongoose.model('Comment', CommentSchema);

const UserSchema = new Schema({
    name: {type: String, required: true, minlength: 2},
    message: {type: String, required: true},
    comments: [CommentSchema]
}, {timestamps: true })
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User', UserSchema)

const HippoSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 2},
    description: {type: String, required: true, minlength: 6},
}, {timestamps: true })
mongoose.model('Hippo', HippoSchema);

module.exports = mongoose.model('Hippo', HippoSchema);