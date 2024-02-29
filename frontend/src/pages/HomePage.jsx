import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Post from "../components/Post";
import CreatePost from "../components/CreatePost";

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    navigate("/");
  } else {
    return (
      <div>
        <NavBar></NavBar>
        <div className="flex justify-center">
          <div className="pt-[100px] flex flex-col gap-14 ">
            <CreatePost/>
            <Post />
            <Post />
            <Post />
            <Post />
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
