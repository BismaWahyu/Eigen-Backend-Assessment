'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Member extends Model {
        static associate(models){}
    }

    Member.init({
        code: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.STRING
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        is_penalty:{
            allowNull: false,
            type: DataTypes.BOOLEAN
        },
        penalty_date:{
            allowNull: true,
            type: DataTypes.DATE
        }
    },{
        sequelize,
        underscored: true,
        modelName: 'Member',
        tableName: 'members',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
    
    return Member;
}