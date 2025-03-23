import React, { useState, useEffect } from "react";
import './FormPage.css';

const FormPage = () => {
  const [files, setFiles] = useState([]);
  const [parsedEmails, setParsedEmails] = useState([]);
  const [expandedEmailIndex, setExpandedEmailIndex] = useState(null);

  useEffect(() => {
    if (parsedEmails.length > 0) {
      setExpandedEmailIndex(0);
    }
  }, [parsedEmails]);

  const handleFileUpload = async (event) => {
    if (event.target.files) {
      const fileArray = Array.from(event.target.files);
      setFiles(fileArray);

      // Convert files to Base64 and store in localStorage
      const storedFiles = {};
      for (const file of fileArray) {
        const base64 = await fileToBase64(file);
        storedFiles[file.name] = base64;
      }
      localStorage.setItem("uploadedEmlFiles", JSON.stringify(storedFiles));
      alert("Files stored in local storage!");
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

  const handleReadEmails = () => {
    const storedFiles = JSON.parse(localStorage.getItem("uploadedEmlFiles"));
    if (!storedFiles) {
      alert("No files found in local storage!");
      return;
    }

    const parsedData = Object.keys(storedFiles).map((fileName) => {
      const base64Data = storedFiles[fileName];
      const content = atob(base64Data.split(",")[1]); // Decode Base64

      // Simple parsing (extracts "From", "To", and "Subject")
      const fromMatch = content.match(/^From: (.+)$/m);
      const toMatch = content.match(/^To: (.+)$/m);
      const subjectMatch = content.match(/^Subject: (.+)$/m);

      return {
        fileName,
        from: fromMatch ? fromMatch[1] : "Unknown",
        to: toMatch ? toMatch[1] : "Unknown",
        subject: subjectMatch ? subjectMatch[1] : "No Subject",
      };
    });

    setParsedEmails(parsedData);
  };

  const toggleEmailDetails = (index) => {
    setExpandedEmailIndex(expandedEmailIndex === index ? null : index);
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold custom-heading">Upload and Read EML Files</h1>

      <div className="input-container">
        <input
          type="file"
          multiple
          onChange={handleFileUpload}
          className="file-input"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="custom-file-upload">
          Choose Files
        </label>
        <button
          onClick={handleReadEmails}
          className="custom-button"
        >
          Read Stored Emails
        </button>
      </div>

      <div className="mt-4">
        <h2 className="font-semibold">Parsed Email Data:</h2>
        {parsedEmails.length > 0 ? (
          <ul className="email-list">
            {parsedEmails.map((email, index) => (
              <li key={index} className="email-item mb-2">
                <p>
                  <strong>File Name:</strong> {email.fileName}
                  <button
                    onClick={() => toggleEmailDetails(index)}
                    className="toggle-button"
                  >
                    {expandedEmailIndex === index ? "−" : "+"}
                  </button>
                </p>
                {expandedEmailIndex === index && (
                  <ul className="email-details">
                    <li><strong>From:</strong> {email.from}</li>
                    <li><strong>To:</strong> {email.to}</li>
                    <li><strong>Subject:</strong> {email.subject}</li>
                  </ul>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No emails parsed yet. Upload and click "Read Stored Emails".</p>
        )}
      </div>
    </div>
  );
};

export default FormPage;