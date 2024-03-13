import React, { useEffect, useState } from "react";
import AdminNavBar from "../components/Admin/AdminNavBar";
import EditMentorModal from "../components/Admin/EditMentorModal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createMentor,
  deleteMentor,
  getMentors,
  mentorReset,
  updateMentor,
} from "../features/mentor/mentorSlice";
import { toast } from "react-toastify";
import { FcApproval } from "react-icons/fc";

function AdminMentorManage() {
  const [mentorData, setMentorData] = useState({
    name: "",
    email: "",
    expertise: "",
    description: "",
    availability: false,
    location: "",
    type: "physical",
  });

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);

  const { name, email, expertise, description, availability, location, type } =
    mentorData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    mentors,
    isErrorMentor,
    isSuccessMentor,
    isLoadingMentor,
    messageMentor,
  } = useSelector((state) => state.mentor);

  const { admin, adminSuccess } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isErrorMentor) {
      toast.error(messageMentor);
    }

    if (!adminSuccess || !admin) {
      navigate("/admin");
    }

    dispatch(getMentors());
  }, [dispatch, isErrorMentor, messageMentor, isSuccessMentor]);


  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMentorData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(createMentor(mentorData));
    dispatch(mentorReset());

    if(isSuccessMentor){
      toast.success("Mentor Added Successfully")
    }

    setMentorData({
      name: "",
      email: "",
      expertise: "",
      description: "",
      availability: false,
      location: "",
      type: "physical",
    })
  };

  // Function to open modal and set selected event
  const handleEditClick = (mentor, type) => {
    console.log(type);
    if (type === "edit") {
      setEditModalOpen(true);
      setDeleteModalOpen(false);
    }

    if (type === "delete") {
      setDeleteModalOpen(true);
      setEditModalOpen(false);
    }
    setSelectedMentor(mentor);
  };

  // Function to close modal
  const handleCloseModal = () => {
    setEditModalOpen(false);
    setDeleteModalOpen(false);
    setSelectedMentor(null);
  };

  const handleUpdateMentor = async (updatedMentorData) => {
    const mentorData = {
      _id: selectedMentor._id,
      updatedMentorData,
    };
    dispatch(updateMentor(mentorData));
    setEditModalOpen(false);
    toast.success("Mentor Successfully Updated");
  };

  const handleDeleteMentor = async () => {
    const mentorId = selectedMentor._id;
    dispatch(deleteMentor(mentorId));
    setDeleteModalOpen(false);
    if (isSuccessMentor) {
      toast.success("Mentor Successfully Deleted");
    }
  };

  return (
    <div className="relative bg-secendoryColor font-inter">
      <AdminNavBar />
      <div className="container mx-auto pt-[100px]">
        <h1 className="text-center text-3xl font-semibold text-white mb-5">
          Mentors
        </h1>

        {/* create mentor */}
        <div className=" flex justify-center w-[400px] bg-white mx-auto rounded-xl p-5">
          <form className="pt-4 w-full" onSubmit={onSubmit}>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="name"
                value={name}
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
                Name
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="email"
                name="email"
                value={email}
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
                Email
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="expertise"
                value={expertise}
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
                Expertise
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <textarea
                type="text"
                name="description"
                value={description}
                id="floating_email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                onChange={onChange}
              ></textarea>
              <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Description
              </label>
            </div>

            <div className="flex items-center mb-4">
              <input
                id="default-checkbox"
                type="checkbox"
                name="availability"
                onChange={onChange}
                checked={availability}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="default-checkbox"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Availability
              </label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="location"
                value={location}
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
                location / Platform
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-black"
              >
                Available Mode
              </label>
              <select
                id="countries"
                name="type"
                onChange={onChange} // Add this line
                value={type}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="physical">Physical</option>
                <option value="online">Online</option>
              </select>
            </div>
            <input
              type="submit"
              value="Add Mentor"
              className="bg-secendoryColor hover:bg-mainColor text-white px-2 py-2 rounded-md w-full cursor-pointer mt-5"
            />
          </form>
        </div>

        {/* display events list */}
        <div className="">
          <h1 className="text-white font-semibold flex items-center">
            Active Mentors{" "}
            <span>
              <FcApproval />
            </span>
          </h1>
          <div>
            <div>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Mentor Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Location
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {mentors.map((mentor) => {
                      return (
                        <tr
                          key={mentor._id}
                          className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {mentor.name}
                          </th>
                          <td className="px-6 py-4">{mentor.email}</td>
                          <td className="px-6 py-4">{mentor.location}</td>
                          <td className="px-6 py-4">
                            {new Date(mentor.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 flex gap-2">
                            <button
                              onClick={() => handleEditClick(mentor, "edit")}
                              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleEditClick(mentor, "delete")}
                              className="font-medium text-red-600 hover:underline"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit popup modal */}
      {editModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
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
              <EditMentorModal
                selectedMentor={selectedMentor}
                onUpdate={handleUpdateMentor}
                onDelete={handleDeleteMentor}
                onClose={handleCloseModal}
              />
            </div>
          </div>
        </div>
      )}

      {/* delete popup modal */}
      {deleteModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
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
            <div className="inline-block align-bottom  rounded-lg text-left overflow-hidden  transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div>
                <div className="relative p-4 w-full max-w-md max-h-full">
                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button
                      onClick={handleCloseModal}
                      type="button"
                      className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      data-modal-hide="popup-modal"
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-4 md:p-5 text-center">
                      <svg
                        className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                      <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Are you sure you want to delete this Event?
                      </h3>
                      <button
                        onClick={handleDeleteMentor}
                        data-modal-hide="popup-modal"
                        type="button"
                        className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                      >
                        Yes, I'm sure
                      </button>
                      <button
                        onClick={handleCloseModal}
                        data-modal-hide="popup-modal"
                        type="button"
                        className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      >
                        No, cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminMentorManage;
