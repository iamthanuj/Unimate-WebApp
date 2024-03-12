import React from "react";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { reset } from "../features/auth/authSlice";
import AdminNavBar from "../components/Admin/AdminNavBar";
import adminEvents from "../assets/admin/adminEvents.png";
import adminPosts from "../assets/admin/adminPosts.png";
import adminUsers from "../assets/admin/adminUsers.png";

function AdminHomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { admin, adminSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (!adminSuccess || !admin) {
      navigate("/");
    }

    dispatch(reset());
  }, [admin, isError, adminSuccess, message, dispatch]);

  return (
    <div className="font-inter bg-gray-700 h-screen">
      <AdminNavBar />
      <div className="container mx-auto pt-[150px]">
        <div className="flex justify-center mb-10">
          <h1 className="text-white text-3xl font-semibold">
            Admin Control Panel
          </h1>
        </div>
        <div className="flex justify-center gap-5">
          <Link
            to="/events"
            class="w-[33%] relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            <span class="w-[100%] h-[400px] flex flex-col justify-center items-center relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              <p className="text-3xl">Manage Events</p>
              <img
                className="h-[200px] w-[200px]"
                src={adminEvents}
                alt="eventsImage"
              />
            </span>
          </Link>
          <Link
            to="/postmanage"
            class="w-[33%] relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
          >
            <span class="w-[100%] h-[400px] flex flex-col justify-center items-center  relative px-5 pyw-[100%]-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              <p className="text-3xl">Manage Post</p>
              <img
                className="h-[200px] w-[200px]"
                src={adminPosts}
                alt="eventsImage"
              />
            </span>
          </Link>
          <Link
          to="/usermanage"
          class="w-[33%] relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
            <span class="w-[100%] h-[400px] flex flex-col justify-center items-center  relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              <p className="text-3xl">Manage Users</p>
              <img
                className="h-[200px] w-[200px]"
                src={adminUsers}
                alt="eventsImage"
              />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminHomePage;
