var campGround = require('../models/campgrounds');
var Comment = require('../models/comment');
// All the middleware goes here

var middlewareObj = {};

// Remaining lines Adds to middlewareObj

// For Authorisation
middlewareObj.checkCampgroundOwnership = (req, res, next) => {
    if (req.isAuthenticated()) {
        campGround.findById(req.params.id, (error, foundCampground) => {
            if (error) {
                req.flash('error', 'Campground not found!');
                console.log(error);
                // redirect back to previous page
                res.redirect('back');
            } else {
                // 2. Check if post belongs to current user
                if (req.user._id.equals(foundCampground.author.id)) {
                    next();
                } else {
                    console.log('YOU DON\'T HAVE RIGHTS TO MODIFY THIS!');
                    req.flash('error', 'You don\'t have permission to do this!');
                    // res.send('INSUFFICIENT RIGHTS!');
                    res.redirect('back');
                }
            }
        });
    } else {
        // console.log('YOU NEED TO BE LOGGED IN!');
        // res.send('NOT LOGGED IN!');
        req.flash('error', 'You\'re not authorized to visit this page!');
        res.redirect('back')
    }
}

// For Authorisation
middlewareObj.checkCommentsOwnership = (req, res, next) => {
    // 1. Check if user is signed in
    if (req.isAuthenticated()) {
        Comment.findById(req.params.commentID, (error, foundComment) => {
            if (error) {
                console.log(error);
                // redirect back to previous page
                res.redirect('back');
            } else {
                // 2. Check if post belongs to current user
                if (req.user._id.equals(foundComment.author.id)) {
                    next();
                } else {
                    console.log('YOU DON\'T HAVE RIGHTS TO MODIFY THIS!');
                    req.flash('error', 'You need to be logged in!');
                    res.redirect('back');
                }
            }
        });
    } else {
        console.log('YOU NEED TO BE LOGGED IN!');
        req.flash('error', 'You don\'t have permission to do this');
        res.redirect('back')
    }
}

// For Authentication
middlewareObj.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    // 'flash' besfore redirect!
    /*  To use flash:
            1.Add this line before rendering page.
            2. pass an object containing the message to the rendering route
            3. Use that object's key-value to get message in the view, or we can move this code to header too :)
    */
    req.flash('error', 'You need to be logged in!');
    res.redirect('/login');
}

module.exports = middlewareObj;