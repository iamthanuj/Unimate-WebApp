import axios from "axios";
const API_URL = "http://localhost:5000/api/events/";


// Create new event
const createEvent = async (edentData, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(API_URL+"create", edentData, config);
    return response.data;
  };
  

  const eventService = {
    createEvent,
  }

  export default eventService;