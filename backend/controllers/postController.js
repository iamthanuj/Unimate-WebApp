const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const Post = require("../models/postModel");
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

//@desc Get posts
//@route GET/api/posts
//@access private
const getAllPosts = asyncHandler(async (req, res) => {
  
  const posts = await Post.find();

  const formattedPosts = await Promise.all(
    posts.map(
      async ({
        user,
        _id,
        author,
        authorImage,
        title,
        description,
        image,
        likes,
        comments,
      }) => {
        //auther image
        const getObjectParams = {
          Bucket: bucketName,
          Key: authorImage,
        };
        const command = new GetObjectCommand(getObjectParams);
        const authorUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

        //pos image
        const getObjectParamsPost = {
          Bucket: bucketName,
          Key: image,
        };
        const commandPost = new GetObjectCommand(getObjectParamsPost);
        const postUrl = await getSignedUrl(s3, commandPost, {
          expiresIn: 3600,
        });

        //gettting comment author images
        const formattedComments = await Promise.all(
          comments.map(async ({ userId, commentUser, comment, avatar }) => {
            //auther image
            const getObjectParams = {
              Bucket: bucketName,
              Key: avatar,
            };
            const command = new GetObjectCommand(getObjectParams);
            const commentAuthorUrl = await getSignedUrl(s3, command, {
              expiresIn: 3600,
            });

            return {
              userId,
              commentUser,
              comment,
              avatar: commentAuthorUrl,
            };
          })
        );

        return {
          user,
          _id,
          author,
          authorImage: authorUrl,
          title,
          description,
          image: postUrl,
          likes,
          comments: formattedComments,
        };
      }
    )
  );

  res.status(200).json(formattedPosts);
});

//@desc Get posts
//@route GET/api/posts
//@access private
const getUserPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ user: req.user.id });

  //auther image
  const getObjectParams = {
    Bucket: bucketName,
    Key: req.user.avatar,
  };
  const command = new GetObjectCommand(getObjectParams);
  const authorUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

  const formattedPosts = await Promise.all(
    posts.map(
      async ({
        user,
        _id,
        author,
        authorImage,
        title,
        description,
        image,
        likes,
        comments,
      }) => {
        //post image
        const getObjectParamsPost = {
          Bucket: bucketName,
          Key: image,
        };
        const commandPost = new GetObjectCommand(getObjectParamsPost);
        const postUrl = await getSignedUrl(s3, commandPost, {
          expiresIn: 3600,
        });

        return {
          user,
          _id,
          author,
          authorImage: authorUrl,
          title,
          description,
          image: postUrl,
          likes,
          comments,
        };
      }
    )
  );

  res.status(200).json(formattedPosts);
});

//@desc Create posts
//@route POST /api/posts/ceate
//@access private
const createPost = asyncHandler(async (req, res) => {
  if (!req.body.title || !req.body.description) {
    res.status(400);
    throw new Error("Please add a text");
  } else {
    const generatedImageName = randomImageName();

    const post = await Post.create({
      user: req.user.id,
      author: `${req.user.firstName} ${req.user.lastName}`,
      authorImage: req.user.avatar,
      title: req.body.title,
      description: req.body.description,
      image: generatedImageName,
      likes: {},
      comments: [],
    });

    //upload image
    const prams = {
      Bucket: bucketName,
      Key: generatedImageName,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };
    const command = new PutObjectCommand(prams);
    await s3.send(command);


    

    res.status(200).json(post);
  }
});

//@desc update posts
//@route PUT /api/posts/ceate
//@access private
const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(400);
    throw new Error("Post Not Found");
  }

  const user = await User.findById(req.user.id);

  //check for user
  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }

  //make sure logged user match
  if (post.user.toString() !== user.id) {
    res.status(401);
    throw new Error("user not authorized");
  }

  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedPost);
});

//@desc update posts
//@route PUT /api/posts/ceate
//@access private
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(400);
    throw new Error("Post Not Found");
  }

  const user = await User.findById(req.user.id);

  //check for user
  if (!user) {
    res.status(401);
    throw new Error("user not found");
  }

  //make sure logged user match
  if (post.user.toString() !== user.id) {
    res.status(401);
    throw new Error("user not authorized");
  }

  await Post.deleteOne();
  res.status(200).json({ id: req.params.id });
});

//@desc post Likes
//@route PATCH /api/posts/like
//@access private

const likePost = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const post = await Post.findById(id);
    const isLiked = post.likes.has(userId);

    if (isLiked) {
      post.likes.delete(userId);
      console.log("Unliked post");
    } else {
      post.likes.set(userId, true);
      console.log("Liked post");
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    const {
      _id,
      user,
      author,
      authorImage,
      title,
      description,
      image,
      likes,
      comments,
    } = updatedPost;

    //auther image
    const getObjectParams = {
      Bucket: bucketName,
      Key: authorImage,
    };
    const command = new GetObjectCommand(getObjectParams);
    const authorUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

    //post image
    const getObjectParamsPost = {
      Bucket: bucketName,
      Key: image,
    };
    const commandPost = new GetObjectCommand(getObjectParamsPost);
    const postUrl = await getSignedUrl(s3, commandPost, {
      expiresIn: 3600,
    });

    const formattedPost = {
      _id,
      user,
      author,
      authorImage: authorUrl,
      title,
      description,
      image: postUrl,
      likes,
      comments,
    };

    res.status(200).json(formattedPost);
  } catch (error) {
    console.log(error);
  }
});

//comment post
const commentPost = asyncHandler(async (req, res) => {
  try {
    if (req.body.comment) {
      const { id } = req.params;
      const userId = req.user.id;
      const { firstName, lastName, avatar } = await User.findById(userId);
      const { comment } = req.body;

      const newComment = {
        userId,
        commentUser: `${firstName} ${lastName}`,
        comment,
        avatar,
      };

      const updatedPost = await Post.findByIdAndUpdate(
        id,
        { $push: { comments: newComment } },
        { new: true }
      );

      console.log(updatedPost);
      const {
        _id,
        user,
        author,
        authorImage,
        title,
        description,
        image,
        likes,  
        comments,
      } = updatedPost;

      //auther image
      const getObjectParams = {
        Bucket: bucketName,
        Key: authorImage,
      };
      const command = new GetObjectCommand(getObjectParams);
      const authorUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

      //post image
      const getObjectParamsPost = {
        Bucket: bucketName,
        Key: image,
      };
      const commandPost = new GetObjectCommand(getObjectParamsPost);
      const postUrl = await getSignedUrl(s3, commandPost, {
        expiresIn: 3600,
      });

      const formattedComments = await Promise.all(
        comments.map(async ({ userId, commentUser, comment, avatar }) => {
          //auther image
          const getObjectParams = {
            Bucket: bucketName,
            Key: avatar,
          };
          const command = new GetObjectCommand(getObjectParams);
          const commentAuthorUrl = await getSignedUrl(s3, command, {
            expiresIn: 3600,
          });

          return {
            userId,
            commentUser,
            comment,
            avatar: commentAuthorUrl,
          };
        })
      );

      console.log(formattedComments);
      const formattedPost = {
        _id,
        user,
        author,
        authorImage: authorUrl,
        title,
        description,
        image: postUrl,
        likes,
        comments: formattedComments,
      };

      res.status(200).json(formattedPost);
    } else {
      throw new Error("need all info");
    }
  } catch (error) {
    console.log(error);
  }
});

//Generate RND image name
const randomImageName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

module.exports = {
  getAllPosts,
  getUserPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  commentPost,
};
