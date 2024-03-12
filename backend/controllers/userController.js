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
      avatar: url,
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

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    const formattedFriends = await Promise.all(
      friends.map(
        async ({
          _id,
          firstName,
          lastName,
          email,
          phone,
          university,
          avatar,
        }) => {
          const getObjectParams = {
            Bucket: bucketName,
            Key: avatar,
          };
          const command = new GetObjectCommand(getObjectParams);
          const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
          return {
            _id,
            firstName,
            lastName,
            email,
            phone,
            university,
            avatar: url,
          };
        }
      )
    );

    console.log(formattedFriends);

    const loggedUser = {
      _id: user.id,
      name: `${user.firstName} ${user.lastName} `,
      email: user.email,
      phone: user.phone,
      university: user.university,
      friends: formattedFriends,
      token: generateToken(user._id),
      avatar: url,
    };

    res.json(loggedUser);
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});




//@desc login admin
//@route SET/api/users/adminlogin
//@access Private
const updateUserProfile = asyncHandler(async(req,res)=>{
  const id = req.user.id

  if(!req.body){
    res.status(400)
    throw new Error("Pleas enter value")
  }
  else{
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new:true
    })

    res.status(200).json(updatedUser);
  }
})












//@desc login admin
//@route SET/api/users/adminlogin
//@access Private
const adminLogin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (username === "admin@unimate.com" && password === "P@ssword1234") {
    const access = { username, status: true };
    res.status(200).json(access);
  } else {
    res.status(400);
    throw new Error("Wrong credentials");
  }
});

//@desc get user details
//@route GET/api/users/me
//@access Private
const getUser = asyncHandler(async (req, res) => {
  const {
    _id,
    firstName,
    lastName,
    email,
    university,
    avatar,
    phone,
    friends,
  } = await User.findById(req.user.id);

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
    phone,
    friends,
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

//@desc get user details
//@route GET/api/users/me
//@access Private
const addRemoveFriend = asyncHandler(async (req, res) => {
  try {
    const { friendId } = req.body;
    const userId = req.user.id;

    console.log(friendId);

    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== userId);
    } else {
      user.friends.push(friendId);
      friend.friends.push(userId);
    }

    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    const formattedFriends = await Promise.all(
      friends.map(
        async ({
          _id,
          firstName,
          lastName,
          email,
          phone,
          university,
          avatar,
          friends,
        }) => {
          //friend image
          const getObjectParams = {
            Bucket: bucketName,
            Key: avatar,
          };
          const command = new GetObjectCommand(getObjectParams);
          const friendImage = await getSignedUrl(s3, command, {
            expiresIn: 3600,
          });

          return {
            _id,
            firstName,
            lastName,
            email,
            phone,
            university,
            avatar: friendImage,
            friends,
          };
        }
      )
    );

    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(404);
    throw new Error(error);
  }
});

//@desc get all users for admin
//@route GET/api/users/allusers
//@access private
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  res.status(200).json(users);
});

//@desc delete user by admin
//@route DELETE /api/users/userdelete/:id
//@access private
const deleteUserAdmin = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).json({ message: "User Not Found" });
      return;
    }

    console.log(user)

    await user.deleteOne();

    res.status(200).json({ message: "User deleted successfully", id: req.params.id });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
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
  addRemoveFriend,
  adminLogin,
  getAllUsers,
  deleteUserAdmin,
  updateUserProfile,
};
