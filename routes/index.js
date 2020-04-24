var express = require('express');
var router  = express.Router();
var passport = require('passport');
var User = require('../models/users');

router.get('/', (req, res) => {
    res.render('landing', {currentUser: req.user});
});

/* // SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    imageURL: String,
    description: String
});

// associate a mode to create a collection
var campGround = mongoose.model('Campground', campgroundSchema); */

/* campGround.create({
    name: 'Granite Hill',
    imageURL: 'https://pixabay.com/get/52e5d7414355ac14f6da8c7dda793f7f1636dfe2564c704c7d2b7fd29e48c35c_340.jpg',
    description: 'This is a huge granite hill, no bathroom. No water. Beautiful granite!'
}, (err, returndeCampground) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Newly created Campground!');
        console.log(returndeCampground);
    }
}); */


/* var campGrounds = [
    {name: 'Salmon Creek', image: 'https://pixabay.com/get/52e8d4444255ae14f6da8c7dda793f7f1636dfe2564c704c7d2b7fd6974ccc5c_340.jpg'},
    {name: 'Granite Hill', image: 'https://pixabay.com/get/57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c7d2b7fd6974ccc5c_340.jpg'},
    {name: 'Mountain Goat\'s site', image: 'https://pixabay.com/get/52e7d0454d55a814f6da8c7dda793f7f1636dfe2564c704c7d2b7fd6974ccc5c_340.jpg'},
    {name: 'Salmon Creek', image: 'https://pixabay.com/get/52e8d4444255ae14f6da8c7dda793f7f1636dfe2564c704c7d2b7fd6974ccc5c_340.jpg'},
    {name: 'Granite Hill', image: 'https://pixabay.com/get/57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c7d2b7fd6974ccc5c_340.jpg'},
    {name: 'Mountain Goat\'s site', image: 'https://pixabay.com/get/52e7d0454d55a814f6da8c7dda793f7f1636dfe2564c704c7d2b7fd6974ccc5c_340.jpg'},

]; */





// ============================
// AUTH ROUTES
// ============================

router.get('/register', (req, res) => {
    res.render('register', {currentUser: req.user});
});

// Handles SignUp Logic
router.post('/register', (req, res) =>{
    User.register(new User({username: req.body.username}), req.body.password, (error, returnedUser) =>{
        if (error) {
            // console.log(error);
            req.flash('error', error.message);
            res.redirect('/register');
            return;
        }
        // If no errors
        passport.authenticate('local')(req, res, () => {
            req.flash('success', 'Welcome to YelpCamp, ' + returnedUser.username);
            res.redirect('/campgrounds');
        });
    });
});

// Show LOGIN Form
router.get('/login', (req, res) => {
    res.render('login', {currentUser: req.user});
});

// Authenticates for Logging In
router.post('/login', passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
}), (req, res) => {

});

// Logout Route
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'You\'ve been logged out!');
    res.redirect('/campgrounds');
});

module.exports = router;