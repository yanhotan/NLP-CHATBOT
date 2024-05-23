import { GoogleGenerativeAI } from "@google/generative-ai";

const chatboxBody = document.querySelector(".chatbox-body");
const chatInput = document.querySelector(".chatbox-footer textarea");
const sendChatBtn = document.querySelector(".chatbox-footer button");
const menuButton = document.getElementById("menuButton");
const sidebar = document.querySelector(".sidebar");

const API_KEY = "AIzaSyDMJ5A2c8hmDW3ZPirDO6Q51O5K_2mdf3Q"; // Replace with your Gemini API key

let faqs = {};

// Fetch FAQs from JSON file
fetch('../json/faqs.json')
    .then(response => response.json())
    .then(data => {
        faqs = data;
    })
    .catch(error => {
        console.error("Error fetching FAQs:", error);
    });

const inputInitHeight = chatInput.scrollHeight;

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

const textarea = document.querySelector('textarea');
const sendButton = document.getElementById('sendButton');

textarea.addEventListener('input', function() {
    if (this.value.trim() !== '') {
        sendButton.classList.add('active');
        sendButton.disabled = false;
    } else {
        sendButton.classList.remove('active');
        sendButton.disabled = true;
    }
});

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

const handleChat = async () => {
    const userMessage = chatInput.value.trim().toLowerCase();
    if (!userMessage) return;

    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    const userMessageElement = createChatElement(userMessage, "user");
    chatboxBody.appendChild(userMessageElement);
    chatboxBody.scrollTop = chatboxBody.scrollHeight;

    const botMessageElement = createChatElement("Thinking...", "bot");
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
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);

// Toggle sidebar visibility
menuButton.addEventListener("click", () => {
    sidebar.classList.toggle("sidebar-open");
});
