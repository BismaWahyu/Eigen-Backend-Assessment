'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class BorrowedBooks extends Model {
        static associate(models){
            BorrowedBooks.belongsTo(models.Member, {
                foreignKey: { name: 'member_id' },
                as: 'member',
                onDelete: 'CASCADE'
            })

            BorrowedBooks.belongsTo(models.Book, {
                foreignKey: { name: 'book_id' },
                as: 'book',
                onDelete: 'CASCADE'
            })
        }
    }

    BorrowedBooks.init({
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        borrowed_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        returned_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    }, {
        sequelize,
        underscored: true,
        tableName: 'borrowed_books',
        modelName: 'BorrowedBooks',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    })

    return BorrowedBooks;
}