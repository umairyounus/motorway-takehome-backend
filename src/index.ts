import { app } from './app';
import config from './config';
import { logger } from './lib/logger';

app.listen(config.port, () => {
  logger.info(`Server is running at http://:${config.port}`);
});
