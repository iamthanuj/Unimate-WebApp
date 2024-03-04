import React, { useEffect } from "react";
import pofileBG from "../assets/design/profileBG.png";
import NavBar from "../components/NavBar";
import Post from "../components/Post";
import { useSelector, useDispatch } from "react-redux";
import { getPosts, postReset } from "../features/post/postSlice";
import { toast } from "react-toastify";
import { PropagateLoader } from "react-spinners/";

function Profile() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { posts, isLoadingPost, isErrorPost, messagePost } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
    dispatch(getPosts());

    if (isErrorPost) {
      toast.error(messagePost);
    }
  }, [dispatch]);

  if (isLoadingPost) {
    return (
      <div className="flex justify-center items-center h-screen">
        <PropagateLoader
          color="rgb(93, 127, 254)"
          size={18}
          className="mx-auto my-auto"
        />
      </div>
    );
  }

  const reversedPosts = [...posts].reverse();

  return (
    <>
      <NavBar></NavBar>
      <div className="w-full mx-auto  font-inter">
        {/* Top content */}
        <div className="container mx-auto sm pt-[100px]  flex flex-col gap-3">
          <div className=" rounded-2xl overflow-hidden h-[300px]">
            <img
              src={pofileBG}
              alt="cover photo"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex justify-between relative z-0 ">
            <div className="flex">
              <div className="w-[380px]">

              </div>
              <div className="w-[180px] h-[180px] rounded-full overflow-hidden absolute -top-[110px] left-8 border-4 border-white">
                <img src={user.avatar} alt="" />
              </div>
              <div className=" w-full flex flex-col justify-center ">
                <p className="text-xl font-bold"> {user.name} </p>
                <p>{user.university}</p>
              </div>
            </div>
            <div className="flex items-center">
              <button className="bg-secendoryColor p-3 rounded-lg text-white">
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* bot content */}
        <div className="container mt-3 mx-auto flex justify-end gap-6">
          <div className="bg-blue-50 p-2 rounded-lg w-[300px]">
            <h1 className="text-xl font-bold text-gray-500">
              General Information
            </h1>
            <div className="flex justify-between">
              <p className="font-bold">Name</p>
              <p>{user.name}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-bold">University</p>
              <p>{user.university}</p>
            </div>
          </div>
          <div className="bg-blue-50 p-2 rounded-lg w-[300px] ">
            <h1 className="text-xl font-bold text-gray-500">Contact Details</h1>
            <div className="flex justify-between">
              <p className="font-bold">Email</p>
              <p>thanujadfernando@gmail.com</p>
            </div>
            <div className="flex justify-between">
              <p className="font-bold">Phone</p>
              <p>0767596551</p>
            </div>
          </div>
        </div>
      </div>

      {/* user posts */}
      <div className="flex flex-col items-center gap-7 mt-8">
        {reversedPosts.map((userPost) => (
          <Post key={userPost._id} allPostsDetails={userPost} /> // Use unique post ID as key
        ))}
      </div>
    </>
  );
}

export default Profile;
