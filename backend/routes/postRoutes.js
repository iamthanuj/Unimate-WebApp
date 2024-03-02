const express = require("express");
const router = express.Router();
const multer = require('multer')
const {getAllPosts,getUserPosts, createPost, updatePost, deletePost, likePost} = require('../controllers/postController')
const protect = require('../middleware/authMiddleware')


const storage = multer.memoryStorage()
const upload  = multer({storage: storage})


router.get("/all/",getAllPosts);
router.get("/userpost/",protect,getUserPosts);
router.post("/create/",protect,upload.single('image'), createPost);
router.put("/update/:id",protect, updatePost );
router.delete("/delete/:id",protect, deletePost );
router.patch("/like/:id",protect, likePost);

module.exports = router;
