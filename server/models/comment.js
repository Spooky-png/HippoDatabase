var mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 2},
    message: {type: String, required: true},
}, {timestamps: true })
mongoose.model('Comment', CommentSchema);

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment