import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { signup } from './auth/signup';
import { login } from './auth/login';
import { createProfile } from './user/createProfile';
import { completeOnboarding } from './user/completeOnboarding';
// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json()); // parse JSON bodies

// Test route
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});


app.post('/auth/signup', (req, res) => {
    signup(req, res).catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    });
  });

app.post('/auth/login', (req, res) => {
    login(req, res).catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    });
  });

app.post('/user/createProfile', (req, res) => {
    createProfile(req, res).catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    });
  });

app.post('/user/completeOnboarding', (req, res) => {
    completeOnboarding(req, res).catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    });
  });
  

// Start server
app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});
