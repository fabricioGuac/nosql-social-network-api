// Loads enviromental variables
require('dotenv').config();

// Imports the necessary packages the database conection configuration and the routes  
const express = require('express');
const app = express();
const db = require('./config/connection');
const routes = require('./routes');

// Sets the port to an enviroment variable PORT if available otherwise to 3001 
const PORT = process.env.PORT || 3001;

// Sets up middleware for parsing url and json encoded data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Sets up the route
app.use(routes);

// Starts the server one the database conection is successfull
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});
