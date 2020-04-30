// Update with your config settings.
require('dotenv').config({ path: '.env' });
const { DB_NAME, DB_USER, DB_HOST, DB_PASS, DB_DRIVER, DB_PORT } = process.env;

module.exports = {
  development: {
    client: DB_DRIVER,
    connection: {
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASS,
      database: DB_NAME,
      port: DB_PORT,
    },
    migrations: {
      directory: './api/migrations',
      tableName: 'migrations'
    }
  },

  staging: {
    client: DB_DRIVER,
    connection: {
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASS,
      database: DB_NAME,
      port: DB_PORT,
    },
    migrations: {
      directory: './api/migrations',
      tableName: 'migrations'
    }
  },

  production: {
    client: DB_DRIVER,
    connection: {
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASS,
      database: DB_NAME,
      port: DB_PORT,
    },
    migrations: {
      directory: './api/migrations',
      tableName: 'migrations'
    }
  }
};
