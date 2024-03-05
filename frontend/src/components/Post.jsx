import React, {  useState } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { likePost } from "../features/post/postSlice";

import {
  BiLike,
  BiSolidLike,
  BiCommentDetail,
  BiSolidSend ,
  BiDotsVerticalRounded,
} from "react-icons/bi";

function Post({ allPostsDetails }) {
  const {
    _id,
    author,
    authorImage,
    comments,
    description,
    image,
    likes,
    title,
  } = allPostsDetails;

  const [commentToggle, setCommentToggle] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const isLiked = Boolean(likes[user._id]);
  const likeCount = Object.keys(likes).length;

  const handleLike = () => {
    dispatch(likePost(_id));
  };

  const onComment = () => {
    setCommentToggle(!commentToggle);
  };

  return (
    <motion.div
      initial={{}}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        delay: 0.5,
      }}
      className="max-w-md bg-blue-50 rounded-lg overflow-hidden shadow-md font-inter"
    >
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              className="w-12 h-12 rounded-full object-cover"
              src={authorImage}
              alt={author}
            />
            <div>
              <p className="text-lg font-semibold text-gray-800">{author}</p>
              <p className="text-sm text-gray-600">Creator, Chakra UI</p>
            </div>
          </div>
          <button className="text-gray-600 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:bg-gray-100">
            <BiDotsVerticalRounded />
          </button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold pb-1">{title}</h3>
        <p className="text-gray-700">
          {/* description */}
          {description}
        </p>
      </div>
      <img className="w-full h-64 object-cover" src={image} alt="post image" />
      <div className="p-4 flex justify-between">
        {isLiked ? (
          <button
            onClick={handleLike}
            className="flex items-center text-gray-600 hover:bg-gray-300 px-3 py-1 rounded-md"
          >
            <BiSolidLike className="mr-2 text-secendoryColor" />
            Liked <span className="ml-1">{likeCount}</span>
          </button>
        ) : (
          <button
            onClick={handleLike}
            className="flex items-center text-gray-600 hover:bg-gray-300 px-3 py-1 rounded-md"
          >
            <BiLike className="mr-2" />
            Like <span className="ml-1">{likeCount}</span>
          </button>
        )}
        <button
          onClick={onComment}
          className="flex items-center text-gray-600 hover:bg-gray-300 px-3 py-1 rounded-md"
        >
          <BiCommentDetail className="mr-2" />
          Comment
        </button>
      </div>
      {commentToggle ? (
        <motion.div
          initial={{
            y: -50,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{}}
          className=" bg-white rounded-sm shadow-md mt-2 p-4"
        >
          {/* all commments */}
          <div></div>

          {/* add comment */}
          <form className="flex justify-between items-center gap-3">
            <textarea type="text" placeholder="Your Comment" className="w-full border-secendoryColor resize-none outline-secendoryColor p-2" ></textarea>
            <div className="flex items-center gap-1 shadow-md px-4 py-2 rounded-md h-fit cursor-pointer bg-secendoryColor hover:bg-mainColor">
              <input type="submit" value="Add" className="cursor-pointer text-white" />
              <BiSolidSend className="text-white text-xl "/>
            </div>
          </form>
        </motion.div>
      ) : (
        ""
      )}
    </motion.div>
  );
}

export default Post;
