import supertest from 'supertest';

import { app } from '../../../src/app';
import { db } from '../../../src/lib/db';

describe('GET /vehicles/:vehicleId/state', () => {
  afterAll(async () => {
    await db.destroy();
  });

  it('should return vehicle 1(BMW X1) state', async () => {
    const timestamp = '2022-09-10 10:23:54+00';
    const result = await supertest(app)
      .get(`/vehicles/1/state?timestamp=${encodeURIComponent(timestamp)}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200);

    expect(result.body).toEqual({
      id: 1,
      make: 'BMW',
      model: 'X1',
      state: 'quoted',
      stateAtRequestedTime: { state: 'quoted', timestamp: '2022-09-10T10:23:54.000Z' },
    });
  });

  it('should return vehicle 3(VW GOLF) state', async () => {
    const timestamp = '2022-09-12 12:40:41.000Z';
    const result = await supertest(app)
      .get(`/vehicles/3/state?timestamp=${encodeURIComponent(timestamp)}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200);

    expect(result.body).toEqual({
      id: 3,
      make: 'VW',
      model: 'GOLF',
      state: 'sold',
      stateAtRequestedTime: { state: 'selling', timestamp: '2022-09-11T23:21:38.000Z' },
    });
  });

  it('should return empty state at time if the requested time is before the first state', async () => {
    const timestamp = '2022-09-01 10:20:31.000Z';
    const result = await supertest(app)
      .get(`/vehicles/3/state?timestamp=${encodeURIComponent(timestamp)}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200);

    expect(result.body).toEqual({
      id: 3,
      make: 'VW',
      model: 'GOLF',
      state: 'sold',
    });
  });

  it('should return 404 if vehicle is not found', async () => {
    const timestamp = '2022-09-01 10:20:31.000Z';
    await supertest(app)
      .get(`/vehicles/10/state?timestamp=${encodeURIComponent(timestamp)}`)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(404);
  });

  it('should return 400 error if timestamp is not supplied', async () => {
    await supertest(app).get('/vehicles/3/state').set('Content-Type', 'application/json').set('Accept', 'application/json').expect(400);
  });
});
