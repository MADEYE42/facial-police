const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const User = require('./models/User'); // User model path

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(
  'mongodb+srv://goumadye:fVGvDYQf7Nlypx0P@cluster0.alw63.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// User Registration
app.post('/register', async (req, res) => {
  const { fullName, phone, username, password } = req.body;

  // Check if the user already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).send('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ fullName, phone, username, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).send('User Registered');
  } catch (err) {
    res.status(500).send('Server error: ' + err.message);
  }
});

// User Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send('Invalid Credentials');
    }
    res.json({ user });
  } catch (err) {
    res.status(500).send('Server error: ' + err.message);
  }
});

// Update User Details
app.put('/update', async (req, res) => {
  const { username, fullName, phone, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await User.updateOne(
      { username },
      { fullName, phone, password: hashedPassword }
    );

    if (result.nModified === 0) {
      return res.status(404).send('User not found');
    }

    res.status(200).send('User Updated');
  } catch (err) {
    res.status(500).send('Server error: ' + err.message);
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
