# 🚀 Project Name: Smart Triage

## 📌 Table of Contents
- [Introduction](#introduction)
- [Demo](#demo)
- [Inspiration](#inspiration)
- [What It Does](#what-it-does)
- [How We Built It](#how-we-built-it)
- [Challenges We Faced](#challenges-we-faced)
- [How to Run](#how-to-run)
- [Tech Stack](#tech-stack)
- [Team](#team)

---

## 🎯 Introduction
Handling a high volume of email servicing requests with diverse content and attachments often requires manual triage, which involves interpreting emails, categorizing requests, extracting key data, and assigning tasks. This process is not only time-consuming but also prone to errors. By integrating Generative AI (LLMs) for email classification and data extraction, the workflow becomes more efficient and accurate, reducing manual effort while enhancing turnaround times.


## 🎥 Demo
📹 Video Demo: https://github.com/ewfx/gaied-binary-brains-2/blob/main/artifacts/demo/Smart_Triage_demo_Win.mp4.zip

https://github.com/ewfx/gaied-binary-brains-2/blob/main/artifacts/demo/Smart_Triage_demo_MAC.mov.zip

🖼️ PPT: https://github.com/ewfx/gaied-binary-brains-2/blob/main/artifacts/demo/Smart_Triage.pptx 

## 💡 Inspiration
**1.** Create a system that comprehends the sender's purpose with context and reasoning, enabling seamless categorization of requests.

**2.** Handle emails with multiple intents while focusing on the sender's primary need, showcasing advanced contextual intelligence.

**3.** Replace time-consuming manual processes with AI-driven automation to enhance productivity, minimize errors, and improve turnaround time.

## ⚙️ What It Does
**1. Bulk Email Processing**: Ability to upload and process single or multiple emails simultaneously.

**2. Rule-Based Analysis**: Utilizes Gemini LLM with configurable rules to analyze and classify emails.

**3. Request Classification**: Identifies request type and sub-request type for each email.

**4. Confidence Scoring**: Assigns a confidence score to the classifications for better reliability.

**5. Duplicate Detection**: Identifies duplicate emails within the batch to prevent redundant processing.

**6. Report Generation**: Generates a comprehensive report summarizing the analysis and outcomes.

## 🛠️ How We Built It
**1. Technology Stack**: Leveraged modern technologies such as JavaScript, ReactJS, NodeJS, and libraries like Mailparser and PDF-lib for frontend and backend integration.

**2. AI Integration** : Incorporated Gemini LLM to enable intelligent email classification, context-based data extraction, and confidence scoring.

**3. Custom Rule Engine** : Developed a configurable rule engine to define and adjust classification parameters dynamically based on business requirements.

**4. Data Extraction Logic**: Implemented context-aware extraction mechanisms to identify key fields such as deal names, amounts, and expiration dates from both email content and attachments.

**5. Duplicate Handling Algorithm**: Designed logic to detect and eliminate duplicate emails from email threads, ensuring efficient processing and reducing redundancy.

**6. Batch Processing Capability**: Enabled the system to process single or multiple emails simultaneously, ensuring scalability and high throughput.

**7. Report Generation Framework**: Built a reporting module to summarize outcomes, including request classifications, confidence scores, and duplicate email detections.

## 🚧 Challenges We Faced
Identifying a language model that could accurately interpret email content, handle diverse formats, and provide reliable context-based classification and data extraction.


## 🏃 How to Run

Clone the repo. 
Do `npm i` 

Do `npm start`<br>
Open [http://localhost:3000] to view it in the browser.

In case the API key provided is expired, generate a new key.<br>
The apiKey can be generated here - https://aistudio.google.com/apikey

Replace `YOUR_API_KEY` with your actual Gemini API key in utils.js file<br>
const API_KEY = `YOUR_API_KEY`


## 🏗️ Tech Stack
- 🔹 Frontend: Javascript, React JS
- 🔹 Backend:  Node JS
- 🔹 AI/ML integration: Gemini LLM
- 🔹 Libraries/Tools: Mailparser, PDF-lib, @google/generative-ai
- 🔹 Development environment: VSCode Editor


## 👥 Team
- **Tripti Rawat** - [GitHub](https://github.com/triptirawat) 
- **Rahul Gupta** - [GitHub](https://github.com/rgupta2525) 
- **Siva Pandi** - [GitHub](https://github.com/sivakumarrails) 