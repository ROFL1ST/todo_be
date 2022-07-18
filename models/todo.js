'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      todo.belongsTo(models.task, { as: "todos", foreignKey: "task_id" });
    }
  }
  todo.init({
    task_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    active: DataTypes.ENUM("active", "non-active"),
    priority: DataTypes.ENUM("urgent", "medium"),
    deadline: DataTypes.TIME,
    reminder: DataTypes.ENUM("day", "week"),
  }, {
    sequelize,
    modelName: 'todo',
  });
  return todo;
};