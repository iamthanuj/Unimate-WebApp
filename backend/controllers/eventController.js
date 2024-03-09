const asyncHandler = require("express-async-handler");
const Event = require('../models/eventModel');
const User = require("../models/userModel");


const createEvent = asyncHandler(async(req,res)=>{
    if(!req.body.title || !req.body.description || !req.body.date || !req.body.type || !req.body.location) {
        res.status(400);
        throw new Error("Pleas fill all the details");
    } else{
        const {firstName, lastName, university} = req.user;
        const {id,title,description,date, type, location } = req.body

        const event = await Event.create({
            user:req.user.id,
            postBy:`${firstName} ${lastName}`,
            title,
            description,
            date,
            type,
            location,
        })

        console.log(event)
        res.status(200).json(event)
    }
})



module.exports = {
    createEvent,
}