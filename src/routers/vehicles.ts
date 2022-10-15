import express from 'express';

import { vehicles } from '../controllers';

const vehiclesRouter = express.Router();

vehiclesRouter.get('/:vehicleId/state', vehicles.getStateById);

export { vehiclesRouter };
