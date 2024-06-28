const router = require('express').Router();
const { userGetter,
        idUserGetter,
        userPoster,
        userUpdater,
        userDeleter,
        addFriend,
        unfriend} = require('../../controllers/userControllers');

router.route('/').get(userGetter).post(userPoster);

router.route('/:id').get(idUserGetter).put(userUpdater).delete(userDeleter);

router.route('/:id/friends/:friendId').post(addFriend).delete(unfriend);

module.exports = router;