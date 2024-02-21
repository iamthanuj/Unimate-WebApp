const express = require("express");
const router = express.Router();
const {getAllPosts,getUserPosts, createPost, updatePost, deletePost} = require('../controllers/postController')
const protect = require('../middleware/authMiddleware')

router.get("/all/",getAllPosts);

router.get("/userpost/",protect,getUserPosts);

router.post("/create/",protect, createPost);

router.put("/update/:id",protect, updatePost );

router.delete("/delete/:id",protect, deletePost );

module.exports = router;
