import Post from '../models/Post.js';
import User from '../models/User.js';

class PostController {
  async createPost(req, res) {
    if (!req.body) {
      res.status(400).send({ message: 'Content can not be emtpy!' });
    }
    const { author, title, content, picture } = req.body;
    const post = new Post({
      author,
      title,
      content,
      picture,
    });
    try {
      const savedPost = await post.save(post);
      await User.findByIdAndUpdate(author, {
        $push: {
          posts: savedPost._id,
        },
      })
        .then(() => {
          res.status(200).send(savedPost);
        })
        .catch((error) => {
          res.status(500).send({
            message: error.message || 'Error while creating new post',
          });
        });
    } catch (error) {
      res.status(500).send({
        message: error.message || 'Error while creating new post',
      });
    }
  }
  async giveAllPosts(req, res) {
    await Post.find()
      .then((post) => {
        res.send(post);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Error while getting post information',
        });
      });
  }
  async giveOnePost(req, res) {
    const { id } = req.params;
    await Post.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({
            messsage: `Cannot find post with id: ${id}`,
          });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || 'Error while getting information about post',
        });
      });
  }
  async updateInfoAboutPost(req, res) {
    if (!req.body) {
      return res.status(400).send({
        message: 'Data can not be emtpy!',
      });
    }
    const { id } = req.params;
    await Post.findByIdAndUpdate(id, req.body, { new: true })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            messsage: `Cannot find post with id: ${id}`,
          });
        } else {
          res.send(data);
        }
      })
      .catch(() => {
        res.status(500).send({
          messsage: 'Error while updating information about post',
        });
      });
  }
  async deletePost(req, res) {
    const { id } = req.params;
    try {
      const post = await Post.findById(id);
      await User.findByIdAndUpdate(post.author, {
        $pull: {
          posts: id,
        },
      });
    } catch (error) {
      console.log(error);
    }

    await Post.findByIdAndDelete(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({
            messsage: `Cannot find post with id: ${id}`,
          });
        } else {
          res.send({
            messsage: `post with id: ${id} deleted succesfully`,
          });
        }
      })
      .catch(() => {
        res.status(500).send({
          messsage: 'Error while delete post',
        });
      });
  }
}

export default new PostController();
