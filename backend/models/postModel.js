const mongoose = require("mongoose");
const postSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "User",
    },

    author: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: [true, "Please add a title "],
    },

    description: {
      type: String,
      required: [true, "Please add a description "],
    },

    image: {
      type: String,
      required: [true, "Please add a image"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
