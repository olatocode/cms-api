/** @format */

const mongoose = require('mongoose');
const categoriesSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', categoriesSchema);
