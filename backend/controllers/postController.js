const asyncHandler = require("express-async-handler");

//@desc Get posts
//@route GET/api/posts
//@access private
const getPosts = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get Posts" });
});

//@desc Create posts
//@route POST /api/posts/ceate
//@access private
const createPost = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add text field");
  }
  console.log(req.body);
  res.status(200).json({ message: "Set Posts" });
});

//@desc update posts
//@route PUT /api/posts/ceate
//@access private
const updatePost = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Posts ${req.params.id} updated` });
});

//@desc update posts
//@route PUT /api/posts/ceate
//@access private
const deletePost = asyncHandler(async (req, res) => {
  res.status(200).json({ message: ` Post ${req.params.id} deleted` });
});

module.exports = {
  getPosts,
  createPost,
  updatePost,
  deletePost,
};
