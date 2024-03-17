require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require("cors")
const userRoutes = require("./routes/userRoutes");
const auth = require('./middleware/auth')

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json())
const port = process.env.PORT || 5000;

app.get('/api/health', (req, res) => {
  console.log('Health check...');
  res.send('OK!');
});

app.get('/api/health/secured',auth, (req, res) => {
  console.log('Sec Health check...');
  res.send('OK! Secured!');
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });


app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});