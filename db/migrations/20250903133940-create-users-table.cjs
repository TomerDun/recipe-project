'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,        
      },
      username: {
        type: Sequelize.STRING,
        unique: true,
        validate: {len: [3, 30]}
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        validate: {isEmail: true}
      },
      password: {type: Sequelize.STRING},
      firstName: {type: Sequelize.STRING},
      lastName: {type: Sequelize.STRING},
      createdAt: {type: Sequelize.DATE, defaultValue: Sequelize.NOW},
      updatedAt: {type: Sequelize.DATE, defaultValue: Sequelize.NOW},      
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
