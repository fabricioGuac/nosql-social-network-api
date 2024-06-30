// Imports the express router
const router = require('express').Router();

// Imports the functions from the user controllers 
const { userGetter,
        idUserGetter,
        userPoster,
        userUpdater,
        userDeleter,
        addFriend,
        unfriend} = require('../../controllers/userControllers');

// Route to get all users or create a new one
router.route('/').get(userGetter).post(userPoster);

// Route to update an user, edit an user or delete an user
router.route('/:id').get(idUserGetter).put(userUpdater).delete(userDeleter);

// Route to add or remove a friend from an user friend list
router.route('/:id/friends/:friendId').post(addFriend).delete(unfriend);

// Exports the router
module.exports = router;