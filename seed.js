import sequelize from './src/config/db.js';
import University from './src/models/University.js';

const universities = [
  {
    name: 'Harvard Business School',
    program_type: 'MBA',
    avg_gmat: 730,
    avg_gpa: 3.7,
    work_exp_avg: 4,
    location: 'USA',
    scholarships: 30000
  },
  {
    name: 'Stanford Graduate School of Business',
    program_type: 'MBA',
    avg_gmat: 735,
    avg_gpa: 3.8,
    work_exp_avg: 5,
    location: 'USA',
    scholarships: 35000
  },
  {
    name: 'Wharton School',
    program_type: 'MBA',
    avg_gmat: 725,
    avg_gpa: 3.6,
    work_exp_avg: 4,
    location: 'USA',
    scholarships: 32000
  },
  {
    name: 'MIT Sloan School of Management',
    program_type: 'MBA',
    avg_gmat: 728,
    avg_gpa: 3.7,
    work_exp_avg: 4,
    location: 'USA',
    scholarships: 30000
  },
  {
    name: 'Columbia Business School',
    program_type: 'MBA',
    avg_gmat: 730,
    avg_gpa: 3.6,
    work_exp_avg: 5,
    location: 'USA',
    scholarships: 28000
  },
  {
    name: 'London Business School',
    program_type: 'MBA',
    avg_gmat: 710,
    avg_gpa: 3.5,
    work_exp_avg: 4,
    location: 'UK',
    scholarships: 25000
  },
  {
    name: 'INSEAD',
    program_type: 'MBA',
    avg_gmat: 715,
    avg_gpa: 3.6,
    work_exp_avg: 4,
    location: 'France',
    scholarships: 27000
  },
  {
    name: 'Chicago Booth',
    program_type: 'MBA',
    avg_gmat: 730,
    avg_gpa: 3.6,
    work_exp_avg: 5,
    location: 'USA',
    scholarships: 30000
  },
  {
    name: 'Kellogg School of Management',
    program_type: 'MBA',
    avg_gmat: 725,
    avg_gpa: 3.6,
    work_exp_avg: 4,
    location: 'USA',
    scholarships: 29000
  },
  {
    name: 'Yale School of Management',
    program_type: 'MBA',
    avg_gmat: 720,
    avg_gpa: 3.6,
    work_exp_avg: 4,
    location: 'USA',
    scholarships: 28000
  },
  {
    name: 'IESE Business School',
    program_type: 'MBA',
    avg_gmat: 710,
    avg_gpa: 3.5,
    work_exp_avg: 4,
    location: 'Spain',
    scholarships: 26000
  },
  {
    name: 'Haas School of Business',
    program_type: 'MBA',
    avg_gmat: 725,
    avg_gpa: 3.6,
    work_exp_avg: 4,
    location: 'USA',
    scholarships: 28000
  },
  {
    name: 'Dartmouth Tuck',
    program_type: 'MBA',
    avg_gmat: 720,
    avg_gpa: 3.5,
    work_exp_avg: 4,
    location: 'USA',
    scholarships: 27000
  },
  {
    name: 'Cambridge Judge',
    program_type: 'MBA',
    avg_gmat: 710,
    avg_gpa: 3.5,
    work_exp_avg: 4,
    location: 'UK',
    scholarships: 25000
  },
  {
    name: 'Oxford Saïd',
    program_type: 'MBA',
    avg_gmat: 710,
    avg_gpa: 3.5,
    work_exp_avg: 4,
    location: 'UK',
    scholarships: 25000
  },
  {
    name: 'IMD Business School',
    program_type: 'MBA',
    avg_gmat: 700,
    avg_gpa: 3.4,
    work_exp_avg: 5,
    location: 'Switzerland',
    scholarships: 24000
  },
  {
    name: 'Esade Business School',
    program_type: 'MBA',
    avg_gmat: 705,
    avg_gpa: 3.5,
    work_exp_avg: 4,
    location: 'Spain',
    scholarships: 25000
  },
  {
    name: 'Rotterdam School of Management',
    program_type: 'MBA',
    avg_gmat: 700,
    avg_gpa: 3.4,
    work_exp_avg: 4,
    location: 'Netherlands',
    scholarships: 24000
  },
  {
    name: 'HKUST Business School',
    program_type: 'MBA',
    avg_gmat: 710,
    avg_gpa: 3.5,
    work_exp_avg: 4,
    location: 'Hong Kong',
    scholarships: 26000
  },
  {
    name: 'National University of Singapore (NUS) Business School',
    program_type: 'MBA',
    avg_gmat: 700,
    avg_gpa: 3.4,
    work_exp_avg: 4,
    location: 'Singapore',
    scholarships: 25000
  }
];

const seedUniversities = async () => {
  try {
    await University.bulkCreate(universities);
    console.log('20+ universities seeded successfully!');
  } catch (err) {
    console.error('Error seeding universities:', err);
  } finally {
    process.exit();
  }
};

seedUniversities();
