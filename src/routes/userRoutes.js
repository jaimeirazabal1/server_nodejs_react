const express = require('express');
const UserController = require('../controllers/userController');

class UserRoutes {
  constructor() {
    this.router = express.Router();
    this.userController = new UserController();

    this.router.get('/', this.userController.getAllUsers);
    this.router.get('/:id', this.userController.getUserById);
    this.router.post('/', this.userController.createUser);
    this.router.put('/:id', this.userController.updateUser);
    this.router.delete('/:id', this.userController.deleteUser);
  }
}

module.exports = UserRoutes;
