import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEvents, eventReset } from "../features/event/eventSlice";
import { IoCalendarNumberSharp, IoLocationSharp } from "react-icons/io5";
import { FcCalendar } from "react-icons/fc";
import { toast } from 'react-toastify';

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

  const [joinedEvents, setJoinedEvents] = useState([]);

  const handleJoinEvent = (eventId) => {
    setJoinedEvents([...joinedEvents, eventId]);
    toast.success("Successfully joined to hakathon");
  };

  const isEventJoined = (eventId) => {
    return joinedEvents.includes(eventId);
  };

  return (
    <div className="hidden xl:block bg-blue-50 w-[400px] h-[400px] rounded-lg overflow-hidden shadow-lg">
      <div className="bg-gradient-to-r from-mainColor to-secendoryColor text-white text-center">
        <p className="flex justify-center items-center gap-1 py-2">
          <IoCalendarNumberSharp /> Events
        </p>
      </div>
      <div >
        <div className="overflow-y-scroll">
        <ul>
          {events.map((event) => {
            return (
              <li className="p-2 h-[75px]" key={event.id}>
                <div className="flex items-center bg-white rounded-md shadow-sm p-1 gap-2">
                  <div>
                    <FcCalendar size="60px" />
                  </div>
                  <div className="flex-grow">
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
                  <button
                    onClick={() => handleJoinEvent(event.id)}
                    className={`bg-${
                      isEventJoined(event.id) ? "gray" : "green"
                    }-500 text-white px-3 py-1 rounded-md`}
                    disabled={isEventJoined(event.id)}
                  >
                    {isEventJoined(event.id) ? "Joined" : "Join"}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
        </div>
      </div>
    </div>
  );
}

export default EventsTab;
