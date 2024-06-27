const { connect, connection } = require('mongoose');

connect(MONGOURI);

module.exports = connection;
