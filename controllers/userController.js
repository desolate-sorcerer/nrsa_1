import userModel from '../models/user.js';
import path from 'path';
import url from 'url';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const addUser = (async (req, res) => {
  const user = new userModel({
    name: req.body.username,
    password: req.body.password1,
    email: req.body.email
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

const getUsers = (async (req, res) => {
  try {
    const userData = await userModel.find();
    res.json(userData);
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const getUserById = ((req, res) => {
  res.json(res.user);
});

const deleteUser = (async (req, res) => {
  try {
    await userModel.deleteOne(res.user);
    res.status(201).json({ message: "user is removed" });
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const loginPage = ((req, res) => {
  res.sendFile(path.join(__dirname, '../files/index.html'));
});

async function getUser(req, res, next) {
  let user;
  try {
    user = await userModel.findById(req.params.id);
    if (user == null) {
      res.status(404).json({ message: "could not find user" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
}

export default {
  addUser,
  getUsers,
  getUserById,
  deleteUser,
  loginPage,
  getUser
};
