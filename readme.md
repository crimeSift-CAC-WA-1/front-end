# CrimeSift 🚔🔍

## Table of Contents 📑
- Introduction
- Features
- Installation
- Usage
- Inspiration
- [Technical Challenges](#technical-challenges)
- [Future Improvements](#future-improvements)
- License

## Introduction 📝
CrimeSift is designed to significantly reduce the time detectives need to find evidence in order to secure warrants or take legal action in criminal investigations. Using AI, CrimeSift quickly detects specific messages or quotes related to the crime a detective is investigating. For example, imagine a group chat where a school shooting threat was posted. The detective can upload the chat, instruct the app to search for messages mentioning a school shooting, and within moments, CrimeSift will flag all relevant messages and provide context. This allows detectives to manually review the flagged content, find incriminating evidence, and take action faster.

## Features ✨
- **Import Chat Messages**: Import chat messages from popular platforms like WhatsApp, Discord, and Instagram.
- **AI-Powered Analysis**: Uncensored AI model interprets any type of content based on prompts provided by the detective.
- **Username Search**: Search for every occurrence of a username across multiple social media platforms.
- **Report Generation**: Compiles evidence into a well-organized report, complete with a timeline of important events.
- **Local Storage**: Reports are stored locally on the detective's computer for security and privacy.
- **Live Log File**: Generates a live log file to document all steps for legal compliance.

## Installation 💻
To install and run CrimeSift locally, follow these steps:

1. **Clone the repository**:
    ```sh
    git clone https://github.com/yourusername/crimesift.git
    cd crimesift
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Set up environment variables**:
    Create a 

.env.local

 file in the root directory and add your environment variables.

4. **Run the development server**:
    ```sh
    npm run dev
    ```

5. **Build for production**:
    ```sh
    npm run build
    ```

6. **Start the production server**:
    ```sh
    npm start
    ```

## Usage 📂
1. **Upload Data**: Securely upload your chat data from WhatsApp, Discord, or Instagram.
2. **Analyze Content**: Use AI-powered content analysis to detect specific messages or quotes related to the crime.
3. **Generate Reports**: Review the results in the form of detailed reports, highlighting flagged messages and potential risks.

## Inspiration 💡
All of our team members love to watch crime podcasts on the news and YouTube to kill some time because it’s something we find interesting. One day, one of our teammates stumbled upon a case where a group of teenagers in Colorado threw rocks at cars on a highway last year. They ended up hitting a couple of cars, and one rock tragically killed 20-year-old Alexa Bartell. It took law enforcement a couple of weeks to gather enough evidence from their phone chats before they could get a warrant to arrest them. This highlighted a significant shortcoming in investigations; it takes a lot of time to sift through gigabytes of chat history just to find a message or two. A simple keyword search through a data document often isn’t efficient either, as messages can be hidden and only make sense when considered alongside the context of surrounding messages.

## Technical Challenges 🛠️
- **Data Privacy**: Ensuring that all uploaded data is encrypted and processed securely.
- **AI Model Training**: Training an AI model to accurately detect crime-related messages while reducing false positives.
- **Speech Recognition**: Implementing a speech recognition model with near-perfect accuracy for converting audio into text.

## Future Improvements 🚀
- **Expand Platform Support**: Cover additional services like Signal and Snapchat.
- **Custom AI Training**: Enhance the accuracy of detecting crime-related messages using machine learning techniques.
- **Audio Analysis**: Implement a speech recognition model for analyzing audio files.
- **Real-World Testing**: Aim to have the Kirkland Police Department use our app in a real investigation.

## License 📜
This project is licensed under the MIT License. See the LICENSE file for details.

---

Thank you for using CrimeSift! If you have any questions or feedback, please feel free to reach out. 🚔🔍
