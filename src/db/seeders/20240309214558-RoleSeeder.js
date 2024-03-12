"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
    * Add seed commands here.
    *
    * Example:
    * await queryInterface.bulkInsert('People', [{
    * name: 'John Doe',
    * isBetaMember: false
    * }], {});
    */

    await queryInterface.bulkInsert(
      "Roles",
      [
        {
          roleName: "superadmin",
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          roleName: "admin",
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          roleName: "user",
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
    * Add commands to revert seed here.
    *
    * Example:
    * await queryInterface.bulkDelete('People', null, {});
    */

    await queryInterface.bulkDelete("Roles", null, {});
  },
};
