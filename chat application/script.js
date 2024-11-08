const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; // Variable to store user's message
const API_KEY = "AIzaSyDNgrW34nnheWQT2WWMr_oDItBClC1x5ys"; // Replace with your actual API key
const inputInitHeight = chatInput.scrollHeight;

// Function to list available models
const listModels = () => {
    fetch(`https://generativelanguage.googleapis.com/v1beta2/models?key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            console.log("Available models:", data);
        })
        .catch(error => {
            console.error("Error fetching models:", error);
        });
};

// Call the listModels function to check available models
listModels();

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
};

const generateResponse = (chatElement) => {
    const API_URL = `https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=${API_KEY}`; // Replace with the supported model
    const messageElement = chatElement.querySelector("p");

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            prompt: {
                text: userMessage
            },
            temperature: 0.7, // Adjust this for creativity
            candidate_count: 1
        })
    };

    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        if (data.candidates && data.candidates.length > 0) {
            messageElement.textContent = data.candidates[0].output.trim();
        } else {
            messageElement.textContent = "Bhai tu kya puch raha hai samjh nahi araha.";
            messageElement.classList.add("error");
        }
    }).catch((error) => {
        console.error("API Error:", error);
        messageElement.classList.add("error");
        messageElement.textContent = "Oops, something went wrong!";
    }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
};

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;

    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        const incomingChatLi = createChatLi("Soch Raha hu.....", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
};

chatInput.addEventListener("input", () => {
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
