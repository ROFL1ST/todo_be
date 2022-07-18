const UserModel = require("../models").user;
const ActivityModel = require("../models").activity;
const TaskModel = require("../models").task;
const TodoModel = require("../models").todo;
const { Op } = require("sequelize");

const createActivity = async (req, res) => {
  try {
    const { name } = req.body;
    const dataTask = await ActivityModel.findOne({
      where: {
        name: name,
      },
    });

    if (dataTask) {
      return res.status(422).json({
        status: "Gagal",
        messege: "Activity Sudah Terdaftar Di Data Kami",
      });
    }
    let body = req.body;
    const activity = await ActivityModel.create(body);
    console.log(activity);
    res.status(200).json({
      status: "success",
      messege: "Register kategori Berhasil",
    });
  } catch (error) {
    console.log(error);
  }
};

const Activity = async (req, res) => {
  try {
    // const { id_user } = req.params;
    const dataTask = await ActivityModel.findAll({
      attributes: ["id", "icon", "name", "color"],
      // where: { id_user: id_user },
    });
    return res.json({
      data: dataTask,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Gagal",
      messege: "Ada Kesalahan",
    });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, id_user } = req.body;
    const dataTask = await TaskModel.findOne({
      where: {
        id_user,
        title: title,
      },
    });

    if (dataTask) {
      return res.status(422).json({
        status: "Gagal",
        title: title,
        messege: "Task Sudah Terdaftar Di Data Kami",
      });
    }
    let body = req.body;
    const activity = await TaskModel.create(body);
    console.log(activity);
    res.status(200).json({
      status: "success",
      messege: "Register kategori Berhasil",
    });
  } catch (error) {
    console.log(error);
  }
};

const createTodo = async (req, res) => {
  try {
    let body = req.body;
    const activity = await TodoModel.create(body);
    console.log(activity);
    res.status(200).json({
      status: "success",
      messege: "Register ToDo Berhasil",
    });
  } catch (error) {
    console.log(error);
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { active, title } = req.body;
    const todo = await TodoModel.findByPk(id);
    if (todo === null) {
      return res.json({
        status: "Fail",
        msg: "todo tidak terdaftar",
      });
    }
    console.log(todo);
    await TodoModel.update(
      { active: active, title: title },
      {
        where: {
          id: id,
        },
      }
    );
    return res.json({
      status: "Berhasil",
      messege: "User Berhasil Diupdate",
    });
  } catch (error) {
    console.log(error);
  }
};

const task = async (req, res) => {
  try {
    const { id_user } = req.params;
    const dataTask = await TaskModel.findAll({
      attributes: ["id", "title", "percentage"],
      where: { id_user: id_user },
    });
    return res.json({
      datas: dataTask,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Gagal",
      messege: "Ada Kesalahan",
    });
  }
};

const taskDone = async (req, res) => {
  try {
    const { id_user } = req.params;
    const dataTask = await TaskModel.findAll({
      attributes: ["id", "title", "percentage"],
      where: { id_user: id_user, percentage: "100" },
    });
    return res.json({
      datas: dataTask,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Gagal",
      messege: "Ada Kesalahan",
    });
  }
};

const taskAndTodo = async (req, res) => {
  try {
    const { id_user } = req.params;
    const dataTask = await TaskModel.findAll({
      attributes: ["id", "title", "percentage"],
      where: { id_user: id_user },
      include: [
        {
          model: TodoModel,
          require: true,
          as: "todos",
          attributes: ["id"],
        },
      ],
    });
    return res.json({
      datas: dataTask,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Gagal",
      messege: "Ada Kesalahan",
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, percentage } = req.body;
    const Task = await TaskModel.findByPk(id);
    if (Task === null) {
      return res.json({
        status: "Fail",
        msg: "Task tidak terdaftar",
      });
    }
    console.log(Task);
    await TaskModel.update(
      { title: title, percentage: percentage },
      {
        where: {
          id: id,
        },
      }
    );
    return res.json({
      status: "Berhasil",
      messege: "User Berhasil Diupdate",
    });
  } catch (error) {
    console.log(error);
  }
};

const todoHasnt = async (req, res) => {
  try {
    const { task_id } = req.params;
    const dataTodo = await TodoModel.findAll({
      attributes: ["id", "title", "active", "priority", "deadline", "reminder"],
      where: { task_id: task_id, active: "active" },
    });
    return res.json({
      data: dataTodo,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Gagal",
      messege: "Ada Kesalahan",
    });
  }
};

const todoDone = async (req, res) => {
  try {
    const { task_id } = req.params;
    const dataTodo = await TodoModel.findAll({
      attributes: ["id", "title", "active", "priority", "deadline", "reminder"],
      where: { task_id: task_id, active: "non-active" },
    });
    return res.json({
      data: dataTodo,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Gagal",
      messege: "Ada Kesalahan",
    });
  }
};

const todo = async (req, res) => {
  try {
    const { task_id } = req.params;
    const dataTodo = await TodoModel.findAll({
      attributes: ["id"],
      where: { task_id: task_id },
    });
    return res.json({
      data: dataTodo,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Gagal",
      messege: "Ada Kesalahan",
    });
  }
};

const hapusTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const dataTodo = await TodoModel.destroy({
      where: {
        id: id,
      },
    });
    if (dataTodo === 0) {
      return res.json({
        status: "Gagal",
        messege: "Todo Tidak Ditemukan",
      });
    }
    return res.json({
      status: "Berhasil",
      messege: "Todo Berhasil Dihapus",
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Fail",
      messege: "Ada Kesalahan",
    });
  }
};

const hapusTask = async (req, res) => {
  try {
    const id = req.params.id;
    const dataTodo = await TaskModel.destroy({
      where: {
        id: id,
      },
    });
    if (dataTodo === 0) {
      return res.json({
        status: "Gagal",
        messege: "Data User Tidak Ditemukan",
      });
    }
    return res.json({
      status: "Berhasil",
      messege: "User Berhasil Dihapus",
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Fail",
      messege: "Ada Kesalahan",
    });
  }
};

const perbaruiTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, deadline } = req.body;
    const dataDetail = await TodoModel.findByPk(id);
    if (dataDetail === null) {
      return res.json({
        status: "Gagal",
        messege: "Data ToDo Tidak Ditemukan",
      });
    }

    await TodoModel.update(
      { title: title, deadline: deadline },
      {
        where: {
          id: id,
        },
      }
    );
    return res.json({
      status: "Berhasil",
      messege: "User Berhasil Diupdate",
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      status: "Gagal",
      messege: "Ada Kesalahan",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, percentage } = req.body;
    const Task = await TaskModel.findByPk(id);
    if (Task === null) {
      return res.json({
        status: "Fail",
        msg: "Task tidak terdaftar",
      });
    }
    console.log(Task);
    await TaskModel.update(
      { title: title, percentage: percentage },
      {
        where: {
          id: id,
        },
      }
    );
    return res.json({
      status: "Berhasil",
      messege: "User Berhasil Diupdate",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createActivity,
  createTask,
  createTodo,
  updateTodo,
  todo,
  hapusTodo,
  hapusTask,
  task,
  Activity,
  todoDone,
  todoHasnt,
  updateTask,
  taskAndTodo,
  perbaruiTodo,
  taskDone
};
