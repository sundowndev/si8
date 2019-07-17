/* eslint-disable no-undef */
/* eslint-disable no-console */

import Joi from 'joi';
import sinon from 'sinon';
import test_schema from '@/common/test_schema_joi';
import * as msgErr from '@/errors/message_errors';

describe('TEST SCHEMA METHOD', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should succeed', () => {
    const schema = Joi.object().keys({
      categoryId: Joi.number()
        .integer()
        .min(1)
        .max(Number.MAX_SAFE_INTEGER),
    });

    const payload = {
      categoryId: 2,
    };

    sinon.stub(Joi, 'validate').callsFake(function fakeFn(recv, JoiSchema) {
      expect(JoiSchema).toEqual(schema);
      expect(recv).toEqual(payload);

      return { error: null };
    });

    test_schema(schema, payload, (err) => {
      expect(err).toBe(undefined);
    });
  });

  it('should handle Joi error', () => {
    const schema = Joi.object().keys({
      categoryId: Joi.number()
        .integer()
        .min(1)
        .max(Number.MAX_SAFE_INTEGER),
    });

    const payload = {
      categoryId: 'test',
    };

    sinon.stub(Joi, 'validate').callsFake(function fakeFn(recv, JoiSchema) {
      expect(JoiSchema).toEqual(schema);
      expect(recv).toEqual(payload);

      return {
        error: {
          message: 'test1',
        },
      };
    });

    test_schema(schema, payload, (err) => {
      expect(err).toEqual({
        status: 400,
        message: 'test1',
      });
    });
  });

  it('should handle api error', () => {
    const schema = {};
    const payload = {};

    sinon.stub(Joi, 'validate').callsFake(function fakeFn(recv, JoiSchema) {
      expect(JoiSchema).toEqual(schema);
      expect(recv).toEqual(payload);

      throw new Error('test2');
    });

    test_schema(schema, payload, (err) => {
      expect(Joi.validate).toThrow(Error);
      expect(err).toEqual(msgErr.errorApi());
    });
  });
});
