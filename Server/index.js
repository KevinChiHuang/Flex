const mongoose = require("mongoose")

const express = require("express")

const cors = require("cors")

const bodyParser = require('body-parser');

const jwt = require('jsonwebtoken')



const app = express();

app.use(express.json());


app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const port = 2000;

require('dotenv').config()

mongoose.connect(process.env.MONGO_URI)

const User = require("./models/user");
const UserProfile = require("./models/userProfile");
const Workout = require("./models/workout");

app.listen(port,(e)=>{

    if(e){
        process.exit(1);
    }

    console.log(`server is http://localhost:${port}`)

})

function createUser(username, password){
    var user = new User({
        username:username,
        password:password

        
    });

    user.save();
}

app.get('/', (req, res)=>{

    res.send('wowo')
})

app.post('/signup', (req, res)=>{

    var username = req.body.username;
    var password = req.body.password;

    if(username.length > 0 && password.length > 0)
    {
        createUser(username, password);
        res.json({status: 200});
    }
    else
    {
        res.json({status: 400});
    }
    
})

app.post('/login', async (req, res) => {
    //find the user in the database
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
                expiresIn: 1000000
            });
            res.json({ status: 200, token: token })
            //const profile = ({id, kcals, reps...})
        }
    }
});


app.get('/auth', (req, res) => {

    var token = req.headers['x-access-token'];
    if(!token){

        res.json({status:200, error: 'no token'});
    }
    else{
        res.json({status:400, token: token});
    }
});