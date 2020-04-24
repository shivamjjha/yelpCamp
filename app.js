var express                 = require('express'),
    mongoose                = require('mongoose'),
    passport                = require('passport'),
    bodyParser              = require('body-parser'),
    localStrategy           = require('passport-local'),
    passportLocalMongoose   = require('passport-local-mongoose'),
    expressSession          = require('express-session'),
    methodOverride          = require('method-override'),
    flash                   = require('connect-flash'),

    campGround              = require('./models/campgrounds'),
    Comment                 = require('./models/comment'),
    User                    = require('./models/users'),
    seedDB                  = require('./seeds');

// Requiring Routes
var commentRoutes           = require('./routes/comments')
    campgroundRoutes        = require('./routes/campgrounds'),
    indexRoutes              = require('./routes/index');

/* const MongoClient = require('mongodb').MongoClient;
const assert = require('assert'); */
 
var app = express();

/* // Connection URL
const url = 'mongodb://localhost:27017';
 
// Mongo Database Name
const dbName = 'myproject'; */

// connect mongoose and create Db (for first time, at later ones, just use the existing one: 'yelpCamp')
mongoose.connect('mongodb://localhost/yelpCamp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.set('view engine', 'ejs');

// Serve contents of public directory
app.use(express.static(__dirname + '/public'));

// Run seedDB
// seedDB();

app.use(bodyParser.urlencoded({extended: true}));

// Use 'express-session'
app.use(expressSession({
    secret: 'Just a line for authentication purposes',
    resave: false,
    saveUninitialized: false
}));

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false. to avoid warnings
mongoose.set('useFindAndModify', false);

// Use 'method-override'
// string '_method' will be searched for in the request, and if it equates to 'PUT', then the request will be handled as a 'PUT' request. See 'POST' FORM of '/views/campgrounds/edit.ejs' for explanation
app.use(methodOverride('_method'));

// Use 'connect-flash'
app.use(flash());

// PASSPORT CONFIGURATION
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new localStrategy(User.authenticate()));

// Including a MIDDLEWARE for passing '{currentUser: req.user}' to each template
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

/* Use imported files */

// We see that in our '/routes/campground.js', all routes start with '/campgrounds', so to reduce duplicacy in that file, we do this, and remove 'campgrounds' from our routes' addresses in '/routes/campground.js':
app.use('/campgrounds', campgroundRoutes);
app.use(indexRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);

app.listen(3000, () => console.log(`YelpCamp Server has Started`));
/*  
// Use connect method to connect to the server
MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
   assert.equal(null, err);
   console.log("Connected MongoDB successfully to server");
 
   const db = client.db(dbName);
 
   client.close();
});  */