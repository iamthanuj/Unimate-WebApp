const express = require("express");
const router = express.Router();
const protect = require('../middleware/authMiddleware')
const {createEvent, getAllEvents} = require('../controllers/eventController')

router.post("/create/", createEvent)
router.get("/all/", getAllEvents)

module.exports = router