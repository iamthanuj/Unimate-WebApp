import React from "react";
import { useSelector, useDispatch } from "react-redux";

function CreatePost() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  return (
    <div className="bg-white  shadow-md rounded-lg font-inter">
      <div className="flex items-center p-4 border-b border-gray-200">
        <img
          className="w-10 h-10 rounded-full mr-4 object-cover"
          src={user.avatar}
          alt="Profile picture"
        />
        <div>
          <h5 className="text-sm font-medium text-gray-900">{user.name}</h5>
          <span className="text-xs text-gray-500">{"@" + user.university}</span>
        </div>
      </div>
      <div className="p-4">
        <form className="">
          <article className="flex flex-col text-wrap">
            <input
              type="text"
              placeholder="Post title"
              className="outline-none text-xl font-medium"
            />
            <input
              type="text"
              placeholder="What's happening today?"
              className="outline-none block w-full resize-y overflow-y-auto"
            />
          </article>
          <div className="mt-4 flex justify-end">
            <input type="file" />
            <input
              type="submit"
              value="Post"
              className="px-4 py-2 text-sm font-medium text-white bg-secendoryColor rounded-lg cursor-pointer hover:bg-mainColor focus:outline-none focus:ring-2 focus:ring-offset-2"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
