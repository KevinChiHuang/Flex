const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
require('dotenv').config()
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();
const port = 2000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, (e) => {
    if (e) {
        process.exit(1);
    }
    console.log(`server listening on port http://localhost:${port}`);

})

mongoose.connect(process.env.MONGO_URI)

const User = require('./models/user');
const UserProfile = require("./models/userProfile");
const Workouts = require('./models/workout');
;


app.get('/', (req, res) => {
    res.send('server is running')
})

app.post('/signup', (req, res) => {
    console.log(req.body);

    var username = req.body.username;
    var password = req.body.password;

    if (username.length > 0 && password.length > 0) {
        var user = new User({
            username: username,
            password: password
        });
        user.save();
        res.json({ status: 200, user_id: user._id });
    }
    else {
        res.json({ status: 400 });
    }
})

app.post('/login', async (req, res) => {
    //find the user in the database
    console.log(req.body.username);
    var result = await User.find({ username: req.body.username });
    console.log(result[0]);
    //if we didnt find the user
    if (!result[0]) {
        res.json({ status: 400, error: 'user does not exist' });
    } else {
        if (result[0].password !== req.body.password) {
            res.json({ status: 400, error: 'password does not match' });
        } else {
            //for later when we find the user chaeck if they hgave a user profile and then if they do send the user profile params as part of the profile json else create a new profile and send the user profile as part of the profile json
            // profile {id, username, kcals, reps...}
            const token = jwt.sign({ id: result[0]._id, username: result[0].username }, process.env.SECRET, {
                expiresIn: 1000000,
            });
            res.json({ status: 200, token: token, user_id: result[0]._id /**profile: profile */ })
            //const profile = ({id, kcals, reps...})
        }
    }
});

app.get('/auth', (req, res) => {
    var token = req.headers['x-access-token'];
    if (!token) {
        res.json({ status: 200, error: 'Invalid token' });
    } else {
        res.json({ status: 400, token: token })
    }
});

app.post('/profile/create', async (req, res) => {
    //check if the user exists in the database
    var result = await User.find({ _id: req.body.user_id })
    if (result[0]) {
        const user_id = req.body.user_id;
        console.log(user_id);
        const userProfile = new UserProfile({
            user_id: user_id,
            age: 0,
            weight: 0,
            height: 0,
            gender: 0,
            goal: 0,
            equipment: 0,
            kcalsBurned: 0,
            duration: 0,
            workoutNumber: 0
        });
        userProfile.save();
        res.send({ status: 200, message: 'Profile created' });
    } else {
        res.send({ status: 400, error: 'User not found and profile could not be created' });
    }
})

app.post('/profile/update', async (req, res) => {
    const data = req.body;
    //data{ userId: userId, newData: {x, y, z}}
    // Find the user profile by user ID
    console.log(data)
    const userProfile = await UserProfile.findOne({ user_id: new mongoose.Types.ObjectId(data.user_id) });

    if (!userProfile) {
        return res.send({ status: 404, error: 'User profile not found' });
    } else {
        try {
            await UserProfile.updateOne({ user_id: new mongoose.Types.ObjectId(data.user_id) },
                {  $set: {
                    age: data.age,
                    weight: data.weight,
                    height: data.height,
                    gender: data.gender,
                    goal: data.goal,
                    equipment: data.equipment
                  } },
            )
            res.send({ status: 200, message: 'Profile updated' });
        } catch (error) {
            console.log(error)
        }
    }
});


app.post('/profile/updateWorkout', async (req, res) => {
    const { user_id, data } = req.body;
    //data{ userId: userId, newData: {x, y, z}}
    // Find the user profile by user ID
    const userProfile = await UserProfile.findOne({ user_id: user_id });
    const updatedNum = userProfile[0].workoutNumber + 1;
    

    if (!userProfile) {
        return res.send({ status: 404, error: 'User profile not found' });
    } else {
        try {
            await UserProfile.updateOne({ user_id: user_id },
                { $set: { kcalBurns: data.kcalBurns } },
                { $set: { duration: data.duration } },
                { $set: { workoutNumber: updatedNum } }
            )
            res.send({ status: 200, message: 'Profile updated' });
        } catch (error) {
            console.log(error)
        }
    }
});

app.post('/profile', async(req, res) => {
     const userProfile = await UserProfile.findOne({ user_id: new mongoose.Types.ObjectId(req.body.user_id) });
     //if we find a user with that profile
     if(userProfile){
        res.send({ status: 200, userProfile: userProfile});
     }else{
        res.send({status: 400, error: 'Profile for user not found'});
     }
})