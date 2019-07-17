import Sequelize from 'sequelize';
import * as msg from '@/errors/message_errors.js';
import models from '@/db/models';

const Events = models.Events;
const Sports = models.Sports;
const Disciplines = models.Disciplines;
const Op = Sequelize.Op;

export const get_sports = (req, res, next) => {
  let query = null;

  if (req.query.query) {
    query = {
      where: {
        [Op.or]: [{ name: { [Op.iLike]: `%${req.query.query}%` } }],
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

  Sports.findAll(query)
    .then((documents) => {
      req.results = documents.length;
      req.return = documents;

      return next();
    })
    .catch((error) => next(msg.errorApi(error)));
};

export const get_one_sport = (req, res, next) => {
  let query = {
    where: {
      id: req.params.sportId,
    },
  };

  Sports.findOne(query)
    .then((documents) => {
      if (!documents) {
        return next(msg.itemNotFound());
      }

      req.return = documents;

      return next();
    })
    .catch((error) => next(msg.errorApi(error)));
};

export const get_sport_disciplines = (req, res, next) => {
  let query = {
    where: {
      sportId: req.params.sportId,
    },
  };

  Disciplines.findAll(query)
    .then((documents) => {
      if (!documents) {
        return next(msg.itemNotFound());
      }

      req.return = documents;

      return next();
    })
    .catch((error) => next(msg.errorApi(error)));
};

export const get_one_discipline = (req, res, next) => {
  let query = {
    where: {
      id: req.params.disciplineId,
      sportId: req.params.sportId,
    },
  };

  Disciplines.findOne(query)
    .then((document) => {
      if (!document) {
        return next(msg.itemNotFound());
      }

      req.return = document;

      return next();
    })
    .catch((error) => next(msg.errorApi(error)));
};

export const get_discipline_events = (req, res, next) => {
  let query = {
    where: {
      disciplineId: req.params.disciplineId,
    },
  };

  Events.findAll(query)
    .then((documents) => {
      if (!documents) {
        return next(msg.itemNotFound());
      }

      req.return = documents;

      return next();
    })
    .catch((error) => next(msg.errorApi(error)));
};
