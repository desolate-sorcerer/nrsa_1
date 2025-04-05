import express from 'express';
import userController from '../controllers/userController.js'

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

//first page
router.get('/', userController.loginPage);

//get * users
router.get('/users', userController.getUsers);

//get user by id
router.get('/:id', userController.getUser, userController.getUserById);

//add user
router.post('/add', userController.addUser);

//delete user
router.delete('/:id', userController.getUser, userController.deleteUser);


export default router;
