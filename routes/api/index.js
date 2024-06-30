// Imports the express router
const router = require('express').Router();
// Imports the user and thought routes
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

// Sets the routes for user and thoughts
router.use('/user', userRoutes);
router.use('/thought', thoughtRoutes);

// Exports the router
module.exports = router;