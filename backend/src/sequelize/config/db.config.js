export default {
    development: {
      username: "postgres",
      password: process.env.DB_PASSWORD,
      database: "TodoDB",
      host: "127.0.0.1",
      dialect: "postgres"
    },
    test: {
      username: "postgres",
      password: process.env.DB_PASSWORD,
      database: "database_test",
      host: "127.0.0.1",
      dialect: "postgres"
    },
    production: {
      username: "postgres",
      password: process.env.DB_PASSWORD,
      database: "database_production",
      host: "127.0.0.1",
      dialect: "postgres"
    }
}