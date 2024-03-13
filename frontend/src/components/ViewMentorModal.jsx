import React from "react";

function ViewMentorModal({ selectedMentor, onClose }) {
  return (
    <div className="modal">
  <div className="modal-content">
    <div className="flex justify-center w-[400px] bg-white mx-auto rounded-xl p-5 shadow-lg">
      <div className="pt-4 w-full">
        <p className="text-lg font-semibold text-gray-800 mb-4">Mentor Details</p>
        
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-600">Mentor Name:</p>
          <p className="text-lg text-gray-800">{selectedMentor.name}</p>
        </div>

        <div className="mb-4">
          <p className="text-sm font-medium text-gray-600">Email:</p>
          <p className="text-lg text-gray-800">{selectedMentor.email}</p>
        </div>

        <div className="mb-4">
          <p className="text-sm font-medium text-gray-600">Location / Platform:</p>
          <p className="text-lg text-gray-800">{selectedMentor.location}</p>
        </div>

        <div className="mb-4">
          <p className="text-sm font-medium text-gray-600">Expertise:</p>
          <p className="text-lg text-gray-800">{selectedMentor.expertise}</p>
        </div>

        <div className="mb-4">
          <p className="text-sm font-medium text-gray-600">Description:</p>
          <p className="text-lg text-gray-800">{selectedMentor.description}</p>
        </div>

        <div className="flex justify-center mt-5">
          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded-md cursor-pointer focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
  );
}

export default ViewMentorModal;
