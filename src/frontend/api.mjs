// api.mjs

const BASE_URL = 'http://localhost:5000'; // Replace with your backend server URL

const analyzeText = async (url) => {
  try {
    const response = await fetch(`${BASE_URL}/analyze`, { // Use the base URL here
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });
    console.log('Response Status:', response.status); // Log response status code

    if (!response.ok) {
      throw new Error('Failed to analyze text');
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error('Error analyzing text:', error);
    throw error;
  }
};

export default analyzeText;
