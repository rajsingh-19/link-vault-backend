const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/dbConfig');
const userRouter = require('./routes/user.routes');
const linkRouter = require('./routes/link.routes');
const appearanceRouter = require('./routes/appearance.routes');

const app = express();
dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3210;

app.use('/api/user', userRouter);
app.use('/api/link', linkRouter);
app.use('/api/appearance', appearanceRouter);

app.get('/', (req, res) => {
  res.send('Server Established');
});

//          wait for the db connection before starting the server
mongoose.connection.once('open', () => {
  console.log('Database Connected');
  //      starting the server after the db connection is established
  app.listen(PORT, () => {
    console.log('Server is runnning on the port', PORT);
  });
});

//          error handling for db connection issues
mongoose.connection.on('error', (error) => {
  console.log(`Database Connection Error : ${error}`);
});
