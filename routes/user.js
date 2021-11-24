const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  changeUserInfo, getUserMe,
} = require('../controllers/user');
const { validateUsersBody } = require('../middlewares/validations');

router.get('/users/me', auth, getUserMe);

router.patch('/users/me', validateUsersBody, auth, changeUserInfo);

module.exports = router;
