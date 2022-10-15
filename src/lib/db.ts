import { knex } from 'knex';

import config from '../config';

const db = knex({
  client: 'pg',
  connection: config.pg.connection,
});

export { db };
