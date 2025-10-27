import { Sequelize } from 'sequelize';
import 'dotenv/config'

// postgresql connection

const sequelize = new Sequelize(`${process.env.DB_NAME}`, `${process.env.DB_USER}`, `${process.env.DB_PASSWORD}`, {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

sequelize.authenticate()
  .then(() => console.log('PostgreSQL connected successfully!'))
  .catch(err => console.error('Unable to connect:', err));

export default sequelize;
