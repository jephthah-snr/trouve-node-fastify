// Update with your config settings.
const DB_PASSWORD = process.env.DB_PASSWORD || "8b3ae83c";
const DB_USERNAME = process.env.DB_USERNAME || "b55baf9e0de398";
const DB_DATABASE = process.env.DB_DATABASE || "heroku_c69af7a90e47d2f";
const DB_SOCKET = process.env.DB_SOCKET;
const DB_HOST = process.env.DB_HOST || "us-cdbr-east-05.cleardb.net";

//DB_URL=mysql://DB_USERNAME:DB_PASSWORD@DB_HOST/DB_DATABASE?reconnect=true

interface KnexConfig {
  [key: string]: object;
}

const knexConfig: KnexConfig = {
  development: {
    client: "mysql2",
    connection: {
      database: DB_DATABASE,
      user: DB_USERNAME,
      password: DB_PASSWORD,
      host: DB_HOST,
      charset: "utf8mb4",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "../src/v1/migrations",
    },
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "mysql2",
    connection: {
      socketPath: DB_SOCKET,
      database: DB_DATABASE,
      user: DB_USERNAME,
      password: DB_PASSWORD,
      charset: "utf8mb4_bin",
    },
    pool: {
      min: Number(10),
      max: Number(10),
    },
  },
};

export default knexConfig;
