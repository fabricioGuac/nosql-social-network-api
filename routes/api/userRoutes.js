const router = require('express').Router();
const { userGetter,
        idUserGetter,
        userPoster,
        userUpdater,
        userDeleter} = require('../../controllers/userControllers');

router.route('/').get(userGetter).post(userPoster);

router.route('/:id').get(idUserGetter).put(userUpdater).delete(userDeleter);

module.exports = router;