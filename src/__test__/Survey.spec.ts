import request from 'supertest';
import { getConnection } from 'typeorm';

import { app } from '../app';
import createConnection from '../database';

describe('User', () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to create survey', async () => {
    const { status, body } = await request(app).post('/surveys').send({
      title: 'New Survey',
      description: 'Is a new survey',
    });

    expect(status).toBe(201);

    expect(body).toEqual(
      expect.objectContaining({
        title: 'New Survey',
        description: 'Is a new survey',
      }),
    );

    expect(body).toHaveProperty('id');
  });

  it('should be able to list surveys', async () => {
    const { status, body } = await request(app).get('/surveys');

    expect(status).toBe(200);

    expect(body.length).toEqual(1);
  });
});
