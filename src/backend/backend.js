const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose'); // Import Mongoose

const analyzeText = require('./textAnalyzer.js');

const app = express();
const PORT = 5000;

// Use CORS middleware to allow requests from all origins
app.use(cors());

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/articalAnalyzerFeedback', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define Mongoose schema for feedback
const feedbackSchema = new mongoose.Schema({
  feedback: { type: String, required: true },
  url: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});
const Feedback = mongoose.model('Feedback', feedbackSchema);

// Route to handle feedback submission
app.post('/api/feedback', async (req, res) => {
  const { feedback, url } = req.body; // Extract 'feedback' and 'url' from request body
  try {
    // Store feedback in the database
    const newFeedback = new Feedback({ feedback, url });
    await newFeedback.save();
    res.json({ message: 'Feedback received and stored successfully' });
  } catch (error) {
    console.error('Error storing feedback:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/analyze', async (req, res) => {
  const { url } = req.body; // Extract 'url' from request body
  try {
    // Process the URL using the analyzeText function
    const analysisResult = await analyzeText(url);
    const processedData = `${analysisResult.message}`;
    res.json({ result: processedData });
  } catch (error) {
    console.error('Error analyzing text:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
