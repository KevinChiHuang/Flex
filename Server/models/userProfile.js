const mongoose = require('mongoose')



const userProfileSchema = new mongoose.Schema({ 
    user_id: mongoose.Schema.Types.ObjectId,
    age: Number,
    weight: Number,
    height: Number,
    gender: Number,
    goal: Number,
    equipment: Number,
    profilePicture: String,
    kcalsBurns: Number,
    duration: Number,
    workoutNumber: Number,

}) 

const userProfile = new mongoose.model("userProfile", userProfileSchema)

module.exports  = userProfile;