const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const ValidationError = require('../errors/ValidationError');
const CastError = require('../errors/CastError');
const MongoServerError = require('../errors/MongoServerError');
const NotValidId = require('../errors/NotValidId');

const { JWT_SECRET } = require('../config');

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password).then((user) => {
    const token = jwt.sign(
      { _id: user._id },
      JWT_SECRET,
    );
    res.send({ token });
  }).catch(next);
};
const getUserMe = (req, res, next) => {
  const currentUserId = req.user._id;
  User.findOne({ _id: currentUserId }).then((user) => {
    if (!user) {
      throw new NotValidId('Пользователь по указанному _id не найден');
    }
    res.send({ data: user });
  }).catch((err) => {
    if (err.name === 'CastError') {
      throw new CastError('Переданы некорректные данные при создании пользователя');
    }
    if (err.name === 'ValidationError') {
      throw new ValidationError('Переданы некорректные данные');
    }
    next(err);
  }).catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10).then((hash) => User.create({
    name, about, avatar, email, password: hash,
  }))
    .then((user) => res.status(201).send({
      data: {
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      },
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError('Переданы некорректные данные при создании пользователя');
      }
      if (err.name === 'MongoServerError' && err.code === 11000) {
        throw new MongoServerError('При регистрации указан email, который уже существует на сервере');
      }
      next(err);
    })
    .catch(next);
};

const changeUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email },
    { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotValidId('Нет пользователя с таким id');
      }
      res.send({ data: user });
    }).catch((err) => {
      if (err.name === 'CastError') {
        throw new CastError('Переданы некорректные данные при создании пользователя');
      }
      if (err.name === 'ValidationError') {
        throw new ValidationError('Переданы некорректные данные');
      }
      next(err);
    })
    .catch(next);
};

module.exports = {
  changeUserInfo,
  createUser,
  login,
  getUserMe,
};
