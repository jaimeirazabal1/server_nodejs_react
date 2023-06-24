const UserModel = require('../models/userModel');

class UserController {
  getAllUsers(req, res) {
    UserModel.find()
      .then((users) => {
        res.json(users);
      })
      .catch((error) => {
        res.status(500).json({ error: 'Error al obtener los usuarios' });
      });
  }

  getUserById(req, res) {
    const { id } = req.params;

    UserModel.findById(id)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(user);
      })
      .catch((error) => {
        res.status(500).json({ error: 'Error al obtener el usuario' });
      });
  }

  createUser(req, res) {
    const { name, email } = req.body;

    const newUser = new UserModel({
      name,
      email,
    });

    newUser
      .save()
      .then((user) => {
        // res.json(user);
        UserModel.find()
        .then((users) => {
            res.json(users);
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error al obtener los usuarios' });
        });
      })
      .catch((error) => {
        res.status(500).json({ error: 'Error al crear el usuario' });
      });
  }

  updateUser(req, res) {
    const { id } = req.params;
    const { name, email } = req.body;

    UserModel.findByIdAndUpdate(
      id,
      { name, email },
      { new: true, useFindAndModify: false }
    )
      .then((user) => {
        if (!user) {
          return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json(user);
      })
      .catch((error) => {
        res.status(500).json({ error: 'Error al actualizar el usuario' });
      });
  }

  deleteUser(req, res) {
    const { id } = req.params;

    UserModel.findByIdAndDelete(id)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json({ message: 'Usuario eliminado exitosamente' });
      })
      .catch((error) => {
        res.status(500).json({ error: 'Error al eliminar el usuario' });
      });
  }
}

module.exports = UserController;
