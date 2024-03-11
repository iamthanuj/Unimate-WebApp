import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEvents, eventReset } from "../features/event/eventSlice";
import { IoCalendarNumberSharp, IoLocationSharp } from "react-icons/io5";
import { FcCalendar } from "react-icons/fc";

function EventsTab() {
  const dispatch = useDispatch();
  const { events, isErrorEvent, isSuccessEvent, isLoadingEvent, messageEvent } =
    useSelector((state) => state.event);

  useEffect(() => {
    if (isErrorEvent) {
      toast.error(messageEvent);
    }

    dispatch(getEvents());
  }, [dispatch, isErrorEvent, messageEvent]);

  return (
    <div className="bg-blue-50 w-[400px] h-[500px]  rounded-lg overflow-hidden ">
      <div className=" bg-gradient-to-r from-mainColor to-secendoryColor text-white text-center">
        <p className="flex justify-center items-center gap-1 py-2">
          <IoCalendarNumberSharp /> Events
        </p>
      </div>
      <div>
        <ul>
          {events.map((event) => {
            return (
              <li className="p-2 h-[75px]">
                <div className="flex items-center bg-white rounded-md shadow-sm p-1 gap-2">
                  <div>
                    <FcCalendar size="60px" />
                  </div>
                  <div>
                    <div>
                      <p className="font-semibold text-[14px] text-mainColor">
                        {event.title}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <IoCalendarNumberSharp />{" "}
                      <p>{new Date(event.date).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <IoLocationSharp />{" "}
                      <p className="text-[14px]">{event.location}</p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default EventsTab;
