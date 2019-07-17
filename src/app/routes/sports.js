import express from 'express';

import * as get from '@/routes/sports/get';
import * as schemas from '@/schemas/sports';
import { paginate } from '@/common/pagination';

const router = new express.Router();

/**
 * @api {get} /sports Fetch all sports
 * @apiName GetSports
 * @apiGroup Sports
 *
 * @apiSuccess {Boolean} success Request status
 * @apiSuccess {Integer} limit  Lastname of the User.
 * @apiSuccess {Integer} page  Current page.
 * @apiSuccess {Integer} offset  Offset of the request.
 * @apiSuccess {Integer} results  Number of results.
 * @apiSuccess {Array} items  Sports.
 */
router.route('/').get(schemas.get_sports, paginate(20), get.get_sports);

/**
 * @api {get} /sports/:id Fetch one sport
 * @apiName GetSports
 * @apiGroup Sports
 *
 * @apiParam  {Integer} id  Sport id
 *
 * @apiSuccess {Boolean} success Request status
 * @apiSuccess {Object} item  Sport.
 */
router.route('/:sportId').get(schemas.get_one_sport, get.get_one_sport);

/**
 * @api {get} /sport/:id/disciplines Fetch disciplines of a sport
 * @apiName GetSportDisciplines
 * @apiGroup Disciplines
 *
 * @apiParam  {Integer} id  Sport id
 *
 * @apiSuccess {Boolean} success Request status
 * @apiSuccess {Object} items  Disciplines of a sport.
 */
router
  .route('/:sportId/disciplines')
  .get(schemas.get_sport_disciplines, get.get_sport_disciplines);

/**
 * @api {get} /sport/:sportId/disciplines/:disciplineId Fetch one discipline of a sport
 * @apiName GetOneSportDiscipline
 * @apiGroup Disciplines
 *
 * @apiParam  {Integer} sportId  Sport id
 * @apiParam  {Integer} disciplineId  Sport's discipline id
 *
 * @apiSuccess {Boolean} success Request status
 * @apiSuccess {Object} item  Discipline.
 */
router
  .route('/:sportId/disciplines/:disciplineId')
  .get(schemas.get_one_discipline, get.get_one_discipline);

/**
 * @api {get} /sport/:sportId/disciplines/:disciplineId/events Fetch events of a discipline
 * @apiName GetDisciplineEvents
 * @apiGroup Events
 *
 * @apiParam  {Integer} sportId  Sport id
 * @apiParam  {Integer} disciplineId  Sport's discipline id
 *
 * @apiSuccess {Boolean} success Request status
 * @apiSuccess {Object} item  Discipline.
 */
router
  .route('/:sportId/disciplines/:disciplineId/events')
  .get(schemas.get_discipline_events, get.get_discipline_events);

export default router;
