const mongoose = require('mongoose')



const workoutSchema = new mongoose.Schema({ 
    user_id: mongoose.Schema.Types.ObjectId,
    title: String,
    duration: Number,
    goal: String,
    kcalBurns: String,
    details: String,
    gif: String
}) 

const workout = new mongoose.model("workout", workoutSchema)

module.exports  = workout;