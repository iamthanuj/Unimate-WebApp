import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaRegImage } from "react-icons/fa6";
import { createPost, reset } from "../features/post/postSlice";
import { PuffLoader } from "react-spinners/";
import { toast } from "react-toastify";

function CreatePost() {
  const [postData, setPostData] = useState({
    title: "",
    description: "",
    image: null,
  });

  const { title, description, image } = postData;

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const onChange = (e) => {
    if (e.target.name === "image") {
      // Handle file input separately
      setPostData({ ...postData, image: e.target.files[0] });
    } else {
      setPostData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (title || description || image) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", image);

      dispatch(createPost(formData));
      setPostData({
        title: "",
        description: "",
        image: null,
      });
    } else {
      toast.error("Pleas add text or image");
    }
  };

  // if (isLoading) {
  //   return <PuffLoader color="#E81F03" size={60} className="mx-auto" />;
  // }

  return (
    <div className="bg-gray-50  shadow-md rounded-lg font-inter">
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
        <form className="" onSubmit={onSubmit}>
          <article className="flex flex-col text-wrap">
            <input
              type="text"
              placeholder="Post title"
              name="title"
              value={title}
              className="outline-none text-xl font-medium bg-transparent"
              onChange={onChange}
            />
            <input
              type="text"
              name="description"
              value={description}
              placeholder="What's happening today?"
              className="outline-none bg-transparent block w-full resize-y overflow-y-auto"
              onChange={onChange}
            />
          </article>
          <div className="mt-4 flex justify-end items-center">
            <label htmlFor="postImage" className="text-4xl mr-2 cursor-pointer">
              <FaRegImage className="text-secendoryColor" />
            </label>
            <input
              type="file"
              id="postImage"
              name="image"
              className="hidden"
              onChange={onChange}
            />
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