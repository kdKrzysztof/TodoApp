export default {
    development: {
      username: "postgres",
      password: "mysecretpassword",
      database: "TodoDB",
      host: "127.0.0.1",
      dialect: "postgres"
    },
    test: {
      username: "postgres",
      password: "mysecretpassword",
      database: "database_test",
      host: "127.0.0.1",
      dialect: "postgres"
    },
    production: {
      username: "postgres",
      password: "mysecretpassword",
      database: "database_production",
      host: "127.0.0.1",
      dialect: "postgres"
    }
}