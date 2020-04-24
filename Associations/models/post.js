var mongoose = require('mongoose');

// POST - title, content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});
var postModel = mongoose.model('Post', postSchema);

// Think of 'module.exports' as the return value of our export, i.e., the things we want to export
module.exports = postModel;