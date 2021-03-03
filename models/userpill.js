const Sequelize = require('sequelize');

module.exports = class UserPill extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            itemName: {
                type: Sequelize.STRING(200),
                allowNull: false,
            },
            componentName: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            effect: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            sideEffect: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'UserPill',
            tableName: 'userPills',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.UserPill.belongsTo(db.Medication);
    }
};