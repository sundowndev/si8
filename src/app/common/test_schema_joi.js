import Joi from 'joi';
import * as msgErr from '@/errors/message_errors';

/**
 * [_parse_joi_error description]
 * @param       {[type]} error [description]
 * @return      {[type]}       [description]
 */
function _parse_joi_error(error) {
  let message = '';

  if ('details' in error && Array.isArray(error.details)) {
    message += error.details.reduce((p, v) => `${p + v.message},`, '');

    // remove extra comma
    message = message.slice(0, -1);
  } else {
    message = error.message;
  }

  return message;
}

/**
 * _test_schema
 * @description Test schema on object with callback
 * @param  {Obejct}   schema [Schema]
 * @param  {Obejct}   recv   [Object at tested]
 * @param  {Function} cb     [callback with no argument if success / error argument if failure]
 * @return {void}
 */
function test_schema(schema, recv, cb) {
  // try
  try {
    const result = Joi.validate(recv, schema);

    if (!result.error) cb();
    else cb(msgErr.formatResponse(_parse_joi_error(result.error)));
  } catch (err) {
    // catch
    cb(msgErr.errorApi(err));
  }
}

export default test_schema;
