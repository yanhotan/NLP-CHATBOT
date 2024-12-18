# AIESEC Chatbot Innovation

A chatbot designed to address key challenges in user support, information overload, and feedback analysis for AIESEC programs. The project leverages Natural Language Processing (NLP) to enhance user experience and provide actionable insights for AIESEC teams.

## Project Overview

### Issues Addressed:
1. **Support and Assistance**:  
   Managing inquiries from members and applicants can be overwhelming for AIESEC teams.  
2. **Information Overload**:  
   AIESEC offers a wide range of programs that may confuse users, making decision-making challenging.  
3. **Limited Insights**:  
   Feedback data from users is underutilized, limiting potential improvements to AIESEC programs and services.

### NLP Application:
- **User Support**: The chatbot answers user inquiries about volunteering programs, application processes, and FAQs.  
- **Personalized Recommendations**: It provides tailored suggestions to match users' needs with high-quality volunteering opportunities.  
- **Sentiment Analysis**: The chatbot analyzes feedback data to derive actionable insights for improving AIESEC’s offerings.  

---

## Technologies and Data

### Technologies Used:
- **Language**: Python
- **NLP Techniques**: 
  - Sentiment analysis
  - Conversational AI for FAQ handling and program recommendations
- **Backend Framework**: Flask (or similar) for chatbot deployment (optional)
- **Large Language Model**: Gemini GPT (or similar)

### Data Sources:
- **Program Details**: Information about AIESEC’s volunteering opportunities.
- **FAQs**: Frequently asked questions to assist users.
- **Application Data**: To assist with application-related inquiries.
- **Feedback Data**: User-generated feedback analyzed to identify trends and insights.  

Data is provided by AIESEC’s Marketing Team and the Outgoing Global Volunteer (oGV) Team.

---

## Features

1. **Efficient User Support**:
   - Answers common questions about volunteering programs and application processes.
   - Reduces workload for AIESEC teams by automating responses.  
   
2. **Personalized Guidance**:
   - Recommends programs tailored to users’ interests and goals.
   
3. **Feedback Insights**:
   - Uses sentiment analysis to evaluate user feedback.
   - Provides actionable insights for improving AIESEC programs.  

---

## Installation

To set up the chatbot locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yanhotan/NLP-CHATBOT.git
   cd NLP-CHATBOT
   ```

2. **Set Up Environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # For Windows: venv\Scripts\activate
   ```

3. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure API (if using Gemini GPT)**:
   - Obtain your API key.
   - Add it to a `.env` file:
     ```env
     GEMINI_API_KEY=your_api_key_here
     ```

5. **Run the Application**:
   ```bash
   python app.py
   ```
---

## Future Enhancements

- **Multi-Language Support**: Expand support to engage with users in multiple languages.  
- **Voice Interaction**: Integrate voice-based features for better accessibility.  
- **Real-Time API Integration**: Fetch live data, such as event schedules or availability of programs.  
- **Advanced Feedback Analytics**: Incorporate advanced NLP models to derive deeper insights from user feedback.

---

## License

This project is licensed under the [MIT License](LICENSE).
