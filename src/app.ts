import express from 'express';
import { middleware as openApiMiddleware } from 'express-openapi-validator';
import { join } from 'path';

import { errorHandler } from './middlewares';
import { vehiclesRouter } from './routers';

const app = express();

app.use(
  openApiMiddleware({
    apiSpec: join(__dirname, 'openapi.yml'),
    validateRequests: true,
    validateResponses: true,
  }),
);

const router = express.Router();

router.use('/vehicles', vehiclesRouter);

app.use('/', router);

app.use(errorHandler);

export { app };
