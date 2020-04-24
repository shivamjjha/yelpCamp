var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog_demo_2', { useNewUrlParser: true,
useUnifiedTopology: true
});

// Moved Post and User to separate files and now just including them
var postModel = require('./models/post');
var UserModel = require('./models/users');

/* // POST - title, content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});
var postModel = mongoose.model('Post', postSchema); */

/* // USER - email, name
var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }
    ]
    
    // Embedding Data for One-to-Many Association (user-to-post)
    // posts: postSchema
});
var UserModel = mongoose.model('User', userSchema); */

/* // Either use create() or use 'new User + save()'
UserModel.create({
    email: 'bob@gmail.com',
    name: 'Bob Belcher'
});

var Sherlock = new UserModel({
    email: 'sherlock@holmes.edu',
    name: 'Sherlock Holmes'
});

Sherlock.save(); */

postModel.create({
    title: 'How to cook the best Burger Part 4',
    content: 'IDK IDK nnidindid :)'
}, (error, returnedPost) => {
    console.log(returnedPost);
    UserModel.findOne({email: 'bob@gmail.com'},
        (error, foundUser) => {
            if (error) {
                console.log(error);
            } else {
                // Push post
                foundUser.posts.push(returnedPost._id);
                foundUser.save((error, data) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(data);
                    }
                });
            }
        });
});

/* // Find  a User and all posts that he has
// populate() will find alll the posts in the array and add them to the post array
UserModel.findOne({email: 'bob@gmail.com'}).populate('posts').exec((error, user) => {
    if (error) {
        console.log(error)
    } else {
        console.log(user);
    }
});
 */