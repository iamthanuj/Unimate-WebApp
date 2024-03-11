import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminLogin, reset } from "../features/auth/authSlice";
import ColorLogo from "../assets/colorLogo.png";

function AdminLogin() {
  const [adminData, setAdminData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = adminData;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { admin, adminSuccess , isError, message } = useSelector((state) => state.auth);

  const onChange = (e) => {
    setAdminData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const adminData = {
      username,
      password,
    };

    dispatch(adminLogin(adminData));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (adminSuccess || admin) {
      navigate("/adminpanel")
    }

    dispatch(reset());
  }, [admin, isError, adminSuccess, message, dispatch]);

  return (
    <div className="font-inter">
      <div className="bg-landing-bg h-screen flex justify-center items-center">
        <div>
          <div className="bg-white rounded-lg p-9 flex flex-col justify-center items-center gap-2">
            <div className="mb-3">
              <img
                src={ColorLogo}
                alt="logo-image"
                className="w-72 mx-auto mb-3"
              />
              <p className="text-center font-bold text-xl">Admin</p>
            </div>
            <div>
              <form className="max-w-md mx-auto font-inter" onSubmit={onSubmit}>
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="email"
                    name="username"
                    value={username}
                    id="floating_email"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    onChange={onChange}
                  />
                  <label
                    htmlFor="floating_email"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Username
                  </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="password"
                    name="password"
                    value={password}
                    id="floating_password"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    onChange={onChange}
                  />
                  <label
                    htmlFor="floating_password"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Password
                  </label>
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="text-white bg-mainColor hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
