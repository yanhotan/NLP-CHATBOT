import { GoogleGenerativeAI } from "@google/generative-ai";

const chatboxBody = document.querySelector(".chatbox-body");
const chatInput = document.querySelector(".chatbox-footer textarea");
const sendChatBtn = document.getElementById("sendButton");
const menuButton = document.getElementById("menuButton");
const sidebar = document.querySelector(".sidebar");

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
        chatbox.classList.remove("hidden");
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
            handleChat(message);
            chatInput.value = "";
            sendButton.classList.remove("active");
            sendButton.disabled = true;
        }
    });
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
        if (message === "...") {
            content += '<span class="shining-dots"><span></span><span></span><span></span></span>';
        }
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
