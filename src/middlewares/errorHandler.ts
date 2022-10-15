import { Boom } from '@hapi/boom';
import type { NextFunction, Request, Response } from 'express';

import config from '../config';
import { logger } from '../lib/logger';

export const errorHandler = (err: Boom | unknown, _req: Request, res: Response, next: NextFunction) => {
  type ErrorResponse = {
    status: number;
    message: string;
    errors?: Record<string, unknown>[];
  };
  const response: ErrorResponse = {
    status: 500,
    message: 'Something went wrong!',
  };
  if (err instanceof Boom) {
    response.status = err.output.statusCode;
    response.message = err.message;
    if (Array.isArray(err.data)) {
      response.errors = err.data;
    }
  } else {
    const error = err as ErrorResponse;
    if (error.status) {
      response.status = error.status;
    }
    if (error.message) {
      response.message = error.message;
    }
    if (Array.isArray(error.errors)) {
      response.errors = error.errors;
    }
  }

  if (config.isProd && response.status === 500) {
    response.message = 'Something went wrong, please try again.';
  }

  logger.error(err);

  res.status(response.status).json({
    message: response.message,
    ...(Array.isArray(response.errors) && { errors: response.errors ?? [] }),
  });
  return next();
};
