const express = require('express');
const path = require('path');
const routes = require('./routes/router');
const auth = require('./routes/authRoutes');

const app = express();

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());

app.use('/', routes);
app.use('/api/auth', auth);





app.listen(3001, () => {
  console.log('Server is running at port 3001');
});