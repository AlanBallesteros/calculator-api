export default () => ({
  db: {
    host: process.env.HOST,
    port: process.env.DB_PORT,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    url: process.env.DATABASE_URL,
  },
});
