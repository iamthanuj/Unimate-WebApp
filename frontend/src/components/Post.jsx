import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { likePost, commentPost } from "../features/post/postSlice";
import { addFriend } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import CommentComp from "./CommentComp";
import { IoPersonAddSharp, IoPersonRemoveSharp } from "react-icons/io5";
import {
  BiLike,
  BiSolidLike,
  BiCommentDetail,
  BiSolidSend,
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

  const postUser = allPostsDetails.user;

  const [commentToggle, setCommentToggle] = useState(false);
  const [comment, setComment] = useState("");

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

  const handleComment = async (e) => {
    e.preventDefault();

    if (!comment) {
      toast.error("Enter comment!");
    } else {
      const commentData = {
        comment,
        _id,
      };

      dispatch(commentPost(commentData));
      setComment("");
    }
  };

  const handleAddFriend = ()=>{

    const friendData = {
      friendId : postUser,
    }

    dispatch(addFriend(friendData))
  }


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
              <p className="text-sm text-gray-600">Student</p>
            </div>
          </div>
          {/* Follow or remove buttons */}
          {postUser === user._id ? (
            <button className="flex justify-center items-center gap-1 text-gray-600 px-2 rounded-md bg-gray-200 hover:bg-gray-300 focus:outline-none focus:bg-gray-100">
              Delete <IoPersonRemoveSharp />
            </button>
          ) : (
            <button 
            onClick={handleAddFriend}
            className="flex justify-center items-center gap-1 text-gray-600 px-2 rounded-md bg-gray-200 hover:bg-gray-300 focus:outline-none focus:bg-gray-100">
              Follow <IoPersonAddSharp />
            </button>
          )}
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
          <div className="bg-gray-50 rounded-md p-2 flex flex-col gap-4">
            {comments.map((comItem) => (
              <CommentComp key={comItem._id} commentData={comItem} />
            ))}
          </div>

          {/* add comment */}
          <form
            onSubmit={handleComment}
            className="flex justify-between items-center gap-3"
          >
            <textarea
              type="text"
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
              placeholder="Your Comment"
              className="w-full border-secendoryColor resize-none outline-secendoryColor p-2"
            ></textarea>
            <div className="flex items-center gap-1 shadow-md px-4 py-2 rounded-md h-fit cursor-pointer bg-secendoryColor hover:bg-mainColor">
              <input
                type="submit"
                value="Add"
                className="cursor-pointer text-white"
              />
              <BiSolidSend className="text-white text-xl " />
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
