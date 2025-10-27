import sequelize from './src/config/db.js';
// import University from './src/models/University.js';


const syncDB = async () => {
    try {
        await sequelize.sync();
        console.log('Database synced successfully!');
    } catch (err) {
        console.error('Error syncing database:', err);
    } finally {
        process.exit();
    }
};

syncDB();