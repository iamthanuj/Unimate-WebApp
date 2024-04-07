import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { addRemoveFriend } from "../features/auth/authSlice";
import { getMentors } from "../features/mentor/mentorSlice";
import { BsPersonSquare } from "react-icons/bs";
import { FcBusinessman } from "react-icons/fc";
import ViewMentorModal from "./ViewMentorModal";

function MentorsTab({tabType}) {
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { mentors } = useSelector((state) => state.mentor);



  useEffect(() => {
    dispatch(getMentors());
  }, [dispatch]);

  // Function to open modal and set selected event
  const handleViewClick = (mentor) => {
    console.log(mentor);
    setViewModalOpen(true);
    setSelectedMentor(mentor);
  };


  const handleOnClose = ()=>{
    setViewModalOpen(false);
  }



  if (!user) {
    return null;
  } else {
    return (
      <div className={tabType ? "block bg-blue-50 w-[400px] h-[300px] fixed rounded-lg overflow-hidden shadow-lg" : "hidden xl:block bg-blue-50 w-[400px] h-[300px] fixed rounded-lg overflow-hidden shadow-lg"}>
        <div className="bg-gradient-to-r from-mainColor to-secendoryColor text-white text-center">
          <p className="flex justify-center items-center gap-1 py-2">
            <BsPersonSquare /> Mentors
          </p>
        </div>
        <div>
          {!mentors ? (
            <p className="text-center mt-3">No Mentors</p>
          ) : (
            <div className="divide-y h-[500px] divide-solid divide-gray-200 overflow-y-scroll">
              {/* Mentor Item */}
              {mentors.map((mentor) => (
                <div
                  className="flex justify-between items-center p-2"
                  key={mentor._id}
                >
                  <div className="flex gap-2">
                    <div className="h-[40px] w-[40px] overflow-hidden rounded-full">
                      <FcBusinessman size="40px" />
                    </div>
                    <div className="flex flex-col justify-center ">
                      <p className="font-semibold ">{mentor.name}</p>
                      <p className="text-gray-400 text-[14px] leading-none ">
                        {mentor.expertise}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => {
                        handleViewClick(mentor); 
                      }}
                      className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* view mentors */}
        {viewModalOpen &&( <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <ViewMentorModal
                selectedMentor={selectedMentor}
                onClose={handleOnClose}
              />
            </div>
          </div>
        </div>)}
        
      </div>
    );
  }
}

export default MentorsTab;
