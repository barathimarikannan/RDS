// server.js (Node.js + Express + MySQL using AWS RDS)
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'database-1.c54c2w448eoa.ap-south-1.rds.amazonaws.com',
    user: 'admin',
    password: 'dhinabaru_39',
    database: 'name'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to RDS MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database on RDS');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Register a new user with name, email, and phone number
app.post('/register', (req, res) => {
    const { name, email, phone } = req.body;
    const sql = 'INSERT INTO users (name, email, phone) VALUES (?, ?, ?)';
    db.query(sql, [name, email, phone], (err, result) => {
        if (err) {
            return res.status(500).send('Database error');
        }
        res.send('User Registered Successfully!');
    });
});

// Fetch all registered users
app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            return res.status(500).send('Database error');
        }
        res.json(results);
    });
});

// Delete a user by ID
app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
        if (err) {
            return res.status(500).send('Database error');
        }
        res.send('User Deleted Successfully!');
    });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`))
