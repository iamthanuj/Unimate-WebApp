const express = require("express");
const router = express.Router();
const {getPosts, createPost, updatePost, deletePost} = require('../controllers/postController')

router.get("/",getPosts);

router.post("/create/", createPost);

router.put("/update/:id",updatePost );

router.delete("/delete/:id",deletePost );

module.exports = router;
