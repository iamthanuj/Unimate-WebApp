import axios from "axios";
const API_URL = "http://localhost:5000/api/events/";

// Create new event
const createEvent = async (eventData) => {
  const response = await axios.post(API_URL + "create", eventData);
  return response.data;
};


//get events
const getEvents = async()=>{
  const response = await axios.get(API_URL+"all",{});
  return response.data;
}



//update events
const updateEvent = async(updatedEvent)=>{
  const data = updatedEvent.updatedEventData;
  const response = await axios.put(API_URL+"edit/"+`${updatedEvent._id}`,data);
  return response.data;
}


//delete events
const  deleteEvent = async(eventId)=>{
  const response = await axios.delete(API_URL+"delete/"+eventId,{});
  return response.data;
}





const eventService = {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
};

export default eventService;
