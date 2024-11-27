/* eslint-disable @typescript-eslint/no-explicit-any */
export default async function fetchSpamDetection(text: string): Promise<string> {
  try {
    const response = await fetch('http://127.0.0.1:5000/predict/spam', {
      method: 'POST',
      body: JSON.stringify({ text }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    return data.isSpam
  } catch (error) {
    console.error('Error fetching spam detection:', error);
    return "";
  }
}