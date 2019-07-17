import Sequelize from 'sequelize';

// Models
import disciplines from './disciplines';
import sports from './sports';
import events from './events';

const models = {
  Disciplines: disciplines,
  Sports: sports,
  Events: events,
};
const db = {};
const dbDns = {
  user: process.env.API_DB_USER || 'postgres',
  host: process.env.API_DB_HOST || '127.0.0.1',
  database: process.env.API_DB || 'si8',
  password: process.env.API_DB_PWD || 'secret',
  port: process.env.API_DB_PORT || 5432,
};

// Init DB connection
const sequelize = new Sequelize(
  dbDns.database,
  dbDns.user,
  dbDns.password,
  {
    host: dbDns.host,
    port: dbDns.port,
    dialect: 'postgres',
    logging: false,
  },
  {
    define: {
      timestamps: false,
    },
  },
);

Object.assign(db, {
  sequelize,
  Sequelize,
});

// Register models
for (const model in models) {
  db[model] = models[model](sequelize, Sequelize);
}

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default db;
