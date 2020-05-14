# yelpCamp
Welcome to Yelp Camp

# Getting started

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- Install MongoDB Community Edition ([instructions](https://docs.mongodb.com/manual/installation/#tutorials)) and run it by executing `mongod`
- `npm run dev` to start the local server

# Features
- Built on Stack: MongoDB, Express and NodeJS
- Implements *CRUD*: `Create`, `Write`, `Update` and `Delete` Operations
- Implementss *REST* (Representational state transfer) API
- Authentication: Users can create an account, then add posts, can comment on posts, update and delete comments and posts.
- Authorization: Only users created the cooment and/or the post has the right to access the `update` route, and hence can modify it.
- Flash messages for success or an error message to user so the user can know what's happened

# Code Overview

## Dependencies

- [expressjs](https://github.com/expressjs/express#readme) - The server for handling and routing HTTP requests
- [body-parser](https://github.com/expressjs/body-parser#readme) - Node.js body parsing middleware.
- [connect-flash](https://github.com/jaredhanson/connect-flash#readme) - The flash is a special area of the session used for storing messages. Messages are written to the flash and cleared after being displayed to the user. The flash is typically used in combination with redirects, ensuring that the message is available to the next page that is to be rendered.
- [ejs](https://github.com/mde/ejs#readme) - Embedded JavaScript templates: USed here for automatic detection for ejs templates for a cleaner code.
- [express-session](https://github.com/expressjs/session#readme) - For creating and handling data through sessions
- [method-override](https://github.com/expressjs/method-override#readme) - Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
- [mongodb](https://github.com/mongodb/node-mongodb-native#readme) - The official MongoDB driver for Node.js. Provides a high-level API on top of mongodb-core that is meant for end users.
- [mongoose](https://github.com/Automattic/mongoose) - For modeling and mapping MongoDB data to javascript 
- [passport](https://github.com/jaredhanson/passport) - For handling user authentication
- [passport-local](https://github.com/jaredhanson/passport-local#readme) - Passport strategy for authenticating with a username and password.
- [passport-local-mongoose](https://github.com/saintedlama/passport-local-mongoose#readme) - Passport-Local Mongoose is a Mongoose plugin that simplifies building username and password login with Passport.

## Application Structure

- `app.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also requires the routes and models we'll be using in the application.
- `middleware/` - This folder contains middleware logic for Authentication and Authorization.
- `routes/` - This folder contains the route definitions for our API.
- `Associations/models/` - This folder contains the schema definitions for our Mongoose models.
- `views/` - This folder containing embedded HTML codes for our views used in the Project.
- `/seed.js` - This file contains sample posts for seeding the Database, in case the used is too lazy to add themselves. Just uncomment the appropriate line in app.js
