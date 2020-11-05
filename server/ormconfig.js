const { config } = require("./src/config");

module.exports = {
  name: config.PG_NAME,
  type: "postgres",
  host: config.PG_HOST,
  database: config.PG_DATABASE,
  port: config.PG_PORT,
  username: config.PG_USER,
  password: config.PG_PASSWORD,
  ssl: config.PRODUCTION,
  synchronize: true,
  logging: !config.PRODUCTION,
  entities: [process.cwd() + '/dist/src/database/models/**/*.{js,ts}'],
};
