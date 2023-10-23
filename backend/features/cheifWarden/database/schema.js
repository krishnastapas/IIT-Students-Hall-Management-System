const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is Required"],
      trim: true,
      text: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      trim: true,
      unique: true,

    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
  


  }
);

module.exports = mongoose.model("cheif-warden", schema);
