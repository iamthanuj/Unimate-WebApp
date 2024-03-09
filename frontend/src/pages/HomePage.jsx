import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Post from "../components/Post";
import CreatePost from "../components/CreatePost";
import FriendsList from "../components/FriendsList";
import EventsTab from "../components/EventsTab";
import { getAllPosts, postReset } from "../features/post/postSlice";
import { PropagateLoader } from "react-spinners/";


function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading } = useSelector((state) => state.auth);

  const { allPosts, isLoadingPost, isErrorPost, messagePost, posts } =
    useSelector((state) => state.post);

  useEffect(() => {
    if (!user || user === null) {
      navigate("/");
    }



    if (isErrorPost) {
      console.log(messagePost);
    }

    dispatch(getAllPosts());

    return () => {8
      dispatch(postReset());
    };
  }, [ navigate, isErrorPost, isLoading, messagePost, dispatch]);

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

  const reversedPosts = [...allPosts].reverse();

  return (
    <div className="font-inter">
      <NavBar></NavBar>
      <div className="container mx-auto">
        <div className="relative flex justify-center">
          <div className="absolute pt-[100px] left-0">
            <FriendsList />
          </div>
          <div className="absolute pt-[100px] right-0">
            <EventsTab/>  
          </div>
          <div className="pt-[100px] flex flex-col gap-14 ">
            <CreatePost />
            {reversedPosts.map((post) => (
              <Post key={post._id} allPostsDetails={post} /> // Use unique post ID as key
            ))}
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default HomePage;
