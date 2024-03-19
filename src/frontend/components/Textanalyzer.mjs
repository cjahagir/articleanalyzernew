import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Include Bootstrap CSS 
import analyzeText from '../api.mjs';

const BASE_URL = 'http://localhost:5000';
function Textanalyzer() {
  const [url, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showFeedbackPrompt, setShowFeedbackPrompt] = useState(false);
  const [userFeedback, setUserFeedback] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading to true when analysis starts

    try {
      const processedData = await analyzeText(url);
      setResult(processedData);
      setShowFeedbackPrompt(true); // Show feedback prompt after getting result
    } catch (error) {
      setResult('Error analyzing text. Please try again.');
    } finally {
      setLoading(false); // Set loading to false when analysis completes
    }
  };

  const handleClear = () => {
    setText('');
    setResult(null);
    setShowFeedbackPrompt(false); // Hide feedback prompt when clearing
    setUserFeedback(null); // Reset user feedback
  };

  const handleFeedback = async (feedback) => {
    setUserFeedback(feedback);
    setShowFeedbackPrompt(false); // Hide feedback prompt after user provides feedback
    // Send feedback to backend
    try {
      const response = await fetch(`${BASE_URL}/api/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ feedback, url }),
      });
      if (!response.ok) {
        throw new Error('Failed to send feedback');
      }
      // Feedback sent successfully
    } catch (error) {
      console.error('Error sending feedback:', error);
    }
  };

  return (
    <div className="container mt-5" style={{ backgroundColor: '#F0F0F0', padding: '20px', borderRadius: '10px' }}>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="text" className="form-label">Enter the article URL you want to analyze:</label>
          <textarea
            className="form-control"
            id="text"
            value={url}
            onChange={(event) => setText(event.target.value)}
            style={{ backgroundColor: '#FFFFFF', border: '1px solid #CCCCCC', borderRadius: '5px', padding: '5px' }}
          />
        </div>
        <button type="button" className="btn btn-secondary me-2" onClick={handleClear} style={{ backgroundColor: '#87CEEB', color: '#FFFFFF' }} disabled={!url}>Clear</button>
        <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#20B2AA', color: '#FFFFFF' }}>Analyze</button>
      </form>
      {loading && <p>Loading...</p>} {/* Loader */}
      {result && !loading && <p className="mt-3">Result: {result}</p>}
      
      {showFeedbackPrompt && (
        <div className="mt-3">
          <p>Is the result as expected?</p>
          <button className="btn btn-success me-2" onClick={() => handleFeedback('yes')}>Yes</button>
          <button className="btn btn-danger" onClick={() => handleFeedback('no')}>No</button>
        </div>
      )}
      
      {userFeedback && (
        <p className="mt-3">Thank you for your feedback!</p>
      )}
    </div>
  );
}

export default Textanalyzer;
