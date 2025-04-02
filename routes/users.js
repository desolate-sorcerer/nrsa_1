import express from 'express';
import path from 'path';
import url from 'url';
import userModel from '../models/user.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

//first page

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../files/index.html'));
})

//get * users

router.get('/users', async (req, res) => {
  try {
    const userData = await userModel.find();
    res.json(userData);
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//get user by id

router.get('/:id', getUser, (req, res) => {
  res.json(res.user);
});

//add user

router.post('/add', async (req, res) => {
  const user = new userModel({
    name: req.body.username,
    age: req.body.age
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//delete user

router.delete('/:id', getUser, async (req, res) => {
  try {
    await userModel.deleteOne(res.user);
    res.status(201).json({ message: "user is removed" });
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
})

//middleware for getting users

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

export default router;
