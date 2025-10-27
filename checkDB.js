import sequelize from './src/config/db.js';
import University from './src/models/University.js';

const checkUniversities = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully!');

    const universities = await University.findAll();
    console.log(universities);
    

    console.log(`Found ${universities.length} universities:`);
    universities.forEach(u => {
      console.log(`${u.name} | GMAT: ${u.avg_gmat} | GPA: ${u.avg_gpa} | Work Exp: ${u.work_exp_avg} | Location: ${u.location}`);
    });
  } catch (err) {
    console.error('Error fetching universities:', err);
  } finally {
    process.exit();
  }
};

checkUniversities();
