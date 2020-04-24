var mongoose = require('mongoose');

// USER - email, name
var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ]
    
    /* // Embedding Data for One-to-Many Association (user-to-post)
    posts: postSchema */
});
var UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;