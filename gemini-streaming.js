import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { GoogleGenerativeAI } from "@google/generative-ai";
import readline from "readline";

//  Load & validate API key 
const apiKey = process.env.API_KEY;
if (!apiKey) {
  console.error("❌ API_KEY is missing in env variables.");
  process.exit(1);
}

//  Initialize Gemini Model 
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: process.env.MODEL });

//  Create interactive readline interface 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//  Function to handle streaming Gemini responses 
async function askAndRespond(chat) {
  rl.question("You: ", async (userInput) => {
    if (userInput.trim().toLowerCase() === "exit") {
      console.log("👋 Exiting chat.");
      rl.close();
      return;
    }

    try {
      console.log("📚 Gemini response:");
      const result = await chat.sendMessageStream(userInput);
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        if (chunkText) {
          process.stdout.write(chunkText); // Streaming output in real-time
        }
      }
      console.log(); // Newline after response finishes
    } catch (error) {
      console.error("❌ Error generating response:", error.message || error);
    }

    askAndRespond(chat); // 🔁 Wait for next user input
  });
}

//  Start chat session 
async function startChatSession() {
  try {
    const chat = model.startChat({
      history: [], // Empty history
      generationConfig: {
        maxOutputTokens: 200,
      },
    });

    console.log("Gemini Chat started. Type your message or 'exit' to quit.\n");
    askAndRespond(chat);
  } catch (error) {
    console.error("❌ Failed to initialize chat session:", error.message || error);
    rl.close();
  }
}

startChatSession();
