import { Sequelize } from 'sequelize';
import 'dotenv/config'

// postgresql connection
console.log(process.env.DATABASE_URL);

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

sequelize.authenticate()
  .then(() => console.log('PostgreSQL connected successfully!'))
  .catch(err => console.error('Unable to connect:', err));

export default sequelize;
