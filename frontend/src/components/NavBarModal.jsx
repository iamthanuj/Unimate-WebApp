import React from "react";
// import FriendsList from "./FriendsList";
import MentorsTab from "./MentorsTab";
import EventsTab from "./EventsTab";

function NavBarModal({ closeModal, tabType }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className=" p-6 rounded-lg w-96 h-[300px]">
        <button
          onClick={() => {
            closeModal();
          }}
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
        <div>{tabType === "mentors" ? (<MentorsTab tabType ={tabType} />) : (<EventsTab tabType ={tabType}/>)}</div>
        {/* <div>
            <MentorsTab tabType ={tabType} />
        </div> */}
      </div>
    </div>
  );
}

export default NavBarModal;
