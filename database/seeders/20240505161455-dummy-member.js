'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('members', [
      {
        code: 'M001',
        name: "Angga",
        created_at: "2024-05-06 23:18:52",
        updated_at: "2024-05-06 23:18:52"
      },
      {
        code: 'M002',
        name: 'Ferry',
        created_at: "2024-05-06 23:18:52",
        updated_at: "2024-05-06 23:18:52"
      },
      {
        code: 'M003',
        name: "Putri",
        created_at: "2024-05-06 23:18:52",
        updated_at: "2024-05-06 23:18:52"
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
