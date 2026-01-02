const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// In-memory storage
const users = []; // { id, name, email, password }
const notes = []; // { id, userId, title, content }

// Helper
const generateId = () => Math.random().toString(36).substr(2, 9);

// Auth Routes
app.post('/api/auth/register', (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Missing fields' });
    }
    if (users.find(u => u.email === email)) {
        return res.status(400).json({ error: 'Email already exists' });
    }
    const newUser = { id: generateId(), name, email, password };
    users.push(newUser);
    res.status(201).json({ message: 'User registered', user: { id: newUser.id, name, email } });
});

app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    res.json({ message: 'Login successful', userId: user.id, name: user.name });
});

// Notes Routes
app.post('/api/notes', (req, res) => {
    const { userId, title, content } = req.body;
    if (!userId || !title || !content) {
        return res.status(400).json({ error: 'Missing fields' });
    }
    const newNote = { id: generateId(), userId, title, content };
    notes.push(newNote);
    res.status(201).json(newNote);
});

app.get('/api/notes/:userId', (req, res) => {
    const { userId } = req.params;
    const userNotes = notes.filter(n => n.userId === userId);
    res.json(userNotes);
});

// Serve static files from React app
// Serve static files
const path = require('path');
const publicPath = path.join(__dirname, 'public');
console.log('Serving static files from:', publicPath);
app.use(express.static(publicPath));

// Regex catch-all for Express 5 compatibility
app.get(/.*/, (req, res) => {
    const indexPath = path.join(publicPath, 'index.html');
    res.sendFile(indexPath);
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});
