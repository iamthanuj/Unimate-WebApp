import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Post from "../components/Post";
import CreatePost from "../components/CreatePost";
import { toast } from "react-toastify";
import { getAllPosts, postReset } from "../features/post/postSlice";

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const { allPosts, isErrorPost, messagePost } =
    useSelector((state) => state.post);

  useEffect(() => {
    if (isErrorPost) {
      console.log(messagePost)
    }

    if (!user) {
      navigate('/');
    }

    dispatch(getAllPosts());

    return()=>{
      dispatch(postReset())
    }

  }, [user, navigate, isErrorPost, , messagePost, dispatch]);

  return (
    <div>
      <NavBar></NavBar>
      <div className="flex justify-center">
        <div className="pt-[100px] flex flex-col gap-14 ">
          <CreatePost />
          {allPosts.map((post) => (
            <Post key={post.id} allPostsDetails={post} /> // Use unique post ID as key
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
