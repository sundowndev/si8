import Joi from 'joi';
import test_schema from '@/common/test_schema_joi';

const postgresSerialMaxRange = 2147483647;

export const get_products = (req, res, next) => {
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

export const get_one_product = (req, res, next) => {
  test_schema(
    Joi.object().keys({
      productId: Joi.number()
        .integer()
        .min(1)
        .max(postgresSerialMaxRange)
        .required(),
    }),
    req.params,
    next,
  );
};

export const get_product_nutrition_facts = (req, res, next) => {
  test_schema(
    Joi.object().keys({
      productId: Joi.number()
        .integer()
        .min(1)
        .max(postgresSerialMaxRange)
        .required(),
    }),
    req.params,
    next,
  );
};

export const get_product_misc_data = (req, res, next) => {
  test_schema(
    Joi.object().keys({
      productId: Joi.number()
        .integer()
        .min(1)
        .max(postgresSerialMaxRange)
        .required(),
    }),
    req.params,
    next,
  );
};
