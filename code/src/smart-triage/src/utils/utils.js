// This code demonstrates how to use the Gemini API for text generation in JavaScript.
// It assumes you have Node.js installed and are familiar with basic JavaScript concepts.

// 1. Install the Google Generative AI SDK:
//    npm install @google/generative-ai

// 2. Import the necessary module:
const { GoogleGenerativeAI } = require("@google/generative-ai");

// 3. Replace 'YOUR_API_KEY' with your actual Gemini API key:
const API_KEY = "AIzaSyBe-Ype3jVA2iJweKOWIYL4B85WXTIPnug";

// 4. Initialize the Gemini API client:
const genAI = new GoogleGenerativeAI(API_KEY);

export async function generateText(prompt) {
  try {
    // 5. Select the Gemini model (e.g., 'gemini-pro' for text generation):
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

    // 6. Construct the generation request:
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    // 7. Handle the response:
    const response = await result.response;
    if (response.candidates && response.candidates.length > 0) {
      let generatedText = response.candidates[0].content.parts[0].text;
      
      if (generatedText.startsWith('```json')) {
        generatedText = generatedText.substring('```json'.length).trimStart();
      }
      if (generatedText.includes('```')) {
        generatedText = generatedText.substring(0, generatedText.length - 4).trimEnd();
      }
      return JSON.parse(generatedText); // Parse the generatedText;
    } else {
      console.error("No text generated in the response.");
      return null;
    }
  } catch (error) {
    console.error("Error generating text:", error);
    return null;
  }
}

// Example usage:
const userPrompt = "Write a short poem about the beauty of nature.";
// generateText(userPrompt);

// --- Advanced Usage (Streaming) ---
export async function generateTextStream(prompt) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContentStream({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    for await (const chunk of result.stream) {
      const text = chunk.text();
      if (text) {
        process.stdout.write(text); // Print the text chunk by chunk
      }
    }
    console.log("\nStream finished.");
  } catch (error) {
    console.error("Error generating text stream:", error);
  }
}
