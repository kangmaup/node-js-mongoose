const { default: mongoose, Schema } = require('mongoose');
const { nanoid } = require('nanoid');
const { userModel } = require('./user.model');
const { createHmac, verify } = require('node:crypto');
// const { use } = require("..");
const {
  readjson,
  writejson,
  update_json,
  delete_json,
} = require('./users_manipulation');
const { ExtractJwt } = require('passport-jwt');
const JwtStrategy = require('passport-jwt').Strategy;
const { authenticate, use } = require('passport');
const console = require('node:console');

const getAllUsersHandler = async (req, res) => {
  const users = await readjson();

  const response = res.send({
    status: 'success',
    data: {
      users: users.map((user) => ({
        id: user.id,
        name: user.name,
        username: user.username,
      })),
    },
  });
  return response;
};

const getUserByIdHandler = async (req, res) => {
  const users = await readjson();
  const { userId } = req.params;

  const user = users.filter((n) => n.id === usersId)[0];

  if (user) {
    const response = res
      .send({
        status: 'success',
        data: {
          users,
        },
      })
      .status(200);
    return response;
  }

  const response = res
    .send({
      status: 'failed',
      message: 'data tidak ditemukan',
    })
    .status(401);
  return response;
};

const addUserHandler = async (req, res) => {
  const { name, username } = req.body;
  console.log(req.body);
  if (!name) {
    const response = res
      .send({
        status: 'fail',
        message: 'Gagal menambahkan user. Mohon isi nama user',
      })
      .status(400);
    return response;
  }

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newUsers = {
    name,
    username,
    id,
    insertedAt,
    updatedAt,
  };

  const read = await readjson();
  console.log(read);
  const write = await writejson(newUsers, 'users');
  const users = await readjson();

  const isSuccess = users.filter((user) => user.id === id).length > 0;

  if (isSuccess) {
    // Response Sukses
    const response = res.send({
      status: 'success',
      message: 'Users berhasil ditambahkan',
      data: {
        usersId: id,
      },
    });
    response.status(201);
    return response;
  }
  // Response Gagal
  const response = res.send({
    status: 'fail',
    message: 'Users gagal ditambahkan',
  });
  response.status(500);
  return response;
};
const editUsersByIdHandler = async (req, res) => {
  const users = await readjson();
  const { usersId } = req.params;

  const { name, username } = req.body;

  if (!name) {
    // Client tidak melampirkan properti name pada request body
    const response = res
      .send({
        status: 'fail',
        message: 'Gagal memperbarui user. Mohon isi nama users',
      })
      .status(400);
    return response;
  }
  const updatedAt = new Date().toISOString();

  const index = users.findIndex((users) => users.id === usersId);

  if (index !== -1) {
    const data = {
      ...users[index],
      name,
      username,
      updatedAt,
    };
    await update_json(data, index, 'users');

    // Bila buku berhasil diperbarui
    const response = res
      .send({
        status: 'success',
        message: 'Users berhasil diperbarui',
      })
      .status(200);
    return response;
  }

  const response = res
    .send({
      status: 'fail',
      message: 'Gagal memperbarui Users. Id tidak ditemukan',
    })
    .status(404);
  return response;
};
const deleteUserByIdHandler = async (request, res) => {
  const users = await readjson();
  const { usersId } = request.params;

  const index = users.findIndex((user) => user.id === usersId);

  if (index !== -1) {
    const del = await delete_json(index, 'users');
    const response = res
      .send({
        status: 'success',
        message: 'User berhasil dihapus',
      })
      .status(200);
    return response;
  }

  const response = res
    .send({
      status: 'fail',
      message: 'User gagal dihapus. Id tidak ditemukan',
    })
    .status(404);
  return response;
};

const createUser = async (req, res) => {
  const user = new userModel(req.body);
  try {
    await user.save();
    res
      .send({
        status: 'Sukses',
        message: 'User Sukses ditambahkan',
      })
      .status(201);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const getUser = async (req, res) => {
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getPass = async (req, res) => {
  try {
    const users = await userModel
      .findOne({ _id: req.params.passId })
      .select('password -_id');
    res.json(users);
    console.log(users.password);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const compare = async (username, password) => {
  try {
    const users = await userModel
      .findOne({ username: username })
      .select('+password');
    const comPass = createHmac('sha256', 'a secret')
      .update(password)
      .digest('base64');
    const comparing = comPass === users.password;
    return comparing;
    console.log(users.password);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUsers = async (req, res) => {
  const cekId = await userModel.findById(req.params.usersId);
  console.log(req.params);
  if (!cekId) return res.status(404).json({ message: 'Data tidak ditemukan' });
  try {
    const updatedUser = await userModel.updateOne(
      {
        _id: req.params.usersId,
      },
      {
        $set: req.body,
      }
    );
    res
      .send({
        status: 'Sukses',
        message: 'Data Berhasil Di ubah',
      })
      .status(200)
      .json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteUsers = async (req, res) => {
  const cekId = await userModel.findById(req.params.usersId);
  if (!cekId) return res.status(404).json({ message: 'Data tidak ditemukan' });
  try {
    const deletedUsers = await userModel.deleteOne({
      _id: req.params.usersId,
    });
    res.status(200).json(deletedUsers);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUserByUsername = async (req, res) => {
  try {
    const user = await userModel.findOne({ username: req.body.username });
    console.log(user.createToken(req.body.username));
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const userLogin = (req, res) => {
  try {
    console.log(req.body)
    return res.status(200).json(req.user.authJson());
  } catch (error) {
    return { error: 'error' };
  }
};

const logout = async (req, res) => {
  try {
    // const getToken = req.headers['authorization'];
    // if(!getToken || getToken === "" ){
    //   res.send({
    //     status : 'Token Invalid'
    //   })
    // }

    // getToken.replace(getToken,'');
    res.status(200).json({
      status: 'berhasil',
      message: 'Log out berhasil',
    });
  } catch (err) {}
};

module.exports = {
  getAllUsersHandler,
  addUserHandler,
  editUsersByIdHandler,
  deleteUserByIdHandler,
  createUser,
  getUser,
  updateUsers,
  deleteUsers,
  getPass,
  getUserByUsername,
  logout,
  userLogin,
};
