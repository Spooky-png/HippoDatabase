var mongoose = require('mongoose');

const HippoSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 2},
    description: {type: String, required: true, minlength: 6},
}, {timestamps: true })
mongoose.model('Hippo', HippoSchema);

const Hippo = mongoose.model('Hippo', HippoSchema);
module.exports = Hippo;