import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { Link } from "react-router-dom";
import NavBarModal from "./NavBarModal";


function UserAvatar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tabType, settabType] = useState("");


  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };


  const setTab = (type)=>{
    settabType(type);
    setIsModalOpen(true);
  }

  const closeModal = ()=>{
    setIsModalOpen(false);
  }


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };



  if (!user) {
    return null;
  } else {
    return (
      <div className="relative">
        <button
          id="dropdownAvatarNameButton"
          data-dropdown-toggle="dropdownAvatarName"
          className="flex items-center text-sm pe-1 font-medium text-gray-900 rounded-full hover:bg-blue-950 md:me-0 focus:ring-4 focus:bg-blue-950 dark:focus:ring-gray-700 dark:text-white"
          type="button"
          onClick={toggleDropdown}
        >
          <span className="sr-only">Open user menu</span>
          <img
            className="w-10 h-10 me-2 rounded-full object-cover"
            src={user.avatar}
            alt="user photo"
          />
          <p className="hidden md:block text-[16px]">{user.name}</p>
          <svg
            className="w-2.5 h-2.5 ms-3 mr-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>

        {/* Dropdown menu */}
        {isDropdownOpen && (
          <motion.div
            initial={{
              y: -10,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            id="dropdownAvatarName"
            className="right-0 z-10 absolute top-12 m-auto md:left-0 md:right-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-blue-950 dark:divide-gray-600"
          >
            <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
              <div className="font-medium">Student</div>
              <div className="truncate">{user.email}</div>
            </div>
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownAvatarNameButton"
            >
              <li>
                <Link
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  to="/profile"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/helps"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Helps
                </Link>
              </li>
              <li className="block md:hidden">
                <button
                  // onClick={()=>{setTab("friends")}}
                  className="flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Friends
                </button>
              </li>
              <li className="block md:hidden">
                <button
                onClick={()=>{setTab("mentors")}}
                  className="flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Mentors
                </button>
              </li>
              <li className="block md:hidden">
                <button
                  onClick={()=>{setTab("events")}}
                  className="flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Events
                </button>
              </li>
            </ul>
            <div className="py-2">
              <button
                onClick={() => {
                  onLogout();
                }}
                className="block w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Sign out
              </button>
            </div>
            {isModalOpen && (<NavBarModal  closeModal={closeModal} tabType = {tabType} />)}
          </motion.div>
        )}
      </div>
    );
  }
}

export default UserAvatar;
