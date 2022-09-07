require('dotenv').config();
const express = require('express');
require('express-async-errors');
const path = require('path');
const routes = require('./routes/router');
const auth = require('./routes/authRoutes');
const jobs = require('./routes/jobRoutes');
const errorHandler = require('./middleware/errorHandler');
const authUser = require('./middleware/authUser');
const mongoose = require('mongoose');

const app = express();

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());

//routers
//app.use('/', routes);
app.use('/api/auth', auth);
app.use('/api/jobs', authUser, jobs);



//use middleware
app.use(errorHandler)



//start the server
const port = process.env.PORT || 4000
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL,
      { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
      )
    app.listen(4000, () => {
      console.log(`Server is running at port ${port}`);
    });
  } catch (error) {
    console.log(error)
  }
}

start()