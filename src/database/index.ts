import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  if (process.env.NODE_ENV === 'test') {
    Object.assign(defaultOptions, {
      type: 'sqlite',
      database: './src/database/database.test.sqlite',
      port: null,
      username: null,
      password: null,
    });
  }

  return createConnection(
    defaultOptions,
  );
};
