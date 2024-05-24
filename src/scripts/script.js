import { GoogleGenerativeAI } from "@google/generative-ai";

const chatboxBody = document.querySelector(".chatbox-body");
const chatInput = document.querySelector(".chatbox-footer textarea");
const sendChatBtn = document.getElementById("sendButton");
const menuButton = document.getElementById("menuButton");
const sidebar = document.querySelector(".sidebar");
const attachButton = document.querySelector(".attach-button");

const API_KEY = "AIzaSyDMJ5A2c8hmDW3ZPirDO6Q51O5K_2mdf3Q"; // Replace with your Gemini API key

let faqs = {};

// Fetch FAQs from JSON file
fetch('../json/faqs.json')
    .then(response => response.json())
    .then(data => {
        faqs = data;
        displayFaqButtons(data);
    })
    .catch(error => {
        console.error("Error fetching FAQs:", error);
    });

const inputInitHeight = chatInput.scrollHeight;

document.addEventListener("DOMContentLoaded", () => {
    const chatbox = document.querySelector(".chatbox");
    const sendButton = document.getElementById("sendButton");

    const showChatbox = () => {
        chatbox.classList.add("active"); // Show the chatbox
        document.querySelector(".faq-buttons").style.display = "none"; // Hide FAQ buttons after first prompt
    };

    const faqButtons = document.querySelectorAll(".faq-button");
    faqButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const message = event.target.textContent;
            showChatbox();
            handleChat(message);
        });
    });

    chatInput.addEventListener("input", () => {
        if (chatInput.value.trim()) {
            sendButton.classList.add("active");
            sendButton.disabled = false;
        } else {
            sendButton.classList.remove("active");
            sendButton.disabled = true;
        }
    });

    sendButton.addEventListener("click", () => {
        const message = chatInput.value.trim();
        if (message) {
            showChatbox();
            handleChat(message);
            chatInput.value = "";
            sendButton.classList.remove("active");
            sendButton.disabled = true;
        }
    });

    attachButton.addEventListener("click", () => {
        fileInput.click();
    });

    fileInput.addEventListener("change", handleFileUpload);
    });

const addMessage = (sender, message) => {
    const chatList = document.querySelector(".chat-list");
    const messageElem = document.createElement("div");
    messageElem.classList.add("message", sender);
    messageElem.innerHTML = `<div class="content">${message}</div>`;
    chatList.appendChild(messageElem);
    chatList.scrollTop = chatList.scrollHeight; // Scroll to the bottom
};

const createChatElement = (message, sender) => {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender);

    let content = `<div class="content">${message}</div>`;
    if (sender != "user") {
        content = `<img src="../images/bot-profile.png" alt="Bot">` + content;
    }
    messageElement.innerHTML = content;
    
    return messageElement;
};

const generateResponse = async (userMessage) => {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    try {
        const result = await model.generateContent(userMessage);
        const response = await result.response;
        const text = await response.text();
        return text.trim();
    } catch (error) {
        console.error("Error during fetch operation:", error);
        return "Oops! Something went wrong. Please try again.";
    }
};

const handleChat = async (message) => {
    const userMessage = message || chatInput.value.trim().toLowerCase();
    if (!userMessage) return;

    const chatbox = document.querySelector(".chatbox");
    if (chatbox.classList.contains("hidden")) {
        chatbox.classList.remove("hidden");
        document.querySelector(".faq-buttons").style.display = "none";
    }

    const userMessageElement = createChatElement(userMessage, "user");
    chatboxBody.appendChild(userMessageElement);
    chatboxBody.scrollTop = chatboxBody.scrollHeight;

    const botMessageElement = createChatElement("...", "bot");
    chatboxBody.appendChild(botMessageElement);
    chatboxBody.scrollTop = chatboxBody.scrollHeight;

    const botResponse = faqs[userMessage] || (await generateResponse(userMessage)).replace(/[*_]/g, '');
    botMessageElement.querySelector(".content").textContent = botResponse;
    chatboxBody.scrollTop = chatboxBody.scrollHeight;
};

chatInput.addEventListener("input", () => {
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        const message = chatInput.value.trim();
        if (message) {
            handleChat(message);
            chatInput.value = "";
            sendChatBtn.classList.remove("active");
            sendChatBtn.disabled = true;
        }
    }
});

const express = require('express');
const multer = require('multer');
const app = express();
const port = 3000;

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), (req, res) => {
    console.log('File received:', req.file);
    res.json({ message: 'File upload successful', file: req.file });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

const fileInput = document.getElementById("fileInput");

fileInput.addEventListener("change", handleFileUpload);

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        console.log("File uploaded:", file);

        // Create a FormData object and append the file
        const formData = new FormData();
        formData.append("file", file);

        // Send the file to the server using the Fetch API
        fetch("/upload", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log("File upload successful:", data);
            // Handle successful upload response
            alert('File uploaded successfully!');
        })
        .catch(error => {
            console.error("File upload error:", error);
            // Handle upload error
            alert('File upload failed. Please try again.');
        });
    }
}

sendChatBtn.addEventListener("click", () => {
    const message = chatInput.value.trim();
    if (message) {
        handleChat(message);
        chatInput.value = "";
        sendChatBtn.classList.remove("active");
        sendChatBtn.disabled = true;
    }
});

menuButton.addEventListener("click", () => {
    sidebar.classList.toggle("sidebar-open");
});
