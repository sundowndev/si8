import express from 'express';

import * as get from '@/routes/products/get';
import * as schemas from '@/schemas/products';
import { paginate } from '@/common/pagination';

const router = new express.Router();

/**
 * @api {get} /products Fetch all products
 * @apiName GetProducts
 * @apiGroup Products
 *
 * @apiSuccess {Boolean} success Request status
 * @apiSuccess {Integer} limit  Lastname of the User.
 * @apiSuccess {Integer} page  Current page.
 * @apiSuccess {Integer} offset  Offset of the request.
 * @apiSuccess {Integer} results  Number of results.
 * @apiSuccess {Array} items  Products.
 */
router.route('/').get(schemas.get_products, paginate(20), get.get_products);

/**
 * @api {get} /products/:id Fetch one product
 * @apiName GetProduct
 * @apiGroup Products
 *
 * @apiParam  {Integer} id  Product id
 *
 * @apiSuccess {Boolean} success Request status
 * @apiSuccess {Object} item  Product.
 */
router.route('/:productId').get(schemas.get_one_product, get.get_one_product);

/**
 * @api {get} /products/:id/nutrition_facts Fetch nutrition facts of product
 * @apiName GetProductNutritionFacts
 * @apiGroup Products
 *
 * @apiParam  {Integer} id  Product id
 *
 * @apiSuccess {Boolean} success Request status
 * @apiSuccess {Object} item  Nutrition facts of product.
 */
router
  .route('/:productId/nutrition_facts')
  .get(schemas.get_product_nutrition_facts, get.get_one_product_facts);

/**
 * @api {get} /products/:id/misc_data Fetch misc data of product
 * @apiName GetProductMiscData
 * @apiGroup Products
 *
 * @apiParam  {Integer} id  Product id
 *
 * @apiSuccess {Boolean} success Request status
 * @apiSuccess {Object} item  Misc data of product.
 */
router
  .route('/:productId/misc_data')
  .get(schemas.get_product_misc_data, get.get_one_product_misc_data);

export default router;
