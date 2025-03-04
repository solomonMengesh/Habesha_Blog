const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const { errorHandler } = require("./middleware/errorMiddleware");

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const categoryRoutes = require('./routes/categoryRoutes')
dotenv.config();

const app = express();
connectDB();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/categories', categoryRoutes);

app.get('/', (req, res) => {
  res.send('Blogify API');
});

app.use(errorHandler);


module.exports = app;
