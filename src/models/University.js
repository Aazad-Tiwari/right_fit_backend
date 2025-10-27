import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const University = sequelize.define('University', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    program_type: {
        type: DataTypes.STRING
    },
    avg_gmat: {
        type: DataTypes.INTEGER
    },
    avg_gpa: {
        type: DataTypes.DECIMAL(3,2)
    },
    work_exp_avg: {
        type: DataTypes.INTEGER
    },
    location: {
        type: DataTypes.STRING
    },
    scholarship_info: {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'universities',
    timestamps: true
});

export default University;
