import axios from "axios";
const API_URL = "http://localhost:5000/api/mentors/";

// Create new mentor
const createMentor = async (mentorData) => {
  const response = await axios.post(API_URL + "create", mentorData);
  return response.data;
};

// Get all mentors
const getMentors = async () => {
  const response = await axios.get(API_URL + "all", {});
  return response.data;
};

// Update mentor
const updateMentor = async (updatedMentor) => {
  const data = updatedMentor.updatedMentorData;
  const response = await axios.put(API_URL + "edit/" + `${updatedMentor._id}`, data);
  return response.data;
};

// Delete mentor
const deleteMentor = async (mentorId) => {
  const response = await axios.delete(API_URL + "delete/" + mentorId, {});
  return response.data;
};

const mentorService = {
  createMentor,
  getMentors,
  updateMentor,
  deleteMentor,
};

export default mentorService;
