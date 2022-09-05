require('dotenv').config();
const express = require('express');
require('express-async-errors');
const path = require('path');
const routes = require('./server/routes/router');
const auth = require('./server/routes/authRoutes');
const jobs = require('./server/routes/jobRoutes');
const errorHandler = require('./server/middleware/errorHandler');
const mongoose = require('mongoose');
const cors = require('cors')

const app = express();

app.use(express.static(path.resolve(__dirname, '../client/dist')));
console.log('this is',__dirname)
app.use(express.json());
app.use(cors())


app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../GetHired/client/dist', 'index.html'))
})
//routers
//app.use('/', routes);
app.use('/api/auth', auth);
app.use('/api/jobs', jobs);



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