import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Include Bootstrap CSS

function About() {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8 about-section">
          <h1 style={{ color: '#87CEEB' }}>About Article Analyzer</h1>  {/* Light blue heading */}
          <p>Welcome to Article Analyzer! This website provides a tool to help you categorize articles as either news or current affairs.</p>

          <h2>What We Do</h2>
          <p>We leverage the power of machine learning to analyze the content of an article and determine its category.</p>
          <ul>
            <li><b>News articles</b> typically report on recent events with a focus on providing factual information.</li>
            <li><b>Current affairs articles</b> delve deeper into ongoing issues, often offering analysis, opinions, and historical context.</li>
          </ul>

          <h2>How it Works</h2>
          <p>Simply paste the URL of the article you want to classify into the designated field on the homepage. Our system will analyze the text and provide you with the predicted category (news or current affairs).</p>

          <h2>Disclaimer</h2>
          <p>While our classifier strives for accuracy, it is important to note that it is a machine learning model and may not always be perfect. We recommend using your own judgment alongside the provided classification.</p>

          <p>We are constantly working to improve our model's accuracy and expand its capabilities.</p>

          <h2>Contact</h2>
          <p>If you have any questions or feedback, please feel free to contact us at chinmay1999j@gmail.com .</p>
        </div>
      </div>
    </div>
  );
}

export default About;
