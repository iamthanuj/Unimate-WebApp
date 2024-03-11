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


const eventService = {
  createEvent,
  getEvents,
};

export default eventService;
