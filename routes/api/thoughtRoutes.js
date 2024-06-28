const router = require('express').Router();
const {} = require('../../controllers/thoughtControllers');

router.route('/').get().post();

router.route('/:id').get().put().delete();

router.route('/:id/reaction/:reactionId').post().delete()

module.exports = router;