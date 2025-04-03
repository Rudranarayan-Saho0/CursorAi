const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Temporary in-memory data storage
const projects = [];
const services = [];
const contacts = [];

// Routes
app.get('/api/projects', (req, res) => {
  res.json(projects);
});

app.post('/api/projects', (req, res) => {
  const project = {
    _id: Date.now().toString(),
    ...req.body
  };
  projects.push(project);
  res.status(201).json(project);
});

app.delete('/api/projects/:id', (req, res) => {
  const index = projects.findIndex(p => p._id === req.params.id);
  if (index !== -1) {
    projects.splice(index, 1);
    res.json({ message: 'Project deleted' });
  } else {
    res.status(404).json({ message: 'Project not found' });
  }
});

app.get('/api/services', (req, res) => {
  res.json(services);
});

app.post('/api/services', (req, res) => {
  const service = {
    _id: Date.now().toString(),
    ...req.body
  };
  services.push(service);
  res.status(201).json(service);
});

app.delete('/api/services/:id', (req, res) => {
  const index = services.findIndex(s => s._id === req.params.id);
  if (index !== -1) {
    services.splice(index, 1);
    res.json({ message: 'Service deleted' });
  } else {
    res.status(404).json({ message: 'Service not found' });
  }
});

app.post('/api/contact', (req, res) => {
  const contact = {
    _id: Date.now().toString(),
    ...req.body,
    createdAt: new Date()
  };
  contacts.push(contact);
  res.status(201).json({ message: 'Message sent successfully' });
});

app.get('/api/contact', (req, res) => {
  res.json(contacts);
});

// Admin routes
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin123') {
    res.json({ token: 'demo-token' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.get('/api/admin/profile', (req, res) => {
  res.json({ id: 'admin', role: 'admin' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 