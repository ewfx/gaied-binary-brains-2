import React, { useState, useEffect } from "react";
import { PDFDocument } from "pdf-lib";
import "./FormPage.css";
import { generateText } from "../utils/utils";
import { rule } from "../utils/rule";
import FilteredComponent from "./FilteredComponent";
import { transformDataForUI } from "../utils/transformDataForUI";
import DataDisplay from "./DataDisplay";

const FormPage = () => {
  const [files, setFiles] = useState([]);
  const [parsedEmails, setParsedEmails] = useState([]);
  const [promptResponse, setPromptResponse] = useState("");
  const [expandedEmailIndex, setExpandedEmailIndex] = useState(null);
  const [selectedFileNames, setSelectedFileNames] = useState([]);

  useEffect(() => {
    if (parsedEmails.length > 0) {
      setExpandedEmailIndex(0);
    }
  }, [parsedEmails]);

  const handleFileUpload = async (event) => {
    localStorage.removeItem("uploadedEmlFiles");
    if (event.target.files) {
      const fileArray = Array.from(event.target.files);
      setFiles(fileArray);
      setSelectedFileNames(fileArray.map(file => file.name));

      const storedFiles = {};
      for (const file of fileArray) {
        const base64 = await fileToBase64(file);
        storedFiles[file.name] = base64;
      }
      localStorage.setItem("uploadedEmlFiles", JSON.stringify(storedFiles));
    }
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // const handleReadEmails = async () => {
  //   const storedFiles = JSON.parse(localStorage.getItem("uploadedEmlFiles"));
  //   if (!storedFiles) {
  //     alert("No files found in local storage!");
  //     return;
  //   }

  //   const parsedData = Object.keys(storedFiles).map((fileName) => {
  //     const base64Data = storedFiles[fileName];
  //     const content = atob(base64Data.split(",")[1]);

  //     const fromMatch = content.match(/^From: (.+)$/m);
  //     const toMatch = content.match(/^To: (.+)$/m);
  //     const subjectMatch = content.match(/^Subject: (.+)$/m);

  //     return {
  //       fileName,
  //       from: fromMatch ? fromMatch[1] : "Unknown",
  //       to: toMatch ? toMatch[1] : "Unknown",
  //       subject: subjectMatch ? subjectMatch[1] : "No Subject",
  //       content: content,
  //     };
  //   });

  //   setParsedEmails(parsedData);
  //   if (parsedData.length > 0) {
  //     const promptText = rule + parsedData[0].content;
  //     const response = await generateText(promptText);
  //     setPromptResponse(response);
  //   }
  // };

  
  const handleReadEmails = async () => {
    const storedFiles = JSON.parse(localStorage.getItem("uploadedEmlFiles"));
    if (!storedFiles) {
      alert("No files found in local storage!");
      return;
    }
  
    const parsedData = await Promise.all(
      Object.keys(storedFiles).map(async (fileName) => {
        const base64Data = storedFiles[fileName];
        const content = atob(base64Data.split(",")[1]);
  
        // Extract metadata and email body
        const fromMatch = content.match(/^From: (.+)$/m);
        const toMatch = content.match(/^To: (.+)$/m);
        const subjectMatch = content.match(/^Subject: (.+)$/m);
        const dateMatch = content.match(/^Date: (.+)$/m);
        const emailBody = content.split("\r\n\r\n")[1] || ""; // Extract body after headers
  
        // Extract attachments
        const attachments = [];
        const boundaryMatch = content.match(/boundary="([^"]+)"/);
        if (boundaryMatch) {
          const boundary = boundaryMatch[1];
          const parts = content.split(`--${boundary}`);
  
          for (const part of parts) {
            const contentTypeMatch = part.match(/Content-Type: ([^;]+)/);
            const contentDispositionMatch = part.match(/Content-Disposition: attachment; filename="([^"]+)"/);
  
            if (contentTypeMatch && contentDispositionMatch) {
              const contentType = contentTypeMatch[1].trim();
              const fileName = contentDispositionMatch[1].trim();
              const fileBase64 = part.split("\r\n\r\n")[1]?.trim();
  
              if (fileBase64) {
                const fileBytes = Uint8Array.from(atob(fileBase64), (c) => c.charCodeAt(0));
  
                // Parse based on content type
                let parsedContent = null;
                if (contentType === "application/pdf") {
                  try {
                    const pdfDoc = await PDFDocument.load(fileBytes);
                    parsedContent = (await pdfDoc.getPage(0).getTextContent())
                      .items.map((item) => item.str)
                      .join(" ");
                  } catch (err) {
                    console.error("Error parsing PDF:", err);
                  }
                } else if (contentType.startsWith("text/")) {
                  parsedContent = new TextDecoder().decode(fileBytes);
                } else {
                  parsedContent = "Binary content - unable to display.";
                }
  
                attachments.push({
                  name: fileName,
                  contentType,
                  content: parsedContent,
                });
              }
            }
          }
        }
  
        return {
          fileName,
          from: fromMatch ? fromMatch[1] : "Unknown",
          to: toMatch ? toMatch[1] : "Unknown",
          subject: subjectMatch ? subjectMatch[1] : "No Subject",
          date: dateMatch ? dateMatch[1] : "Unknown Date",
          body: emailBody,
          attachments,
          content: content
        };
      })
    );
  
    setParsedEmails(parsedData);
    const responseData = []
  
    if (parsedData.length > 0) {
      for(let i = 0; i < parsedData.length; i++){  
        const promptText = rule + parsedData[i].content;
        const response = await generateText(promptText);
        const updatedResponse = {...response, fileName: parsedData[i].fileName};
        responseData.push(updatedResponse)
      }


      const trasformedData = transformDataForUI(responseData)
      console.log('response-----', trasformedData)
      setPromptResponse(trasformedData);
    }
  };

  

  const toggleEmailDetails = (index) => {
    setExpandedEmailIndex(expandedEmailIndex === index ? null : index);
  };

  return (
    <div class="animated-background">
      <div className="form-page-container">

        <h1 className="page-title">Next-Gen Email & Document Management</h1>

        <div className="upload-section">
          <div className="file-input-wrapper">
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              id="file-upload"
              className="file-input"
            />
            <label htmlFor="file-upload" className="file-label">
              Choose Files
            </label>
          </div>
          <div className="file-names">
            {selectedFileNames.length > 0 ? (
              <ul>
                {selectedFileNames.map((fileName, index) => (
                  <li key={index} className="file-name">{fileName}</li>
                ))}
              </ul>
            ) : (
              <p className="placeholder-text">No files selected</p>
            )}
          </div>
        </div>


        <div className="btn-section">
          <button
            onClick={handleReadEmails}
            className="generate-report-button"
          >
            Generate Report
          </button>
        </div>

        <div className="email-data-section">
          {/* <h2 className="section-title">Parsed Data</h2> */}
          {/* {parsedEmails.length > 0 ? (
          <ul className="email-list">
            {parsedEmails.map((email, index) => (
              <li key={index} className="email-item">
                <div className="email-header">
                  <span className="file-name-label">{email.fileName}</span>
                  <button
                    onClick={() => toggleEmailDetails(index)}
                    className="toggle-details-button"
                  >
                    {expandedEmailIndex === index ? "Hide Details" : "View Details"}
                  </button>
                </div>
                {expandedEmailIndex === index && (
                  <div className="email-details">
                    <p><strong>From:</strong> {email.from}</p>
                    <p><strong>To:</strong> {email.to}</p>
                    <p><strong>Subject:</strong> {email.subject}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="placeholder-text">No emails parsed yet.</p>
        )} */}

          {promptResponse && (
            <div className="prompt-response">
               <h2 className="section-title">Parsed Data</h2>
              {/* {promptResponse && promptResponse.length > 0 && promptResponse.map((promptRes, index) => <FilteredComponent data={promptRes} />)} */}
              <DataDisplay trasformedData={promptResponse} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormPage;
