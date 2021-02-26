const Sequelize = require('sequelize');

module.exports = class Pill extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            itemName: {
                type: Sequelize.STRING(200),
                allowNull: false,
            },
            entpName: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            printFront: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            priintBack: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            drugShape: {
                type: Sequelize.STRING(10),
                allowNull: false,
            },
            colorClass1: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            colorClass2: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
            formCodeName: {
                type: Sequelize.STRING(30),
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Pill',
            tableName: 'pills',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {}
};