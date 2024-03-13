const asyncHandler = require("express-async-handler");
const Mentor = require("../models/mentorModel");

const createMentor = asyncHandler(async (req, res) => {

  console.log(req.body)

  const { name, email, expertise, description, availability, location, type } = req.body;

  if (!name || !email || !expertise || !description ||!availability || !location || !type) {
    res.status(400);
    throw new Error("Please fill all the details");
  }

  const mentor = await Mentor.create({
    name,
    email,
    expertise,
    description,
    availability,
    location,
    type,
  });

  res.status(200).json(mentor);
});


//get all mentors
const getAllMentors = asyncHandler(async (req, res) => {
  const mentors = await Mentor.find();
  res.status(200).json(mentors);
});



const getMentorById = asyncHandler(async (req, res) => {
  const mentor = await Mentor.findById(req.params.id);

  if (!mentor) {
    res.status(404);
    throw new Error("Mentor not found");
  }

  res.status(200).json(mentor);
});


const updateMentor = asyncHandler(async (req, res) => {
  const mentor = await Mentor.findById(req.params.id);

  if (!mentor) {
    res.status(404);
    throw new Error("Mentor not found");
  }

  const updateMentorDetails = await Mentor.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updateMentorDetails);
});



const deleteMentor = asyncHandler(async (req, res) => {
  const mentor = await Mentor.findById(req.params.id);

  if (!mentor) {
    res.status(404);
    throw new Error("Mentor not found");
  }

  await mentor.deleteOne();
  res.status(200).json({ message: "Mentor removed" });
});

module.exports = {
  createMentor,
  getAllMentors,
  getMentorById,
  updateMentor,
  deleteMentor,
};
