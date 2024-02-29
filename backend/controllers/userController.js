const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

//s3 config
const { s3, bucketName } = require("../config/s3");
const {
  PutObjectCommand,
  GetObjectCommand,
  S3Client,
} = require("@aws-sdk/client-s3");

//s3 image url making config
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

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

  //image
  const generatedAvatar = randomAvatarName();

  console.log(req.file.buffer);

  //create user
  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    phone,
    university,
    avatar: generatedAvatar,
  });

  if (user) {
    //upload avatar
    const prams = {
      Bucket: bucketName,
      Key: generatedAvatar,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };

    const command = new PutObjectCommand(prams);
    await s3.send(command);

     //get avatar url
     const getObjectParams = {
      Bucket: bucketName,
      Key: user.avatar,
    };
    const getImage = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, getImage, { expiresIn: 3600 });

    res.status(201).json({
      _id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      university: user.university,
      token: generateToken(user._id),
      avatar:url
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
    //get avatar url
    const getObjectParams = {
      Bucket: bucketName,
      Key: user.avatar,
    };
    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

    res.json({
      _id: user.id,
      name: `${user.firstName} ${user.lastName} `,
      email: user.email,
      university:user.university,
      token: generateToken(user._id),
      avatar: url,
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

//@desc get user details
//@route GET/api/users/me
//@access Private
const getUser = asyncHandler(async (req, res) => {
  const { _id, firstName, lastName, email, university, avatar } =
    await User.findById(req.user.id);

  //get avatar url
  const getObjectParams = {
    Bucket: bucketName,
    Key: avatar,
  };
  const command = new GetObjectCommand(getObjectParams);
  const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

  res.status(200).json({
    id: _id,
    firstName,
    lastName,
    email,
    university,
    avatar: url,
  });
});

//@desc Get user friends
//@route GET/api/users/me
//@access Private
const getUserFriends = asyncHandler(async (req, res) => {
  const id = req.user.id;
  const user = await User.findById(id);

  //get friends
  const friends = await Promise.all(
    user.friends.map((id) => User.findById(id))
  );

  const formattedFriends = Promise.all(
    friends.map(
      ({ _id, firstName, lastName, email, phone, university, avatar }) => {
        const getObjectParams = {
          Bucket: bucketName,
          Key: avatar,
        };
        const command = new GetObjectCommand(getObjectParams);
        const url = getSignedUrl(s3, command, { expiresIn: 3600 });
        return { _id, firstName, lastName, email, phone, university, url };
      }
    )
  );

  res.status(200).json(formattedFriends);
});

//Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

//Generate RND avatar name
const randomAvatarName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

module.exports = {
  registerUser,
  loginUser,
  getUser,
  getUserFriends,
};
