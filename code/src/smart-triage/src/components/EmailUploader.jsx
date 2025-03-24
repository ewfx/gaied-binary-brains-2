// import React, { useState } from 'react';
// import { simpleParser } from 'mailparser';
// import { generateText, generateTextStream } from '../utils/utils';

// function EmailUploader() {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [analysisResult, setAnalysisResult] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const readFileContent = async (file) => {
//     setLoading(true);
//     try {
//       const reader = new FileReader();
//       reader.onload = async (event) => {
//         const emlContent = event.target.result;
//         try {
//           const parsedEmail = await simpleParser(emlContent);
//           console.log("Parsed Email:", parsedEmail);
//           await analyzeEmailWithGemini(parsedEmail);
//         } catch (parseError) {
//           console.error("Error parsing EML file:", parseError);
//           setAnalysisResult("Error parsing the EML file.");
//         } finally {
//           setLoading(false);
//         }
//       };
//       reader.onerror = (error) => {
//         console.error("Error reading file:", error);
//         setAnalysisResult("Error reading the file.");
//         setLoading(false);
//       };
//       reader.readAsText(file);
//     } catch (error) {
//       console.error("Unexpected error reading file:", error);
//       setAnalysisResult("Unexpected error reading the file.");
//       setLoading(false);
//     }
//   };

//   const analyzeEmailWithGemini = async (parsedEmail) => {
//     // 3. Structure the Prompt and Send to Gemini
//     const prompt = `Analyze the following email and provide key details such as sender, recipient, subject, and a summary of the body. Also, identify any potential important information or action items.

//     Email Details:
//     Sender: ${parsedEmail.from.text}
//     Recipient(s): ${parsedEmail.to ? parsedEmail.to.text : ''}
//     CC: ${parsedEmail.cc ? parsedEmail.cc.text : ''}
//     Subject: ${parsedEmail.subject}
//     Date: ${parsedEmail.date}
//     Body (Text): ${parsedEmail.text || 'No plain text body'}
//     Body (HTML): ${parsedEmail.html ? 'Present' : 'Not present'}
//     Attachments: ${parsedEmail.attachments.length > 0 ? parsedEmail.attachments.map(a => a.filename).join(', ') : 'No attachments'}
//     `;

//     generateTextStream(prompt);

//     // try {
//     //   // Assuming you have initialized your Gemini API client (genAI) as shown before
//     //   const { GoogleGenerativeAI } = require("@google/generative-ai");
//     //   const API_KEY = "YOUR_API_KEY"; // Replace with your actual API key
//     //   const genAI = new GoogleGenerativeAI(API_KEY);
//     //   const model = genAI.getGenerativeModel({ model: "gemini-pro" });

//     //   const result = await model.generateContent({
//     //     contents: [{ role: "user", parts: [{ text: prompt }] }],
//     //   });

//     //   const response = await result.response;
//     //   if (response.candidates && response.candidates.length > 0) {
//     //     setAnalysisResult(response.candidates[0].content.parts[0].text);
//     //   } else {
//     //     setAnalysisResult("No analysis result from Gemini.");
//     //   }
//     // } catch (error) {
//     //   console.error("Error calling Gemini API:", error);
//     //   setAnalysisResult("Error communicating with the Gemini API.");
//     // }
//   };

//   const handleUpload = () => {
//     if (selectedFile) {
//       readFileContent(selectedFile);
//     } else {
//       alert("Please select an EML file.");
//     }
//   };

//   return (
//     <div>
//       <input type="file" accept=".eml" onChange={handleFileChange} />
//       <button onClick={handleUpload} disabled={!selectedFile || loading}>
//         {loading ? 'Analyzing...' : 'Upload and Analyze'}
//       </button>
//       {analysisResult && (
//         <div style={{ marginTop: '20px', whiteSpace: 'pre-wrap' }}>
//           <h3>Analysis Result:</h3>
//           <p>{analysisResult}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default EmailUploader;