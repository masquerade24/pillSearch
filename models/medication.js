const Sequelize = require('sequelize');

module.exports = class Medication extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            takingTime: {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: Sequelize.NOW,
            },
            takingCount: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 0,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Medication',
            tableName: 'mdcs',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) {
        db.Medication.belongsTo(db.User);
        db.Medication.hasMany(db.UserPill);
    }
}