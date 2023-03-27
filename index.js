const express = require('express');
const cors = require('cors');
const app = express();
const { connection, PORT } = require('./db');
const { userRouter } = require('./routes/user.routes');
const { noteRouter } = require('./routes/note.routes');

app.use(express.json());
app.use(cors());
app.use('/users', userRouter);
app.use('/notes', noteRouter);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log('Connection successful!');
  } catch (err) {
    console.log('Cannot connect to the server');
    console.log(err.message);
  }
  console.log(`App is running on port ${PORT}`);
});
