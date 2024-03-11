import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { reset } from "../../features/auth/authSlice";
import adminImage from "../../assets/admin.png";

function AvatarDropdown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const onLogout = () => {
    dispatch(reset())
    navigate("/")
  };

  return (
    <div className="relative">
      <button
        id="dropdownUserAvatarButton"
        data-dropdown-toggle="dropdownAvatar"
        className="flex items-center gap-2 text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        type="button"
        onClick={toggleDropdown}
      >
        <span className="sr-only">Open user menu</span>
        <img
          className="w-8 h-8 rounded-full"
          src={adminImage}
          alt="user photo"
        />
        <p className="text-[16px] text-white font-semibold mr-2 leading-none">
          Administrator
        </p>
      </button>

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <div
          id="dropdownAvatar"
          className="z-10 absolute mt-2 right-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
        >
          <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div>Admin</div>
            <div className="font-medium truncate">admin@unimate.com</div>
          </div>
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownUserAvatarButton"
          >
            <li>
              <Link
                to="/"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Events
              </Link>
            </li>
            <li>
              <Link
                to=""
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Users
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Earnings
              </a>
            </li>
          </ul>
          <div className="py-2">
            <button 
            onClick={onLogout}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AvatarDropdown;
