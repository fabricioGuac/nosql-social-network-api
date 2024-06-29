const router = require('express').Router();
const { thoughtGetter,
        idThoughtGetter,
        thoughtPoster,
        thoughtUpdater,
        thoughtDeleter,
        addReaction,
        delReaction
} = require('../../controllers/thoughtControllers');

router.route('/').get(thoughtGetter).post(thoughtPoster);

router.route('/:id').get(idThoughtGetter).put(thoughtUpdater).delete(thoughtDeleter);

router.route('/:id/reaction').post(addReaction)

router.route('/:id/reaction/:reactionId').delete(delReaction);

module.exports = router;