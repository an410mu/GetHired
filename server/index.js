require('dotenv').config();
const express = require('express');
const path = require('path');
const routes = require('./routes/router');
const auth = require('./routes/authRoutes');
const jobs = require('./routes/jobRoutes');
const mongoose = require('mongoose');

const app = express();

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());

app.use('/', routes);
app.use('/api/auth', auth);
app.use('/api/jobs', jobs);


const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL,
      { useNewUrlParser: true, useUnifiedTopology: true }
      )
    app.listen(4000, () => {
      console.log('Server is running at port 4000');
    });
  } catch (error) {
    console.log(error)
  }
}

start()