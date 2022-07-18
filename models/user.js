'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasOne(models.task, { as: "tasks", foreignKey: "id_user" });
    }
  }
  user.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    identity: DataTypes.STRING,
    image_url: DataTypes.STRING,
    cal: DataTypes.STRING,
    gender: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};