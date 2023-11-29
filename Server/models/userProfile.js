const mongoose = require('mongoose')



const userProfileSchema = new mongoose.Schema({ 
    user_id: mongoose.Schema.Types.ObjectId,
    age: Number,
    weight: Number,
    height: Number,
    gender: String,
    goal: String,
    equipment: String,
    profilePicture: String
}) 

const userProfile = new mongoose.model("userProfile", userProfileSchema)

module.exports  = userProfile;