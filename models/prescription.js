const Sequelize = require('sequelize');

module.exports = class Prescription extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
            docterName: {
                type: Sequelize.STRING(10),
                allowNull: false,
            },
            hospitalName: {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            phoneNumber: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            address: {
                type: Sequelize.STRING(30),
                allowNull: true,
            },
            homepage: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Prescription',
            tableName: 'scripts',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.Prescription.belongsTo(db.User);
    }
}