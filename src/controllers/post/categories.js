/** @format */

const Category = require('../../models/categories');

exports.createPostCategory = async (req, res) => {
  const { title } = req.body;
  if (!title === '') {
    return res.status(400).json({
      status: 'fail',
      message: 'Please provide the title',
    });
  }
  try {
    const postCategory = await Category.create({ title });
    res.status(201).json({
      status: 'Success',
      postCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.allPostsCategory = async (req, res) => {
  try {
    const posts = await Category.find();
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

exports.deletePostCategory = async (req, res) => {
  try {
    const postCategory = await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'Success',
      postCategory,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updatePostCategory = async (req, res) => {
  try {
    const postCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({
      status: 'Success',
      postCategory,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
