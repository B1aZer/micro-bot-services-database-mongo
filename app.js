require('dotenv').config();
var path = require('path');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = 3011;

const profileModel = require('./models/profile');

// parse application/json, basically parse incoming Request Object as a JSON Object 
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.put('/profile', async (req, res) => {
  const userID = req.body.userID
  let profileData;
  try {
    profileData = await profileModel.findOne({userID: userID})
    if (!profileData) {
      profileData = await profileModel.create({
          userID: userID,
          guildID: "958742337394208808",
          xp: 0,
      })
    }
  } catch (err) {
    console.error(err);
  }
  res.json(profileData)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


mongoose
  .connect(process.env.MONGOOSE_SERVER)
  .then(() => {
    console.log("connected to db");
    console.log("running ws on 8080");
  });


