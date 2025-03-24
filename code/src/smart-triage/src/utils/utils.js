// This code demonstrates how to use the Gemini API for text generation in JavaScript.
// It assumes you have Node.js installed and are familiar with basic JavaScript concepts.

// 1. Install the Google Generative AI SDK:
//    npm install @google/generative-ai

// 2. Import the necessary module:
const { GoogleGenerativeAI } = require("@google/generative-ai");

// 3. Replace 'YOUR_API_KEY' with your actual Gemini API key:
const API_KEY = "AIzaSyD09mCsycgHMCt4gSQQTS9xAERhxG-uUwE";

// 4. Initialize the Gemini API client:
const genAI = new GoogleGenerativeAI(API_KEY);

export async function generateText(prompt) {
  try {
    // 5. Select the Gemini model (e.g., 'gemini-pro' for text generation):
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

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
      console.log("Generated Text:", JSON.parse(generatedText)); // Print the generatedText);
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

    console.log("Streaming generated text:");
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

// Example usage for streaming:
const userPromptStream = "Tell me a story about a brave little robot.";
// generateTextStream(userPromptStream);

// --- Working with Images (Multimodal) ---
// Note: This requires a model that supports multimodal input (e.g., 'gemini-pro-vision')
// and you'll need to provide image data (e.g., as base64 encoded strings or URLs).

// const fs = require('node:fs/promises'); // For reading local files

// async function generateTextAndImage(prompt, imagePath) {
//   try {
//     const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

//     const imageFile = await fs.readFile(imagePath);
//     const imageBase64 = Buffer.from(imageFile).toString('base64');

//     const result = await model.generateContent({
//       contents: [
//         { role: "user", parts: [{ text: prompt }] },
//         { role: "user", parts: [{ image: { data: { mimeType: "image/jpeg", data: imageBase64 } } }] },
//       ],
//     });

//     const response = await result.response;
//     if (response.candidates && response.candidates.length > 0) {
//       const generatedText = response.candidates[0].content.parts[0].text;
//       console.log("Generated Text with Image:", generatedText);
//       return generatedText;
//     } else {
//       console.error("No text generated in the response with image.");
//       return null;
//     }
//   } catch (error) {
//     console.error("Error generating text with image:", error);
//     return null;
//   }
// }

// Example usage for image and text (replace with your image path):
// const imagePrompt = "Describe what you see in this image.";
// const imageFilePath = "./path/to/your/image.jpg";
// generateTextAndImage(imagePrompt, imageFilePath);

// --- Important Notes ---
// 1. Get your API key: You need to obtain an API key from the Google Cloud AI Platform. Follow the official Google AI documentation for instructions.
// 2. Choose the right model: The 'model' parameter determines which Gemini model you are using. 'gemini-pro' is suitable for general text generation. For multimodal tasks (text and images), use a model like 'gemini-pro-vision'.
// 3. Input and Output: The 'contents' array in the request defines the conversation history. Each object in the array represents a turn, with a 'role' ('user' or 'model') and 'parts' (containing the actual content).
// 4. Error Handling: The 'try...catch' blocks are essential for handling potential errors during API calls.
// 5. Asynchronous Operations: The API calls are asynchronous, so you need to use 'async' and 'await' to handle the promises returned by the SDK.
// 6. Documentation: Refer to the official Google Generative AI documentation for the most up-to-date information and more advanced features: [https://ai.google.dev/](https://ai.google.dev/)