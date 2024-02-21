const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

//@desc register user
//@route POST/api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, phone, university } = req.body;

  if (!firstName || !lastName || !email || !password || !phone || !university) {
    res.status(400);
    throw new Error("Please fill all fields");
  }

  //check user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create user
  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    phone,
    university,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      firstName: user.firstName,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc login user
//@route POST/api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //check for email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      firstName: user.firstName,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

//@desc login user
//@route GET/api/users/me
//@access Private
const getUser = asyncHandler(async (req, res) => {

    const {_id, firstName, lastName, email, university, avatar} = await User.findById(req.user.id)
  res.status(200).json({
    id:_id, 
    firstName,
    lastName,
    email,
    university,
    avatar,
  });
});

//Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
};