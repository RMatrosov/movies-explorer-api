const Movie = require('../models/movie');
const NotValidId = require('../errors/NotValidId');
const CastError = require('../errors/CastError');
const ValidationError = require('../errors/ValidationError');
const ForbiddenError = require('../errors/ForbiddenError');

const getMovies = (req, res, next) => {
  Movie.find({}).then((movie) => {
    res.send({ data: movie });
  }).catch(next);
};

const deleteMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.findOne({ id: req.params._id }).then((deletedMovie) => {
    if (!deletedMovie) {
      throw new NotValidId('Карточка с указанным _id не найдена');
    }
    if (deletedMovie.owner.toString() !== owner.toString()) {
      throw new ForbiddenError('Нельзя удалить чужую карточку');
    }
    return Movie.findByIdAndRemove(deletedMovie._id)
      .then((movie) => {
        res.send({ data: movie });
      });
  }).catch((err) => {
    if (err.name === 'CastError') {
      throw new CastError(' Переданы некорректные данные');
    }
    next(err);
  })
    .catch(next);
};

const createMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.create({ ...req.body, owner })
    .then((card) => {
      res.send({ data: card });
    }).catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError('Переданы некорректные данные при создании карточки');
      }
      next(err);
    })
    .catch(next);
};

module.exports = {
  getMovies,
  deleteMovies,
  createMovies,
};
