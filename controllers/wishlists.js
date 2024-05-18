const mongoose = require('mongoose');
const Wishlist = require('../models/wishlist');

const {
  OK,
  CREATED,
} = require('../constants');

const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getWishlists = (req, res, next) => {
  Wishlist.find({})
    .populate(['owner', 'wishes'])
    .then((wishlists) => res.status(OK).send({ wishlists }))
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

module.exports.createWishlist = (req, res, next) => {
  const ownerId = req.user._id;
  const { title, link, deadline } = req.body;
  Wishlist.create({ title, link, deadline, owner: ownerId })
    .then((wishlist) => {
      res.status(CREATED).send({
        _id: wishlist._id,
        title: wishlist.title,
        deadline: wishlist.deadline,
        wishes: wishlist.wishes,
        owner: {
          name: req.user.name,
          email: req.user.email,
          _id: req.user._id,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Переданы некорректные данные при создании карточки'));
      } else {
        next(err);
      }
    });
};

// TODO: добавить updateWishlist

module.exports.removeWishlist = (req, res, next) => {
  const currentUser = req.user._id;
  const wishlistID = req.params.wishlistId;
  Wishlist.findById(wishlistID)
    .orFail(new NotFoundError('Вишлист с указанным _id не найден'))
    .populate(['owner', 'wishes'])
    .then((wishlist) => {
      const wishlistOwner = wishlist.owner._id;
      if (JSON.stringify(wishlistOwner) !== JSON.stringify(currentUser)) {
        throw new ForbiddenError('Нельзя удалить чужой вишлист');
      } else {
        Wishlist.findOneAndRemove(wishlist._id)
          .then(() => {
            res.status(OK).send({ message: 'Вишлист успешно удален' });
          })
          .catch((err) => {
            console.log(err);
            if (err instanceof mongoose.Error.CastError) {
              next(new BadRequestError('Передан некорректный формат _id вишлиста'));
            } else {
              next(err);
            }
          });
      }
    })
    .catch((err) => {
      console.log(err);
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError('Передан некорректный формат _id вишлиста'));
      } else {
        next(err);
      }
    });
};