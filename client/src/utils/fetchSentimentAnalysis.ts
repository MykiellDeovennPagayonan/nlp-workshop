export default async function fetchSentimentAnalysis(text: string): Promise<string> {
  try {
    const response = await fetch('http://127.0.0.1:5000/predict/sentiment', {
      method: 'POST',
      body: JSON.stringify({ text }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    return data.emotion
  } catch (error) {
    console.error('Error fetching sentiment analysis:', error);
    return "";
  }
}