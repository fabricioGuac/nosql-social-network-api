const { connect, connection } = require('mongoose');

connect(process.env.MONGOURI);

module.exports = connection;
