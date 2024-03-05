import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { likePost } from "../features/post/postSlice";

import {
  BiLike,
  BiSolidLike,
  BiCommentDetail,
  BiShare,
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


  

  const dispatch = useDispatch();
  const { updatedPost } = useSelector((state) => state.post);
  const {user} = useSelector((state)=>state.auth);


  const isLiked = Boolean(likes[user._id]);
  const likeCount = Object.keys(likes).length;

  const handleLike = () => {
    dispatch(likePost(_id))
      // .then((response) => {
      //   // Optionally dispatch toggleLike action here if needed
      //   dispatch(toggleLike(_id));
      // })
      // .catch((error) => {
      //   console.error('Error liking post:', error);
      // });
  };
 

  return (
    <div className="max-w-md bg-blue-50 rounded-lg overflow-hidden shadow-md font-inter">
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
          <button onClick={handleLike} className="flex items-center text-gray-600 hover:bg-gray-300 px-3 py-1 rounded-md">
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
        <button className="flex items-center text-gray-600 hover:bg-gray-300 px-3 py-1 rounded-md">
          <BiCommentDetail className="mr-2" />
          Comment
        </button>
      </div>
    </div>
  );
}

export default Post;
