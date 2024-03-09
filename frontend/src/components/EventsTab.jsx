import React from "react";
import drake from "../assets/drake.jpg";
import { IoCalendarNumberSharp } from "react-icons/io5";

function EventsTab() {
  return (
    <div className="bg-blue-50 w-[400px] h-[500px]  rounded-lg overflow-hidden">
      <div className=" bg-gradient-to-r from-mainColor to-secendoryColor text-white text-center">
        <p className="flex justify-center items-center gap-1 py-2">
          <IoCalendarNumberSharp /> Events{" "}
          <img
            className="h-[20px] w-[20px]"
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Telegram-Animated-Emojis/main/Animals%20and%20Nature/Fire.webp"
            alt=""
          />{" "}
        </p>
      </div>
      <div>

      </div>
    </div>
  );
}

export default EventsTab;
