/* eslint-disable max-lines */
/* eslint-disable no-undef */
/* eslint-disable no-console */

import sinon from 'sinon';
import * as get from '@/routes/sports/get';
import * as msg from '@/errors/message_errors.js';
import Sequelize from 'sequelize';
import models from '@/db/models';

const Sports = models.Sports;
const Op = Sequelize.Op;

describe('SPORTS ROUTES -- GET', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('GET /sports -- get_sports', () => {
    it('should succeed without query', () => {
      const req = {
        query: {},
        limit: 20,
        offset: 0,
      };

      sinon.stub(Sports, 'findAll').callsFake(function fakeFn(query) {
        const expectedQuery = {
          limit: req.limit,
          offset: req.offset,
          order: [['id', 'DESC']],
        };

        expect(query).toEqual(expectedQuery);

        return Promise.resolve([{ id: 1 }, { id: 2 }]);
      });

      get.get_sports(req, {}, (err) => {
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

      sinon.stub(Sports, 'findAll').callsFake(function fakeFn(query) {
        const expectedQuery = {
          where: {
            [Op.or]: [{ name: { [Op.iLike]: `%${req.query.query}%` } }],
          },
          limit: req.limit,
          offset: req.offset,
          order: [['id', 'DESC']],
        };

        expect(query).toEqual(expectedQuery);

        return Promise.resolve([{ id: 1 }, { id: 2 }]);
      });

      get.get_sports(req, {}, (err) => {
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

      sinon.stub(Sports, 'findAll').callsFake(function fakeFn() {
        return Promise.reject('test');
      });

      get.get_sports(req, {}, (err) => {
        expect(err).toEqual(msg.errorApi());
      });
    });
  });

  describe('GET /sports/:sportId -- get_one_sport', () => {
    afterEach(() => {
      sinon.restore();
    });

    it('should find one sport', () => {
      const req = {
        params: {
          sportId: 1,
        },
      };

      sinon.stub(Sports, 'findOne').callsFake(function fakeFn(query) {
        const expectedQuery = {
          where: {
            id: req.params.sportId,
          },
        };

        expect(query).toEqual(expectedQuery);

        return Promise.resolve({ id: 1 });
      });

      get.get_one_sport(req, {}, (err) => {
        expect(req.return).toEqual({ id: 1 });
        expect(err).toEqual(undefined);
      });
    });

    it('should return not found', () => {
      const req = {
        params: {
          sportId: 5,
        },
      };

      sinon.stub(Sports, 'findOne').callsFake(function fakeFn(query) {
        const expectedQuery = {
          where: {
            id: req.params.sportId,
          },
        };

        expect(query).toEqual(expectedQuery);

        return Promise.resolve();
      });

      get.get_one_sport(req, {}, (err) => {
        expect(err).toEqual(msg.itemNotFound());
      });
    });

    it('should handle error', () => {
      const req = {
        params: {
          sportId: 5,
        },
      };

      sinon.stub(Sports, 'findOne').callsFake(function fakeFn() {
        return Promise.reject();
      });

      get.get_one_sport(req, {}, (err) => {
        expect(err).toEqual(msg.errorApi());
      });
    });
  });
});
