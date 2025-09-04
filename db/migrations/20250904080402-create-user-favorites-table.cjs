'use strict';

// {
//   id: Primary Key
//   userId: Foreign Key
//   recipeId: Foreign Key
//   createdAt: Timestamp
// }

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  /** types intellisense:
* @param {import('sequelize').QueryInterface} queryInterface
* @param {typeof import('sequelize')} Sequelize
*/
  async up(queryInterface, Sequelize) {
    queryInterface.createTable('userFavorites', {
      id: {type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true},
      userId: {type: Sequelize.UUID, references: {model: 'users', key: 'id'}, onDelete: 'CASCADE', onUpdate: 'CASCADE'},
      recipeId: {type: Sequelize.UUID, references: {model: 'recipes', key: 'id'}, onDelete: 'CASCADE', onUpdate: 'CASCADE'},
    })
  },

  async down(queryInterface, Sequelize) {
    queryInterface.dropTable('userFavorites');
  }
};
