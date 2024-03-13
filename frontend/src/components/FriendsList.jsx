import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addRemoveFriend } from "../features/auth/authSlice";
import { FaUserGraduate } from "react-icons/fa6";
import { RiUserUnfollowFill } from "react-icons/ri";

function FriendsList() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  


  const handleAddFriend = (fid) => {
    const friendData = {
      friendId: fid,
    };

    dispatch(addRemoveFriend(friendData));
  };

  if (!user) {
    return null;
  } else {

    const { friends } = user;

    return (
      <div className="bg-blue-50 w-[400px] h-[400px] fixed rounded-lg overflow-hidden shadow-lg">
        <div className=" bg-gradient-to-r from-mainColor to-secendoryColor text-white text-center">
          <p className="flex justify-center items-center gap-1 py-2">
            <FaUserGraduate /> Followers
            <img
              className="h-[20px] w-[20px]"
              src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Telegram-Animated-Emojis/main/Animals%20and%20Nature/Fire.webp"
              alt=""
            />
          </p>
        </div>
        <div>
          {!friends ? (
            <p className=" text-center mt-3">No Followes</p>
          ) : (
            <div className="divide-y h-[500px] divide-solid divide-gray-200 overflow-y-scroll">
              {/* Friend Item */}

              {friends.map((friend) => (
                <div className="flex justify-between items-center p-2">
                  <div className="flex gap-2">
                    <div className="h-[40px] w-[40px] overflow-hidden rounded-full">
                      <img src={friend.avatar} alt="" />
                    </div>
                    <div className="flex flex-col justify-center ">
                      <p className="font-semibold ">
                        {friend.firstName + " " + friend.lastName}
                      </p>
                      <p className="text-gray-400 text-[14px] leading-none ">
                        {friend.university}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => {
                        handleAddFriend(friend._id);
                      }}
                      className=" bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md"
                    >
                      <RiUserUnfollowFill className="text-gray-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default FriendsList;
