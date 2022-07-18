const { sequelize } = require("../models");
const { QueryTypes } = require("sequelize");

const taskList = async (req, res) => {
  try {
    // console.log(name);
    const users = await sequelize.query(
      "SELECT  a.title,  b.id FROM tasks AS a LEFT JOIN todos AS b ON (a.id = b.task_id)",
      {
        type: QueryTypes.SELECT,
        raw: true,
      }
    );
    console.log(users);
    if (users.length == -0) {
      return res.json({
        status: "fail",
        msg: "no tasks registered",
      });
    }
    return res.json({
      datas: users,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { taskList };
