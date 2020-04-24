// A file to rum everytime server starts to seed sample data

var mongoose = require('mongoose'),
    Campground = require('./models/campgrounds'),
    Comment = require('./models/comment'),
    desc = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam atque error, at nisi placeat minima accusantium aliquam cumque officia totam ipsum voluptatum laborum dolorum commodi quasi molestias doloremque incidunt quod nemo omnis laudantium, et autem, exercitationem laboriosam. Libero amet, iure ex non inventore laboriosam nihil molestias cum ipsum blanditiis ullam! Quam ducimus dicta mollitia voluptas nam aut, eaque sit dolorum error exercitationem amet deserunt corrupti illo explicabo ullam hic facilis voluptatibus illum. Ad quo pariatur dolorum quaerat praesentium nobis quae odio iure alias nihil? Quasi qui, illum fugiat officiis eius est inventore, a corrupti nesciunt consequatur dolores necessitatibus? Dolor, quidem.',
    data = [
        {
            name: 'Cloud\'s Rest',
            imageURL: 'https://www.elsetge.cat/myimg/f/182-1823575_8k-mountain-4k-wallpaper-5k-fir-trees-winter.jpg',
            description: desc
        },

        {
            name: 'Desert Fun',
            imageURL: 'https://www.tripsavvy.com/thmb/mRWHUgtPbA2J12OHUOoO40AVqO8=/1161x774/filters:no_upscale():max_bytes(150000):strip_icc()/ts7-578a51295f9b584d20b93ff1.jpg',
            description: desc
        },

        {
            name: 'German Land',
            imageURL: 'https://c4.wallpaperflare.com/wallpaper/848/464/869/4k-stars-forest-mountains-wallpaper-preview.jpg',
            description: desc
        },

        {
            name: 'Safari Fun',
            imageURL: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
            description: desc
        }
    ];

function seedDB() {
    // Removes everything from DB
    Campground.deleteMany({}, (error) => {
        if (error) {
            console.log(error);
        } else {
            console.log('All campgrounds removed!');

            /* Need to place this inside this callback to make sure this runs 'AFTER' removing all camps */
            // Add a few campgrounds
             data.forEach(camp => {
                Campground.create(camp, (error, returnedCamp) => {
                    if (error) {
                        console.log(error)
                    } else {
                        // console.log('A campground created: ' + camp.name);
                        
                        // Add a few comments
                        Comment.create({
                            text: 'This place is great, but I wish there was internet',
                            author: 'Homer'
                        }, (error, returnedComment) => {
                            if (error) {
                                console.log(error);
                            } else {
                                returnedCamp.comments.push(returnedComment);
                                returnedCamp.save();
                                // console.log('Created a new comment: ' + returnedCamp.comments);
                            }
                        });
                    }
                })
            }); 
        }
    });    
}

module.exports = seedDB;