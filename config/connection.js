// Imports the connect and conection objects from mongoose 
const { connect, connection } = require('mongoose');

// Connects to the MongoDB using the MONGOURI
connect(process.env.MONGOURI);

// Exports the connection object
module.exports = connection;
