/* Changes made to index.js with updated file */
 
const express = require('express');

const mongoose = require('mongoose');

//require('dotenv').config();
 
// Import routes

const userRoutes = require('./routes/userAPI');
 
// Create Express app

const app = express();
 
let env = process.env.NODE_ENV || 'dev'   // 1

//let mongodb_url = process.env.MONGODB_URI || 'mongodb://localhost:27017/nodejs_test_db;';
 
let mongodb_url = process.env.MONGODB_URI || 'mongodb://localhost:27017/nodejs_rest_api_demodb;';

//nodejs_rest_api_demodb
 
 
console.log('the env is ' + env);

process.env.NODE_ENV  = env;
 
process.env.MONGODB_URI = mongodb_url;
 
// Connect to MongoDB

mongoose.connect(process.env.MONGODB_URI)

  .then(() => {

    console.log('Connected to MongoDB');

    console.log('Database: nodejs_rest_api_demodb');

  })

  .catch((error) => {

    console.error('Database connection error:', error);

    process.exit(1);

  });
 
// Middleware

app.use(express.json());
 
// Routes

app.use('/api/users', userRoutes);
 
// Basic route

app.get('/', (req, res) => {

  res.json({

    message: 'Welcome to Node.js MongoDB REST API',

    endpoints: {

      users: '/api/users'

    }

  });

});
 
// Handle undefined routes

app.all('*', (req, res) => {

  res.status(404).json({

    message: `Route ${req.originalUrl} not found`

  });

});
 
// Start server

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log(`Server running on http://localhost:${PORT}`);

});

 