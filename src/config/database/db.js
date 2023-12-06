/** @format */

const mongoose = require('mongoose');

// connect to mongodb
const connect_mongodb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Database Connected');
  } catch (error) {
    console.log(error.message);
    console.log(`Database Not Connected`);
  }
};

module.exports = connect_mongodb;
