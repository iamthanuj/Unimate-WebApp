import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Post from "../components/Post";
import CreatePost from "../components/CreatePost";
import { toast } from "react-toastify";
import { getAllPosts, reset } from "../features/post/postSlice";

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const { allPosts, isLoading, isError, message } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (!user) {
      navigate("/");
    }

    dispatch(getAllPosts())


  },[user, navigate, isError, message, dispatch]);


  return (
    <div>
      <NavBar></NavBar>
      <div className="flex justify-center">
        <div className="pt-[100px] flex flex-col gap-14 ">
          <CreatePost />
          <Post />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
