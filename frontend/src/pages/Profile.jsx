import React from "react";
import pofileBG from "../assets/design/profileBG.png";
import NavBar from "../components/NavBar";
import { useSelector, useDispatch } from "react-redux";

function Profile() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <NavBar></NavBar>
      {/* Top content */}
      <div className="container mx-auto sm pt-[100px] font-inter">
        <div className=" rounded-2xl overflow-hidden h-[200px]">
          <img src={pofileBG} alt="cover photo" className="h-full w-full object-cover" />
        </div>
        <div className="flex justify-between relative ">
          <div>
            <div className="w-[180px] h-[180px] rounded-full overflow-hidden absolute -top-[110px] left-8 border-4 border-white">
              <img src={user.avatar} alt="" />
            </div>
            <div className="ml-[95%] w-full mt-3">
              <p className="text-xl font-bold">Thanuja Fernando</p>
              <p>thanujadfernando@gmail.com</p>
            </div>
          </div>
          <div className="flex items-center">
            <button className="bg-secendoryColor p-3 rounded-lg text-white">Edit Profile</button>
          </div>
        </div>
      </div>

      {/* bot content */}
      <div>
        <div>
          <h1>General Information</h1>
          <div>
            <p>Name</p>
            <p>Thanuja Fernando</p>
          </div>
          <div>
            <p>University</p>
            <p>ICBT Campus</p>
          </div>
        </div>
        <div>
          <h1>Contact Details</h1>
          <div>
            <p>Email</p>
            <p>thanujadfernando@gmail.com</p>
          </div>
          <div>
            <p>Phone Number</p>
            <p>0767596551</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
