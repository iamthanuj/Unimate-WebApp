const express = require("express");
const router = express.Router();
const { createMentor, getAllMentors, getMentorById, updateMentor, deleteMentor } = require('../controllers/mentorController');

router.post("/create", createMentor);
router.get("/all", getAllMentors);
router.get("/:id", getMentorById);
router.put("/edit/:id", updateMentor);
router.delete("/delete/:id", deleteMentor);

module.exports = router;
