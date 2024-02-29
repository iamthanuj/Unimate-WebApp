import React from "react";
import { BiLike,BiSolidLike,BiCommentDetail , BiShare, BiDotsVerticalRounded   } from "react-icons/bi";

function Post() {
  return (
    <div className="max-w-md bg-white rounded-lg overflow-hidden shadow-md font-inter">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              className="w-12 h-12 rounded-full"
              src="https://bit.ly/sage-adebayo"
              alt="Segun Adebayo"
            />
            <div>
              <p className="text-lg font-semibold text-gray-800">
                Segun Adebayo
              </p>
              <p className="text-sm text-gray-600">Creator, Chakra UI</p>
            </div>
          </div>
          <button className="text-gray-600 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:bg-gray-100">
            <BiDotsVerticalRounded/>
          </button>
        </div>
      </div>
      <div className="p-4">
        <p className="text-gray-700">
          With Chakra UI, I wanted to sync the speed of development with the
          speed of design. I wanted the developer to be just as excited as the
          designer to create a screen.
        </p>
      </div>
      <img
        className="w-full h-64 object-cover"
        src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        alt="Chakra UI"
      />
      <div className="p-4 flex justify-between">
        <button className="flex items-center text-gray-600 hover:bg-gray-300 px-3 py-1 rounded-md">
          <BiLike  className="mr-2"/>
          Like
        </button>
        <button className="flex items-center text-gray-600 hover:bg-gray-300 px-3 py-1 rounded-md">
          <BiCommentDetail className="mr-2" />
          Comment
        </button>
        <button className="flex items-center text-gray-600 hover:bg-gray-300 px-3 py-1 rounded-md">
          <BiShare className="mr-2" />
          Share
        </button>
      </div>
    </div>
  );
}

export default Post;
