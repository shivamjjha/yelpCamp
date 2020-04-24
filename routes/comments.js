var express = require('express');
// import statements automatically require contents of file named 'index.js' from a directory
var middleware = require('../middleware');
// Use the express router

/* This will merge the params coming from '/app.js' (that we imported there -> '/campgrounds/:id/comments') to this file so that when we do req.params.id, it does not return null(since now, the params will be merged, so it will be possible to access 'req.params.id'). See route '/new' in this file. */
var router = express.Router({mergeParams:true});
var campGround = require('../models/campgrounds');
var Comment = require('../models/comment');

// ================
// COMMENT ROUTES
// ================

router.get('/new', middleware.isLoggedIn,  (req, res) => {
    // Find Campground by id
    campGround.findById(req.params.id, (error, returnedCampground) => {
        if (error) {
            console.log(error);
        } else {
            // console.log(returnedCampground);
            res.render('comments/new', {campground: returnedCampground, currentUser: req.user});
            // res.send('This will be the comment form!');
        }
    });
});

/* We use req.params to get contents of url and use req.body to get 'contents of a form in a POST request'  */
// We are also protecting route `/campgrounds/:id/comments` by adding a middleware, in addition to hiding it from user, so that our DB can't be filled up with junk by some software(ex, postman) that sends post request at this address
// Create Comments
router.post('/', middleware.isLoggedIn,  (req, res) => {
    // Lookup comments using ID

    campGround.findById(req.params.id, (error, returnedCampground) => {
        if (error) {
            console.log(error);
        } else {
            /* console.log('Found by Id: ');
            console.log(returnedCampground); */

            // Create new comment
            /*  In our FORM,
                We've set first fiels as comment[text]
                And second one as comment[author]
                So, we cann pass the 'req.body.comment' as an object, instead of
                    {
                        text: req.body.comment.text,
                        author: req.body.comment.author
                    }
            */
            Comment.create(req.body.comment, (error, returnedComment) => {
                if (error) {
                    req.flash('error', 'Something went wrong! Please try after some time.');
                    console.log(error);
                } else {
                    // console.log(returnedComment);

                    // Add username and id to comments
                    returnedComment.author.id = req.user._id;
                    returnedComment.author.username = req.user.username;
                    // Save the comment

                    returnedComment.save();
                    // console.log(returnedComment);

                    // Connect new Comment to Campground
                    returnedCampground.comments.push(returnedComment);
                    returnedCampground.save();
                    // console.log(returnedCampground.comments);

                    // redirect back to <this> campground ShowPage
                    req.flash('success', 'Succesfully added comment');
                    res.redirect('/campgrounds/' + returnedCampground._id);
                }
            });
        }
    });
    // res.send('POST SECTION!');
});

// EDIT COMMENT ROUTE
router.get('/:commentID/edit', middleware.checkCommentsOwnership, (req, res) => {
    Comment.findById(req.params.commentID, (error, foundComment) => {
        if (error) {
            console.log(error);
            res.redirect('back');
        } else {
            res.render('comments/edit', {comment: foundComment, campground_id: req.params.id});
        }
    });
});

// UPDATE COMMENT ROUTE
router.put('/:commentID', middleware.checkCommentsOwnership, (req, res) => {
    // We can use 'comment' instead of 'req.body.text', if we had text input name set to 'comment[text]'
    Comment.findByIdAndUpdate(req.params.commentID, {text: req.body.text}, (error, updatedComment) => {
        if (error) {
            console.log(error);
            res.redirect('back');
        } else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

// DESTROY COMMENT ROUTE
router.delete('/:commentID', middleware.checkCommentsOwnership, (req, res) => {
    Comment.findByIdAndRemove(req.params.commentID, (error, foundComment) => {
        if (error) {
            console.log(error);
        } else {
            console.log(foundComment.text + ' deleted!');
            req.flash('success', 'Comment deleted!');
        }
        res.redirect('/campgrounds/' + req.params.id);
    });
});

module.exports = router;