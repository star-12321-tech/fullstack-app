// backend/server.js
const express = require('express');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const SECRET_KEY = 'your_secret_key';

// Connect to MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sample'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// Middleware to verify token
function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'No token provided' });
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });
    req.userId = decoded.id;
    next();
  });
}

// Register
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 8, (err, hash) => {
    if (err) return res.status(500).json({ message: 'Error hashing password' });
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(query, [username, hash], (err, result) => {
      if (err) return res.status(500).json({ message: 'User registration failed' });
      res.json({ message: 'User registered' });
    });
  });
});

// Login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err || results.length === 0) return res.status(401).json({ message: 'Invalid credentials' });
    const user = results[0];
    bcrypt.compare(password, user.password, (err, match) => {
      if (match) {
        const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    });
  });
});

// Get Dashboard Data (e.g., user info)
app.get('/api/dashboard', verifyToken, (req, res) => {
  res.json({ message: 'Welcome to your dashboard' });
});

// CRUD for Todos
app.get('/api/todos', verifyToken, (req, res) => {
  const query = 'SELECT * FROM todos WHERE user_id = ?';
  db.query(query, [req.userId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching todos' });
    res.json(results);
  });
});

app.post('/api/todos', verifyToken, (req, res) => {
  const { title } = req.body;
  const query = 'INSERT INTO todos (user_id, title) VALUES (?, ?)';
  db.query(query, [req.userId, title], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error adding todo' });
    res.json({ message: 'Todo added' });
  });
});

app.put('/api/todos/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const query = 'UPDATE todos SET title = ?, completed = ? WHERE id = ? AND user_id = ?';
  db.query(query, [title, completed, id, req.userId], (err) => {
    if (err) return res.status(500).json({ message: 'Error updating todo' });
    res.json({ message: 'Todo updated' });
  });
});

app.delete('/api/todos/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM todos WHERE id = ? AND user_id = ?';
  db.query(query, [id, req.userId], (err) => {
    if (err) return res.status(500).json({ message: 'Error deleting todo' });
    res.json({ message: 'Todo deleted' });
  });
});

// Listen
app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});