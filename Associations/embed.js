var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog_demo', { useNewUrlParser: true,
useUnifiedTopology: true
});

// POST - title, content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});
var postModel = mongoose.model('Post', postSchema);

// USER - email, name
var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    posts: [postSchema] // Embedding Data for One-to-Many Association (user-to-post)
});
var UserModel = mongoose.model('User', userSchema);

/* var newUser = new UserModel({
    name: 'Mat Stone',
    email: 'mat@stone.edu'
});

newUser.posts.push({
    title: "Chest Day At Gym",
    content: 'BenchPress - Flat, Inclined and Declined, Flies'
});

newUser.save((error, returnedUser) => {
    if (error) {
        console.log(error);
    } else {
        console.log(returnedUser);
    }
}); */

/* var newPost = new postModel({
    title: 'Second Post',
    content: 'It is also cool!'
});

newPost.save((error, returnedPost) => {
    if (error) {
        console.log(error);
    } else {
        console.log(returnedPost);
    }
}); */

UserModel.findOne({name: "Mat Stone"}, (error, returnedUser) => {
    if (error) {
        console.log(error);
    } else {
        console.log(returnedUser);

        // Add an new post to existing user
        returnedUser.posts.push({
            title: 'Leg Day',
            content: 'Squats are a must!'
        });
        
        // Saving the post with user
        returnedUser.save((error, userWithNewPost) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Updated user: ');
                console.log(userWithNewPost);
            }
        });
    }
});