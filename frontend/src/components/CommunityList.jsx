import React from "react";
import { useSelector, useDispatch } from "react-redux";
// import { joinLeaveCommunity } from "../features/auth/authSlice";
import { FaUsers } from "react-icons/fa";
import { RiUserAddFill } from "react-icons/ri";

function CommunityList() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const handleJoinLeaveCommunity = (communityId) => {
    const communityData = {
      communityId: communityId,
    };

    dispatch(joinLeaveCommunity(communityData));
  };

  if (!user) {
    return null;
  } else {
    const { communities } = user;

    return (
      <div className="bg-blue-50 w-[400px] h-[300px]  rounded-lg overflow-hidden shadow-lg">
        <div className=" bg-gradient-to-r from-mainColor to-secendoryColor text-white text-center">
          <p className="flex justify-center items-center gap-1 py-2">
            <FaUsers /> Communities
          </p>
        </div>
        <div>
          {!communities ? (
            <p className=" text-center mt-3">No Communities Joined</p>
          ) : (
            <div className="divide-y h-[500px] divide-solid divide-gray-200 overflow-y-scroll">
              {communities.map((community) => (
                <div className="flex justify-between items-center p-2" key={community._id}>
                  <div className="flex gap-2">
                    {/* Community Avatar */}
                    <div className="h-[40px] w-[40px] overflow-hidden rounded-full">
                      <img src={community.avatar} alt="" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="font-semibold">{community.name}</p>
                      <p className="text-gray-400 text-[14px] leading-none">
                        {community.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => {
                        handleJoinLeaveCommunity(community._id);
                      }}
                      className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md"
                    >
                      <RiUserAddFill className="text-gray-600" />
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

export default CommunityList;
