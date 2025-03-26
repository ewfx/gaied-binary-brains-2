# 🚀 Project Name: Binary-Brains

## 📌 Table of Contents
- [Introduction](#introduction)
- [Demo](#demo)
- [How to Run](#how-to-run)
- [Tech Stack](#tech-stack)
- [Team](#team)

---

## 🎯 Introduction
Commercial Bank Lending Service teams receive a significant volume of servicing requests through emails. These emails contain diverse requests, often with attachments and will be ingested to the loan servicing platform and creates service requests which will go through the workflow processing. Incoming service requests (SR) via e-mail require a manual triage, where a "Gatekeeper" who: • Reads and interprets the emails content and attachments. • Identify the intent of the email and classify the "Request Type" and "Sub Request Type". • Extract key attributes for populating in service requests. • Assigns the request to the appropriate team or individual based on roles and skills. This manual triage process requires a team of gate keeps and time consuming. Sometimes its inefficient and error prone when volume is large. The challenge is to automate email classification and data extraction using Generative Al (LLMs), improving efficiency, accuracy and turnaround time. Also, minimizing gate keeping activities. 


## 🎥 Demo
📹 Video Demo: https://github.com/ewfx/gaied-binary-brains-2/blob/main/artifacts/demo/Smart_Triage_demo_Win.mp4
https://github.com/ewfx/gaied-binary-brains-2/blob/main/artifacts/demo/Smart_Triage_demo_MAC.mov
🖼️ PPT: https://github.com/ewfx/gaied-binary-brains-2/blob/main/artifacts/demo/Smart_Triage.pptx

## 🏃 How to Run

### `How to run?`

Clone the repo. Do `npm i` 

In case the API key provided is expired, generate a new key.
The apiKey can be generated here - https://aistudio.google.com/apikey

Replace `YOUR_API_KEY` with your actual Gemini API key in utils.js file
const API_KEY = `YOUR_API_KEY`

Do `npm start`<br>
Open [http://localhost:3000] to view it in the browser.


## 🏗️ Tech Stack
-Javascript
-ReactJS
-Mailparser
-PDF-lib
-@google/generative-ai
-nodeJS
-VSCode Editor


## 👥 Team
- **Tripti Rawat** - [GitHub](https://github.com/triptirawat) 
- **Rahul Gupta** - [GitHub](https://github.com/agarwalVaishali14) 
- **Siva Pandi** - [GitHub](https://github.com/rgupta2525) 