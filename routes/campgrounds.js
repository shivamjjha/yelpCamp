var express = require('express');
var router  = express.Router();

var campGround = require('../models/campgrounds');
// import statements automatically require contents of file named 'index.js' from a directory
var middleware = require('../middleware');

// INDEX - show all campgrounds
router.get('/', (req, res) => {
    // res.render('campgrounds', {campgrounds: campGrounds});

    /*  'req.user' contains info about the current user
        If no user is logged in, it is empty (undefined)
        But when a user Logs IN, it puts his username and _id in it
    */


    // Get all campgrounds from db
    campGround.find({}, (error, returnedCampgrounds) => {
        if (error) {
            console.log(error);
        } else {
            // console.log(returnedCampgrounds);

            // req.user will contain info about user(username ans id): it's provided by passport
            res.render('campgrounds/index', {campgrounds: returnedCampgrounds, currentUser: req.user});
        }
    })
});

// CREATE - add new campground to DB
router.post('/', middleware.isLoggedIn, (req, res) => {
    //get data from form (value is the name attribute of form)
    var name = req.body.name;
    var imgURL = req.body.imgURL;
    var description = req.body.description

    // 'req.user contains info about current username and is; it is provided by 'passport' '
    // console.log(req.user);

    // Add object to the DB
    campGround.create({
        name: name,
        imageURL: imgURL,
        description: description,
        author: {
            id: req.user._id,
            username: req.user.username
        }
    }, (err, returndeCampground) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Newly created Campground!');
            // console.log(returndeCampground);
        }
    });

    // console.log(campGrounds);
    // redirect back to campgrounds page
    res.redirect('/campgrounds');
});

// NEW - show form to create a new campground
router.get('/new', middleware.isLoggedIn, (req, res) => {
    console.log(req.user);
    res.render('campgrounds/new', {currentUser: req.user});
});

// Route params: id
// This means /campgrounds/<anything>
// Note that placement of this route after '/campgrounds/new' is important
// SHOW - shows more info about one campground
router.get('/:id', (req, res) => {
    // Find the campground with provided ID and render show template with that campground
    campGround.findById(req.params.id).populate('comments').exec((error, foundCampground) => {
        if (error) {
            console.log(error);
        } else {
            // res.send('This will be the showpage one day!');
            // res.send('Hey');
            // console.log(req.user);
            res.render('campgrounds/show', {campground: foundCampground, currentUser: req.user});
        }
    });
    // console.log(req.params);
});

// EDIT CAMPGROUND ROUTE
router.get('/:id/edit', middleware.checkCampgroundOwnership , (req, res) => {
    campGround.findById(req.params.id, (error, foundCampground) => {
        if (error) {
            req.flash('error', 'Campground not found!');
        }
        res.render('campgrounds/edit', {campground: foundCampground});
    });    
});

// UPDATE CAMPGROUND ROUTE
router.put('/:id', middleware.checkCampgroundOwnership ,(req, res) => {
    // Find and update the correct campground
    // We can also first findByID(), and then update
    // We get 'campgroundNew' object back from edit.ejs
    campGround.findByIdAndUpdate(req.params.id, req.body.campgroundNew, (error, updatedCampground) => {
        if (error) {
            console.log(error);
        } else {
            
        }
    });
    // Redirect Somewhere
    res.redirect('/campgrounds/' + req.params.id);
});

// DESTROY CAMPGROUND ROUTE
router.delete('/:id', middleware.checkCampgroundOwnership ,(req, res) => {
    campGround.findByIdAndRemove(req.params.id, (error, foundCampground) => {
        if (error) {
            console.log(error);
        } else {
            // console.log(foundCampground.name + ' deleted!');
        }
        res.redirect('/campgrounds');
    });
})

module.exports = router;