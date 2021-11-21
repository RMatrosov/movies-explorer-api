const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getMovies, deleteMovies, createMovies,
} = require('../controllers/movies');
const { validateMovieParams, validateMovieBody } = require('../middlewares/validations');

router.get('/movies', auth, getMovies);

router.delete('/movies/:id', validateMovieParams, auth, deleteMovies);

router.post('/movies', validateMovieBody, auth, createMovies);

module.exports = router;
