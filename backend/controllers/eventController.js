const asyncHandler = require("express-async-handler");
const Event = require("../models/eventModel");
const User = require("../models/userModel");

const createEvent = asyncHandler(async (req, res) => {
  const email = req.body.organizer;

  if (await User.findOne({ email })) {
    if (
      !req.body.organizer ||
      !req.body.title ||
      !req.body.description ||
      !req.body.date ||
      !req.body.type ||
      !req.body.location
    ) {
      res.status(400);
      throw new Error("Pleas fill all the details");
    } else {
      const { _id, firstName, lastName } = await User.findOne({ email });
      const { title, description, date, type, location } = req.body;

      const event = await Event.create({
        user: _id,
        organizer: `${firstName} ${lastName}`,
        title,
        description,
        date,
        type,
        location,
      });

      console.log(event);
      res.status(200).json(event);
    }
  } else {
    res.status(404);
    throw new Error("User email not found");
  }
});

const getAllEvents = asyncHandler(async (req, res) => {
  const events = await Event.find();
  if (events) {
    res.status(200).json(events);
  } else {
    req.status(404);
    throw new Error("No events");
  }
});

const editEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  try {
    if (!event) {
      res.status(400);
      throw new Error("Event not found");
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(400);
    throw new Error("Not valid details");
  }
});

const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  console.log(event);

  try {
    if (!event) {
      res.status(400);
      throw new Error("Event not found");
    } else {
      await event.deleteOne();
      res.status(200).json({ id: req.params.id });
    }
  } catch (error) {
    res.status(400);
    throw new Error("Not valid details");
  }
});

module.exports = {
  createEvent,
  getAllEvents,
  editEvent,
  deleteEvent,
};
