const express = require("express");
const router = express.Router();
const protect = require('../middleware/authMiddleware')
const {createEvent, getAllEvents, editEvent, deleteEvent} = require('../controllers/eventController')

router.post("/create/", createEvent)
router.get("/all/", getAllEvents)
router.put("/edit/:id",editEvent )
router.delete("/delete/:id",deleteEvent )

module.exports = router