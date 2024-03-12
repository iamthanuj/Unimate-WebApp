import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

function EditEventModal({ selectedEvent, onUpdate, onClose }) {
  const [editedEvent, setEditedEvent] = useState(selectedEvent || {});

  useEffect(() => {
    setEditedEvent(selectedEvent || {});
  }, [selectedEvent]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(editedEvent)
    // dispatch(updateEvent(editedEvent));
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className=" flex justify-center w-[400px] bg-white mx-auto rounded-xl p-5">
          <form className="pt-4 w-full" onSubmit={handleSubmit}>
            
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="title"
                value={editedEvent.title}
                id="floating_email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                onChange={handleInputChange}
              />
              <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Event Title
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <textarea
                type="text"
                name="description"
                value={editedEvent.description}
                id="floating_email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                onChange={handleInputChange}
              ></textarea>
              <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Description
              </label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="location"
                value={editedEvent.location}
                id="floating_email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                onChange={handleInputChange}
              />
              <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                location / Platform
              </label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
              </div>
              <input
                type="date"
                name="date"
                value={new Date(editedEvent.date).toLocaleDateString()}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Select date"
                onChange={handleInputChange}
              />
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-black"
              >
                Select event type
              </label>
              <select
                id="countries"
                name="type"
                onChange={handleInputChange}
                value={editedEvent.type}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="physical">Physical</option>
                <option value="online">Online</option>
              </select>
            </div>
            <div className="flex justify-between gap-1">
              <input
                type="submit"
                value="Update Event"
                className="bg-secendoryColor hover:bg-mainColor text-white px-2 py-2 rounded-md w-full cursor-pointer mt-5"
              />
              <button
              onClick={onClose}
              className="bg-red-600 hover:bg-red-800 text-white px-2 py-2 rounded-md w-full cursor-pointer mt-5">
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditEventModal;
