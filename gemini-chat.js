import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { GoogleGenerativeAI } from "@google/generative-ai";
import readline from "readline";

//  Validate API key 
const apiKey = process.env.API_KEY;
if (!apiKey) {
  console.error("❌ API_KEY is missing in environment variables.");
  process.exit(1);
}

//  Initialize Gemini AI 
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: process.env.MODEL });

//  Set up CLI input/output 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//  Handles user input & Gemini's response 
async function askAndRespond(chat) {
  rl.question("You: ", async (userInput) => {
    if (userInput.trim().toLowerCase() === "exit") {
      console.log("👋 Exiting chat.");
      rl.close();
      return;
    }

    try {
      const result = await chat.sendMessage(userInput);
      const response = await result.response;
      const text = await response.text();

      console.log("📚Gemini response:", text, "\n");
    } catch (error) {
      console.error("❌ Error generating response:", error.message || error);
    }

    askAndRespond(chat); // Continue listening
  });
}

// Start Gemini chat session 
async function startChatSession() {
  try {
    const chat = model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 200,
      },
    });

    console.log("Gemini Chat started. Type your message or 'exit' to quit.\n");
    askAndRespond(chat);
  } catch (error) {
    console.error("❌ Failed to start chat session:", error.message || error);
    rl.close();
  }
}

startChatSession();
