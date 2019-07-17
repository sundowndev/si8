// Externals libraries
import helmet from 'helmet';
import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import logger from 'morgan';
import * as path from 'path';
import { config as env_config } from 'dotenv';
import cors from 'cors';

// Internals libraries
import api_response from '@/response/api_response';
import api_response_error from '@/response/api_error_response';
import models from '@/db/models';

// Routes
import sports from '@/routes/sports';

// ---------- GLOBALS ----------
const app = express();

env_config({
  path: path.join(process.cwd(), '.env'),
});

const corsOptions = {
  origin: process.env.BASE_URL || 'http://localhost:8000',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// ---------- INITIALIZE LIBRARIES ----------
app.use(cors(corsOptions));
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ---------- CONFIGURATION HEADERS HTTP ----------
// app.use(config_headers);

app.use(logger('[:method] :url :status - :response-time ms'));

// ROUTES
app.use('/sports', sports);

// ---------- RESPONSE ----------
// SUCCESS
app.use(api_response);
// ERROR
app.use(api_response_error);

// ---------- SERVER ----------
const port = process.env.PORT || '3000';

app.set('port', port);

const server = http.createServer(app);

models.sequelize.sync().then(() => {
  /**
   * Listen on provided port, on all network interfaces.
   */
  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);
});

// Event listener for HTTP server "error" event.
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  let bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

process.on('SIGINT', () => {
  process.exit(-1);
});

// Event listener for HTTP server "listening" event.
function onListening() {
  let addr = server.address();
  let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;

  logger('Listening on ' + bind);
}
