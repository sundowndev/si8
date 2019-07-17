/* eslint-disable no-undef */
/* eslint-disable no-console */

import * as schema from '@/schemas/products';

describe('PRODUCTS SCHEMAS', () => {
  describe('get_product', () => {
    it('should succeed without params', () => {
      const req = {
        query: {},
      };

      schema.get_products(req, {}, (err) => {
        expect(err).toEqual(undefined);
      });
    });

    it('should succeed with params', () => {
      const req = {
        query: {
          query: 'nutella',
          page: 2,
        },
      };

      schema.get_products(req, {}, (err) => {
        expect(err).toEqual(undefined);
      });
    });

    it('should fail with bad types', () => {
      const req = {
        query: {
          page: 'test',
        },
      };

      schema.get_products(req, {}, (err) => {
        expect(err).toEqual({
          status: 400,
          message: '"page" must be a number',
        });
      });
    });

    it('should fail with bad params', () => {
      const req = {
        query: {
          test: 'nutella',
          page: 2,
        },
      };

      schema.get_products(req, {}, (err) => {
        expect(err).toEqual({ status: 400, message: '"test" is not allowed' });
      });
    });
  });

  describe('get_one_product', () => {
    it('should fail without params', () => {
      const req = {
        params: {},
      };

      schema.get_one_product(req, {}, (err) => {
        expect(err).toEqual({
          status: 400,
          message: '"productId" is required',
        });
      });
    });

    it('should succeed with params', () => {
      const req = {
        params: {
          productId: 18,
        },
      };

      schema.get_one_product(req, {}, (err) => {
        expect(err).toEqual(undefined);
      });
    });

    it('should succeed with params', () => {
      const req = {
        params: {
          productId: '1',
        },
      };

      schema.get_one_product(req, {}, (err) => {
        expect(err).toEqual(undefined);
      });
    });

    it('should fail with bad params', () => {
      const req = {
        params: {
          productId: 1,
          test: 18,
        },
      };

      schema.get_one_product(req, {}, (err) => {
        expect(err).toEqual({ status: 400, message: '"test" is not allowed' });
      });
    });

    it('should fail with too high id', () => {
      const req = {
        params: {
          productId: 2147483648,
        },
      };

      schema.get_one_product(req, {}, (err) => {
        expect(err).toEqual({
          status: 400,
          message: '"productId" must be less than or equal to 2147483647',
        });
      });
    });

    it('should succeed with proper id max range', () => {
      const req = {
        params: {
          productId: 2147483647,
        },
      };

      schema.get_one_product(req, {}, (err) => {
        expect(err).toEqual(undefined);
      });
    });
  });

  describe('get_product_nutrition_facts', () => {
    it('should fail without params', () => {
      const req = {
        query: {},
      };

      schema.get_product_nutrition_facts(req, {}, (err) => {
        expect(err).toEqual(undefined);
      });
    });

    it('should succeed with foreign params', () => {
      const req = {
        query: {
          productId: 18,
        },
      };

      schema.get_product_nutrition_facts(req, {}, (err) => {
        expect(err).toEqual(undefined);
      });
    });

    it('should fail with too high id', () => {
      const req = {
        params: {
          productId: 2147483648,
        },
      };

      schema.get_product_nutrition_facts(req, {}, (err) => {
        expect(err).toEqual({
          status: 400,
          message: '"productId" must be less than or equal to 2147483647',
        });
      });
    });

    it('should succeed with proper id max range', () => {
      const req = {
        params: {
          productId: 2147483647,
        },
      };

      schema.get_product_nutrition_facts(req, {}, (err) => {
        expect(err).toEqual(undefined);
      });
    });
  });
});
