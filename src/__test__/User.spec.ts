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

  it('should be able to create user', async () => {
    const { status, body } = await request(app).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
    });

    expect(status).toBe(201);

    expect(body).toEqual(
      expect.objectContaining({
        name: 'John Doe',
        email: 'johndoe@example.com',
      }),
    );

    expect(body).toHaveProperty('id');
  });

  it('should not be able to create user with exists email', async () => {
    const { status, body } = await request(app).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
    });

    expect(status).toBe(400);

    expect(body).toHaveProperty('message');
  });
});
