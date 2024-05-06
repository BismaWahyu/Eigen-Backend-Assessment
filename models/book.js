'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Book extends Model {
        static associate(models){
            Book.hasMany(models.BorrowedBooks, {
                foreignKey: 'book_id'
            })
        }
    }

    Book.init({
        code: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.STRING
        },
        title: {
            allowNull: false,
            type: DataTypes.STRING
        },
        author: {
            allowNull: false,
            type: DataTypes.STRING
        },
        stock: {
            allowNull: false,
            type: DataTypes.INTEGER
        }
    },{
        sequelize,
        underscored: true,
        modelName: 'Book',
        tableName: 'books',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    return Book;
}