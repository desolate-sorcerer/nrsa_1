import express from 'express';
import path from 'path';
import url from 'url';
import userModel from '../models/user.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../files/index.html'));
})

router.get('/users', async (req, res) => {
  try {
    const userData = await userModel.find();
    res.json(userData);
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/add', async (req, res) => {
  const user = new userModel({
    name: req.body.username,
    age: req.body.age
  });
  try {
    const newUser = await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
