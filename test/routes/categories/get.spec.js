/* eslint-disable max-lines */
/* eslint-disable no-undef */
/* eslint-disable no-console */

import Sequelize from 'sequelize';
import sinon from 'sinon';
import * as get from '@/routes/categories/get';
import * as msg from '@/errors/message_errors.js';
import models from '@/db/models';

const Categories = models.Categories;
const Products = models.Products;
const Op = Sequelize.Op;

describe('CATEGORIES ROUTES -- GET', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('GET / -- get_categories', () => {
    it('should succeed', () => {
      const req = {
        query: {},
        limit: 20,
        offset: 0,
      };

      sinon.stub(Categories, 'findAll').callsFake(function fakeFn(query) {
        const expectedQuery = {
          limit: req.limit,
          offset: req.offset,
          order: [['id', 'DESC']],
        };

        expect(query).toEqual(expectedQuery);

        return Promise.resolve([{ id: 1 }, { id: 2 }]);
      });

      get.get_categories(req, {}, (err) => {
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

      sinon.stub(Categories, 'findAll').callsFake(function fakeFn() {
        return Promise.reject('test1');
      });

      get.get_categories(req, {}, (err) => {
        expect(err).toEqual(msg.errorApi());
      });
    });
  });

  describe('GET / -- get_one_category', () => {
    it('should succeed', () => {
      const req = {
        params: {
          categoryId: 2,
        },
        limit: 20,
        offset: 0,
      };

      sinon.stub(Categories, 'findOne').callsFake(function fakeFn(query) {
        const expectedQuery = {
          where: {
            id: req.params.categoryId,
          },
        };

        expect(query).toEqual(expectedQuery);

        return Promise.resolve({ id: 2 });
      });

      get.get_one_category(req, {}, (err) => {
        expect(req.return.id).toEqual(req.params.categoryId);
        expect(err).toEqual(undefined);
      });
    });

    it('should return not found', () => {
      const req = {
        params: {
          categoryId: 2,
        },
        limit: 20,
        offset: 0,
      };

      sinon.stub(Categories, 'findOne').callsFake(function fakeFn(query) {
        const expectedQuery = {
          where: {
            id: req.params.categoryId,
          },
        };

        expect(query).toEqual(expectedQuery);

        return Promise.resolve();
      });

      get.get_one_category(req, {}, (err) => {
        expect(err).toEqual(msg.categoryNotFound());
      });
    });

    it('should handle error', () => {
      const req = {
        params: {
          categoryId: 2,
        },
        limit: 20,
        offset: 0,
      };

      sinon.stub(Categories, 'findOne').callsFake(function fakeFn() {
        return Promise.reject('test1');
      });

      get.get_one_category(req, {}, (err) => {
        expect(err).toEqual(msg.errorApi());
      });
    });
  });

  describe('GET / -- get_products_by_category', () => {
    it('should succeed', () => {
      const req = {
        params: {
          categoryId: 1,
        },
        limit: 20,
        offset: 0,
      };

      sinon.stub(Products, 'findAll').callsFake(function fakeFn(query) {
        const expectedQuery = {
          where: {
            categoryId: req.params.categoryId,
            misc_data: { nutrition_score_fr_100g: { [Op.gt]: 0 } },
          },
          limit: req.limit,
          offset: req.offset,
          order: [
            ['misc_data.nutrition_grade_fr', 'ASC'],
            ['misc_data.nutrition_score_fr_100g', 'DESC'],
          ],
        };

        expect(query).toEqual(expectedQuery);

        return Promise.resolve([{ id: 1 }, { id: 2 }]);
      });

      get.get_products_by_category(req, {}, (err) => {
        expect(req.return).toEqual([{ id: 1 }, { id: 2 }]);
        expect(err).toEqual(undefined);
      });
    });

    it('should handle error', () => {
      const req = {
        params: {
          categoryId: 1,
        },
        limit: 20,
        offset: 0,
      };

      sinon.stub(Products, 'findAll').callsFake(function fakeFn() {
        return Promise.reject('test1');
      });

      get.get_products_by_category(req, {}, (err) => {
        expect(err).toEqual(msg.errorApi());
      });
    });
  });
});
