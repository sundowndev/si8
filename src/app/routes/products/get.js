import Sequelize from 'sequelize';
import * as msg from '@/errors/message_errors.js';
import models from '@/db/models';

const Products = models.Products;
const Op = Sequelize.Op;

export const get_products = (req, res, next) => {
  let query = null;

  if (req.query.query) {
    query = {
      where: {
        [Op.or]: [
          { product_name: { [Op.iLike]: `%${req.query.query}%` } },
          { generic_name: { [Op.iLike]: `%${req.query.query}%` } },
        ],
      },
      limit: req.limit,
      offset: req.offset,
      order: [['id', 'DESC']],
    };
  } else {
    query = {
      limit: req.limit,
      offset: req.offset,
      order: [['id', 'DESC']],
    };
  }

  Products.findAll(query)
    .then((documents) => {
      req.results = documents.length;
      req.return = documents;

      return next();
    })
    .catch((error) => next(msg.errorApi(error)));
};

export const get_one_product = (req, res, next) => {
  let query = {
    where: {
      id: req.params.productId,
    },
  };

  Products.findOne(query)
    .then((documents) => {
      if (!documents) {
        return next(msg.productNotFound());
      }

      req.return = documents;

      return next();
    })
    .catch((error) => next(msg.errorApi(error)));
};

export const get_one_product_facts = (req, res, next) => {
  let query = {
    where: {
      id: req.params.productId,
    },
    attributes: ['nutrition_facts'],
  };

  Products.findOne(query)
    .then((document) => {
      if (!document) {
        return next(msg.productNotFound());
      }

      req.return = document['nutrition_facts'];

      return next();
    })
    .catch((error) => next(msg.errorApi(error)));
};

export const get_one_product_misc_data = (req, res, next) => {
  let query = {
    where: {
      id: req.params.productId,
    },
    attributes: ['misc_data'],
  };

  Products.findOne(query)
    .then((document) => {
      if (!document) {
        return next(msg.productNotFound());
      }

      req.return = document['misc_data'];

      return next();
    })
    .catch((error) => next(msg.errorApi(error)));
};
