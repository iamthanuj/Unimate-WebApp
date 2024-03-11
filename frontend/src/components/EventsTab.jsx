import React from "react";
import drake from "../assets/drake.jpg";
import { IoCalendarNumberSharp } from "react-icons/io5";

function EventsTab() {
  return (
    <div className="bg-blue-50 w-[400px] h-[500px]  rounded-lg overflow-hidden">
      <div className=" bg-gradient-to-r from-mainColor to-secendoryColor text-white text-center">
        <p className="flex justify-center items-center gap-1 py-2">
          <IoCalendarNumberSharp /> Events
        </p>
        
      </div>
      <div>
      
      </div>
    </div>
  );
}

export default EventsTab;
