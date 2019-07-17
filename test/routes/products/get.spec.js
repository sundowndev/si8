/* eslint-disable max-lines */
/* eslint-disable no-undef */
/* eslint-disable no-console */

import sinon from 'sinon';
import * as get from '@/routes/products/get';
import * as msg from '@/errors/message_errors.js';
import Sequelize from 'sequelize';
import models from '@/db/models';

const Products = models.Products;
const Op = Sequelize.Op;

describe('PRODUCTS ROUTES -- GET', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('GET / -- get_products', () => {
    it('should succeed without query', () => {
      const req = {
        query: {},
        limit: 20,
        offset: 0,
      };

      sinon.stub(Products, 'findAll').callsFake(function fakeFn(query) {
        const expectedQuery = {
          limit: req.limit,
          offset: req.offset,
          order: [['id', 'DESC']],
        };

        expect(query).toEqual(expectedQuery);

        return Promise.resolve([{ id: 1 }, { id: 2 }]);
      });

      get.get_products(req, {}, (err) => {
        expect(req.results).toEqual(2);
        expect(req.return).toEqual([{ id: 1 }, { id: 2 }]);
        expect(err).toEqual(undefined);
      });
    });

    it('should succeed with query', () => {
      const req = {
        query: {
          query: 'nutella',
        },
        limit: 40,
        offset: 60,
      };

      sinon.stub(Products, 'findAll').callsFake(function fakeFn(query) {
        const expectedQuery = {
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

        expect(query).toEqual(expectedQuery);

        return Promise.resolve([{ id: 1 }, { id: 2 }]);
      });

      get.get_products(req, {}, (err) => {
        expect(req.results).toEqual(2);
        expect(req.return).toEqual([{ id: 1 }, { id: 2 }]);
        expect(err).toEqual(undefined);
      });
    });

    it('should handle error', () => {
      const req = {
        query: {},
        limit: 40,
        offset: 60,
      };

      sinon.stub(Products, 'findAll').callsFake(function fakeFn() {
        return Promise.reject('test');
      });

      get.get_products(req, {}, (err) => {
        expect(err).toEqual(msg.errorApi());
      });
    });
  });

  describe('GET /:productId -- get_one_product', () => {
    afterEach(() => {
      sinon.restore();
    });

    it('should find one product', () => {
      const req = {
        params: {
          productId: 1,
        },
      };

      sinon.stub(Products, 'findOne').callsFake(function fakeFn(query) {
        const expectedQuery = {
          where: {
            id: req.params.productId,
          },
        };

        expect(query).toEqual(expectedQuery);

        return Promise.resolve({ id: 1 });
      });

      get.get_one_product(req, {}, (err) => {
        expect(req.return).toEqual({ id: 1 });
        expect(err).toEqual(undefined);
      });
    });

    it('should return not found', () => {
      const req = {
        params: {
          productId: 5,
        },
      };

      sinon.stub(Products, 'findOne').callsFake(function fakeFn(query) {
        const expectedQuery = {
          where: {
            id: req.params.productId,
          },
        };

        expect(query).toEqual(expectedQuery);

        return Promise.resolve();
      });

      get.get_one_product(req, {}, (err) => {
        expect(err).toEqual(msg.productNotFound());
      });
    });

    it('should handle error', () => {
      const req = {
        params: {
          productId: 5,
        },
      };

      sinon.stub(Products, 'findOne').callsFake(function fakeFn() {
        return Promise.reject();
      });

      get.get_one_product(req, {}, (err) => {
        expect(err).toEqual(msg.errorApi());
      });
    });
  });

  describe('GET /:productId/product_facts -- get_one_product_facts', () => {
    afterEach(() => {
      sinon.restore();
    });

    it('should fetch product facts', () => {
      const req = {
        params: {
          productId: 1,
        },
      };

      sinon.stub(Products, 'findOne').callsFake(function fakeFn(query) {
        const expectedQuery = {
          where: {
            id: req.params.productId,
          },
          attributes: ['nutrition_facts'],
        };

        expect(query).toEqual(expectedQuery);

        return Promise.resolve({ nutrition_facts: { test: 1 } });
      });

      get.get_one_product_facts(req, {}, (err) => {
        expect(req.return).toEqual({ test: 1 });
        expect(err).toEqual(undefined);
      });
    });

    it('should return not found', () => {
      const req = {
        params: {
          productId: 5,
        },
      };

      sinon.stub(Products, 'findOne').callsFake(function fakeFn(query) {
        const expectedQuery = {
          where: {
            id: req.params.productId,
          },
          attributes: ['nutrition_facts'],
        };

        expect(query).toEqual(expectedQuery);

        return Promise.resolve();
      });

      get.get_one_product_facts(req, {}, (err) => {
        expect(err).toEqual(msg.productNotFound());
      });
    });

    it('should handle error', () => {
      const req = {
        params: {
          productId: 5,
        },
      };

      sinon.stub(Products, 'findOne').callsFake(function fakeFn() {
        return Promise.reject();
      });

      get.get_one_product_facts(req, {}, (err) => {
        expect(err).toEqual(msg.errorApi());
      });
    });
  });

  describe('GET /:productId/misc_data -- get_one_product_misc_data', () => {
    afterEach(() => {
      sinon.restore();
    });

    it('should fetch product facts', () => {
      const req = {
        params: {
          productId: 1,
        },
      };

      sinon.stub(Products, 'findOne').callsFake(function fakeFn(query) {
        const expectedQuery = {
          where: {
            id: req.params.productId,
          },
          attributes: ['misc_data'],
        };

        expect(query).toEqual(expectedQuery);

        return Promise.resolve({ misc_data: { test: 1 } });
      });

      get.get_one_product_misc_data(req, {}, (err) => {
        expect(req.return).toEqual({ test: 1 });
        expect(err).toEqual(undefined);
      });
    });

    it('should return not found', () => {
      const req = {
        params: {
          productId: 5,
        },
      };

      sinon.stub(Products, 'findOne').callsFake(function fakeFn(query) {
        const expectedQuery = {
          where: {
            id: req.params.productId,
          },
          attributes: ['misc_data'],
        };

        expect(query).toEqual(expectedQuery);

        return Promise.resolve();
      });

      get.get_one_product_misc_data(req, {}, (err) => {
        expect(err).toEqual(msg.productNotFound());
      });
    });

    it('should handle error', () => {
      const req = {
        params: {
          productId: 5,
        },
      };

      sinon.stub(Products, 'findOne').callsFake(function fakeFn() {
        return Promise.reject();
      });

      get.get_one_product_misc_data(req, {}, (err) => {
        expect(err).toEqual(msg.errorApi());
      });
    });
  });
});
