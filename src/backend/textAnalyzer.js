// textAnalyzer.js
const puppeteer = require('puppeteer');
const targetWord = "Follow the latest breaking news and developments";

// ****This function scraps the data from given URL****
const analyzeText = async (url, selector) => {
  let browser;

  try {
    browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Go to the provided URL
    await page.goto(url);

    // Check if URL starts with mentioned website:
    if (url.startsWith('https://www.hindustantimes.com')) {
      selector = 'div.storyDetails p'; // Hardcoded selector for The Hindu articles
    } 

    // Wait for the selector to be available on the page
    await page.waitForSelector(selector);

    // Extract text content from the specified element
    const elementText = await page.$$eval(selector, (elements) => elements.map((el) => el.textContent).join(' '));

    console.log('Scraped text:');
    console.log(elementText); 

    // Extract text content until the target word
    const textUntilTargetWord = extractTextUntilWord(elementText, targetWord);

    if (textUntilTargetWord.trim() === '') {
      throw new Error('Target word not found in the text.');
    }

    // Perform further analysis on the extracted text
    const analysisResult = analyzeTextContent(textUntilTargetWord);
    return analysisResult;
  } catch (error) {
    console.error('Error during puppeteer operation:', error.message);
    return { error: 'Failed to analyze text' };
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

// **** This function analyzes the scrapped data and gives the final result ****
const extractTextUntilWord = (text, targetWord) => {
  const index = text.indexOf(targetWord);
  if (index !== -1) {
    return text.substring(0, index + targetWord.length);
  }
  console.log('Target word not found in the text.');
  return text;
};

const analyzeTextContent = (text) => {
  const newsSet = new Set(['breaking', 'just in', 'today', 'yesterday', 'happened', 'occurred', 'accident', 'crash', 'explosion', 'fire', 'shooting', 'robbery', 'arrest', 'rescue', 'discovery', 'invention', 'launch', 'arrival', 'signing', 'announcement', 'deadline', 'update', 'latest', 'developing', 'preliminary', 'initial reports', 'witness', 'victim', 'suspect', 'official', 'statement', 'conference', 'meeting', 'speech', 'interview', 'investigation', 'ongoing', 'unfolding', 'search', 'rescue', 'evacuation', 'warning', 'alert', 'footage', 'images', 'video', 'live', 'stream', 'breaking news', 'top story']);

  const CurrentAffairsSet = new Set(['economy', 'politics', 'policy', 'law', 'government', 'environment', 'climate change', 'energy', 'healthcare', 'education', 'poverty', 'hunger', 'war', 'conflict', 'terrorism', 'security', 'human rights', 'social justice', 'inequality', 'technology', 'innovation', 'science', 'research', 'space', 'future', 'trends', 'analysis', 'debate', 'opinion', 'commentary', 'expert', 'impact', 'consequence', 'challenge', 'solution', 'cause', 'effect', 'perspective', 'history', 'background', 'context', 'global', 'international', 'regional', 'national', 'local', 'community', 'development', 'progress', 'implications']);
  const commonWords = new Set([...newsSet].filter((word) => CurrentAffairsSet.has(word))); // Pre-calculate common words

  const allWordsLowercased = text
    .split(/\W+/) // Split text into words, excluding non-word characters
    .map((word) => word.toLowerCase());

  let newsSetCount = 0;
  let CurrentAffairsSetCount = 0;

  for (const word of allWordsLowercased) {
    if (newsSet.has(word)) {
      newsSetCount++;
    } else if (CurrentAffairsSet.has(word)) {
      CurrentAffairsSetCount++;
    }
  }

  const dominantSet = newsSetCount > CurrentAffairsSetCount ? 'Set 1' : newsSetCount === CurrentAffairsSetCount ? 'Neither Set' : 'Set 2';

  let processedData;

  if (newsSetCount > CurrentAffairsSetCount) {
      processedData = "Article seems to be a news";
  } else if (CurrentAffairsSetCount > newsSetCount) {
      processedData = "Article seems to be Current Affairs";
  } else {
      processedData = "System is not able to conclude whether the article is News or Current Affairs! Sorry.";
  }

  return {
    newsSetCount,
    CurrentAffairsSetCount,
    commonWordsSize: commonWords.size,
    dominantSet,
    message: processedData
  };
};

module.exports = analyzeText;