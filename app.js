require('dotenv').config();
var path = require('path');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = 3011;

const userModel = require('./models/user');

// parse application/json, basically parse incoming Request Object as a JSON Object 
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/user', async (req, res) => {
  const userID = req.query.userID
  if (!userID) {
    return res.status(400).json({ 'status': 'provide userID' }); // *
  }
  let userData;
  try {
    userData = await userModel.findOne({ userID: userID })
  } catch (err) {
    console.error(err);
    return res.status(404).json({ 'status': 'not found userID' }); // *
  }
  res.json(userData)
})

app.put('/user', async (req, res) => {
  const userID = req.body.userID
  if (!userID) {
    return res.status(400).json({ 'status': 'provide userID' }); // *
  }
  let userData;
  try {
    userData = await userModel.findOne({ userID: userID })
    if (!userData) {
      console.log(`saving user ${userID}`);
      const defaultUser = {
        userID: userID,
        guildID: process.env.guildId,
      }
      userData = await userModel.create(defaultUser)
    }
    userData.tasks = [...userData.tasks, ...req.body.tasks];
    await userData.save()
  } catch (err) {
    console.error(err);
  }
  res.json({ 'status': 'ok' })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

mongoose
  .connect(process.env.MONGOOSE_SERVER)
  .then(() => {
    console.log("connected to db");
  });