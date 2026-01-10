# Early Spark 💡 | Microsoft Imagine Cup 2026

**Empowering parents to discover their child's hidden talents beyond grades.**

## Overview
**Early Spark** is an AI-powered platform designed to identify children's unique strengths beyond traditional academic grades. Leveraging **Howard Gardner's Theory of Multiple Intelligences**, the system analyzes behavioral video inputs to provide parents with a comprehensive dashboard, highlighting whether their child is Kinesthetic, Spatial, Logical, etc., along with personalized activity recommendations.

---

##  The Problem
* Children are often judged solely by report cards.
* Hidden talents (like bodily-kinesthetic or interpersonal skills) often go unnoticed.
* Professional child psychology assessments are expensive and inaccessible to many.

##  The Solution
An accessible web platform where parents can:
1.  Upload a short video of their child playing or performing an activity.
2.  Receive an instant **AI-generated report** analyzing the child's behavior.
3.  Get actionable advice and games tailored to their child's specific intelligence type.

---

##  Tech Stack
* **Frontend:** HTML5, TailwindCSS, JavaScript (Vanilla), Axios.
* **Backend:** Node.js, Express.js.
* **AI & Cloud:** * **Azure AI Vision:** For extracting behavioral data and analyzing movement patterns from video inputs.
    * **Azure OpenAI / OpenAI API:** For generating personalized psychological insights and recommendations based on the analyzed data.

---

##  How to Run the Project locally

### Prerequisites
* [Node.js](https://nodejs.org/) installed on your machine.
* An API Key for OpenAI or Azure OpenAI.

### Step 1: Clone the Repository
```bash
git clone [https://github.com/nourhanhegazy-eng/Early-Spark.git](https://github.com/nourhanhegazy-eng/Early-Spark.git)
cd Early-Spark
```

---

### Step 2: Setup the Backend
**Navigate to the backend folder and install dependencies:**
```bash
cd backend
npm install
```
---

### Step 3: Configure Environment Variables
**Create a .env file in the backend folder and add your API keys:**
```bash
PORT=5000
# Add your key here to enable AI features
AZURE_OPENAI_KEY=...
AZURE_OPENAI_ENDPOINT=...
AZURE_VISION_KEY=...
AZURE_VISION_ENDPOINT=...
```
---

### Step 4: Run the Server
**Start the backend server:**
```bash
node server.js
**You should see: 🚀 Server running on http://localhost:5000**
```
---

### Step 5: Launch the Frontend
* Go to the frontend folder.
* Open index.html in your browser (Double click to open).
* Go to the "Try Now" tab, enter a child's name, upload a video, and click Analyze.

---

## Future Roadmap
* **Phase 1:** MVP with Video Analysis & textual reports (Completed).
* **Phase 2:** Specialized AI Agent for parenting Q&A.
* **Phase 3:** Full Integration with Azure Video Indexer for real-time frame analysis **and** Mobile Application for wider accessibility.
* **Phase 4:** collaboration with edicothnal organization: partnering with schools and kindergartens to integrate Early Spark into their assessment curriculum **and** Building a community hub for patents and teachers to share inisights and feedback.

---

## The Team
**Nourhan Hegazy - Solo Founder**
* Senior Engineering Student & Mother.
* Combining technical expertise in Cloud/AI with maternal insights to solve real-world parenting challenges.

## Built with love for the Microsoft Imagine Cup 2026.



