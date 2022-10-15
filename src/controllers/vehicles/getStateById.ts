import { notFound } from '@hapi/boom';
import { NextFunction, Request, Response } from 'express';

import { db } from '../../lib/db';

const getStateById = async (req: Request<{ vehicleId: string }, null, null, { timestamp: string }>, res: Response, next: NextFunction) => {
  try {
    const {
      params: { vehicleId },
      query: { timestamp },
    } = req;

    const [vehicle, stateAtRequestedTime] = await Promise.all([
      db('vehicles').select(['id', 'make', 'model', 'state']).where({ id: vehicleId }).first(),
      db('stateLogs')
        .select(['state', 'timestamp'])
        .where('vehicleId', vehicleId)
        .andWhere('timestamp', '<=', timestamp)
        .orderBy('timestamp', 'DESC')
        .first(),
    ]);

    // OR in one query
    /**
    SELECT v.id, v.make, v.model, v.state, sl.state , sl."timestamp" 
      FROM public.vehicles v LEFT JOIN public."stateLogs" sl ON sl."vehicleId" = v.id
      AND sl."timestamp" <= '2022-09-12 11:23:54.000' WHERE v.id = 3 ORDER BY sl."timestamp" DESC LIMIT 1;
    */

    if (!vehicle) {
      throw notFound('Vehicle not found', { vehicleId });
    }

    const response = {
      ...vehicle,
      ...(stateAtRequestedTime && { stateAtRequestedTime }),
    };

    return res.status(200).json(response);
  } catch (err) {
    return next(err);
  }
};

export { getStateById };
