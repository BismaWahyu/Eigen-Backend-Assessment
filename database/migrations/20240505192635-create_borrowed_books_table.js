'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('borrowed_books', {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false
      },
      member_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: { tableName: 'members' },
          key: 'code'
        },
        onDelete: 'CASCADE'
      },
      book_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: { tableName: 'books' },
          key: 'code'
        },
        onDelete: 'CASCADE'
      },
      borrowed_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      returned_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
