import Joi from 'joi';
import test_schema from '@/common/test_schema_joi';

const postgresSerialMaxRange = 2147483647;

export const get_sports = (req, res, next) => {
  test_schema(
    Joi.object().keys({
      query: Joi.string()
        .min(3)
        .max(45),
      page: Joi.number()
        .integer()
        .min(1)
        .max(postgresSerialMaxRange),
    }),
    req.query,
    next,
  );
};

export const get_one_sport = (req, res, next) => {
  test_schema(
    Joi.object().keys({
      sportId: Joi.number()
        .integer()
        .min(1)
        .max(postgresSerialMaxRange)
        .required(),
    }),
    req.params,
    next,
  );
};

export const get_sport_disciplines = (req, res, next) => {
  test_schema(
    Joi.object().keys({
      sportId: Joi.number()
        .integer()
        .min(1)
        .max(postgresSerialMaxRange)
        .required(),
    }),
    req.params,
    next,
  );
};

export const get_one_discipline = (req, res, next) => {
  test_schema(
    Joi.object().keys({
      sportId: Joi.number()
        .integer()
        .min(1)
        .max(postgresSerialMaxRange)
        .required(),
      disciplineId: Joi.number()
        .integer()
        .min(1)
        .max(postgresSerialMaxRange)
        .required(),
    }),
    req.params,
    next,
  );
};

export const get_discipline_events = (req, res, next) => {
  test_schema(
    Joi.object().keys({
      sportId: Joi.number()
        .integer()
        .min(1)
        .max(postgresSerialMaxRange)
        .required(),
      disciplineId: Joi.number()
        .integer()
        .min(1)
        .max(postgresSerialMaxRange)
        .required(),
    }),
    req.params,
    next,
  );
};
