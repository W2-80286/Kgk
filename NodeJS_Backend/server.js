const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors'); 


const app=express();
const PORT=process.env.PORT||4000;
app.use(cors());

//database connection
const connection=mysql.createConnection({
    host: 'localhost',
    user: 'W2_80286_Tanuja',
    password: '12345',
    database: 'Kgk'
});

connection.connect((err) => {
    if (err) {
      console.log('Error connecting to database:', err);
      return;
    }
    console.log('Connected to database');
  });
  
  // Middleware
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true })); 

  
  // Register API
app.post('/register', async (req, res) => {
    try {
      const { name, dateOfBirth, email, password } = req.body;
      if (!name || !dateOfBirth || !email || !password) {
        res.status(400).json({ error: 'Name, date of birth, email, and password are required' });
        return;
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        name,
        dateOfBirth,
        email,
        password: hashedPassword
      };
  
      connection.query('INSERT INTO user SET ?', newUser, (err, results) => {
        if (err) {
          console.log('Error registering user:', err);
          res.status(500).json({ error: 'Error registering user' });
          return;
        }
        res.status(201).json({ message: 'User registered successfully', userId: results.insertId });
      });
    } catch (error) {
      console.log('Error registering user:', error);
      res.status(500).json({ error: 'Error registering user' });
    }
  });

  //login API
app.post('/login', async (req, res) => {
    try {
      const { name, password } = req.body;
      if (!name || !password) {
        res.status(400).json({ error: 'Name and password are required' });
        return;
      }
  
      connection.query('SELECT * FROM user WHERE name = ?', [name], async (err, results) => {
        if (err) {
          console.log('Error logging in:', err);
          res.status(500).json({ error: 'Error logging in' });
          return;
        }
  
        if (results.length === 0) {
          res.status(401).json({ error: 'Invalid name or password' });
          return;
        }
  
        const user = results[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          res.status(401).json({ error: 'Invalid name or password' });
          return;
        }
  
        const token = jwt.sign({ userId: user.user_id }, 'your_secret_key', { expiresIn: '1h' });
        res.json({ message: 'Login successful', token: token, userId: user.user_id });
      });
    } catch (error) {
      console.log('Error logging in:', error);
      res.status(500).json({ error: 'Error logging in' });
    }
  });
  
  
  // Function to fetch user data from the database
const getUserDataFromDatabase = () => {
  return new Promise((resolve, reject) => {
    // Your SQL query to fetch user data from the table
    const query = 'SELECT name,createdTimestamp,role,action FROM user '; // Change 'users' to your actual table name

    // Execute the SQL query
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error fetching user data:', error);
        reject(error);
        return;
      }
      // If user data is found, resolve the promise with the results
      resolve(results);
    });
  });
};

// Example route handler for fetching user data
app.get('/user', async (req, res) => {
  try {
    // Retrieve user data from the database using the getUserDataFromDatabase function
    const userData = await getUserDataFromDatabase();

    // If user data is found, send it as a JSON response
    res.json(userData);
  } catch (error) {
    // If an error occurs during the process, send an error response
    console.error('Error retrieving user data:', error);
    res.status(500).json({ error: 'Error retrieving user data' });
  }
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});  