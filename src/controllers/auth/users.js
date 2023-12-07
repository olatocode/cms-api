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

exports.resetPassword = async (req, res, next) => {
  try {
    const { newPassword, confirmPassword } = req.body;
    const { email, token } = req.headers;
    const secret_key = process.env.SECRET_TOKEN;
    const decoded_token = await jwt.verify(token, secret_key);
    if (decoded_token.email !== email) {
      return res.status(400).json({
        message: `Email do not match.`,
      });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: `Password do not match.`,
      });
    }
    const hashPassword = await bcrypt.hash(confirmPassword, 10);
    await User.updateOne(
      { email },
      { password: hashPassword },
      {
        new: true,
      }
    );
    return res.status(200).json({
      message: `Password has been updated successfully.`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `${error.message}, Try agin later.`,
    });
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;
    const { email } = req.query;

    const headerTokenEmail = await jwt.verify(
      req.headers.authorization.split(' ')[1],
      process.env.SECRET_TOKEN
    ).email;
    const loggedUser = await User.findOne({ email });
    if (!loggedUser) {
      return res.status(403).json({
        message: `Forbidden`,
      });
    }
    if (headerTokenEmail !== loggedUser.email) {
      return res.status(403).json({
        message: `Forbidden`,
      });
    }
    const passwordMatch = await bcrypt.compare(
      oldPassword,
      loggedUser.password
    );
    if (!passwordMatch) {
      return res.status(400).json({
        message: `Old Password is not correct`,
      });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: `Password do not match.`,
      });
    }
    const hashPassword = await bcrypt.hash(confirmPassword, 10);
    const resetPassword = await User.updateOne(
      { email },
      { password: hashPassword }
    );
    return res.status(200).json({
      message: `Password has been updated successfully.`,
    });
  } catch (error) {
    return res.status(500).json({
      message: `${error.message}, Please Try agin later.`,
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
