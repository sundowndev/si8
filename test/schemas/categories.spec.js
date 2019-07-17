/* eslint-disable no-undef */
/* eslint-disable no-console */

import * as schema from '@/schemas/categories';

describe('CATEGORIES SCHEMAS', () => {
  describe('get_categories', () => {
    it('should succeed without params', () => {
      const req = {
        query: {},
      };

      schema.get_categories(req, {}, (err) => {
        expect(err).toEqual(undefined);
      });
    });

    it('should succeed with params', () => {
      const req = {
        query: {
          page: 2,
        },
      };

      schema.get_categories(req, {}, (err) => {
        expect(err).toEqual(undefined);
      });
    });

    it('should fail with bad types', () => {
      const req = {
        query: {
          page: 'test',
        },
      };

      schema.get_categories(req, {}, (err) => {
        expect(err).toEqual({
          status: 400,
          message: '"page" must be a number',
        });
      });
    });

    it('should fail with bad params', () => {
      const req = {
        query: {
          query: 'nutella',
        },
      };

      schema.get_categories(req, {}, (err) => {
        expect(err).toEqual({ status: 400, message: '"query" is not allowed' });
      });
    });
  });
});
