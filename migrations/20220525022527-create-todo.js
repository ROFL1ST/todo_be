'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('todos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      task_id: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "tasks",
          key: "id",
          as: "task_id",
        },
      },
      title: {
        type: Sequelize.STRING
      },
      active: {
        type: Sequelize.ENUM("active", "non-active"),
      },
      priority: {
        type: Sequelize.ENUM("urgent", "medium"),
      },
      deadline: {
        type: Sequelize.TIME
      },
      reminder: {
        type: Sequelize.ENUM("day", "week"),
        defaultValue: "day",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('todos');
  }
};