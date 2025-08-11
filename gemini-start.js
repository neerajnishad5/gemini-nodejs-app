import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Load environment variables
dotenv.config({ path: ".env.local" });

// Validate API key
const apiKey = process.env.API_KEY;
if (!apiKey) {
  console.error("API_KEY is missing in env variables.");
  process.exit(1);
}

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: process.env.MODEL });
const prompt =
  "Explain how the event loop works in JavaScript in simple terms, briefly.";

// Generate content using Gemini
async function generateExplanation(promptText) {
  try {
    const result = await model.generateContent(promptText);
    const responseText = result.response.text();
    console.log("📘Gemini response:", responseText);
  } catch (error) {
    console.error("❌ Failed to generate content:", error.message || error);
  }
}

// Run the script
generateExplanation(prompt);
