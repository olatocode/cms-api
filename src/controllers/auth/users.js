/** @format */

const User = require('../../models/users');
const { validateUser } = require('../../middlewares/validateInput');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const { SECRET_TOKEN } = process.env;

exports.register = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    await validateUser.validateAsync(req.body);
    let emailExist = await User.findOne({ email: email });
    if (emailExist) {
      return res.status(401).json({
        message: 'Email already exist, Login or create a new account',
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      status: 'Registered successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const emailExist = await User.findOne({ email });
    if (!emailExist) {
      return res.status(401).json({
        message: 'Email does not exist, please create an account',
      });
    }
    let isPasswordExist = await bcrypt.compare(password, emailExist.password);
    if (!isPasswordExist) {
      return res.status(401).json({
        message: 'Password Not Correct',
      });
    }
    const data = {
      id: emailExist._id,
      firstname: emailExist.firstname,
      lastname: emailExist.lastname,
      email: emailExist.email,
    };
    const token = await jwt.sign(data, SECRET_TOKEN, { expiresIn: '1h' });
    return res.status(200).json({
      status: 'Login successfully',
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.allUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: 'Success',
      users,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteAUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'Success',
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateAUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: 'Success',
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
