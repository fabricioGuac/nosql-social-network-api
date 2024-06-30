// Imports the express router
const router = require('express').Router();
// Imports the functions from the thought controllers
const { thoughtGetter,
        idThoughtGetter,
        thoughtPoster,
        thoughtUpdater,
        thoughtDeleter,
        addReaction,
        delReaction
} = require('../../controllers/thoughtControllers');

// Route to get all thoughts or post a new thought
router.route('/').get(thoughtGetter).post(thoughtPoster);

// Router to get a single thought, edit a thought or delete a thought
router.route('/:id').get(idThoughtGetter).put(thoughtUpdater).delete(thoughtDeleter);

// Route to add a reaction to a post
router.route('/:id/reaction').post(addReaction)

// Route to remove a reaction from a post
router.route('/:id/reaction/:reactionId').delete(delReaction);

// Exports the router
module.exports = router;