const router = require('express').Router();
const userRouter = require('./user');
const movieRouter = require('./movies');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const { validateUsersBodySignUp, validateUsersBodySignIn } = require('../middlewares/validations');
const { createUser, login } = require('../controllers/user');

router.post('/signup', validateUsersBodySignUp, createUser);
router.post('/signin', validateUsersBodySignIn, login);
router.use(auth);
router.use(userRouter);
router.use(movieRouter);
router.use('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = router;
