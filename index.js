/** @format */

const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();
app.use(helmet());
app.use(cors());

const connectDB = require('./src/config/database/db');
const port = process.env.PORT || 3000;
connectDB();

app.get('/', (req, res) => {
  res.send({ Home: 'Welcome To CMS API' });
});

app.use('/api/v1', require('./src/routes/users'));
app.use('/api/v1', require('./src/routes/posts'));

app.listen(port, () => {
  console.log(`CMS API is running on http://localhost:${port}`);
});
