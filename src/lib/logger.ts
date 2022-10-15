import { createLogger, format, transports } from 'winston';

export const logger = createLogger({
  level: 'info',
  format: format.combine(format.errors({ stack: true }), format.prettyPrint()),
  transports: [new transports.Console()],
});
