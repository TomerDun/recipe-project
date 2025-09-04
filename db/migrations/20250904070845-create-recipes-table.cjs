'use strict';


// {
//   id: Primary Key (UUID)
//   title: String (required)
//   description: Text
//   ingredients: JSON Array
//   instructions: JSON Array
//   cookingTime: Integer
//   servings: Integer
//   difficulty: ENUM (easy, medium, hard)
//   imageUrl: String (file path)
//   isPublic: Boolean (default: true)
//   userId: Foreign Key (References Users)
//   createdAt: Timestamp
//   updatedAt: timestamp

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  /** types intellisense:
 * @param {import('sequelize').QueryInterface} queryInterface
 * @param {typeof import('sequelize')} Sequelize
 */
  async up(queryInterface, Sequelize) {
    queryInterface.createTable('recipes', {
      'id': { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
      'title': { type: Sequelize.STRING, allowNull: false },
      'ingredients': { type: Sequelize.JSON },
      'instructions': { type: Sequelize.JSON },
      'cookingTime': { type: Sequelize.INTEGER },
      'servings': { type: Sequelize.INTEGER },
      'difficulty': { type: Sequelize.ENUM('easy', 'medium', 'hard') },
      'imageUrl': { type: Sequelize.STRING },
      'isPublic': { type: Sequelize.BOOLEAN },
      'userId': { type: Sequelize.UUID, references: { model: 'users', key: 'id' }, onUpdate: 'CASCADE', onDelete: 'CASCADE' },
      'createdAt': { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
      'updatedAt': { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    })
  },

  /** types intellisense:
* @param {import('sequelize').QueryInterface} queryInterface
* @param {typeof import('sequelize')} Sequelize
*/
  async down(queryInterface, Sequelize) {
    queryInterface.dropTable('recipes')
  }
};
