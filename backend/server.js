const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Add just after your bcrypt/jwt imports
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

 jwt.verify(token, 'secret', (err, user) => {
  if (err) {
    console.error('JWT verification error:', err); // <-- this will tell you if it's expired, malformed, etc.
    return res.sendStatus(403);
  }
  req.user = user;
  next();
});

}

app.listen(5000, () => console.log('Server running on http://localhost:5000'));

// In-memory data store crud routes
let items = [];
let nextId = 1;

app.get('/items', authenticateToken, (req, res) => {
  res.json(items);
});

app.post('/items', authenticateToken , (req, res) => {
  const item = { id: nextId++, ...req.body };
  items.push(item);
  res.status(201).json(item);
});


app.put('/items/:id',authenticateToken, (req, res) => {
  const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
  if (itemIndex !== -1) {
    items[itemIndex] = { id: parseInt(req.params.id), ...req.body };
    res.json(items[itemIndex]);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

app.delete('/items/:id',authenticateToken, (req, res) => {
  const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
  if (itemIndex !== -1) {
    const deleted = items.splice(itemIndex, 1);
    res.json(deleted[0]);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

// login endpoint
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const users = [{ email: 'admin@test.com', password: bcrypt.hashSync('1234', 8) }];

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ email }, 'secret', { expiresIn: '5h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});
