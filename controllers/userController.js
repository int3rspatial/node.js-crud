import User from '../models/User.js';

class UserController {
  async createUser(req, res) {
    if (!req.body) {
      res.status(400).send({ message: 'Content can not be emtpy!' });
    }
    const { username, email, country, img, city, phone, password } = req.body;
    const user = new User({
      username,
      email,
      img,
      country,
      city,
      phone,
      password,
    });

    await user
      .save(user)
      .then(() => {
        res.redirect('/');
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Error while creating new user',
        });
      });
  }
  async giveAllUsers(req, res) {
    await User.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Error while getting user information',
        });
      });
  }
  async giveOneUser(req, res) {
    const { id } = req.params;
    await User.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({
            messsage: `Cannot find user with id: ${id}`,
          });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Error while getting information about user',
        });
      });
  }
  async updateInfoAboutUser(req, res) {
    if (!req.body) {
      return res.status(400).send({
        message: 'Data can not be emtpy!',
      });
    }
    const { id } = req.params;
    await User.findByIdAndUpdate(id, req.body, { new: true })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            messsage: `Cannot find user with id: ${id}`,
          });
        } else {
          res.send(data);
        }
      })
      .catch(() => {
        res.status(500).send({
          messsage: 'Error while updating information about user',
        });
      });
  }
  async deleteUser(req, res) {
    const { id } = req.params;
    await User.findByIdAndDelete(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({
            messsage: `Cannot find user with id: ${id}`,
          });
        } else {
          res.send({
            messsage: `User with id: ${id} deleted succesfully`,
          });
        }
      })
      .catch(() => {
        res.status(500).send({
          messsage: 'Error while delete user',
        });
      });
  }
}

export default new UserController();
