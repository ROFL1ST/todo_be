'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      task.hasOne(models.todo, { as: "todos", foreignKey: "task_id" });
      // define association here
      // task.belongsTo(models.activity, { as: "task", foreignKey: "id" });
      task.belongsTo(models.user, { as: "tasks", foreignKey: "id_user" });
    }
  }
  task.init({
    id_user: DataTypes.INTEGER,
    title: DataTypes.STRING,
    activity_id: DataTypes.INTEGER,
    percentage: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'task',
  });
  return task;
};