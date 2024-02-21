const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please enter first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please enter last name"],
    },
    email: {
      type: String,
      required: [true, "Please enter email"],
      unique: true,
    },

    phone: {
      type: String,
      required: [true, "Please enter Phone Number"],
    },

    university: {
      type: String,
      required: [true, "Please enter password"],
    },

    password: {
      type: String,
      required: [true, "Please enter password"],
    },
    avatar: {
      type: String,
      default: "",
    },

    friends: {
      type : Array,
      default : []
    },

    

  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema)