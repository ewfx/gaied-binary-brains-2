// import React, { useState, useEffect } from "react";
// import './FormPage.css';
// import { generateTextStream } from "../utils/utils"; // Assuming this function calls the Gemini API
// import { simpleParser } from 'mailparser'; // Import the mailparser library

// const FormPage2 = () => {
//   const [files, setFiles] = useState();
//   const [parsedEmails, setParsedEmails] = useState();
//   const [promptResponse, setPromptResponse] = useState('');
//   const [expandedEmailIndex, setExpandedEmailIndex] = useState(null);
//   const [loadingAnalysis, setLoadingAnalysis] = useState(false);

//   useEffect(() => {
//     if (parsedEmails.length > 0) {
//       setExpandedEmailIndex(0);
//     }
//   }, [parsedEmails]);

//   const handleFileUpload = async (event) => {
//     if (event.target.files) {
//       const fileArray = Array.from(event.target.files);
//       setFiles(fileArray);

//       const storedFiles = {};
//       for (const file of fileArray) {
//         const base64 = await fileToBase64(file);
//         storedFiles[file.name] = base64;
//       }
//       localStorage.setItem("uploadedEmlFiles", JSON.stringify(storedFiles));
//       alert("Files stored in local storage!");
//     }
//   };

//   const fileToBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result);
//       reader.onerror = (error) => reject(error);
//     });
//   };

//   const handleAnalyzeEmails = async () => {
//     const storedFiles = JSON.parse(localStorage.getItem("uploadedEmlFiles"));
//     if (!storedFiles) {
//       alert("No files found in local storage!");
//       return;
//     }

//     setLoadingAnalysis(true);
//     setPromptResponse(''); // Clear previous response
//     setParsedEmails(); // Clear previous parsed emails

//     const allParsedData = [];
//     let combinedPrompt = "Analyze the following emails and provide a summary of each, highlighting key information and potential action items:\n\n";

//     for (const fileName of Object.keys(storedFiles)) {
//       const base64Data = storedFiles[fileName];
//       const emlContent = atob(base64Data.split(",")[1]); // Decode Base64

//       try {
//         const parsedEmail = await simpleParser(emlContent);
//         allParsedData.push({ fileName, parsedData: parsedEmail });

//         combinedPrompt += `--- Email: ${fileName} ---\n`;
//         combinedPrompt += `From: ${parsedEmail.from ? parsedEmail.from.text : 'Unknown'}\n`;
//         combinedPrompt += `To: ${parsedEmail.to ? parsedEmail.to.text : 'Unknown'}\n`;
//         combinedPrompt += `Subject: ${parsedEmail.subject || 'No Subject'}\n`;
//         combinedPrompt += `Date: ${parsedEmail.date ? parsedEmail.date.toString() : 'Unknown'}\n`;
//         combinedPrompt += `Body (Text): ${parsedEmail.text || 'No plain text body'}\n`;
//         if (parsedEmail.html) {
//           combinedPrompt += `Body (HTML - Present)\n`;
//         }
//         if (parsedEmail.attachments && parsedEmail.attachments.length > 0) {
//           combinedPrompt += `Attachments: ${parsedEmail.attachments.map(a => a.filename).join(', ')}\n`;
//         }
//         combinedPrompt += "\n";

//       } catch (error) {
//         console.error(`Error parsing EML file ${fileName}:`, error);
//         alert(`Error parsing EML file ${fileName}: ${error.message}`);
//       }
//     }

//     setParsedEmails(allParsedData.map(item => ({
//       fileName: item.fileName,
//       from: item.parsedData.from ? item.parsedData.from.text : "Unknown",
//       to: item.parsedData.to ? item.parsedData.to.text : "Unknown",
//       subject: item.parsedData.subject ? item.parsedData.subject : "No Subject",
//     })));

//     if (combinedPrompt.trim()) {
//       try {
//         const response = await generateTextStream(combinedPrompt); // Call your Gemini API function
//         setPromptResponse(response);
//       } catch (error) {
//         console.error("Error calling Gemini API:", error);
//         setPromptResponse("Error analyzing emails with Gemini.");
//       } finally {
//         setLoadingAnalysis(false);
//       }
//     } else {
//       setPromptResponse("No email content to analyze.");
//       setLoadingAnalysis(false);
//     }
//   };

//   const toggleEmailDetails = (index) => {
//     setExpandedEmailIndex(expandedEmailIndex === index ? null : index);
//   };

//   return (
//     <div className="p-6 space-y-4">
//       <h1 className="text-xl font-bold custom-heading">Upload and Analyze EML Files</h1>

//       <div className="input-container">
//         <input
//           type="file"
//           multiple
//           onChange={handleFileUpload}
//           className="file-input"
//           id="file-upload"
//         />
//         <label htmlFor="file-upload" className="custom-file-upload">
//           Choose Files
//         </label>
//         <button
//           onClick={handleAnalyzeEmails}
//           className="custom-button"
//           disabled={Object.keys(JSON.parse(localStorage.getItem("uploadedEmlFiles") || '{}')).length === 0 || loadingAnalysis}
//         >
//           {loadingAnalysis ? 'Analyzing...' : 'Analyze Emails'}
//         </button>
//       </div>

//       <div className="mt-4">
//         <h2 className="font-semibold">Parsed Email Data:</h2>
//         {parsedEmails.length > 0 ? (
//           <ul className="email-list">
//             {parsedEmails.map((email, index) => (
//               <li key={index} className="email-item mb-2">
//                 <p>
//                   <strong>File Name:</strong> {email.fileName}
//                   <button
//                     onClick={() => toggleEmailDetails(index)}
//                     className="toggle-button"
//                   >
//                     {expandedEmailIndex === index ? "−" : "+"}
//                   </button>
//                 </p>
//                 {expandedEmailIndex === index && (
//                   <ul className="email-details">
//                     <li><strong>From:</strong> {email.from}</li>
//                     <li><strong>To:</strong> {email.to}</li>
//                     <li><strong>Subject:</strong> {email.subject}</li>
//                   </ul>
//                 )}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No emails parsed yet. Upload and click "Analyze Emails".</p>
//         )}
//         {promptResponse && (
//           <div className="mt-4">
//             <h2 className="font-semibold">Analysis Response from Gemini:</h2>
//             <pre className="whitespace-pre-wrap">{promptResponse}</pre>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FormPage2;