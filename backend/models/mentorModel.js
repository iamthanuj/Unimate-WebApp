const mongoose = require("mongoose");
const mentorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },


    expertise: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    availability: {
      type: Boolean,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },


  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Mentor", mentorSchema);
