// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const morgan = require('morgan');
// const { errorHandler } = require('./middleware/errorMiddleware');
// const path = require('path');

// const connectDB = require('./config/db');
// const authRoutes = require('./routes/authRoutes');
// const userRoutes = require('./routes/userRoutes');
// const postRoutes = require('./routes/postRoutes');
// const commentRoutes = require('./routes/commentRoutes');
// const categoryRoutes = require('./routes/categoryRoutes');

// dotenv.config();

// const app = express();
// connectDB();

// // Middlewares
// app.use(cors());
// app.use(morgan('dev'));
// app.use(express.json()); // Parse JSON request body

// // Static file serving for uploaded images
// app.use('/uploads', express.static('uploads'));

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/posts', postRoutes);
// app.use('/api/comments', commentRoutes);
// app.use('/api/categories', categoryRoutes);

// // Default route
// app.get('/', (req, res) => {
//   res.send('Blogify API');
// });

// // Error handler middleware (Make sure you have an errorHandler middleware)
// app.use(errorHandler);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
