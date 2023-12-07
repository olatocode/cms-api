/** @format */

const Post = require('../../models/posts');

exports.createPost = async (req, res) => {
  const { title, description } = req.body;
  if (title === '' || description === '') {
    return res.status(400).json({
      status: 'fail',
      message: 'Please provide title and description',
    });
  }
  try {
    const post = await Post.create({ title, description });
    res.status(201).json({
      status: 'Success',
      post,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.allPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({
      status: 'Success',
      posts,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'Success',
      post,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
    }
}

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: 'Success',
      post,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}