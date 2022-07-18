const UserModel = require("../models").user;
const TaskModel = require("../models").task;
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
// const { user } = require("pg/lib/defaults");
dotenv.config();

const register = async (req, res) => {
  try {
    let body = req.body;
    const { username } = req.body;
    console.log(body);
    const dataUser = await UserModel.findOne({
      where: {
        username: username,
      },
    });
    if (dataUser !== null) {
      return res.status(422).json({
        status: "Gagal",
        messege: "username Sudah Terdaftar",
      });
    }
    const salt = bcrypt.genSaltSync(10);
    body.password = await bcrypt.hashSync(body.password, salt);
    const users = await UserModel.create(body);
    console.log(users);

    res.status(200).json({
      status: "Success",
      messege: "Register Berhasil",
    });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    // CEK username DULU ADAA ATAU NGGAK
    const dataUser = await UserModel.findOne({
      where: {
        username: username,
      },
    });
    // CEK username DAN PASSWORD HARUS SAMA DARI DATABASE
    // CEK usernameNYA
    if (dataUser === null) {
      return res.status(422).json({
        status: "Gagal",
        messege: "username Belum Terdaftar Di Data Kami",
      });
    }
    // CEK PASSWORDNYA
    const verify = bcrypt.compareSync(password, dataUser.password);
    if (!verify) {
      return res.status(422).json({
        status: "Gagal",
        messege: "Password Salah",
      });
    }

    const users = await UserModel.findOne({
      attributes: ["id", "username", "name", "identity", "gender"],
      where: {
        username: username,
      },
    });

    return res.json({
      status: "Success",
      messsege: "Anda Berhasil Login",
      data: users,
    });
  } catch (error) {
    console.log(error);
  }
};

const authme = async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  jwt.verify(token, process.env.JWT_ACCESS_TOKEN, async (err, decode) => {
    if (err) {
      return res.status(401).json({
        status: "fail",
        msg: "invalid",
        data: err,
      });
    } else {
      try {
        req.username = decode?.username;
        const tokenLu = jwt.sign(
          {
            username: req.username,
          },
          process.env.JWT_ACCESS_TOKEN,
          { expiresIn: "1d" }
        );
        return res.json({
          status: "Success",
          msg: "You got your new token",
          token: tokenLu,
        });
      } catch (error) {
        return res.status(401).json({
          status: "fail",
          msg: "invalid",
          data: error,
        });
      }
    }
  });
};

const user = async (req, res) => {
  try {
    const { id } = req.params;
    const dataUser = await UserModel.findAll({
      attributes: ["id", "username", "name", "identity", "image_url", "cal", "gender"],
      where: {
        id: id,
      },
    });
    return res.json({
      data: dataUser,
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
    const { name, username, identity, image_url } = req.body;
    const user = await UserModel.findByPk(id);
    if (user === null) {
      return res.json({
        status: "Fail",
        msg: "user tidak terdaftar",
      });
    }
    console.log(user);
    await UserModel.update(
      {
        name: name,
        username: username,
        identity: identity,
        image_url: image_url,
      },
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

const updateUserCal = async (req, res) => {
  try {
    const { id } = req.params;
    const { cal, gender } = req.body;
    const User = await UserModel.findByPk(id);
    if (User === null) {
      return res.json({
        status: "Fail",
        msg: "User tidak terdaftar",
      });
    }
    console.log(User);
    await UserModel.update(
      { cal: cal, gender: gender },
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

// Siswa

module.exports = { register, login, authme, user, updateUser, updateUserCal };
