const express = require("express");
const {
  register,
  login,
  authme,
  user,
  updateUser,
  updateUserCal,
} = require("../controller/AuthController");
const {
  createActivity,
  createTask,
  createTodo,
  todoHasnt,
  updateTodo,
  hapusTodo,
  hapusTask,
  task,
  todo,
  Activity,
  todoDone,
  updateTask,
  taskAndTodo,
  perbaruiTodo,
  taskDone,
} = require("../controller/UserController");
const jwtMiddleware = require("../middleware/jwtMiddleware");
const { taskList } = require("../controller/UserRawQueryController");
const router = express.Router();
router.get("/", (req, res) => {
  res.json({
    status: "Ok",
    messege: "Anda Berhasil Mengakses Kami",
  });
});
// Auth
router.post("/register", register);
router.post("/login", login);
router.get("/authme", authme);
router.get("/user/:id", user);

// User
// router.use(jwtMiddleware);
router.post("/createAct", createActivity);
router.get("/activity", Activity);
router.put("/updateUser/:id", updateUser);
router.put("/cal/:id", updateUserCal);

// task
router.post("/createTask", createTask);
router.get("/task/:id_user", task);
router.delete("/hapusTask/:id", hapusTask);
router.put("/updateTask/:id", updateTask);
router.get("/taskDone/:id_user", taskDone);

// todo
router.get("/todoHasnt/:task_id", todoHasnt);
router.get("/todoDone/:task_id", todoDone);
router.get("/todo/:task_id", todo);
router.post("/createTodo", createTodo);
router.delete("/hapusTodo/:id", hapusTodo);
router.put("/updateTodo/:id", updateTodo);
router.put("/perbaruiTodo/:id", perbaruiTodo);
module.exports = router;
