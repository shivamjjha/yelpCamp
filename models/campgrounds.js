var mongoose = require('mongoose');

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    imageURL: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
});

// associate a mode to create a collection
var campGround = mongoose.model('Campground', campgroundSchema);

module.exports = campGround;