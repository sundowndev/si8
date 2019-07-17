/* eslint-disable no-console */
/* eslint-disable max-lines */
import fixtures from './fixtures.json';
import models from '../src/app/db/models';

// ---------------- Functions & script ----------------
const logger = (...args) => console.log(...args);

let countSports = 0;
let countDisciplines = 0;
let countEvents = 0;

async function main() {
  for (let i in fixtures.sports) {
    const sport = fixtures.sports[i];

    await models.Sports.create({ id: sport.id, name: sport.name })
      .then(countSports++)
      .catch((error) => {
        throw new Error(error);
      });
  }

  for (let i in fixtures.disciplines) {
    const discipline = fixtures.disciplines[i];

    await models.Disciplines.create({
      id: discipline.id,
      name: discipline.name,
      start_date: discipline.start_date,
      end_date: discipline.end_date,
      sportId: discipline.sport,
    })
      .then(countDisciplines++)
      .catch((error) => {
        throw new Error(error);
      });
  }

  for (let i in fixtures.events) {
    const event = fixtures.events[i];

    await models.Events.create({
      name: event.name,
      date: event.date,
      start_hour: event.start_hour,
      end_hour: event.end_hour,
      athletes: event.athletes,
      state: event.state,
      disciplineId: event.discipline,
    })
      .then(countEvents++)
      .catch((error) => {
        throw new Error(error);
      });
  }

  logger(`-----------------------------------`);
  logger(`Created ${countSports} sports`);
  logger(`Created ${countDisciplines} disciplines`);
  logger(`Created ${countEvents} events`);
  logger('Done.');

  process.exit();
}

models.sequelize.sync({ force: true, logging: true }).then(main);
